import "../style/pages/friends.css"
import React from "react"
import { useNavigate } from "react-router-dom"

interface IMissionProps {
    BackButton: any
}

const Missions: React.FC<IMissionProps> = ({ BackButton }) => {
    const navigate = useNavigate()
    BackButton.show();
    BackButton.onClick(function() {
        navigate("/rocket-game")
        BackButton.hide();
    });
    return (
        <div className="friends">
            <div className="friends_center">
                <p className="friends_text_count_not">Not available yet</p>
            </div>
        </div>
    )
}

export default Missions
