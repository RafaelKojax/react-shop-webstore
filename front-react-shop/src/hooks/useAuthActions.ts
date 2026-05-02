import { useCallback } from "react";
import { useAppDispatch } from "../store";
import { logout } from "../store/slices/auth-slice";

export const useAuthActions = () => {
    const dispatch = useAppDispatch();
    const handleLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return { handleLogout };
};