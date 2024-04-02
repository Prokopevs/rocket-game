import React from "react"
import "../style/pages/home.css"
import { Oil, Oil_em } from "../pictures"

interface IProgress {
    completed: number
}

const Progress: React.FC<IProgress> = ({ completed }) => {
    const containerStyles = {
        height: 7,
        width: "80vw",
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 10,
        marginTop: 10,
        position: "relative" as const,
    }

    const fillerStyles = {
        height: "100%",
        width: `${completed}%`,
        backgroundColor: "#e0cf07",
        transition: "width 0.3s ease-in-out",
        borderRadius: "inherit",
        textAlign: "right" as const,
        position: "relative" as const,
    }

    const labelStyles = {
        padding: 5,
        color: "white",
        fontWeight: "bold",
        position: "absolute" as const,
        top: "50%",
        transform: "translateY(-50%)",
    }

    const iconStyles = {
        position: "absolute" as const,
        top: "50%",
        transform: "translateY(-50%)",
    }

    const oilImageFirst = completed < 33 ? Oil_em : Oil
    const oilImageSecond = completed < 66 ? Oil_em : Oil
    const oilImageThird = completed < 100 ? Oil_em : Oil
    // console.log(completed)

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}></span>
            </div>
            <img
                style={{ ...iconStyles, left: "32%" }}
                className="home_gas"
                src={String(oilImageFirst)}
                alt="1"
            ></img>
            <img
                style={{ ...iconStyles, left: "65%" }}
                className="home_gas"
                src={String(oilImageSecond)}
                alt="1"
            ></img>
            <img
                style={{ ...iconStyles, left: "99%" }}
                className="home_gas"
                src={String(oilImageThird)}
                alt="1"
            ></img>
        </div>
    )
}

export default Progress
