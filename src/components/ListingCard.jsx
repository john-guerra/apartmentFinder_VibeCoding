"use client";

import Link from "next/link";
import Image from "next/image";

export default function ListingCard({ listing }) {
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
      month: "short",
      day: "numeric",
    });
  };

  const firstPhoto = listing.photos && listing.photos.length > 0 ? listing.photos[0] : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Photo */}
      <div className="relative h-48 bg-gray-200">
        {firstPhoto ? (
          <Image
            src={firstPhoto}
            alt={listing.title}
            fill
            className="object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className={`absolute inset-0 bg-gray-300 flex items-center justify-center ${firstPhoto ? "hidden" : "flex"}`}
        >
          <svg
            className="w-12 h-12 text-gray-400"
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

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          <Link href={`/listings/${listing.id}`} className="hover:text-blue-600">
            {listing.title}
          </Link>
        </h3>

        {/* Location */}
        {listing.location && (
          <p className="text-sm text-gray-600 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Description */}
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{listing.description}</p>

        {/* Price and Rooms */}
        <div className="flex justify-between items-center mb-3">
          <div className="text-xl font-bold text-green-600">
            {formatPrice(listing.price)}
            <span className="text-sm font-normal text-gray-500">/month</span>
          </div>
          <div className="text-sm text-gray-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5v4m8-4v4" />
            </svg>
            {listing.numberOfRooms} {listing.numberOfRooms === 1 ? "room" : "rooms"}
          </div>
        </div>

        {/* Posted Date */}
        <div className="text-xs text-gray-500 border-t pt-2">
          Posted {formatDate(listing.createdAt)}
        </div>
      </div>
    </div>
  );
}
