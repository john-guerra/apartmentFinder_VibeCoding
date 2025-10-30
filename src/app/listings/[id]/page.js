import { getListingById } from "../../actions.js";
import Link from "next/link";
import Image from "next/image";
import DeleteListingButton from "@/components/DeleteListingButton.jsx";
import { notFound } from "next/navigation";

export default async function ListingDetail({ params }) {
  const { id } = await params;
  const result = await getListingById(id);

  if (!result.success) {
    if (result.error === "Listing not found" || result.error === "Invalid listing ID") {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600">Error loading listing: {result.error}</p>
            <Link href="/listings" className="text-blue-600 hover:underline mt-2 inline-block">
              ← Back to Listings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const listing = result.data;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/listings" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Listings
          </Link>

          <div className="flex gap-3">
            <Link
              href={`/listings/${listing.id}/edit`}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Edit Listing
            </Link>
            <DeleteListingButton listingId={listing.id} />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Photo Gallery */}
          {listing.photos && listing.photos.length > 0 && (
            <div className="relative">
              {listing.photos.length === 1 ? (
                <div className="relative h-96">
                  <Image
                    src={listing.photos[0]}
                    alt={listing.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="absolute inset-0 bg-gray-300 hidden items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1">
                  <div className="relative h-96">
                    <Image
                      src={listing.photos[0]}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {listing.photos.slice(1, 3).map((photo, index) => (
                      <div key={index} className="relative h-48">
                        <Image
                          src={photo}
                          alt={`${listing.title} - Photo ${index + 2}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                    {listing.photos.length > 3 && (
                      <div className="relative h-48 bg-gray-800 flex items-center justify-center">
                        <span className="text-white text-xl font-semibold">
                          +{listing.photos.length - 3} more
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
              {listing.location && (
                <p className="text-lg text-gray-600 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {listing.location}
                </p>
              )}
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">
                  {formatPrice(listing.price)}
                </div>
                <div className="text-sm text-gray-600">per month</div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{listing.numberOfRooms}</div>
                <div className="text-sm text-gray-600">
                  {listing.numberOfRooms === 1 ? "room" : "rooms"}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-lg font-semibold text-gray-700">
                  {listing.photos ? listing.photos.length : 0}
                </div>
                <div className="text-sm text-gray-600">
                  {listing.photos && listing.photos.length === 1 ? "photo" : "photos"}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {listing.description}
                </p>
              </div>
            </div>

            {/* All Photos */}
            {listing.photos && listing.photos.length > 3 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">All Photos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {listing.photos.map((photo, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={photo}
                        alt={`${listing.title} - Photo ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Listing Info */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <strong>Listed:</strong> {formatDate(listing.createdAt)}
                </div>
                <div>
                  <strong>Last Updated:</strong> {formatDate(listing.updatedAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
