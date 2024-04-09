import { useNavigate } from "react-router-dom"
import { BronzecoinImg } from "../../pictures"
import "../../style/components/gameFooter.css"
import React from "react"


interface IGameFooterOver {
    setPlay: (...args: boolean[]) => void
    setGameOver: (...args: boolean[]) => void
}

const GameFooterOver: React.FC<IGameFooterOver> = ({ setPlay, setGameOver }) => {
    const navigate = useNavigate()
    const onClickEvent = (category: string) => {}

    const onClickLink = (str: string) => {
        if (str === "play") {
            setPlay(true)
        }
        if (str === "home") {
            navigate(`/`)
        }
        setGameOver(false)
    }

    return (
        <div className="game_footer">
            <div className="game_footer_score">
                <p className="game_footer_text" onClick={() => onClickEvent("Friends")}>
                    Score: 106
                </p>
                <img className="game_footer_img" src={String(BronzecoinImg)} alt=""></img>
            </div>
            <div className="game_footer_buttons">
                <button className="footer_button" onClick={() => onClickLink("play")}>
                    Play again
                </button>
                <button className="footer_button" onClick={() => onClickLink("home")}>
                    Home
                </button>
            </div>
        </div>
    )
}

export default GameFooterOver
