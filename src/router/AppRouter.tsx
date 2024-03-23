
import { Route, Routes, } from "react-router-dom"
import Game from "../pages/Game"
import Home from "../pages/Home"

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
