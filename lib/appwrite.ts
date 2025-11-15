import { Platform } from "react-native";
import {Account, Avatars, Client, Databases, OAuthProvider, Query} from "react-native-appwrite"
import * as  Linking from 'expo-linking'
import { openAuthSessionAsync, WebBrowserResultType } from "expo-web-browser";
import { useId } from "react";
import Properties from "@/app/(root)/properties/[id]";

export const config={
    Platform:'com.bala.restate',
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform:process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
    databaseId:process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionId:process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_ID,
    reviewsCollectionId:process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    agentsCollectionId:process.env.EXPO_PUBLIC_APPWRITE_AGENTS_ID,
    propertiesCollectionId:process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_ID

    

}

export const client = new Client();
client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)


    export const avatar = new Avatars(client);
    export const account = new Account(client)
    export const databases = new Databases(client)


    export async function login() {
  try {
    const redirectUri = Linking.createURL("/");

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!response) throw new Error("Create OAuth2 token failed");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    if (browserResult.type !== "success")
      throw new Error("Create OAuth2 token failed");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Create OAuth2 token failed");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
    export async function logout(){
        try{
            await account.deleteSessions()
            return true;
        }
        catch(error){
            console.error(error);
            return false;
        }
    }
function arrayBufferToBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach(b => binary += String.fromCharCode(b));
  return `data:image/png;base64,${btoa(binary)}`;
}


export async function getCurrentUser() {
  try {
    const response = await account.get();

    if (response.$id) {
     
      const buffer = await avatar.getInitials({
        name: response.name,
        background: "d4d4d4",
        width: 200,
        height: 200,
      });

      const avatarBase64 = arrayBufferToBase64(buffer);

      return {
        ...response,
        avatar: avatarBase64, 
      };
    }

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}


export async  function getLatestProperties(){
  try{
    const result = await databases.listDocuments(

      config.databaseId!,
      config.propertiesCollectionId!,
    [
    Query.orderDesc("$createdAt"),  
    Query.limit(5)
  ]
    )
    return result.documents;
  }
  catch(error){
    console.error(error)
  }
}
  

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    
    const buildQuery: any[] = [Query.orderDesc("$createdAt")];

    
    if (filter && filter !== "All") {
      buildQuery.push(Query.equal("type", filter));
    }

  
    if (query && query.trim() !== "") {
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );
    }

    
    if (limit) {
      buildQuery.push(Query.limit(limit));
    }

 
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery
    );

    return result.documents;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}
