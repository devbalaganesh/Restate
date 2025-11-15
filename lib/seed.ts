import { ID } from "react-native-appwrite";
import { databases, config } from "./appwrite";
import {
  agentImages,
  galleryImages,
  propertiesImages,
  reviewImages,
} from "./data";

const COLLECTIONS = {
  AGENT: config.agentsCollectionId,
  REVIEWS: config.reviewsCollectionId,
  GALLERY: config.galleriesCollectionId,
  PROPERTY: config.propertiesCollectionId,
};

const propertyTypes = [
  "House",
  "Villa",
  "Townhomes",
  "Condos",
  "Studios",
  "Duplexes",
  "Apartments",
  "others",      
];


const facilities = [
  "Laundary",     
  "Wifi",
  "Parking",
  "Playground",
  "Cutlery",
  "Gym",
  "SwimmingPool",
  "Hospital",
];

function getRandomSubset<T>(
  array: T[],
  minItems: number,
  maxItems: number
): T[] {
  const subsetSize =
    Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;

  const arrayCopy = [...array];

  // Shuffle using Fisher-Yates
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[i],
    ];
  }

  return arrayCopy.slice(0, subsetSize);
}

async function seed() {
  try {
    console.log("Deleting previous data...");

    // SAFE DELETE ORDER (fixes missing ID errors)
    const deleteOrder = [
      COLLECTIONS.PROPERTY,
      COLLECTIONS.GALLERY,
      COLLECTIONS.REVIEWS,
      COLLECTIONS.AGENT,
    ];

    for (const collectionId of deleteOrder) {
      if (!collectionId) continue;

      const docs = await databases.listDocuments(
        config.databaseId!,
        collectionId
      );

      for (const doc of docs.documents) {
        await databases.deleteDocument(
          config.databaseId!,
          collectionId,
          doc.$id
        );
      }

      console.log(`Deleted ${docs.documents.length} from ${collectionId}`);
    }

    console.log("Cleared all existing data.");

    // ----------------------------
    // SEED AGENTS
    // ----------------------------
    const agents = [];
    for (let i = 1; i <= 5; i++) {
      const agent = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.AGENT!,
        ID.unique(),
        {
          name: `Agent ${i}`,
          email: `agent${i}@example.com`,
          avatar: agentImages[Math.floor(Math.random() * agentImages.length)],
        }
      );
      agents.push(agent);
    }
    console.log(`Seeded ${agents.length} agents.`);

    // ----------------------------
    // SEED REVIEWS
    // ----------------------------
    const reviews = [];
    for (let i = 1; i <= 20; i++) {
      const review = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.REVIEWS!,
        ID.unique(),
        {
          name: `Reviewer ${i}`,
          avatar: reviewImages[Math.floor(Math.random() * reviewImages.length)],
          review: `This is a review by Reviewer ${i}.`,
          rating: Math.floor(Math.random() * 5) + 1,
        }
      );
      reviews.push(review);
    }
    console.log(`Seeded ${reviews.length} reviews.`);

    // ----------------------------
    // SEED GALLERIES
    // ----------------------------
    const galleries = [];
    for (const image of galleryImages) {
      const gallery = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.GALLERY!,
        ID.unique(),
        {
          image, // Appwrite schema must have image:string
        }
      );
      galleries.push(gallery);
    }
    console.log(`Seeded ${galleries.length} galleries.`);

    // ----------------------------
    // SEED PROPERTIES
    // ----------------------------
    for (let i = 1; i <= 20; i++) {
      const assignedAgent = agents[Math.floor(Math.random() * agents.length)];
      const assignedReviews = getRandomSubset(reviews, 5, 7);
      const assignedGalleries = getRandomSubset(galleries, 3, 8);

      const selectedFacilities = getRandomSubset(facilities, 3, 6);

      const image =
        propertiesImages.length - 1 >= i
          ? propertiesImages[i]
          : propertiesImages[
              Math.floor(Math.random() * propertiesImages.length)
            ];

      const property = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.PROPERTY!,
        ID.unique(),
        {
          name: `Property ${i}`,
          type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
          description: `This is the description for Property ${i}.`,
          address: `123 Property Street, City ${i}`,
          geolocation: `192.168.1.${i}, 192.168.1.${i}`,
          price: Math.floor(Math.random() * 9000) + 1000,
          area: Math.floor(Math.random() * 3000) + 500,
          bedrooms: Math.floor(Math.random() * 5) + 1,
          bathrooms: Math.floor(Math.random() * 5) + 1,
          rating: Math.floor(Math.random() * 5) + 1,

          facilities: selectedFacilities,
          image: image, // must be string attribute
          agent: assignedAgent.$id, // must exist in schema
          reviews: assignedReviews.map((review) => review.$id),
          gallery: assignedGalleries.map((gallery) => gallery.$id),

          url: `https://example.com/property-${i}`,
        }
      );

      console.log(`Seeded property: ${property.name}`);
    }

    console.log("🎉 Data seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

export default seed;
