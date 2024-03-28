import "../style/pages/friends.css"
import React from "react"
import FriendsList from "../components/FriendsList"
const Friends: React.FC<{}> = () => {
    const arr = [
        { name: "Vova Prokopev", score: 0.011 },
        { name: "Vova Prokopev", score: 0.011 },
        { name: "Vova Prokopev", score: 0.011 },
        { name: "Vova Prokopev", score: 0.011 },
        { name: "Vova Prokopev", score: 0.011 },
        { name: "Vova Prokopev", score: 0.011 },
        { name: "Vova Prokopev", score: 0.011 },
        { name: "Vova Prokopev", score: 0.011 },
        { name: "Vova Prokopev", score: 0.011 },
    ]

    return (
        <div className="friends">
            <div className="friends_center">
                <p className="friends_text_count">7 friend</p>
                <p className="friends_text_description">
                    Every time your friend claims coin you get 20% cashback.
                </p>
                <p className="friends_text_friends">My Friends</p>
                <div className="friends_list">
                    {arr.map((items, index) => (
                        <FriendsList key={`${items.name}_${index}`} {...items} />
                    ))}
                </div>
                <button className="friends_button">Invite a Friend</button>
            </div>
        </div>
    )
}

export default Friends
