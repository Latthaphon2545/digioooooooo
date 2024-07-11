"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ModalCountdownProps {
  timeTotal?: number;
  navigator: string;
  navigatorText: string;
  open: boolean;
  title: string;
}

export const ModalCountdown = ({
  timeTotal = 5,
  navigator,
  navigatorText,
  open,
  title,
}: ModalCountdownProps) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(timeTotal);

  useEffect(() => {
    if (!open) return;

    if (timeLeft === 0) {
      router.push("/login");
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft, open, router]);

  return (
    <>
      <div
        className={`modal laptop:modal-middle tablet:modal-middle mobile:modal-bottom ${
          open ? "modal-open" : ""
        }`}
        role="dialog"
      >
        <div className="modal-box p-4">
          <h3 className="text-lg font-bold my-4">{title}</h3>
          <div className="flex flex-col items-center gap-5">
            <p>System will redirect you to {navigatorText} page in</p>
            <div className="flex flex-row gap-2 text-xs">
              <div>
                <span className="countdown font-mono text-4xl">{timeLeft}</span>
                sec
              </div>
            </div>

            <Link href={navigator} className="btn btn-primary">
              <button>Go to {navigatorText}</button>
            </Link>
            <p className="text-xs text-center">
              If you don't want to wait, you can
              <span className="text-primary text-2xl">Click</span> the button.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
