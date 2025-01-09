// components/ProtectedRoute.js
"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "../../utils/auth";

const ProtectedRoute = ({ children, role }) => {
  const router = useRouter();

  useEffect(() => {
    const { token, role: userRole } = getAuth();
    if (!token || userRole !== role) {
      router.push("/login");
    }
  }, [role, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
