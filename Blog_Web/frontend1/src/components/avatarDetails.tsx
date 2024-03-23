import { useRecoilValue } from "recoil"
import { userAtom } from "../globalStates/atom"
import Logout from "./logout";

export function AvatarDetails(){
    const userDetails = useRecoilValue(userAtom);
    // console.log("Username from recoil = ");
    // console.log(userDetails)
    return(
        <>        
            <div className="z-10 p-10 border border-black justify-center items-center font-serif max-w-screen-2xl relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
                <div className="">

                </div>
                <div className="border-b-2 ">
                    {userDetails.uname}
                </div>
                <div className="grid grid-cols-12 mt-10 items-center">
                    <div className="col-span-5 flex flex-col justify-center">
                        {"settings"}
                    </div>
                    {/* <div className="col-span-1">

                    </div> */}
                    <div className="col-span-2 text-3xl flex flex-col justify-center">
                        {"|"}
                    </div>
                    {/* <div className="col-span-1">

                    </div>
                    <div className="col-span-1">

                    </div> */}
                    <div className="col-span-5 flex flex-col justify-center mt-2.5">
                        <Logout />
                    </div>
                </div>
            </div>
        </>
    )
}