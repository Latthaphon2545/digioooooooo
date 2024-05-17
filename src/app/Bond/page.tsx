"use client";
import ActionButton from "@/components/actionButton";
import Sidebar from "@/components/sidebar/sidebar";
import SubmitButton from "@/components/submitButton";
import UserInput from "@/components/userInput";
import React, { useEffect } from "react";

const BondPage = () => {
  function test() {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("done");
      }, 5000);
    });
  }

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-full">
        <UserInput />
      </div>
    </div>
  );
};

export default BondPage;
