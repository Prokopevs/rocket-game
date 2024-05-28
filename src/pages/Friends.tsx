import "../style/pages/friends.css"
import React from "react"
import FriendsList from "../components/FriendsList"
import PopupInfo from "../components/PopupInfo"
import { CSSTransition } from "react-transition-group"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useNavigate } from "react-router-dom"
import { IUserData } from "../models/IUserData"
import { getReferralsReq } from "../http/getReferralsReq"

interface IFriendsProps {
    userData: IUserData;
}
const Friends: React.FC<IFriendsProps> = ({userData}) => {
    const [referrals, setReferrals] = React.useState([{referralId: 0, firstname: "", username: ""}])
    const [loading, setLoading] = React.useState(true)
    const navigate = useNavigate()

    const BackButton = (window as any).Telegram.WebApp.BackButton
    BackButton.show();
    BackButton.onClick(function() {
        BackButton.hide();
        navigate("/rocket-game")
    });

    const [showPopup, setShowPopup] = React.useState(false)

    const onClickLink = async () => {
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

    React.useEffect(() => {
        getReferrals()
    }, [])
    const getReferrals = async () => {
        const response: any = await getReferralsReq(userData.id)
        // console.log(response.data.Data)
        setReferrals(() => response.data.Data)
        setLoading(false)
    }

    return (
        loading ? 
        <p className="friends"></p> :
        <div className="friends">
            <CSSTransition in={showPopup} timeout={150} classNames="my-node" unmountOnExit>
                <PopupInfo text={"Invite link is copied"} />
            </CSSTransition>
            <div className="friends_center">
                <p className="friends_text_count">{referrals[0]?.referralId ? referrals.length : 0} friend</p>
                <p className="friends_text_description">
                When your friends sign up, you will receive cashback.
                </p>
                <p className="friends_text_friends">My Friends</p>
                {referrals[0]?.referralId && <div className="friends_list">
                    {referrals.map((items, index) => (
                        <FriendsList key={`${items.referralId}_${index}`} items={items} />
                    ))}
                </div>}
                <CopyToClipboard text={`https://t.me/rocket_game_tg_bot?start=${userData.id}`}>
                    <button className="friends_button" disabled={showPopup} onClick={() => onClickLink()}>
                        Invite a Friend
                    </button>
                </CopyToClipboard>
            </div>
        </div>
    )
}

export default Friends

