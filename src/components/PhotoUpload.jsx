"use client";

import { useState, useRef } from "react";

export default function PhotoUpload({ photos, onPhotosChange, maxPhotos = 10 }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check if adding these files would exceed the limit
    if (photos.length + files.length > maxPhotos) {
      setUploadError(`Maximum ${maxPhotos} photos allowed`);
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Upload failed');
        }

        return result.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newPhotos = [...photos, ...uploadedUrls];
      onPhotosChange(newPhotos);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Failed to upload photos');
    } finally {
      setIsUploading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handlePhotoUrlChange = (index, url) => {
    const newPhotos = [...photos];
    // Extend array if necessary
    while (newPhotos.length <= index) {
      newPhotos.push("");
    }
    newPhotos[index] = url;
    onPhotosChange(newPhotos);
  };

  const addPhotoUrlField = () => {
    if (photos.length < maxPhotos) {
      onPhotosChange([...photos, ""]);
    }
  };

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  return (
    <div className="space-y-4">
      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="mt-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || photos.length >= maxPhotos}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Uploading...' : 'Upload Photos'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            PNG, JPG, WebP up to 5MB each (max {maxPhotos} photos)
          </p>
        </div>
      </div>

      {/* Upload Error */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-600 text-sm">{uploadError}</p>
        </div>
      )}

      {/* Photo URLs Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Photo URLs
        </label>
        <div className="space-y-2">
          {photos.map((photo, index) => (
            <div key={index} className="flex gap-2 items-start">
              <div className="flex-1">
                <input
                  type="url"
                  value={photo}
                  onChange={(e) => handlePhotoUrlChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg or upload an image above"
                />
                {photo && (
                  <div className="mt-2">
                    <img
                      src={photo}
                      alt={`Preview ${index + 1}`}
                      className="h-20 w-20 object-cover rounded-md border"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden h-20 w-20 bg-gray-200 rounded-md border flex items-center justify-center">
                      <span className="text-xs text-gray-500">Invalid URL</span>
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="px-3 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 flex-shrink-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        
        {photos.length < maxPhotos && (
          <button
            type="button"
            onClick={addPhotoUrlField}
            className="mt-2 px-4 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
          >
            + Add Photo URL
          </button>
        )}
        
        <p className="mt-1 text-sm text-gray-500">
          {photos.length}/{maxPhotos} photos added
        </p>
      </div>
    </div>
  );
}