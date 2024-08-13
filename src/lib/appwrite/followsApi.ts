import { ID } from "appwrite";
import { appwriteConfig, databases } from "./config";

export async function followUser(followId: string, userId: string) {
  try {
    console.log("Follow ID:", followId);
    console.log("User ID:", userId);
    const userFollowed = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.followsCollectionId,
      ID.unique(),
      {
        follower: userId,
        followed: followId,
      }
    );
    if (!userFollowed) throw Error;
    return userFollowed;
  } catch (error) {
    console.log(error);
  }
}

export async function unfollowUser(followedRecordId: string) {
  console.log(followedRecordId);
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
