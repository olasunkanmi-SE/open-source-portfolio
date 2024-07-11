import { useEffect, useState } from "react";

interface IValidationError {
  isSubmitting: boolean;
  error: string;
}

export const ValidationMessage = ({
  error,
  isSubmitting,
}: IValidationError) => {
  const [show, setShow] = useState(!!error);

  useEffect(() => {
    const id = setTimeout(() => {
      const hasError = !!error;
      setShow(hasError && !isSubmitting);
    });
    return () => clearTimeout(id);
  }, [error, isSubmitting]);

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        height: show ? "1em" : 0,
        color: "red",
        transition: "all 300ms ease-in-out",
        marginTop: "5px",
      }}
    >
      {error}
    </div>
  );
};
