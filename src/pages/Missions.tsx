import "../style/pages/friends.css"
import React from "react"
import { useNavigate } from "react-router-dom"

const Missions: React.FC<{}> = () => {
    const navigate = useNavigate()

    React.useEffect(() => {
        window.Telegram.WebApp.BackButton.show();
        
        window.Telegram.WebApp.BackButton.onClick(handleBack);

        return () => {
            window.Telegram.WebApp.BackButton.hide();
        }
    }, [])

    function handleBack() {
        navigate("/rocket-game")
    }

    //window.location.href
    return (
        <div className="friends">
            <div className="friends_center">
                <p className="friends_text_count_not">Not available yet</p>
            </div>
        </div>
    )
}

export default Missions
