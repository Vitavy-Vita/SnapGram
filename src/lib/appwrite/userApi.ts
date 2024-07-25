import { Query } from "appwrite";
import { account, appwriteConfig, databases } from "./config";

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}
export async function getAllUsers() {
  try {
    const allUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.orderDesc("name"), Query.limit(10)]
    );
    if (!allUser) throw Error;
    return allUser;
  } catch (error) {
    console.log(error);
  }
}
