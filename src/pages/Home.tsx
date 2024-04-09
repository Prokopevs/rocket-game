import "../style/pages/home.css"
import { ArrowImg, CoinImg, RocketImg, Result, Friend, Missions, Boost } from "../pictures"
import Progress from "../components/Progress"
import { useNavigate } from "react-router-dom"
import React from "react"
import { CSSTransition } from "react-transition-group"
import PopupInfo from "../components/PopupInfo"
import Player from "../components/fire/player"

interface IHomeProps {
    play: boolean,
    setPlay: (...args: boolean[]) => void
  }
const Home: React.FC<IHomeProps> = ({play, setPlay}) => {
    const minutsToFill = 60000 // 1 min
    // let timestamp = Date.now()
    // timestamp += 1 * 60 * 1000
    // localStorage.setItem("futureTime", timestamp.toString())
    let percentL
    let futureTimeL = localStorage.getItem("futureTime") // время заполнения
    let timeToFilled = Number(futureTimeL) - Date.now() // сколько заполнено
    if (timeToFilled > 0) {
        percentL = Number((100 - (timeToFilled * 100) / minutsToFill).toFixed(2))
    } else {
        percentL = 100
    }

    const [completed, setCompleted] = React.useState(percentL)
    const [showPopup, setShowPopup] = React.useState(false)
    const tick = React.useRef<number>(0)
    const navigate = useNavigate()

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
            navigate(`/game`)
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
        } else {
            setShowPopup(true)
        }
    }

    const onClickEvent = (category: string) => {
        if (category === "Missions") {
            navigate(`/Missions`)
        }
        if (category === "Friends") {
            navigate(`/Friends`)
        }
        if (category === "Boost") {
            navigate(`/Boost`)
        }
    }

    React.useEffect(() => {
        let timeout: NodeJS.Timeout
        if (showPopup) {
            timeout = setTimeout(() => {
                setShowPopup(!showPopup)
            }, 3000)
        }
        return () => {
            clearTimeout(timeout)
        }
    }, [showPopup])

    return (
        <div className="home">
            <CSSTransition in={showPopup} timeout={150} classNames="my-node" unmountOnExit>
                <PopupInfo text={"Not enough gas"} />
            </CSSTransition>
            <div className="home_center">
                <div className="home_header">
                    <img className="home_coin" src={String(Result)} alt=""></img>
                    <div className="home_text">
                        <p className="home_text_name">Rocket Game</p>
                        <p className="home_text_place">24423</p>
                    </div>
                    <img className="home_arrow" src={String(ArrowImg)} alt=""></img>
                </div>

                <div className="home_balance">
                    <p className="home_balance_name">Balance:</p>
                    <div className="home_balance_center">
                        <img className="home_balance_img" src={String(CoinImg)} alt=""></img>
                        <p className="home_balance_score">24423</p>
                    </div>
                </div>

                <div className="home_play" onClick={() => onClickPlay()}>
                    <div className="home_play_btn">
                        <p className="home_play_btn_text">Play</p>
                        
                            <Player rocketWidth = {44} rocketHeight = {120} framerocketwidth = {396} pause = {false}/>
                       
                    </div>
                </div>

                <p className="home_gas_text">Gas:</p>

                <Progress completed={completed} />

                <div className="home_footer">
                    <button className="home_footer_items" onClick={() => onClickEvent("Missions")}>
                        <img
                            className="home_footer_missions_img"
                            src={String(Missions)}
                            alt=""
                        ></img>
                        <p className="home_footer_items_text">Missions</p>
                    </button>
                    <div className="home_footer_line"></div>
                    <div className="home_footer_items" onClick={() => onClickEvent("Boost")}>
                        <img className="home_footer_boost_img" src={String(Boost)} alt=""></img>
                        <p className="home_footer_items_text">Boost</p>
                    </div>
                    <div className="home_footer_line"></div>
                    <div className="home_footer_items" onClick={() => onClickEvent("Friends")}>
                        <img className="home_footer_friends_img" src={String(Friend)} alt=""></img>
                        <p className="home_footer_items_text">Friends</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
