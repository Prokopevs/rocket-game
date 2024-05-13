import "../../style/components/modalWindow.css"
import React from "react"
import { CSSTransition } from "react-transition-group"
import { OilBoost, Forward, CoinImg } from "../../pictures"
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
const StorageModalWindow: React.FC<IModalStatus> = ({ modalIn, setModalIn, prices, game, setGame, setScore, score}) => {
    const [loading, setLoading] = React.useState(false)
    const litters = [15, 25, 35, 45, 55, 65, 75, 85, 95]
    const [showPopup, setShowPopup] = React.useState(false)
    const closeStorageWindow = () => {
        setModalIn(false)
    }

    const onClickButton = async () => {
        if (score - prices[game.gasStorage] >= 0) {
            setLoading(true)
            const signature = createSignature(game.ownerId, "gasStorage")
            const response = await updateMultiplicator(game.ownerId, "gasStorage", signature)
            if (response?.status == 200) {
                setGame(() => ({
                    ...game,
                    gasStorage: game.gasStorage + 1
                }));
            }
            setScore(score - prices[game.gasStorage])
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
                        <h2 className="modalWindow_content_title">Upgrade Gas storage</h2>
                        <p className="modalWindow_content_description">
                            Better storage holds more Gas and you can fly more
                        </p>

                        {prices[game.gasStorage] && <div className="modalWindow_content_upgrade">
                            <div className="modalWindow_content_upgrade_block">
                                <img
                                    className="modalWindow_content_upgrade_img"
                                    src={String(OilBoost)}
                                    alt=""
                                ></img>
                                <div className="modalWindow_content_upgrade_text">
                                    <p className="modalWindow_content_upgrade_level">level {game.gasStorage+1}</p>
                                    <p className="modalWindow_content_upgrade_hours">{litters[game.gasStorage+1]} liters</p>
                                </div>
                            </div>
                        </div>}

                        {prices[game.gasStorage] && <img
                            className="modalWindow_content_arrow"
                            src={String(Forward)}
                            alt=""
                        ></img>}

                        <div className="modalWindow_content_upgrade">
                            <div className="modalWindow_content_upgrade_block">
                                <img
                                    className="modalWindow_content_upgrade_img"
                                    src={String(OilBoost)}
                                    alt=""
                                ></img>
                                <div className="modalWindow_content_upgrade_text">
                                    <p className="modalWindow_content_upgrade_level">level {game.gasStorage}</p>
                                    <p className="modalWindow_content_upgrade_hours">{litters[game.gasStorage]} liters</p>
                                </div>
                            </div>
                        </div>

                        <div className="modalWindow_content_price">
                            <img
                                className="modalWindow_content_price_img"
                                src={String(CoinImg)}
                                alt=""
                            ></img>
                            <p className="modalWindow_content_price_text">{prices[game.gasStorage] ? prices[game.gasStorage] : "max level"}</p>
                        </div>

                        <button
                            className="upgrade_button"
                            disabled={loading || !prices[game.gasStorage]}
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

export default StorageModalWindow
