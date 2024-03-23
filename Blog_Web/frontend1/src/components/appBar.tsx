import { Link } from "react-router-dom";
// import Avatar from "./avatar";
// import { useEffect, useState } from "react";
// import { AvatarDetails } from "./avatarDetails";
// import { useRecoilValue } from "recoil";
// import { userAtom } from "../globalStates/atom";
import AppBarAvatar from "./appBarAvatar";

// export function useIsVisible(ref: any) {
//     const [isIntersecting, setIntersecting] = useState(false);
  
//     useEffect(() => {
//       const observer = new IntersectionObserver(([entry]) => {
//           setIntersecting(entry.isIntersecting)
//       } 
//       );
      
//       observer.observe(ref.current);
//       return () => {
//         observer.disconnect();
//       };
//     }, [ref]);
  
//     return isIntersecting;
//   }

export default function AppBar(){

    return(
        <>
            <div className="border-b flex justify-between px-10 py-2">               
                <div className="font-bold text-lg flex flex-col text-center justify-center">
                    <Link to="/blogs">
                        Voice
                    </Link>  
                </div>
                                              
                <div className="flex justify-center">
                    <button type="button" className="mt-2 mr-8 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-1 text-center me-2 mb-2">
                        <div className="flex flex-col justify-center">
                            <Link to="/publish">
                                New
                            </Link>
                        </div>
                    </button>
                    <div>
                        <AppBarAvatar />
                    </div>                            
                </div>     
            </div>
           
            
        </>
    )
}