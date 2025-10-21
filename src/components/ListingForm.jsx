"use client";

import { useState } from "react";
import { LISTING_CONSTRAINTS } from "@/lib/listingModel.js";
import PhotoUpload from "./PhotoUpload.jsx";

export default function ListingForm({ 
  initialData = {}, 
  onSubmit, 
  isLoading = false, 
  submitButtonText = "Save Listing" 
}) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    price: initialData.price || "",
    numberOfRooms: initialData.numberOfRooms || "",
    location: initialData.location || "",
    photos: initialData.photos || []
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handlePhotosChange = (newPhotos) => {
    setFormData(prev => ({
      ...prev,
      photos: newPhotos
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < LISTING_CONSTRAINTS.title.minLength) {
      newErrors.title = `Title must be at least ${LISTING_CONSTRAINTS.title.minLength} characters`;
    } else if (formData.title.length > LISTING_CONSTRAINTS.title.maxLength) {
      newErrors.title = `Title must be no more than ${LISTING_CONSTRAINTS.title.maxLength} characters`;
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < LISTING_CONSTRAINTS.description.minLength) {
      newErrors.description = `Description must be at least ${LISTING_CONSTRAINTS.description.minLength} characters`;
    } else if (formData.description.length > LISTING_CONSTRAINTS.description.maxLength) {
      newErrors.description = `Description must be no more than ${LISTING_CONSTRAINTS.description.maxLength} characters`;
    }

    // Price validation
    if (!formData.price) {
      newErrors.price = "Price is required";
    } else {
      const price = Number(formData.price);
      if (isNaN(price) || price < 0) {
        newErrors.price = "Price must be a valid positive number";
      } else if (price > LISTING_CONSTRAINTS.price.max) {
        newErrors.price = `Price must be no more than $${LISTING_CONSTRAINTS.price.max}`;
      }
    }

    // Number of rooms validation
    if (!formData.numberOfRooms) {
      newErrors.numberOfRooms = "Number of rooms is required";
    } else {
      const rooms = Number(formData.numberOfRooms);
      if (!Number.isInteger(rooms) || rooms < LISTING_CONSTRAINTS.numberOfRooms.min) {
        newErrors.numberOfRooms = `Number of rooms must be at least ${LISTING_CONSTRAINTS.numberOfRooms.min}`;
      } else if (rooms > LISTING_CONSTRAINTS.numberOfRooms.max) {
        newErrors.numberOfRooms = `Number of rooms must be no more than ${LISTING_CONSTRAINTS.numberOfRooms.max}`;
      }
    }

    // Location validation (optional)
    if (formData.location && formData.location.length > LISTING_CONSTRAINTS.location.maxLength) {
      newErrors.location = `Location must be no more than ${LISTING_CONSTRAINTS.location.maxLength} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Create FormData object for server action
    const submitData = new FormData();
    submitData.append("title", formData.title.trim());
    submitData.append("description", formData.description.trim());
    submitData.append("price", formData.price);
    submitData.append("numberOfRooms", formData.numberOfRooms);
    submitData.append("location", formData.location.trim());
    
    // Add photos (filter out empty URLs)
    formData.photos.forEach(photo => {
      if (photo && photo.trim()) {
        submitData.append("photos", photo.trim());
      }
    });

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Beautiful 2-bedroom apartment in downtown"
            maxLength={LISTING_CONSTRAINTS.title.maxLength}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          <p className="mt-1 text-sm text-gray-500">
            {formData.title.length}/{LISTING_CONSTRAINTS.title.maxLength} characters
          </p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Describe the apartment, amenities, neighborhood, etc."
            maxLength={LISTING_CONSTRAINTS.description.maxLength}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          <p className="mt-1 text-sm text-gray-500">
            {formData.description.length}/{LISTING_CONSTRAINTS.description.maxLength} characters
          </p>
        </div>

        {/* Price and Rooms Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price ($/month) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              max={LISTING_CONSTRAINTS.price.max}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="1200"
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
          </div>

          {/* Number of Rooms */}
          <div>
            <label htmlFor="numberOfRooms" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Rooms *
            </label>
            <input
              type="number"
              id="numberOfRooms"
              name="numberOfRooms"
              value={formData.numberOfRooms}
              onChange={handleInputChange}
              min={LISTING_CONSTRAINTS.numberOfRooms.min}
              max={LISTING_CONSTRAINTS.numberOfRooms.max}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.numberOfRooms ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="2"
            />
            {errors.numberOfRooms && <p className="mt-1 text-sm text-red-600">{errors.numberOfRooms}</p>}
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Downtown, Main Street, 12345"
            maxLength={LISTING_CONSTRAINTS.location.maxLength}
          />
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
        </div>

        {/* Photos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photos
          </label>
          <PhotoUpload
            photos={formData.photos}
            onPhotosChange={handlePhotosChange}
            maxPhotos={LISTING_CONSTRAINTS.photos.maxCount}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Saving..." : submitButtonText}
          </button>
        </div>
      </div>
    </form>
  );
}