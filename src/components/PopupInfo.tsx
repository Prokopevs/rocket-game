import "../style/components/popup.css"
import React from "react"

interface IPopupInfo {
    text: string
}
const PopupInfo: React.FC<IPopupInfo> = ({ text }) => {
    return (
        <div className="popup">
            <p className="popup_text">{text}</p>
        </div>
    )
}

export default PopupInfo
