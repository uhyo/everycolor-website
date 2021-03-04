import { useCallback, useState } from "react";

export function useCounter() {
  const [state, setState] = useState(0);
  const increment = useCallback(() => {
    setState((c) => c + 1);
  }, []);
  return [state, increment] as const;
}
