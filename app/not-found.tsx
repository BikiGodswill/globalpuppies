import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-50">
      <div className="text-center px-4">
        <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest mb-3">
          404 Error
        </p>
        <h1 className="font-display font-bold text-warm-900 text-7xl md:text-9xl">
          Oops!
        </h1>
        <p className="text-warm-600 text-xl mt-4 max-w-md mx-auto">
          Looks like this puppy ran off! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/shop" className="btn-secondary">
            Browse Puppies
          </Link>
        </div>
      </div>
    </div>
  );
}
