import { useNavigate } from "react-router"
import { useSetRecoilState } from "recoil";
import { userAtom } from "../globalStates/atom";

export default function Logout(){

    const navigate = useNavigate();
    const setUserRecoilValue  = useSetRecoilState(userAtom);

    return(
        <>
            <button onClick={()=>{
                                localStorage.setItem('voicetoken', "");
                                setUserRecoilValue({})
                                navigate("/signin");
                            }} 
                className="cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Logout
            </button>
        </>
    )
}