"use client";
import React from "react";

type ActionButtonProps = {
  children: React.ReactNode;
  action: () => void;
  styles: string;
  disabled?: boolean;
};

const ActionButton = ({
  children,
  action,
  styles,
  disabled,
}: ActionButtonProps) => {
  return (
    <button disabled={disabled} onClick={action} className={`btn ${styles}`}>
      {children}
    </button>
  );
};

export default ActionButton;
