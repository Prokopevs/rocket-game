import { Route, Routes } from "react-router-dom"
import Game from "../pages/Game"
import Home from "../pages/Home"
import React from "react"
import Friends from "../pages/Friends"
import Boost from "../pages/Boost"

const AppRouter: React.FC<{}> = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Game" element={<Game />} />
                <Route path="/Friends" element={<Friends />} />
                <Route path="/Boost" element={<Boost />} />
            </Routes>
        </>
    )
}

export default AppRouter
