import { Route, Routes } from "react-router-dom"
import Game from "../pages/Game"
import Home from "../pages/Home"
import Progress from "../components/Progress"
import React from "react"

const AppRouter: React.FC<{}> = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Game" element={<Game />} />
            </Routes>
        </>
    )
}

export default AppRouter
