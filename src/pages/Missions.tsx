import "../style/pages/friends.css"
import React from "react"
import { useNavigate } from "react-router-dom"
import {BackButton} from "@vkruglikov/react-telegram-web-app";

const Missions: React.FC<{}> = () => {
    const navigate = useNavigate()

    // React.useEffect(() => {
    //     window.Telegram.WebApp.BackButton.show();
        
    //     window.Telegram.WebApp.BackButton.onClick(() => navigate(-1));

    //     return () => {
    //         window.Telegram.WebApp.BackButton.hide();
    //     }
    // }, [])

    //window.location.href
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
