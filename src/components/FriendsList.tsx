import "../style/pages/friends.css"
import { Friendship, CoinImg } from "../pictures"
import React from "react"

export interface IFriendsList {
    name: string 
    score: number
}

const FriendsList: React.FC<IFriendsList> = ({name, score}) => {
    return (
        <div className="friends_list_item">
            <div className="friends_list_photo">
                <img className="friends_list_img" src={String(Friendship)} alt=""></img>
            </div>
            <div className="friends_list_text">
                <div className="friends_list_text_name">
                    <p className="friends_list_text_first">{name}</p>
                </div>
                <div className="friends_list_total">
                    <img className="friends_list_total_img" src={String(CoinImg)} alt=""></img>
                    <p className="friends_list_total_score">{score}</p>
                </div>
            </div>
        </div>
    )
}

export default FriendsList
