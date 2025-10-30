"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ListingForm from "@/components/ListingForm.jsx";
import { updateListing, getListingById } from "@/app/actions.js";

export default function EditListing({ params }) {
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState(null);

  // Resolve params
  useEffect(() => {
    Promise.resolve(params).then(setResolvedParams);
  }, [params]);

  // Load listing data
  useEffect(() => {
    if (!resolvedParams?.id) return;

    const loadListing = async () => {
      setIsLoadingData(true);
      try {
        const result = await getListingById(resolvedParams.id);

        if (result.success) {
          setListing(result.data);
        } else {
          setError(result.error || "Failed to load listing");
        }
      } catch (error) {
        console.error("Error loading listing:", error);
        setError("An unexpected error occurred while loading the listing.");
      } finally {
        setIsLoadingData(false);
      }
    };

    loadListing();
  }, [resolvedParams]);

  const handleSubmit = async (formData) => {
    if (!resolvedParams?.id) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await updateListing(resolvedParams.id, formData);

      if (result.success) {
        setSuccess(true);
        // Redirect to the updated listing after a short delay
        setTimeout(() => {
          router.push(`/listings/${resolvedParams.id}`);
        }, 1500);
      } else {
        setError(result.error || "Failed to update listing");
      }
    } catch (error) {
      console.error("Error updating listing:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isLoadingData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading listing...</p>
        </div>
      </div>
    );
  }

  // Error loading listing
  if (error && !listing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600">Error: {error}</p>
            <Link href="/listings" className="text-blue-600 hover:underline mt-2 inline-block">
              ← Back to Listings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <svg
              className="mx-auto h-16 w-16 text-green-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Listing Updated Successfully!
            </h2>
            <p className="text-green-600">Redirecting to your updated listing...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Listing</h1>
              <p className="text-gray-600 mt-2">Update your apartment listing information</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/listings/${resolvedParams?.id || ""}`}
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Listing
              </Link>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <svg
                className="w-5 h-5 text-red-400 mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="text-red-800 font-medium">Error Updating Listing</h3>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        {listing && (
          <ListingForm
            initialData={listing}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitButtonText="Update Listing"
          />
        )}
      </div>
    </div>
  );
}
