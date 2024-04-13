import "../style/pages/home.css"
import { ArrowImg, CoinImg, RocketImg, Result, Friend, Missions, Boost } from "../pictures"
import Progress from "../components/Progress"
import { useNavigate } from "react-router-dom"
import React from "react"
import { CSSTransition } from "react-transition-group"
import PopupInfo from "../components/PopupInfo"
import Player from "../components/fire/player"

interface IHomeProps {
    completed: number
    onClickPlay: (...args: boolean[]) => boolean
    score: number
    setIsNotReload: (...args: boolean[]) => void
  }
const Home: React.FC<IHomeProps> = ({completed, onClickPlay, score, setIsNotReload}) => {
    const [showPopup, setShowPopup] = React.useState(false)
    const navigate = useNavigate()

    let onClickHandler = () => {
        let result = onClickPlay()
        if (result === true) {
            setIsNotReload(true)
            navigate(`/rocket-game/Game`)
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
                        <p className="home_text_place">{1}</p>
                    </div>
                    <img className="home_arrow" src={String(ArrowImg)} alt=""></img>
                </div>

                <div className="home_balance">
                    <p className="home_balance_name">Balance:</p>
                    <div className="home_balance_center">
                        <img className="home_balance_img" src={String(CoinImg)} alt=""></img>
                        <p className="home_balance_score">{score}</p>
                    </div>
                </div>

                <div className="home_play" onClick={() => onClickHandler()}>
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
