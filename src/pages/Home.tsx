import "../style/pages/home.css"
import { ArrowImg, CoinImg, RocketImg, Result, Friend, Missions, Boost } from "../pictures"
import Progress from "../components/Progress"
import React from "react"
const Home: React.FC<{}> = () => {
    const [completed, setCompleted] = React.useState(0)
    const tick = React.useRef<number>(0)

    React.useEffect(() => {
        setInterval(() => {
            if (tick.current < 100) {
                setCompleted((completed) => completed + 0.5)
                tick.current = tick.current + 0.5
            }
        }, 300)
    }, [])

    return (
        <div className="home">
            <div className="home_center">
                <div className="home_header">
                    <img className="home_coin" src={String(Result)} alt=""></img>
                    <div className="home_text">
                        <p className="home_text_name">Rocket Game</p>
                        <p className="home_text_place">24423</p>
                    </div>
                    <img className="home_arrow" src={String(ArrowImg)} alt=""></img>
                </div>
            </div>

            <div className="home_center">
                <div className="home_balance">
                    <p className="home_balance_name">Balance:</p>
                    <div className="home_balance_center">
                        <img className="home_balance_img" src={String(CoinImg)} alt=""></img>
                        <p className="home_balance_score">24423</p>
                    </div>
                </div>
            </div>

            <div className="home_center">
                <div className="home_play">
                    <div className="home_play_center">
                        <div className="home_play_btn">
                            <p className="home_play_btn_text">Play</p>
                            <img className="home_play_img" src={String(RocketImg)} alt=""></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home_center">
                <p className="home_gas_text">Gas:</p>
            </div>
            <div className="home_center">
                <Progress completed={completed} />
            </div>

            <div className="home_center_footer">
                <div className="home_footer">
                    <div className="home_footer_items">
                        <img
                            className="home_footer_missions_img"
                            src={String(Missions)}
                            alt=""
                        ></img>
                        <p className="home_footer_items_text">Missions</p>
                    </div>
                    <div className="home_footer_line"></div>
                    <div className="home_footer_items">
                        <img className="home_footer_boost_img" src={String(Boost)} alt=""></img>
                        <p className="home_footer_items_text">Boost</p>
                    </div>
                    <div className="home_footer_line"></div>
                    <div className="home_footer_items">
                        <img className="home_footer_friends_img" src={String(Friend)} alt=""></img>
                        <p className="home_footer_items_text">Friends</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
