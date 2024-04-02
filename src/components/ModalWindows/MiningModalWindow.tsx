import "../../style/components/modalWindow.css"
import React from "react"
import { CSSTransition } from "react-transition-group"
import { GasPump, Forward, CoinImg } from "../../pictures"

interface IModalStatus {
    modalIn: boolean
    setModalIn: (...args: boolean[]) => void
}
const MiningModalWindow: React.FC<IModalStatus> = ({ modalIn, setModalIn }) => {
    const [loading, setLoading] = React.useState(false)
    const closeStorageWindow = () => {
        setModalIn(false)
    }

    const onClickButton = () => {
        setLoading(true)
    }

    return (
        <CSSTransition in={modalIn} timeout={150} classNames="my-node" unmountOnExit>
            <div className="modalWindow">
                <div className="modalWindow_content">
                    <div className="modalWindow_content_inner">
                        <h2 className="modalWindow_content_title">Upgrade Gas mining</h2>
                        <p className="modalWindow_content_description">
                            Gas mining allows you to boosts mining speed
                        </p>

                        <div className="modalWindow_content_upgrade">
                            <div className="modalWindow_content_upgrade_block">
                                <img
                                    className="modalWindow_content_upgrade_img"
                                    src={String(GasPump)}
                                    alt=""
                                ></img>
                                <div className="modalWindow_content_upgrade_text">
                                    <p className="modalWindow_content_upgrade_level">level 2</p>
                                    <p className="modalWindow_content_upgrade_hours">75 liters</p>
                                </div>
                            </div>
                        </div>

                        <img
                            className="modalWindow_content_arrow"
                            src={String(Forward)}
                            alt=""
                        ></img>

                        <div className="modalWindow_content_upgrade">
                            <div className="modalWindow_content_upgrade_block">
                                <img
                                    className="modalWindow_content_upgrade_img"
                                    src={String(GasPump)}
                                    alt=""
                                ></img>
                                <div className="modalWindow_content_upgrade_text">
                                    <p className="modalWindow_content_upgrade_level">level 1</p>
                                    <p className="modalWindow_content_upgrade_hours">50 liters</p>
                                </div>
                            </div>
                        </div>

                        <div className="modalWindow_content_price">
                            <img
                                className="modalWindow_content_price_img"
                                src={String(CoinImg)}
                                alt=""
                            ></img>
                            <p className="modalWindow_content_price_text">3</p>
                        </div>

                        <button
                            className="upgrade_button"
                            disabled={loading}
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
