import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restore Your Photo",
  description:
    "Upload an old or damaged photo and let AI gently repair scratches, sharpen faces, and restore faded colors — for free.",
};

export default function RestoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
