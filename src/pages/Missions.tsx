import "../style/pages/friends.css"
import React from "react"
import { useNavigate } from "react-router-dom"
import {BackButton} from "@vkruglikov/react-telegram-web-app";

const Missions: React.FC<{}> = () => {
    const navigate = useNavigate()
    return (
        <div className="friends">
            <BackButton onClick={() => navigate(-1)}/>
            <div className="friends_center">
                <p className="friends_text_count_not">Not available yet</p>
            </div>
        </div>
    )
}

export default Missions
