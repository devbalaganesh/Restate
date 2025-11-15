import { Platform } from "react-native";
import {Account, Avatars, Client, OAuthProvider} from "react-native-appwrite"
import * as  Linking from 'expo-linking'
import { openAuthSessionAsync, WebBrowserResultType } from "expo-web-browser";
import { useId } from "react";

export const config={
    Platform:'com.bala.restate',
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform:process.env.EXPO_PUBLIC_APPWRITE_PLATFORM

}

export const client = new Client();
client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.Platform!)


    export const avatar = new Avatars(client);
    export const account = new Account(client)


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



