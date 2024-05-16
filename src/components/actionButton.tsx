import React from "react";

type ActionButtonProps = {
  children: React.ReactNode;
  action: () => void;
  styles: string;
};

const ActionButton = ({ children, action, styles }: ActionButtonProps) => {
  return (
    <div onClick={action} className={`btn ${styles}`}>
      {children}
    </div>
  );
};

export default ActionButton;
