import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();

  if (isGetLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>Failed to load user</div>;
  }

  return (
    <div>
      <UserProfileForm onSave={updateUser} isLoading={isUpdateLoading} currentUser={currentUser} />
    </div>
  );
};

export default UserProfilePage;
