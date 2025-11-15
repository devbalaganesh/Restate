REAL ESTATE MOBILE APP
A modern real-estate marketplace built with React Native, Expo, and Appwrite.

---------------------------------------------------------
OVERVIEW
---------------------------------------------------------

This mobile app allows users to:

• Browse properties for rent and sale
• Apply filters (type, location, price)
• Search properties by name, address, type
• View featured and recommended listings
• View full property details
• Log in using Google or Email
• List their own properties for rent or sale
• Save properties to favorites

---------------------------------------------------------
FEATURES
---------------------------------------------------------

USER FEATURES
• Google login
• Email/Password login
• View profile with avatar
• Manage personal property listings
• Save properties to favorites

PROPERTY FEATURES
• Browse featured properties
• Browse latest recommendations
• Search properties
• Filter by property type:
  • House
  • Apartment
  • Villa
  • Studio
  • Townhomes
  • Condos
  • Others
• View property details:
  • Price
  • Size
  • Type
  • Facilities
  • Reviews
  • Image gallery
  • Agent details

ADMIN FEATURES (optional)
• Approve new listings
• Remove invalid or spam listings
• Manage all users and properties

---------------------------------------------------------
TECH STACK
---------------------------------------------------------

FRONTEND
• React Native
• Expo
• TypeScript
• NativeWind (Tailwind for RN)
• Expo Router

BACKEND
• Appwrite Cloud

STATE MANAGEMENT
• React Context API

DATA FETCHING
• Custom useAppwrite hook

---------------------------------------------------------
PROJECT STRUCTURE
---------------------------------------------------------

.
app/
app/_layout.tsx
app/(root)/
app/auth/

components/
components/cards/
components/Filters/
components/Search/

constants/
constants/images.ts
constants/icons.ts

lib/
lib/appwrite.ts
lib/global-provider.tsx
lib/useAppwrite.ts
lib/seed.ts

types/
types/property.ts

assets/

.env
.gitignore
package.json
README.md

---------------------------------------------------------
ENVIRONMENT VARIABLES
---------------------------------------------------------

Create a .env file with:

EXPO_PUBLIC_APPWRITE_ENDPOINT=
EXPO_PUBLIC_APPWRITE_PROJECT_ID=
EXPO_PUBLIC_APPWRITE_PLATFORM=
EXPO_PUBLIC_APPWRITE_DATABASE_ID=

EXPO_PUBLIC_APPWRITE_PROPERTIES_ID=
EXPO_PUBLIC_APPWRITE_GALLERIES_ID=
EXPO_PUBLIC_APPWRITE_REVIEWS_ID=
EXPO_PUBLIC_APPWRITE_AGENTS_ID=

---------------------------------------------------------
SETUP INSTRUCTIONS
---------------------------------------------------------

1. Clone the repo:

git clone https://github.com/your-username/real-estate-app.git
cd real-estate-app

2. Install dependencies:

npm install

3. Start Expo:

npx expo start

Scan the QR code using Expo Go.

---------------------------------------------------------
APPWRITE SETUP
---------------------------------------------------------

REQUIRED COLLECTIONS:
properties
agents
reviews
galleries

PROPERTIES COLLECTION FIELDS:
name (string)
price (number)
address (string)
image (string)
rating (number)
type (enum)
facilities (array)
agent (relationship)
reviews (relationship array)
gallery (relationship array)
url (string)

AGENTS COLLECTION FIELDS:
name
email
avatar

REVIEWS COLLECTION FIELDS:
name
avatar
review
rating

GALLERIES COLLECTION FIELDS:
image

---------------------------------------------------------
SEEDING DATA
---------------------------------------------------------

To seed demo data:
Add a button in your UI:

<Button title="seed" onPress={seed} />

This clears collections and inserts:
• 5 agents
• 20 reviews
• 10 gallery images
• 20 sample properties

---------------------------------------------------------
API FUNCTIONS (lib/appwrite.ts)
---------------------------------------------------------

getCurrentUser()
getLatestProperties()
getProperties()
login()    // Google OAuth
logout()

---------------------------------------------------------
useAppwrite HOOK
---------------------------------------------------------

Usage:

const { data, loading, refetch } = useAppwrite({
  fn: getProperties,
  params: { filter, query, limit: 6 },
});

---------------------------------------------------------
SCREENS
---------------------------------------------------------

HOME SCREEN
• Featured properties (horizontal list)
• Recommended properties (horizontal list)
• Category filters
• Search bar
• Property grid list

PROPERTY DETAILS SCREEN
• Image gallery
• Full description
• Property facilities
• Agent details
• Reviews

---------------------------------------------------------
AUTHENTICATION
---------------------------------------------------------

Uses Appwrite OAuth for Google login:

account.createOAuth2Token(OAuthProvider.Google, redirectUrl)

Session stored locally.

---------------------------------------------------------
BUILDING FOR PRODUCTION
---------------------------------------------------------

Android:
eas build --platform android

iOS:
eas build --platform ios

---------------------------------------------------------
CONTRIBUTING
---------------------------------------------------------

To contribute:
• Create a branch
• Commit your changes
• Open a pull request
• Wait for review

---------------------------------------------------------
LICENSE
---------------------------------------------------------

MIT License © 2025 Bala Ganesh
