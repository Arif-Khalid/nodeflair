import { useEffect } from "react";

export default function useResize(handleResize) {
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);
}
