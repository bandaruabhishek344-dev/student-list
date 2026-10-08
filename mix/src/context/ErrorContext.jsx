import {
  createContext,
  useState,
} from "react";

export const ErrorContext =
  createContext();

export function ErrorProvider({
  children,
}) {

  const [
    shouldCrash,
    setShouldCrash,
  ] = useState(false);

  return (

    <ErrorContext.Provider
      value={{

        shouldCrash,

        setShouldCrash,

      }}
    >

      {children}

    </ErrorContext.Provider>

  );

}