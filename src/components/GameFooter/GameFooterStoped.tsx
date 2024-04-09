import { useNavigate } from "react-router-dom"
import "../../style/components/gameFooter.css"

import React from "react"

interface IGameFooter {
    setPlay: (...args: boolean[]) => void
    setPause: (...args: boolean[]) => void
}

const GameFooterStopped: React.FC<IGameFooter> = ({ setPlay, setPause }) => {
    const navigate = useNavigate()
    const onClickEvent = (category: string) => {}

    const onClickLink = (str: string) => {
        if (str === "continue") {
            setPause(false)
            setPlay(true)
        }
        if (str === "home") {
            setPlay(false)
            navigate(`/`)
        }
    }

    return (
        <div className="game_footer">
                <div className="game_footer_score_stop">
                    <p className="game_footer_text" onClick={() => onClickEvent("Friends")}>
                        Game stopped
                    </p>
                </div>
                <div className="game_footer_buttons">
                    <button className="footer_button" onClick={() => onClickLink("continue")}>
                        Continue
                    </button>
                    <button className="footer_button" onClick={() => onClickLink("home")}>
                        Home
                    </button>
                </div>
        </div>
    )
}

export default GameFooterStopped
