import { getListings } from "../actions.js";
import ListingCard from "@/components/ListingCard.jsx";
import Link from "next/link";

export default async function Listings() {
  const result = await getListings();

  if (!result.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Apartment Listings</h1>
          <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-md mx-auto">
            <p className="text-red-600">Error loading listings: {result.error}</p>
          </div>
        </div>
      </div>
    );
  }

  const listings = result.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Apartment Listings</h1>
          <p className="text-gray-600 mt-2">
            {listings.length} {listings.length === 1 ? "listing" : "listings"} available
          </p>
        </div>
        <Link
          href="/listings/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          + Add New Listing
        </Link>
      </div>

      {/* Listings Grid */}
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5v4m8-4v4" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No listings yet</h3>
          <p className="mt-2 text-gray-500">
            Get started by creating your first apartment listing.
          </p>
          <Link
            href="/listings/new"
            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Create Your First Listing
          </Link>
        </div>
      )}
    </div>
  );
}
