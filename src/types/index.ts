export type InterfaceContextType = {
  user: InterfaceUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<InterfaceUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export type InterfaceNavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type InterfaceUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  username: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type InterfaceNewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type InterfaceUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type InterfaceUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

export type InterfaceNewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};
