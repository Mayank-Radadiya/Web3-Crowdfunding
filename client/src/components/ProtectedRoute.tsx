// components/ProtectedRoute.tsx
import { useAddress } from "@thirdweb-dev/react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const address = useAddress();

  if (!address) {
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
}
