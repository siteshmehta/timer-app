import { Link } from "react-router-dom";

export default function Navbar(){
    return (
        <>
            <ul className="flex justify-evenly font-bold font-mono text-xl py-2 text-[#264653] bg-[#E9C46A]">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/countdown">Countdown</Link>
                </li>
                <li>
                    <Link to="/world-clock">World clock</Link>
                </li>
            </ul>
        </>
    )
}