import { Webhooks } from "@polar-sh/nextjs";
import {
  findUserIdByPolarCustomer,
  grantCredits10,
  grantSubscription,
  revokeSubscription,
  getProductType,
} from "@/lib/polar-webhook-handlers";

const webhookSecret = process.env.POLAR_WEBHOOK_SECRET!;

export const POST = Webhooks({
  webhookSecret,
  onOrderPaid: async (payload) => {
    if (payload.type !== "order.paid" || !payload.data) return;
    const order = payload.data as {
      customer: { externalId: string | null; email: string };
      productId: string | null;
    };
    const userId = await findUserIdByPolarCustomer(order.customer);
    if (!userId) return;
    const productType = getProductType(order.productId);
    if (productType === "credits10") {
      await grantCredits10(userId);
    }
    // 订阅首单也会触发 order.paid，但会员状态以 subscription.active 为准，这里只处理一次性积分包
  },
  onSubscriptionActive: async (payload) => {
    if (payload.type !== "subscription.active" || !payload.data) return;
    const sub = payload.data as {
      customer: { externalId: string | null; email: string };
      productId: string;
    };
    const userId = await findUserIdByPolarCustomer(sub.customer);
    if (!userId) return;
    const productType = getProductType(sub.productId);
    if (productType === "weekly" || productType === "yearly") {
      await grantSubscription(userId, productType);
    }
  },
  onSubscriptionRevoked: async (payload) => {
    if (payload.type !== "subscription.revoked" || !payload.data) return;
    const sub = payload.data as {
      customer: { externalId: string | null; email: string };
    };
    const userId = await findUserIdByPolarCustomer(sub.customer);
    if (!userId) return;
    await revokeSubscription(userId);
  },
});
