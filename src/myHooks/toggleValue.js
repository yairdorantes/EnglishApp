import { useState } from "react";

export function useToggleValue(initialState = false) {
  const [active, setActive] = useState(initialState);
  const handleValue = () => setActive(!active);
  const setFalse = () => setActive(false);
  const setTrue = () => setActive(true);
  return {
    active,
    handleValue,
    setTrue,
    setFalse,
  };
}
