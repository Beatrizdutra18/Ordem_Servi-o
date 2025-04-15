import React from "react";
import { Link } from "react-router-dom";

export default function Head() {
    return (
        <div className="flex flex-col bg-black text-white w-[53vw] fixed rounded-md p-2 top-0 shadow-md items-center justify-center">
            <div className="flex items-center justify-center gap-10 w-[50vw] h-24">
                <h2>
                    <Link to="/disciplinas" className="text-white hover:underline">Disciplinas</Link>
                </h2>
                <h2>
                    <Link to="/home" className="text-white hover:underline">Home</Link>
                </h2>
                <h2>
                    <Link to="/ambiente" className="text-white hover:underline">Ambiente</Link>
                </h2>
            </div>
            <div className="flex w-[50vw] min-w-[350px] items-center justify-around">
                <span>Read</span>
                <span>Update</span>
                <span>Delete</span>
            </div>
        </div>
    );
}
