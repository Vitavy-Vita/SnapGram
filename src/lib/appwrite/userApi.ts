import { Query } from "appwrite";
import { account, appwriteConfig, databases } from "./config";
import { InterfaceUpdateUser } from "@/types";
import { deleteFile, getFilePreview, uploadFile } from "./postApi";

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    console.log(currentAccount);
    if (!currentAccount) throw Error("No account found");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    console.log(currentUser);
    if (!currentUser) throw Error("User not found in collection");

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

export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );
    if (!user) throw Error;
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(user: InterfaceUpdateUser) {
  const hasFileToUpdate = user.file.length > 0;

  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };
    if (hasFileToUpdate) {
      //upload image to storage
      const uploadedFile = await uploadFile(user.file[0]);
      if (!uploadedFile) throw Error;
      const fileUrl = getFilePreview(uploadedFile.$id);

      if (!fileUrl) {
        deleteFile(uploadedFile.$id);
        throw Error;
      }
      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        username: user.username,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );
    if (!updatedUser) {
      await deleteFile(user.imageId);
      throw Error;
    }
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteUser(userId: string) {
  if (!userId) throw Error;
  try {
    await account.deleteSession(userId);
    return { status: "user deleted" };
  } catch (error) {
    console.log(error);
  }
}
