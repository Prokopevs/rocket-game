import { useNavigate } from "react-router-dom"
import { BronzecoinImg } from "../../pictures"
import "../../style/components/gameFooter.css"
import React from "react"


interface IGameFooterOver {
    setPlay: (...args: boolean[]) => void
    setGameOver: (...args: boolean[]) => void
    onClickPlay: (...args: boolean[]) => boolean
    showPopup: boolean
    setShowPopup: (...args: boolean[]) => void
    localScore: number
    setLocalScore: (...args: number[]) => void
    StoreTick: any
}

const GameFooterOver: React.FC<IGameFooterOver> = ({ setPlay, setGameOver, onClickPlay, showPopup, setShowPopup, localScore, setLocalScore, StoreTick}) => {
    const navigate = useNavigate()
    const onClickEvent = (category: string) => {}

    const onClickLink = (str: string) => {
        if (str === "play") {
            let result = onClickPlay()
            if(result === false) {
                setShowPopup(true)
            } else {
                setGameOver(false)
                setLocalScore(0)
                StoreTick.current = 0
            }
        }
        if (str === "home") {
            navigate(`/Home`)
            setGameOver(false)
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
        <div className="game_footer">
            
            <div className="game_footer_score">
                <p className="game_footer_text" onClick={() => onClickEvent("Friends")}>
                    Score: {localScore}
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
