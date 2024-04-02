import "../style/pages/home.css"
import { ArrowImg, CoinImg, RocketImg, Result, Friend, Missions, Boost } from "../pictures"
import Progress from "../components/Progress"
import { useNavigate } from "react-router-dom"
import React from "react"
import { CSSTransition } from "react-transition-group"
import PopupInfo from "../components/PopupInfo"
const Home: React.FC<{}> = () => {
    const [completed, setCompleted] = React.useState(0)
    const tick = React.useRef<number>(0)
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = React.useState(false)

    React.useEffect(() => {
        setInterval(() => {
            if (tick.current < 100) {
                setCompleted((completed) => completed + 0.5)
                tick.current = tick.current + 0.5
            }
        }, 300)
    }, [])

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

    const onClickEvent = (category: string) => {
        if (category === "Missions") {
            setShowPopup(!showPopup)
        }
        if (category === "Friends") {
            navigate(`/Friends`)
        }
        if (category === "Boost") {
            navigate(`/Boost`)
        }
    }

    return (
        <div className="home">
            <CSSTransition in={showPopup} timeout={150} classNames="my-node" unmountOnExit>
                <PopupInfo text={"Not available yet"} />
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

                <div className="home_play">
                    <div className="home_play_btn">
                        <p className="home_play_btn_text">Play</p>
                        <img className="home_play_img" src={String(RocketImg)} alt=""></img>
                    </div>
                </div>

                <p className="home_gas_text">Gas:</p>

                <Progress completed={completed} />

                <div className="home_footer">
                    <button
                        className="home_footer_items"
                        disabled={showPopup}
                        onClick={() => onClickEvent("Missions")}
                    >
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
