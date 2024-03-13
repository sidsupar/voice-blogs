import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import AppBar from "./appBar"
import { useNavigate } from "react-router"
import { SubmitPost } from "../hooks"

function InputField({label, setTitle}: {label:string, setTitle:Dispatch<SetStateAction<string>>}){

    function onChange(e){
        setTitle(e.target.value)
    }

    return(
        <>
            <label htmlFor="message" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">{label}</label>
            <input onInput={onChange} id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></input>
        </>
    )
}


function TextArea({label, setTextData}: {label:string, setTextData:Dispatch<SetStateAction<string>>}){

    function onChange(e){
        setTextData(e.target.value)
    }

    return(
        <>
            <label htmlFor="message" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">{label}</label>
            <textarea onInput={onChange} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </>
    )
}

export default function BlogPost(){
    const [title, setTitle] = useState("");
    const [textData, setTextData] = useState("");
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();

    const submitStatus = useMemo(()=>{
        if(submit){
            const submitPost = async ()=>{
            const {submitPostStatus, data}= await SubmitPost(title, textData);
            
            if(submitPostStatus){
                navigate("/blogs")
            }else{
                console.log(`${data.data}`)
            }
            
        }
            submitPost()
            setSubmit(false)
        }else{
            console.log("Submit is false")
            setSubmit(false)
        }
    },[submit])

    return(
        <>
            <div className=" w-4/5">
                <div className="mt-5 w-full text-center">
                    <InputField label={"Title"} setTitle={setTitle}/>
                </div>
                <div className="mt-5 w-full text-center">
                    <TextArea label ={"Blog"} setTextData={setTextData}/>
                </div>
                <div className="mt-5 w-full text-center">
                    <button onClick={()=>setSubmit(true)} type="button" className="mt-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-1 text-center me-2 mb-2">
                        <div className="flex flex-col justify-center">
                                Post
                        </div>
                    </button> 
                </div>
            </div>
        </>
    )
}