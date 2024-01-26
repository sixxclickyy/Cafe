import { RootState } from "../store/store.ts";
import { ReactNode } from "react"
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
    //const jwt = useSelector((s: RootState) => s.user.jwt);
    const jwt = "false";

    if (!jwt) {
        return <Navigate to="/auth/login" replace />;
    }
    return children;
}