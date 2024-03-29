import { Link } from "react-router-dom";
// import Avatar from "./avatar";
// import { useEffect, useState } from "react";
// import { AvatarDetails } from "./avatarDetails";
// import { useRecoilValue } from "recoil";
// import { userAtom } from "../globalStates/atom";
import AppBarAvatar from "./appBarAvatar";
import { SearchBar } from "./searchBar";

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
            <div className="border-b grid grid-cols-12 px-10 py-2 gap-x-5 ">  
                <div className="flex flex-col justify-center col-span-12 sm:col-span-3"> 
                    <div className="font-bold text-lg">
                        <div className="">
                            <Link to="/blogs">
                                Voice
                            </Link>  
                        </div>                    
                    </div>
                </div>           
                

                <div className="font-bold col-span-12 text-lg flex flex-col text-center justify-center sm:col-span-6">
                    <SearchBar />
                </div>  
                                              
                <div className="flex flex-col justify-center col-span-12 sm:col-span-3">
                    <div className="flex justify-start sm:justify-center gap-x-2 sm:gap-x-5 ">
                        <div className="flex flex-col justify-center">
                            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full">
                                <div className="flex flex-col items justify-center text-md p-4">
                                    <Link to="/publish">
                                        New
                                    </Link>
                                </div>
                            </button>
                        </div>
                        
                        <div className="">
                            <AppBarAvatar />
                        </div>                            
                    </div>  
                </div>   
            </div>
           
            
        </>
    )
}