import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="font-serif text-3xl font-bold text-warm-800 mb-2">Page Not Found</h1>
      <p className="text-warm-400 mb-8 text-center max-w-md">
        We couldn&apos;t find what you were looking for. Let&apos;s get you back to
        restoring memories.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="rounded-xl bg-accent hover:bg-accent-muted text-white px-6 py-3 font-medium text-center transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/restore"
          className="rounded-xl border border-warm-300 hover:bg-warm-100 text-warm-600 px-6 py-3 font-medium text-center transition-colors"
        >
          Restore a Photo
        </Link>
      </div>
    </div>
  );
}
