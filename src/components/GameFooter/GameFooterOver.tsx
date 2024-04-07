import { useNavigate } from "react-router-dom"
import { BronzecoinImg } from "../../pictures"
import "../../style/components/gameFooter.css"
import React from "react"

const GameFooterOver: React.FC<{}> = () => {
    const navigate = useNavigate()
    const onClickEvent = (category: string) => {}

    const onClickLink = () => {}

    return (
        <div className="game_footer">
            <div className="game_footer_score">
                <p className="game_footer_text" onClick={() => onClickEvent("Friends")}>
                    Score: 106
                </p>
                <img className="game_footer_img" src={String(BronzecoinImg)} alt=""></img>
            </div>
            <div className="game_footer_buttons">
                <button className="footer_button" onClick={() => onClickLink()}>
                    Play again
                </button>
                <button className="footer_button" onClick={() => onClickLink()}>
                    Home
                </button>
            </div>
        </div>
    )
}

export default GameFooterOver
