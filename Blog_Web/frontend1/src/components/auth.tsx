import { SignUpInputType } from "@sidsupar/medium-commons";
import { ChangeEvent, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { BACKEND_URL } from "../config.ts"
import jwt from "jsonwebtoken";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../globalStates/atom.tsx";

export default function Auth({type}: {type: "signup" | "signin"}){
    const setUserDetails = useSetRecoilState(userAtom);
    const navigate:NavigateFunction = useNavigate();

    const [postInputs, setPostinputs ]= useState<SignUpInputType>({
        name:"",
        username:"",
        password:""
    });

    async function sendAuth(type: string, body: {
        username:string,
        password:string,
        name?:string
    }){
        console.log(body)
        try{

            // axios.defaults.withCredentials = true;
            console.log("sendRequest ------------1-------------------")
            const res = await axios({
            method:"post"    ,
            url:`${BACKEND_URL}/api/v1/user/${type == "signup" ? "signup" : "signin"}`,
            data:postInputs,
            
            },
            );
            console.log("sendRequest ------------2-------------------")
            console.log(res)
            console.log("sendRequest ------------3-------------------")
            console.log("sendRequest ------------4-------------------")
            console.log("sendRequest ------------5-------------------")
            if(res.status == 200){
                const jtoken = res.data.token;
                localStorage.setItem('token', jtoken);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + jtoken;
                const decodedJWT = jwt.decode(jtoken);
                setUserDetails(decodedJWT);
                console.log("Decoded jwt---------------------------");
                console.log(decodedJWT)

                navigate("/blogs");
            }else{
                alert("Request hit but not res = 200")
            }
        }catch(err: unknown){
            if(err instanceof Error)
                alert("Request to auth failed"+err.message);
            console.log(err)
        }
    }
    
    return(
        <>
            <div className="h-screen flex flex-col justify-center w-fit">
                <div className="text-3xl font-extrabold">
                    Create an account
                    {type ==="signin" ? null: <LabeledInput label="Name" placeholder="Jhon Doe" onChange={(e)=>{setPostinputs({
                        ...postInputs,
                        name: e.target.value
                    })}} />}
                    <LabeledInput label="Username" placeholder="jhon.doe@xyz.com" onChange={(e)=>{setPostinputs({
                        ...postInputs,
                        username: e.target.value
                    })}} />
                    <LabeledInput label="Password" placeholder="abcd@1234A" onChange={(e)=>{setPostinputs({
                        ...postInputs,
                        password: e.target.value
                    })}} type="password"/>
                    <button onClick={()=>{
                            sendAuth(type, postInputs)
                    }
                    } type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Signup" : "SignIn"}</button>
                </div>
                <div className="text-slate-400">
                    {type==="signin" ? "Dont have an account" : "Already have an account?"}
                    {type==="signup" ? <Link className="p-2 underline" to="/signin">"Login"</Link> : <Link className="p-2 underline" to="/signup">SignUp</Link>}
                </div>
            </div>
            <div>
                {/* <div>
                    Inputs
                </div> */}
                {/* <div>
                    {JSON.stringify(postInputs)}
                </div> */}
            </div>
        </>
    )
}
interface LabeledinputTypes{
    label:string,
    placeholder:string,
    onChange: (c: ChangeEvent<HTMLInputElement>) => void,
    type?:string
}
function LabeledInput({label, placeholder, onChange, type}: LabeledinputTypes){

    return(
        <>
            <div>
                <label htmlFor={label} className="pt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                <input onChange={ onChange } type={type||"text"} id={label} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
            </div>
        </>
    )    
}

