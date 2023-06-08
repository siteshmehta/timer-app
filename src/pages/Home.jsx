import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <div className="h-screen bg-[#2A9D8F]">
                <div className="relative top-[20%]">
                    
                    <p className="text-3xl text-center font-mono">⏰Timer app</p>
                    
                    <div className="flex justify-evenly mt-[10%]">
                        <Link to="countdown" className="w-[200px] text-center border shadow-lg p-2 rounded-md cursor-pointer bg-[#264653] text-white">
                            ⏳Countdown Timer
                        </Link>
                        <Link className="w-[200px] text-center border shadow-lg p-2 rounded-md cursor-pointer  bg-[#264653] text-white">
                            🌍World clock
                        </Link>
                    </div>
                </div>
            </div>   
        </>
    )
}