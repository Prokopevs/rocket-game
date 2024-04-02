import "../style/pages/friends.css"
import React from "react"
import FriendsList from "../components/FriendsList"
import PopupInfo from "../components/PopupInfo"
import { CSSTransition } from "react-transition-group"

const Missions: React.FC<{}> = () => {
    return (
        <div className="friends">
            <div className="friends_center">
                <p className="friends_text_count_not">Not available yet</p>
            </div>
        </div>
    )
}

export default Missions
