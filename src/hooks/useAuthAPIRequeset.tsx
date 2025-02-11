import { MutationFunction } from "@tanstack/react-query";
import useFetchRequest from "./useFetchREquest";

export const useAuthAPIRequest = () => {
  const loginReq: MutationFunction<
    any,
    { username: string; password: string }
  > = async (values) => {
    return useFetchRequest(`/auth/login`, "POST", values)();
  };

  const signUpReq: MutationFunction<
    any,
    { email: string; password: string }
  > = async (values) => {
    return useFetchRequest(`/auth/register`, "POST", values)();
  };

  const setupProfileReq: MutationFunction<
    any,
    { firstName: string; lastName: string }
  > = async (values) => {
    return useFetchRequest(`/users/setup-profile`, "POST", values)();
  };

  return { loginReq, signUpReq, setupProfileReq };
};
