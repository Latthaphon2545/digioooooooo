"use client";

import { useFormStatus } from "react-dom";

type submitButtonProps = {
  children: React.ReactNode;
};

const SubmitButton = ({ children }: submitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="btn btn-primary px-5">
      {pending && <span className="loading loading-spinner"></span>}
      <p>{children}</p>
    </button>
  );
};

export default SubmitButton;
