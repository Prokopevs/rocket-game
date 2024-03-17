import '../style/pages/game.css';
import { RocketImg, BronzecoinImg, SilvercoinImg, GoldcoinImg, AsteroidImg, FuelImg } from "../pictures"
import { Constants } from '../Constants';
import React from "react";
import { getCoords } from '../lib/helpers';

const Game = () => {
    const rocketWidth = Constants.MAX_WIDTH / 7
    const coinsWidth = Constants.MAX_WIDTH / 13
    const asteroidWidth = Constants.MAX_WIDTH / 5
    const fuelWidth = Constants.MAX_WIDTH / 8

    const rocket = React.useRef()
    const requestRef = React.useRef()
    const [play, setPlay] = React.useState(false)
    

    function rocketAnimation() {
        const newCoords = getCoords(rocket)
        newCoords.y = newCoords.y - 1
        rocket.current.style.transform = `translateY(${newCoords.y}px)`
    }


    const animate = () => {
        rocketAnimation()
        requestRef.current = requestAnimationFrame(animate);
    }

    React.useEffect(() => {
        requestRef.current = requestAnimationFrame(animate)
        
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current)
                console.log("here")
            }
        }
    }, []);


    return (
        <div className="game">
            <div className="game__road">
                <img className="game__rocket" src={String(RocketImg)} alt="" style={{width: `${rocketWidth}px`}} ref={rocket}/>

                <img className="game__coin bronzecoin" src={String(BronzecoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
                <img className="game__coin silvercoin" src={String(SilvercoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
                <img className="game__coin goldcoin" src={String(GoldcoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>

                <img className="game__asteroid" src={String(AsteroidImg)} alt="" style={{width: `${asteroidWidth}px`}}/>
                <img className="game__fuel" src={String(FuelImg)} alt="" style={{width: `${fuelWidth}px`}}/>

                <button className="game__button_start" onClick={() => setPlay(true)}>
                    start game
                </button>
            </div>
        </div>
    )
}

export default Game