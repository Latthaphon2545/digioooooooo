"use client";

import { createContext, useContext, useState } from "react";

const EditorContext = createContext(false);

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEditor, setIsEditor] = useState(true);

  return (
    <EditorContext.Provider value={isEditor}>{children}</EditorContext.Provider>
  );
};
