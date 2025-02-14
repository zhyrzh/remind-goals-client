import { FetchError } from "@/utils/error";

const useFetchRequest = (endpoint: string, method: string, body?: any) => {
  const userDetails = JSON.parse(localStorage.getItem("remind-goals-ath-tkn")!);
  const token = userDetails?.access_token ? userDetails?.access_token : "";
  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const BASE_URL = "https://remind-goals-api.onrender.com";

  const reqFn = async () => {
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

  return reqFn;
};

export default useFetchRequest;
