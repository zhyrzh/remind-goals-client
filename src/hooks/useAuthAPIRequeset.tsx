import { MutationFunction } from "@tanstack/react-query";
import useFetchRequest from "./useFetchREquest";

export const useAuthAPIRequest = () => {
  const { post } = useFetchRequest();

  const loginReq: MutationFunction<
    any,
    { username: string; password: string }
  > = async (values) => post(`/auth/login`, values);

  const signUpReq: MutationFunction<
    any,
    { email: string; password: string }
  > = async (values) => post(`/auth/register`, values);

  const setupProfileReq: MutationFunction<
    any,
    { firstName: string; lastName: string }
  > = async (values) => post(`/users/setup-profile`, values);

  return { loginReq, signUpReq, setupProfileReq };
};
