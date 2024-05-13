import "../../style/components/modalWindow.css"
import React from "react"
import { CSSTransition } from "react-transition-group"
import { GasPump, Forward, CoinImg } from "../../pictures"
import { IGame } from "../../models/IUserData"
import { createSignature } from "../../helpers/createSignature"
import { updateMultiplicator } from "../../http/updateMultiplicator"
import PopupInfo from "../PopupInfo"

interface IModalStatus {
    modalIn: boolean
    setModalIn: (...args: boolean[]) => void
    prices: any
    game: IGame
    setGame: any
    setScore: any
    score: number
}
const MiningModalWindow: React.FC<IModalStatus> = ({ modalIn, setModalIn, prices, game, setGame, setScore, score }) => {
    const [loading, setLoading] = React.useState(false)
    const [showPopup, setShowPopup] = React.useState(false)
    const litters = [12, 22, 32, 42, 52, 62, 72, 82, 92]
    const closeStorageWindow = () => {
        setModalIn(false)
    }

    const onClickButton = async () => {
        if (score - prices[game.gasMining] >= 0) {
            setLoading(true)
            const signature = createSignature(game.ownerId, "gasMining")
            const response = await updateMultiplicator(game.ownerId, "gasMining", signature)
            if (response?.status == 200) {
                setGame(() => ({
                    ...game,
                    gasMining: game.gasMining + 1
                }));
            }
            setScore(score - prices[game.gasMining])
            setLoading(false)
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
        <CSSTransition in={modalIn} timeout={150} classNames="my-node" unmountOnExit>
            <div className="modalWindow">
            <CSSTransition in={showPopup} timeout={150} classNames="my-node" unmountOnExit>
                <PopupInfo text={"Not enough score"} />
            </CSSTransition>
                <div className="modalWindow_content">
                    <div className="modalWindow_content_inner">
                        <h2 className="modalWindow_content_title">Upgrade Gas mining</h2>
                        <p className="modalWindow_content_description">
                            Gas mining allows you to boosts mining speed
                        </p>

                        {prices[game.gasMining] && <div className="modalWindow_content_upgrade">
                            <div className="modalWindow_content_upgrade_block">
                                <img
                                    className="modalWindow_content_upgrade_img"
                                    src={String(GasPump)}
                                    alt=""
                                ></img>
                                <div className="modalWindow_content_upgrade_text">
                                    <p className="modalWindow_content_upgrade_level">level {game.gasMining+1}</p>
                                    <p className="modalWindow_content_upgrade_hours">{litters[game.gasMining+1]} liters</p>
                                </div>
                            </div>
                        </div>}

                        {prices[game.gasMining] && <img
                            className="modalWindow_content_arrow"
                            src={String(Forward)}
                            alt=""
                        ></img>}

                        <div className="modalWindow_content_upgrade">
                            <div className="modalWindow_content_upgrade_block">
                                <img
                                    className="modalWindow_content_upgrade_img"
                                    src={String(GasPump)}
                                    alt=""
                                ></img>
                                <div className="modalWindow_content_upgrade_text">
                                    <p className="modalWindow_content_upgrade_level">level {game.gasMining}</p>
                                    <p className="modalWindow_content_upgrade_hours">{litters[game.gasMining]} liters</p>
                                </div>
                            </div>
                        </div>

                        <div className="modalWindow_content_price">
                            <img
                                className="modalWindow_content_price_img"
                                src={String(CoinImg)}
                                alt=""
                            ></img>
                            <p className="modalWindow_content_price_text">{prices[game.gasMining] ? prices[game.gasMining] : "max level"}</p>
                        </div>

                        <button
                            className="upgrade_button"
                            disabled={loading || !prices[game.gasMining]}
                            onClick={() => onClickButton()}
                        >
                            Upgrade
                        </button>
                    </div>

                    <div className="close" onClick={() => closeStorageWindow()}>
                        <div className="close__button"></div>
                    </div>
                    {loading && (
                        <div className="loading">
                            <div className="spinner-2"></div>
                        </div>
                    )}
                </div>
            </div>
        </CSSTransition>
    )
}

export default MiningModalWindow
