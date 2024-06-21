"use client";

export const showAlert = (
  title: string,
  styles: string,
  setAlertTitle: (value: string) => void,
  setAlertStyles: (value: string) => void,
  setAlertIcon: (value: React.ReactNode) => void,
  setUpdateAlert: (value: boolean) => void,
  icon?: React.ReactNode
) => {
  setAlertTitle(title);
  setAlertStyles(styles);
  setAlertIcon(icon);
  setTimeout(() => setUpdateAlert(false), 3000);
};
