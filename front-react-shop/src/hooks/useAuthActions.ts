import { useCallback } from "react";
import { useAppDispatch } from "../store/slices/auth-slice";
import { logout } from "../store/slices/auth-slice";

export const useAuthActions = () => {
    const dispactch = useAppDispatch();
    const handleLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return { handleLogout };
};