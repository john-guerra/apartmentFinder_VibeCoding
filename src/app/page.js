import Link from "next/link";
import Image from "next/image";
import { getListings } from "./actions.js";

export default async function Home() {
  const result = await getListings({ limit: 3 }); // Get 3 recent listings for the homepage
  const recentListings = result.success ? result.data : [];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              Find Your Perfect Apartment
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Discover amazing apartments for rent. Browse listings, view photos, and find your next home with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/listings"
                className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Browse Listings
              </Link>
              <Link
                href="/listings/new"
                className="bg-blue-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors duration-200 border border-blue-500"
              >
                Add Your Listing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose ApartmentFinder?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make finding and listing apartments simple, fast, and reliable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Search</h3>
              <p className="text-gray-600">
                Find apartments that match your criteria with our intuitive search and filtering system.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rich Photos</h3>
              <p className="text-gray-600">
                View high-quality photos of apartments to get a real feel for your future home.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Landlord Friendly</h3>
              <p className="text-gray-600">
                List your properties easily and connect with qualified tenants looking for their next home.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Listings Section */}
      {recentListings.length > 0 && (
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recent Listings
              </h2>
              <p className="text-gray-600">
                Check out some of the latest apartment listings
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {recentListings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 bg-gray-200">
                    {listing.photos && listing.photos.length > 0 ? (
                      <Image
                        src={listing.photos[0]}
                        alt={listing.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`absolute inset-0 bg-gray-300 items-center justify-center ${listing.photos && listing.photos.length > 0 ? 'hidden' : 'flex'}`}>
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {listing.title}
                    </h3>
                    <p className="text-green-600 font-bold mb-2">
                      ${listing.price.toLocaleString()}/month
                    </p>
                    <p className="text-sm text-gray-600">
                      {listing.numberOfRooms} {listing.numberOfRooms === 1 ? 'room' : 'rooms'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link
                href="/listings"
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                View All Listings
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Next Home?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of renters and landlords who trust ApartmentFinder to connect them with perfect matches.
          </p>
          <Link
            href="/listings"
            className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Start Browsing Now
          </Link>
        </div>
      </div>
    </div>
  );
}
