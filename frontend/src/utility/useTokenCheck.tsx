import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../global/GlobalStateContext";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const useTokenCheck = () => {
    const navigate = useNavigate();
    const { setIsVerified } = useGlobalState();

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_URL_WEB_API + '/api/user/checkToken', { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    setIsVerified(true);
                }
            })
            .catch((error) => {
                navigate("/");
                setIsVerified(false);
                toast.error(error.response.data.message);
            });
    }, [navigate, setIsVerified]);
};

export default useTokenCheck;