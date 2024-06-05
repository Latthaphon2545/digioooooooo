import React from "react";

type AlertDialogProps = {
  title: string;
  styles: string;
  icon?: React.ReactNode;
};

export default function AlertDialog({ title, styles, icon }: AlertDialogProps) {
  return (
    <div>
      <div role="alert" className={`alert ${styles}`}>
        {icon}
        <span>{title}</span>
      </div>
    </div>
  );
}
