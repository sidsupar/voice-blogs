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
            <div className="grid grid-cols-1" onClick={()=>setShowDetails((v) => !v)}>
                        <div className="col-start-1 row-start-1 ">
                            <Avatar name={userDetails.name} size={"big"}/>
                        </div>                        
                        <div className={`col-start-1 row-start-1 right-1 top-20 absolute z-20 transition-opacity ease-in duration-700`}>
                            {!showDetails ? null: <AvatarDetails />}
                        </div>   
            </div>        
        </>
    )
}