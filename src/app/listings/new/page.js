"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ListingForm from "@/components/ListingForm.jsx";
import { createListing } from "@/app/actions.js";

export default function NewListing() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError("");
    
    try {
      const result = await createListing(formData);
      
      if (result.success) {
        setSuccess(true);
        // Redirect to the new listing after a short delay
        setTimeout(() => {
          router.push(`/listings/${result.data.id}`);
        }, 1500);
      } else {
        setError(result.error || "Failed to create listing");
      }
    } catch (error) {
      console.error("Error creating listing:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <svg className="mx-auto h-16 w-16 text-green-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Listing Created Successfully!</h2>
            <p className="text-green-600">Redirecting to your new listing...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Create New Listing</h1>
              <p className="text-gray-600 mt-2">
                Fill out the form below to add your apartment listing
              </p>
            </div>
            <Link
              href="/listings"
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Listings
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-red-800 font-medium">Error Creating Listing</h3>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <ListingForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitButtonText="Create Listing"
        />
      </div>
    </div>
  );
}