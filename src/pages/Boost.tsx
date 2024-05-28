import "../style/pages/boost.css"
import { Forward} from "../pictures"
import React from "react"
import StorageModalWindow from "../components/ModalWindows/StorageModalWindow"
import MiningModalWindow from "../components/ModalWindows/MiningModalWindow"
import ProtectionModalWindow from "../components/ModalWindows/ProtectionModalWindow"
import { useNavigate } from "react-router-dom"
import { IGame } from "../models/IUserData"
import { ReactComponent as Coin } from "../assets/coinw.svg";
import { ReactComponent as Defence} from "../assets/defense.svg";
import { ReactComponent as Oil} from "../assets/oil.svg";
import { ReactComponent as Gasoline} from "../assets/gasoline.svg";

interface IBoostProps {
    score: number
    prices: any
    game: IGame
    setScore: any
    setGame: (game: IGame) => void
  }
const Boost: React.FC<IBoostProps> = ({score, prices, game, setGame, setScore}) => {
    const navigate = useNavigate()
    const BackButton = (window as any).Telegram.WebApp.BackButton
    BackButton.show();
    BackButton.onClick(function() {
        BackButton.hide();
        navigate("/rocket-game")
    });

    const [storageMW, setStorageMW] = React.useState(false)
    const [mintingMW, setMintingMW] = React.useState(false)
    const [protectionMW, setProtectionMW] = React.useState(false)

    const onClickLink = (type: string) => {
        if (type === "storage") {
            setStorageMW(true)
        }
        if (type === "minting") {
            setMintingMW(true)
        }
        if (type === "protaction") {
            setProtectionMW(true)
        }
    }

    return (
        <div className="boost">
            <StorageModalWindow modalIn={storageMW} setModalIn={setStorageMW} prices={prices} game={game} setGame={setGame} setScore={setScore} score={score}/>
            <MiningModalWindow modalIn={mintingMW} setModalIn={setMintingMW} prices={prices} game={game} setGame={setGame} setScore={setScore} score={score}/>
            <ProtectionModalWindow modalIn={protectionMW} setModalIn={setProtectionMW} prices={prices} game={game} setGame={setGame} setScore={setScore} score={score}/>
            <div className="boost_center">
                <p className="boost_text_description">Your balance</p>
                <div className="boost_text_center">
                    <svg className="boost_balance_img"><Coin /></svg>
                    <p className="boost_balance_score">{score}</p>
                </div>

                <div className="boost_item" onClick={() => onClickLink("storage")}>
                    <div className="boost_item_inner">
                        <svg className="boost_item_inner_img"><Oil /></svg>
                        <div>
                            <p className="boost_item_inner_text">Gas Storage</p>
                            <p className="boost_item_inner_description">
                                Increace gas storage to earn more
                            </p>
                            <div className="boost_item_inner_cost">
                                <svg className="boost_item_inner_cost_img"><Coin /></svg>
                                <p className="boost_item_inner_cost_price">{prices[game.gasStorage] ? prices[game.gasStorage] : "max level"}</p>
                            </div>
                        </div>
                        <img className="boost_item_inner_arrow" src={String(Forward)} alt=""></img>
                    </div>
                </div>

                <div className="boost_item" onClick={() => onClickLink("minting")}>
                    <div className="boost_item_inner">
                        <svg className="boost_item_inner_img"><Gasoline /></svg>
                        <div>
                            <p className="boost_item_inner_text">Gas Mining</p>
                            <p className="boost_item_inner_description">
                                Increace gas mining to fly often
                            </p>
                            <div className="boost_item_inner_cost">
                                <svg className="boost_item_inner_cost_img"><Coin /></svg>
                                <p className="boost_item_inner_cost_price">{prices[game.gasMining] ? prices[game.gasMining] : "max level"}</p>
                            </div>
                        </div>
                        <img className="boost_item_inner_arrow" src={String(Forward)} alt=""></img>
                    </div>
                </div>

                <div className="boost_item" onClick={() => onClickLink("protaction")}>
                    <div className="boost_item_inner">
                        <svg className="boost_item_inner_img"><Defence /></svg>
                        <div>
                            <p className="boost_item_inner_text">Protection</p>
                            <p className="boost_item_inner_description">
                                Protection helps against meteorites
                            </p>
                            <div className="boost_item_inner_cost">
                                <svg className="boost_item_inner_cost_img"><Coin /></svg>
                                <p className="boost_item_inner_cost_price">{prices[game.protection] ? prices[game.protection] : "max level"}</p>
                            </div>
                        </div>
                        <img className="boost_item_inner_arrow" src={String(Forward)} alt=""></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Boost
