import { Route, Routes } from "react-router-dom"
import Game from "../pages/Game"
import Home from "../pages/Home"
import Progress from "../components/Progress"
import React from "react"
import Friends from "../pages/Friends"

const AppRouter: React.FC<{}> = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Game" element={<Game />} />
                <Route path="/Friends" element={<Friends />} />
            </Routes>
        </>
    )
}

export default AppRouter
