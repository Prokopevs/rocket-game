import "../style/pages/boost.css"
import { CoinImg, OilBoost, Forward, Shield, GasPump } from "../pictures"
import React from "react"
import StorageModalWindow from "../components/ModalWindows/StorageModalWindow"
import MiningModalWindow from "../components/ModalWindows/MiningModalWindow"
import ProtectionModalWindow from "../components/ModalWindows/ProtectionModalWindow"


const Boost: React.FC<{}> = () => {
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
            <StorageModalWindow modalIn={storageMW} setModalIn={setStorageMW} />
            <MiningModalWindow modalIn={mintingMW} setModalIn={setMintingMW} />
            <ProtectionModalWindow modalIn={protectionMW} setModalIn={setProtectionMW} />
            <div className="boost_center">
                <p className="boost_text_description">Your balance</p>
                <div className="boost_text_center">
                    <img className="boost_balance_img" src={String(CoinImg)} alt=""></img>
                    <p className="boost_balance_score">24423</p>
                </div>

                <div className="boost_item" onClick={() => onClickLink("storage")}>
                    <div className="boost_item_inner">
                        <img className="boost_item_inner_img" src={String(OilBoost)} alt=""></img>
                        <div>
                            <p className="boost_item_inner_text">Gas Storage</p>
                            <p className="boost_item_inner_description">
                                Increace gas storage to earn more
                            </p>
                            <div className="boost_item_inner_cost">
                                <img
                                    className="boost_item_inner_cost_img"
                                    src={String(CoinImg)}
                                    alt=""
                                ></img>
                                <p className="boost_item_inner_cost_price">22</p>
                            </div>
                        </div>
                        <img className="boost_item_inner_arrow" src={String(Forward)} alt=""></img>
                    </div>
                </div>

                <div className="boost_item" onClick={() => onClickLink("minting")}>
                    <div className="boost_item_inner">
                        <img className="boost_item_inner_img" src={String(GasPump)} alt=""></img>
                        <div>
                            <p className="boost_item_inner_text">Gas Mining</p>
                            <p className="boost_item_inner_description">
                                Increace gas mining to fly often
                            </p>
                            <div className="boost_item_inner_cost">
                                <img
                                    className="boost_item_inner_cost_img"
                                    src={String(CoinImg)}
                                    alt=""
                                ></img>
                                <p className="boost_item_inner_cost_price">22</p>
                            </div>
                        </div>
                        <img className="boost_item_inner_arrow" src={String(Forward)} alt=""></img>
                    </div>
                </div>

                <div className="boost_item" onClick={() => onClickLink("protaction")}>
                    <div className="boost_item_inner">
                        <img className="boost_item_inner_img" src={String(Shield)} alt=""></img>
                        <div>
                            <p className="boost_item_inner_text">Protection</p>
                            <p className="boost_item_inner_description">
                                Protection helps against meteorites
                            </p>
                            <div className="boost_item_inner_cost">
                                <img
                                    className="boost_item_inner_cost_img"
                                    src={String(CoinImg)}
                                    alt=""
                                ></img>
                                <p className="boost_item_inner_cost_price">22</p>
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
