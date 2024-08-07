import { ID } from "appwrite";
import { appwriteConfig, databases } from "./config";

export async function followUser(userId: string) {
  try {
    const userFollowed = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.followsCollectionId,
      ID.unique(),
      {
        user: userId,
      }
    );
    if (!userFollowed) throw Error;
    return userFollowed;
  } catch (error) {
    console.log(error);
  }
}

export async function unfollowUser(followedRecordId: string) {
    try {
      const statusCode = await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.followsCollectionId,
        followedRecordId
      );
      if (!statusCode) throw Error;
      return { status: "ok" };
    } catch (error) {
      console.log(error);
    }
  }
