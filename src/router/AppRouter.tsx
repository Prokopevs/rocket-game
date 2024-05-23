import { Route, Routes, Router, useNavigate, useLocation } from "react-router-dom"
import { useIntegration } from '@tma.js/react-router-integration';
import { initNavigator } from '@tma.js/sdk-react';

import Game from "../pages/Game"
import Home from "../pages/Home"
import React from "react"
import Friends from "../pages/Friends"
import Boost from "../pages/Boost"
import Missions from "../pages/Missions"
import { IUserData, IGame } from "../models/IUserData"
import { IPrices } from "../http/getPricesReq"

interface IRouteProps {
    userData: IUserData
    game: IGame
    prices: IPrices
    setGame: (game: IGame) => void
}

const AppRouter: React.FC<IRouteProps> = ({userData, game, setGame, prices}) => {
    // let location = useLocation()
    // const navigate = useNavigate()
    const navigator = React.useMemo(() => initNavigator('app-navigation-state'), []);
    const [location, reactNavigator] = useIntegration(navigator);
    const BackButton = (window as any).Telegram.WebApp.BackButton

    React.useEffect(() => {
        navigator.attach();
        return () => navigator.detach();
    }, [navigator]);


    const [score, setScore] = React.useState(game.score)
    const [play, setPlay] = React.useState(false)
    const [isNotReload, setIsNotReload] = React.useState(false)
    const tickGas = React.useRef(0)

    // Time ------------------------------
    const minutsToFill = 60000 // 1 min
    let percentL
    let futureTimeL = localStorage.getItem("futureTime") // время заполнения
    let timeToFilled = Number(futureTimeL) - Date.now() // сколько заполнено
    if (timeToFilled > 0) {
        percentL = Number((100 - (timeToFilled * 100) / minutsToFill).toFixed(2))
    } else {
        percentL = 100
    }
    const [completed, setCompleted] = React.useState(percentL)
    const tick = React.useRef<number>(0)

    React.useEffect(() => {
        setInterval(() => {
            if (tick.current < 100) {
                let futureTime = localStorage.getItem("futureTime") // время заполнения
                let filled = Number(futureTime) - Date.now() // сколько заполнено
                if (filled > 0) {
                    let percent = Number((100 - (filled * 100) / minutsToFill).toFixed(2))
                    setCompleted(percent)
                    tick.current = percent
                }
                if (filled < 0) {
                    setCompleted(100)
                    tick.current = 100
                }
            }
        }, 500)
    }, [])

    const onClickPlay = () => {
        if (completed > 33) {
            tickGas.current = 0
            setPlay(true)
            if (timeToFilled > 0) {
                let timeToFinish = Number(localStorage.getItem("futureTime"))
                let addedTime = timeToFinish + 20000
                localStorage.setItem("futureTime", addedTime.toString())
                setCompleted((completed) => completed - 33.33)
                tick.current = tick.current - 33.33
            } else {
                let timestamp = Date.now()
                timestamp += 20000
                localStorage.setItem("futureTime", timestamp.toString())
                setCompleted((completed) => completed - 33.33)
                tick.current = tick.current - 33.33
            }
            return true
        } 
            return false
    }
     // Time ------------------------------

    React.useEffect(() => {
            console.log(location)
        if (location.pathname == "/") {
            navigator.push('/rocket-game')
          }
    }, [])

    return (
        <Router location={location} navigator={reactNavigator}>
            <Routes>
                <Route path="/rocket-game" element={<Home completed={completed} onClickPlay={onClickPlay} score={score} setIsNotReload={setIsNotReload} userData={userData}/>} />
                <Route path="/Game" element={<Game play={play} setPlay={setPlay} onClickPlay={onClickPlay} setScore={setScore} 
                    score={score} isNotReload={isNotReload} tickGas={tickGas} BackButton={BackButton} userData={userData} game={game}/>} />
                <Route path="/Missions" element={<Missions BackButton={BackButton}/>} />
                <Route path="/Friends" element={<Friends BackButton={BackButton} userData={userData}/>} />
                <Route path="/Boost" element={<Boost score={score} BackButton={BackButton} prices={prices} game={game} setGame={setGame} setScore={setScore} />} />
            </Routes>
        </Router>
    )
}

export default AppRouter
