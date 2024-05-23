import "../style/pages/home.css"
import { ArrowImg, Result } from "../pictures"
import { ReactComponent as Friend } from "../assets/friendsu.svg";
import { ReactComponent as Boost } from "../assets/boosts.svg";
import { ReactComponent as Mission } from "../assets/mission.svg";
import { ReactComponent as Coin } from "../assets/coinw.svg";
import { ReactComponent as Goblet } from "../assets/goblet.svg";
import Progress from "../components/Progress"
import { Link, useNavigate } from "react-router-dom"
import React from "react"
import { CSSTransition } from "react-transition-group"
import PopupInfo from "../components/PopupInfo"
import Player from "../components/fire/player"
import { IUserData } from "../models/IUserData"

interface IHomeProps {
    completed: number
    onClickPlay: (...args: boolean[]) => boolean
    score: number
    setIsNotReload: (...args: boolean[]) => void
    userData: IUserData;
  }
const Home: React.FC<IHomeProps> = ({completed, onClickPlay, score, setIsNotReload, userData}) => {
    const [showPopup, setShowPopup] = React.useState(false)
    const navigate = useNavigate()

    let onClickHandler = () => {
        let result = onClickPlay()
        console.log(result)
        if (result === true) {
            setIsNotReload(true)
            navigate(`/Game`)
        } else {
            setShowPopup(true)
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
                    <svg className="home_coin"><Goblet /></svg>
                    <div className="home_text">
                        <p className="home_text_name">Rocket Game</p>
                        <p className="home_text_place">{userData.username ? userData.username : userData.firstname}</p>
                    </div>
                    <img className="home_arrow" src={String(ArrowImg)} alt=""></img>
                </div>

                <div className="home_balance">
                    <p className="home_balance_name">Balance:</p>
                    <div className="home_balance_center">
                        <svg className="home_balance_img"><Coin /></svg>
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
                    <Link to="/Missions" className="home_footer_items"> 
                        <svg className="home_footer_friends_img"><Mission /></svg>
                        <p className="home_footer_items_text">Missions</p>
                    </Link>
                    <div className="home_footer_line"></div>
                    <Link to="/Boost" className="home_footer_items"> 
                        <svg className="home_footer_friends_img"><Boost /></svg>
                        <p className="home_footer_items_text">Boost</p>
                    </Link>
                    <div className="home_footer_line"></div>
                    <Link to="/Friends" className="home_footer_items"> 
                        <svg className="home_footer_friends_img"><Friend /></svg>
                        <p className="home_footer_items_text">Friends</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
