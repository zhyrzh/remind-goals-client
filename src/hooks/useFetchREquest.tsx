import { FetchError } from "@/utils/error";

const useFetchRequest = () => {
  const reqFn = async (endpoint: string, method: string, body?: any) => {
    const userDetails = JSON.parse(
      localStorage.getItem("remind-goals-ath-tkn")!
    );
    const token = userDetails?.access_token ? userDetails?.access_token : "";
    const headers: HeadersInit = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers,
      method,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      credentials: "include",
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
  };

  const get = (endpoint: string) => {
    return reqFn(endpoint, "GET");
  };

  const del = (endpoint: string) => {
    return reqFn(endpoint, "DELETE");
  };

  const post = (endpoint: string, body?: any) => {
    return reqFn(endpoint, "POST", body);
  };

  const put = (endpoint: string, body?: any) => {
    return reqFn(endpoint, "PUT", body);
  };

  return { get, del, post, put };
};

export default useFetchRequest;
