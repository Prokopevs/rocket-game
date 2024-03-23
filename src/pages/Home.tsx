import "../style/pages/home.css"
import { ArrowImg, CoinImg } from "../pictures"
const Home: React.FC<{}> = () => {
    return (
        <div className="home">
            <div className="home_center">
                <div className="home_header">
                    <img className="home_coin" src={String(CoinImg)} alt=""></img>
                    <div className="home_text">
                        <p className="home_text_name">Rocket Game</p>
                        <p className="home_text_place">24423</p>
                    </div>
                    <img className="home_arrow" src={String(ArrowImg)} alt=""></img>
                </div>
            </div>

            <div className="home_center">
                <div className="home_balance">
                    <p className="home_balance_name">Balance</p>
                    <div className="home_balance_center">
                        <img className="home_balance_img" src={String(CoinImg)} alt=""></img>
                        <p className="home_balance_score">24423</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
