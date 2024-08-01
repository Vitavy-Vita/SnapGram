import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FileUploader from "../shared/FileUploader";
import { UserValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import {
  // useDeleteUser,
  useUpdateUser,
} from "@/lib/react-query/queriesAndMutations";
import { InterfaceUser } from "@/types";
// import { ToastAction } from "@radix-ui/react-toast";

type UserFormProps = {
  userToUpdate?: Models.Document;
};

const UserForm = ({ userToUpdate }: UserFormProps) => {
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } =
    useUpdateUser();
  // const { mutateAsync: deleteUser } = useDeleteUser();
  // , setIsAuthenticated 
  const { user, setUser} = useUserContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      name: userToUpdate ? userToUpdate?.name : "",
      bio: userToUpdate ? userToUpdate?.bio : "",
      username: userToUpdate ? userToUpdate?.username : "",
      file: [],
    },
  });
  async function onSubmit(values: z.infer<typeof UserValidation>) {
    if (userToUpdate) {
      const updatedUserDoc = await updateUser({
        ...values,
        userId: userToUpdate.$id,
        imageId: userToUpdate?.imageId,
        imageUrl: userToUpdate?.imageUrl,
      });

      if (updatedUserDoc) {
        const updatedUser: InterfaceUser = {
          id: updatedUserDoc.$id,
          name: updatedUserDoc.name,
          username: updatedUserDoc.username,
          bio: updatedUserDoc.bio,
          email: updatedUserDoc.email,
          imageUrl: updatedUserDoc.imageUrl,
        };
        setUser(updatedUser);
        navigate(`/profile/${user.id}`);
      } else {
        toast({ title: "Please try again" });
        navigate("/");
      }
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                              WORK IN PROGRESS                              */
  /* -------------------------------------------------------------------------- */
  // async function handleDeleteAccount() {
  //   if (userToUpdate) {
  //     const userDeleted = await deleteUser({
  //       userId: userToUpdate.$id,
  //     });
  //     if (userDeleted) {
  //       setIsAuthenticated(false);
  //       navigate("/sign-in");
  //     } else {
  //       toast({ title: "please try again" });
  //     }
  //   }
  // }
  // const showToast = () => {
  //   toast({
  //     title: "Are you sure you want to delete your account ?",
  //     description: "This action cannot be undone.",
  //     action: (
  //       <ToastAction altText="Confirm" onClick={handleDeleteAccount}>
  //         Confirm
  //       </ToastAction>
  //     ),
  //   });
  // };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input {...field} className="shad-input" />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Username</FormLabel>
              <FormControl>
                <Input {...field} className="shad-input" />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={userToUpdate?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Bio</FormLabel>
              <FormControl>
                <Input {...field} className="shad-input" />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingUpdate}
          >
            {isLoadingUpdate && "Loading..."}
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
