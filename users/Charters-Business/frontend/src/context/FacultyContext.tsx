'use client';

import { createContext, useContext, ReactNode } from 'react';

export const facultyData = {
  // Move faculty data here from FacultyModel.tsx
};

const FacultyContext = createContext(facultyData);

export function FacultyProvider({ children }: { children: ReactNode }) {
  return (
    <FacultyContext.Provider value={facultyData}>
      {children}
    </FacultyContext.Provider>
  );
}

export const useFaculty = () => useContext(FacultyContext);