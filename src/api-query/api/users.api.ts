import { CreateUserDto, FetchUsersDto } from "../../backend/casaikos-api";
import { AxiosInstance } from "../../utils";

// Fetch all users
export const fetchUsers = async (options: FetchUsersDto) => {
  const response = await AxiosInstance.users.usersControllerFindAll(options);
  return response.data;
};

export const createUser = async (userData: CreateUserDto) => {
  const response =
    await AxiosInstance.users.usersControllerCreateUser(userData);
  return response.data;
};

// Update a user
export const updateUser = async (id: string, userData: CreateUserDto) => {
  const response = await AxiosInstance.users.usersControllerUpdate(
    id,
    userData
  );
  return response.data;
};

// Delete a user
export const deleteUser = async (userId: string) => {
  await AxiosInstance.users.usersControllerDeleteUser(userId);
};

export const fetchCompanyAdmin = async (companyId: string) => {
  const response =
    await AxiosInstance.users.usersControllerGetAdminForCompany(companyId);

  return response.data;
};
