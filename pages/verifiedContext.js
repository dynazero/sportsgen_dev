
import { createContext, useContext, useState } from 'react';

const VerifiedContext = createContext();

export function useVerified() {
  return useContext(VerifiedContext);
}

export function VerifiedProvider({ children }) {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <VerifiedContext.Provider value={{ isVerified, setIsVerified }}>
      {children}
    </VerifiedContext.Provider>
  );
}
