import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mt-4">Listing Not Found</h2>
          <p className="text-gray-600 mt-2">
            The apartment listing you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/listings"
            className="block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Browse All Listings
          </Link>
          <Link
            href="/"
            className="block text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
