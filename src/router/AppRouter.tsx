
import { Route, Routes, } from "react-router-dom"
import Game from "../pages/Game"

const AppRouter: React.FC<{}> = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Game />} />
            </Routes>
        </>
    )
}

export default AppRouter
