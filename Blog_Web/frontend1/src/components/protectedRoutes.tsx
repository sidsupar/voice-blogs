import { useNavigate } from "react-router"
import { useRecoilValue } from "recoil";
import { userAtom } from "../globalStates/atom";

export default function ProtectRoutes({children} : {children : React.ReactNode}){

    const navigate = useNavigate();
    const userDetails = useRecoilValue(userAtom);

    if(userDetails.uname == null || userDetails.name == null || localStorage.getItem("voicetoken") == null){
        navigate("/signin");
        return null;
    }

    return(
        <>
            {children}
        </>
    )

}