import "../../style/components/modalWindow.css"
import React from "react"
import { CSSTransition } from "react-transition-group"
import { Shield, Forward, CoinImg } from "../../pictures"
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
const ProtectionModalWindow: React.FC<IModalStatus> = ({ modalIn, setModalIn, prices, game, setGame, setScore, score}) => {
    const [loading, setLoading] = React.useState(false)
    const [showPopup, setShowPopup] = React.useState(false)

    const protectionArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const closeStorageWindow = () => {
        setModalIn(false)
    }

    const onClickButton = async() => {
        if(score - prices[game.protection] >= 0) {
            setLoading(true)
            const signature = createSignature(game.ownerId, "protection")
            const response = await updateMultiplicator(game.ownerId, "protection", signature)
            if (response?.status == 200) {
                setGame(() => ({
                    ...game,
                    protection: game.protection + 1
                }));
            }
            setScore(score - prices[game.protection])
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

                        {prices[game.protection] && <div className="modalWindow_content_upgrade">
                            <div className="modalWindow_content_upgrade_block">
                                <img
                                    className="modalWindow_content_upgrade_img"
                                    src={String(Shield)}
                                    alt=""
                                ></img>
                                <div className="modalWindow_content_upgrade_text">
                                    <p className="modalWindow_content_upgrade_level">level {game.protection+1}</p>
                                    <p className="modalWindow_content_upgrade_hours">{protectionArr[game.protection+1]} health</p>
                                </div>
                            </div>
                        </div>}

                        {prices[game.protection] && <img
                            className="modalWindow_content_arrow"
                            src={String(Forward)}
                            alt=""
                        ></img>}

                        <div className="modalWindow_content_upgrade">
                            <div className="modalWindow_content_upgrade_block">
                                <img
                                    className="modalWindow_content_upgrade_img"
                                    src={String(Shield)}
                                    alt=""
                                ></img>
                                <div className="modalWindow_content_upgrade_text">
                                    <p className="modalWindow_content_upgrade_level">level {game.protection}</p>
                                    <p className="modalWindow_content_upgrade_hours">{protectionArr[game.protection]} health</p>
                                </div>
                            </div>
                        </div>

                        <div className="modalWindow_content_price">
                            <img
                                className="modalWindow_content_price_img"
                                src={String(CoinImg)}
                                alt=""
                            ></img>
                            <p className="modalWindow_content_price_text">{prices[game.protection] ? prices[game.protection] : "max level"}</p>
                        </div>

                        <button
                            className="upgrade_button"
                            disabled={loading || !prices[game.protection]}
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

export default ProtectionModalWindow
