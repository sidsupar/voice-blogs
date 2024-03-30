// import { AvatarDetails } from "./avatarDetails";

export default function Avatar({name, size="small"}: {name: string, size:"small"|"big"}){
    // console.log("Avatar size = "+sizeInNum)
    return(
        <>
            <div className="cursor-pointer">
                <div className={`relative inline-flex items-center justify-center ${size == "small" ? "w-8 h-8":"w-14 h-14"} overflow-hidden bg-gray-500 rounded-full dark:bg-gray-100`}>
                    <span className={`${size == "small" ? "text-xs" : "text-sm"} inline-flex items-center justify-center text-white dark:text-gray-600`}>
                        {name[0]}
                    </span>
                </div>
            </div>
        </>
    )
}