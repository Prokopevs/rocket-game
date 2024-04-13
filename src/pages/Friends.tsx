import "../style/pages/friends.css"
import React from "react"
import FriendsList from "../components/FriendsList"
import PopupInfo from "../components/PopupInfo"
import { CSSTransition } from "react-transition-group"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useNavigate } from "react-router-dom"

const Friends: React.FC<{}> = () => {
    const [showPopup, setShowPopup] = React.useState(false)

    const arr = [
        { name: "Friend", score: 0.1 },
        { name: "Friend", score: 0.011 },
        { name: "Friend", score: 0.3 },
        { name: "Friend", score: 0.33 },
        { name: "Friend", score: 0.1 },
        { name: "Friend", score: 1 },
        { name: "Friend", score: 0.041 },
        { name: "Friend", score: 3 },
        { name: "Friend", score: 0.2 },
    ]

    const onClickLink = async () => {
        // const text = "https://www.youtube.com/watch?v="
        // await navigator.clipboard.writeText(text)
        setShowPopup(!showPopup)
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
        <div className="friends">
            <CSSTransition in={showPopup} timeout={150} classNames="my-node" unmountOnExit>
                <PopupInfo text={"Invite link is copied"} />
            </CSSTransition>
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
                <CopyToClipboard text={"https://www.youtube.com/watch?v="}>
                    <button className="friends_button" disabled={showPopup} onClick={() => onClickLink()}>
                        Invite a Friend
                    </button>
                </CopyToClipboard>
            </div>
        </div>
    )
}

export default Friends
