import { useCallback, useState } from "react";

export default function useErrors() {
  const [hasError, setHasError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const showError = useCallback(() => {
    setHasError(true);
  }, []);
  const setText = useCallback((message: string) => setErrorText(message), []);

  const closeError = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
      setHasError(false);
      setErrorText("");
    },
    []
  );
  return {
    hasError,
    errorText,
    showError,
    setText,
    closeError,
  };
}
