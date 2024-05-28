import "../style/pages/friends.css"
import React from "react"
import { useNavigate } from "react-router-dom"

const Missions: React.FC<{}> = () => {
    const navigate = useNavigate()
    const BackButton = (window as any).Telegram.WebApp.BackButton
    BackButton.show();
    BackButton.onClick(function() {
        BackButton.hide();
        navigate("/rocket-game")
    });

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
