import { useRecoilValue } from "recoil"
import { userAtom } from "../globalStates/atom"
import Logout from "./logout";

export function AvatarDetails(){
    const userDetails = useRecoilValue(userAtom);
    // console.log("Username from recoil = ");
    // console.log(userDetails)
    return(
        <>        
            <div className="w-full p-2 shadow-lg flex flex-col justify-center z-10 p-5 font-serif text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
                <div className="">

                </div>
                <div className="text-center border-b-2 w-4/5">
                    <div className="">
                        {userDetails.uname}
                    </div>
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