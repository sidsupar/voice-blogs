import { useRecoilValue } from "recoil";
import { userAtom } from "../globalStates/atom";
import { useState } from "react";
import Avatar from "./avatar";
import { AvatarDetails } from "./avatarDetails";

// function useIsVisible(ref: any) {
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

export default function AppBarAvatar(){
    // const appBarAvatarRef = useRef();
    // const isVisible = useIsVisible(appBarAvatarRef)       
    const [showDetails, setShowDetails] = useState(false);
    const userDetails = useRecoilValue(userAtom);

    return(
        <>
            <div className="flex flex-col items-center justify-center absolute" onClick={()=>setShowDetails((v) => !v)}>
                        <div className="">
                            <Avatar name={userDetails.name} size={"big"}/>
                        </div>                        
                        <div className={`absolute top-16 z-20 transition-opacity ease-in duration-700`}>
                            <div className="relative right-6 w-full right-40">
                                {!showDetails ? null: <AvatarDetails />}
                            </div>
                        </div>   
            </div>        
        </>
    )
}