import Auth from "../components/auth";
import Quote from "../components/quoteComponent";

export default function SignUp(){

    return(
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="p-x-10 ml-auto mr-auto flex flex-col justify-center h-screen">
                    <div className="">
                        <Auth type="signup"/>
                    </div>
                </div>
                <div className="invisible sm:visible">
                    <Quote />
                </div>
            </div>
        </>
    )
}