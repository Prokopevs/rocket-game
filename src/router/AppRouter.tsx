import { Route, Routes } from "react-router-dom"
import Game from "../pages/Game"
import Home from "../pages/Home"
import React from "react"
import Friends from "../pages/Friends"
import Boost from "../pages/Boost"
import Missions from "../pages/Missions"

const AppRouter: React.FC<{}> = () => {
    const [play, setPlay] = React.useState(false)
    return (
        <>
            <Routes>
                <Route path="/" element={<Home play={play} setPlay={setPlay}/>} />
                <Route path="/Game" element={<Game play={play} setPlay={setPlay}/>} />
                <Route path="/Missions" element={<Missions />} />
                <Route path="/Friends" element={<Friends />} />
                <Route path="/Boost" element={<Boost />} />
            </Routes>
        </>
    )
}

export default AppRouter
