"use server";

import client from "@/lib/mongodb.js";
import { validateListing, sanitizeListing } from "@/lib/listingModel.js";
import { ObjectId } from "mongodb";

const DB_NAME = "apartmentFinder";
const COLLECTION_NAME = "listings";

export async function testDatabaseConnection() {
  const isConnected = false;
  try {
    const mongoClient = await client.connect();
    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ ping: 1 });
    console.warn("Pinged your deployment. You successfully connected to MongoDB!"); // because this is a server action, the console.log will be outputted to your terminal not in the browser
    return !isConnected;
  } catch (e) {
    console.error(e);
    return isConnected;
  }
}

/**
 * Create a new apartment listing
 * @param {FormData} formData - Form data from the listing form
 * @returns {Object} { success: boolean, data?: object, error?: string }
 */
export async function createListing(formData) {
  try {
    // Convert FormData to object
    const rawListing = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      numberOfRooms: formData.get("numberOfRooms"),
      location: formData.get("location"),
      photos: formData.getAll("photos").filter((photo) => photo && photo.trim() !== ""),
    };

    // Validate the listing data
    const validation = validateListing(rawListing);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors.join(", "),
      };
    }

    // Sanitize the data
    const sanitizedListing = sanitizeListing(rawListing);

    // Insert into database
    const mongoClient = await client.connect();
    const db = mongoClient.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.insertOne(sanitizedListing);

    return {
      success: true,
      data: {
        id: result.insertedId.toString(),
        ...sanitizedListing,
      },
    };
  } catch (error) {
    console.error("Error creating listing:", error);
    return {
      success: false,
      error: "Failed to create listing. Please try again.",
    };
  }
}

/**
 * Get all apartment listings
 * @param {Object} options - Query options
 * @returns {Object} { success: boolean, data?: array, error?: string }
 */
export async function getListings(options = {}) {
  try {
    const mongoClient = await client.connect();
    const db = mongoClient.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const { limit = 50, skip = 0, sortBy = "createdAt", sortOrder = -1 } = options;

    const listings = await collection
      .find({})
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Convert ObjectId to string for client-side usage
    const formattedListings = listings.map((listing) => ({
      ...listing,
      id: listing._id.toString(),
      _id: listing._id.toString(),
    }));

    return {
      success: true,
      data: formattedListings,
    };
  } catch (error) {
    console.error("Error fetching listings:", error);
    return {
      success: false,
      error: "Failed to fetch listings. Please try again.",
    };
  }
}

/**
 * Get a single listing by ID
 * @param {string} id - Listing ID
 * @returns {Object} { success: boolean, data?: object, error?: string }
 */
export async function getListingById(id) {
  try {
    if (!ObjectId.isValid(id)) {
      return {
        success: false,
        error: "Invalid listing ID",
      };
    }

    const mongoClient = await client.connect();
    const db = mongoClient.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const listing = await collection.findOne({ _id: new ObjectId(id) });

    if (!listing) {
      return {
        success: false,
        error: "Listing not found",
      };
    }

    return {
      success: true,
      data: {
        ...listing,
        id: listing._id.toString(),
        _id: listing._id.toString(),
      },
    };
  } catch (error) {
    console.error("Error fetching listing:", error);
    return {
      success: false,
      error: "Failed to fetch listing. Please try again.",
    };
  }
}

/**
 * Update an existing listing
 * @param {string} id - Listing ID
 * @param {FormData} formData - Updated form data
 * @returns {Object} { success: boolean, data?: object, error?: string }
 */
export async function updateListing(id, formData) {
  try {
    if (!ObjectId.isValid(id)) {
      return {
        success: false,
        error: "Invalid listing ID",
      };
    }

    // Convert FormData to object
    const rawListing = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      numberOfRooms: formData.get("numberOfRooms"),
      location: formData.get("location"),
      photos: formData.getAll("photos").filter((photo) => photo && photo.trim() !== ""),
    };

    // Validate the listing data
    const validation = validateListing(rawListing);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors.join(", "),
      };
    }

    // Sanitize the data (preserve original createdAt)
    const sanitizedListing = sanitizeListing(rawListing);
    delete sanitizedListing.createdAt; // Don't overwrite creation date

    const mongoClient = await client.connect();
    const db = mongoClient.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: sanitizedListing }
    );

    if (result.matchedCount === 0) {
      return {
        success: false,
        error: "Listing not found",
      };
    }

    // Fetch the updated listing
    const updatedListing = await collection.findOne({ _id: new ObjectId(id) });

    return {
      success: true,
      data: {
        ...updatedListing,
        id: updatedListing._id.toString(),
        _id: updatedListing._id.toString(),
      },
    };
  } catch (error) {
    console.error("Error updating listing:", error);
    return {
      success: false,
      error: "Failed to update listing. Please try again.",
    };
  }
}

/**
 * Delete a listing
 * @param {string} id - Listing ID
 * @returns {Object} { success: boolean, error?: string }
 */
export async function deleteListing(id) {
  try {
    if (!ObjectId.isValid(id)) {
      return {
        success: false,
        error: "Invalid listing ID",
      };
    }

    const mongoClient = await client.connect();
    const db = mongoClient.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return {
        success: false,
        error: "Listing not found",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting listing:", error);
    return {
      success: false,
      error: "Failed to delete listing. Please try again.",
    };
  }
}
