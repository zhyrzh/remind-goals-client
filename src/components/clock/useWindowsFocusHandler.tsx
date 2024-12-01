import { useCallback, useEffect, useState } from "react";

const useWindowsFocusHandler = () => {
  const [isFocused, setIsFocused] = useState<boolean>(true);

  // User has switched back to the tab
  const handleVisibilityChange = useCallback(() => {
    setIsFocused(document.visibilityState === "visible");
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isFocused;
};

export default useWindowsFocusHandler;
