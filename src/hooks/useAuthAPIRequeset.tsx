import { MutationFunction } from "@tanstack/react-query";
import useFetchRequest from "./useFetchREquest";

export const useAuthAPIRequest = () => {
  const baseUrl = "http://localhost:5001/auth";

  const loginReq: MutationFunction<
    any,
    { username: string; password: string }
  > = async (values) => {
    return useFetchRequest(`${baseUrl}/login`, "POST", values)();
  };

  //   const signUpReq = () => {};

  return { loginReq };
};
