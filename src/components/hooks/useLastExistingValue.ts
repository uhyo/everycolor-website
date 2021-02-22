import { useRef } from "react";

export function useLastExistingValue<T>(value: T | undefined): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  if (value !== undefined) {
    ref.current = value;
  }
  return ref.current;
}
