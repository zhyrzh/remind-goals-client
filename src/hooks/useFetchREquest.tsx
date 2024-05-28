import { FetchError } from "@/utils/error";

const useFetchRequest = (url: string, method: string, body?: any) => {
  const userDetails = JSON.parse(localStorage.getItem("remind-goals-ath-tkn")!);
  const token = userDetails?.access_token ? userDetails?.access_token : "";
  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const reqFn = async () => {
    const res = await fetch(url, {
      headers,
      method,
      body: body !== undefined ? JSON.stringify(body) : undefined,
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
