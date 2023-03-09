import { useCallback, useState } from "react";

export default function useThrottled() {
  const [throttle, setThrottle] = useState(false);
  const handleThrottle = useCallback(
    (fetchApi: () => void) => {
      if (throttle) return;

      setThrottle(true);
      fetchApi();

      setTimeout(async () => {
        setThrottle(false);
      }, 4000);
    },
    [throttle]
  );

  return handleThrottle;
}
