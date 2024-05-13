import "../style/pages/friends.css"
import { Friendship, CoinImg } from "../pictures"
import React from "react"

export interface IFriendsList {
    items: any
}

const FriendsList: React.FC<IFriendsList> = ({items}) => {
    return (
        <div className="friends_list_item">
            <div className="friends_list_photo">
                <img className="friends_list_img" src={String(Friendship)} alt=""></img>
            </div>
            <div className="friends_list_text">
                <div className="friends_list_text_name">
                    <p className="friends_list_text_first">{items?.username ? items?.username : items?.firstname}</p>
                </div>
                <div className="friends_list_total">
                    <img className="friends_list_total_img" src={String(CoinImg)} alt=""></img>
                    <p className="friends_list_total_score">100</p>
                </div>
            </div>
        </div>
    )
}

export default FriendsList
