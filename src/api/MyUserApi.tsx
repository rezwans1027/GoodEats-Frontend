import { useThrottle } from "@/hooks";
import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface CreateUserRequest {
  auth0id: string;
  email: string;
}

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyUserRequest = async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get user");
    }
    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    isError,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest, { staleTime: 1000 * 60 * 5 });

  if (isError) {
    // @ts-expect-error error is unknown
    toast.error(error.toString());
  }

  return { currentUser, isLoading, isError };
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyUserRequest = async (user: CreateUserRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return { createUser, isLoading, isError, isSuccess };
};

interface UpdateUserRequest {
  name: string;
  addressLine1: string;
  country: string;
  city: string;
}

export const useUpdateMyUser = () => {
  const throttleToast = useThrottle(() => toast.success("User updated successfully"), 3000);
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const updateMyUserRequest = async (formdata: UpdateUserRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isError,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchCurrentUser");
    },
  });

  if (isSuccess) {
    throttleToast();
  }

  if (isError) {
    // @ts-expect-error error is unknown
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading, isError, isSuccess, error, reset };
};
