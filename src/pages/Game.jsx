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
    const rocketStartIncreaseCoeff = Constants.ROCKET_START_INCREACE_COEFF

    const rocket = React.useRef()
    const requestRef = React.useRef()
    const [play, setPlay] = React.useState(false)
    
    const rocketCoords = React.useRef()
    const rocketExponentLaunch = React.useRef(-1)
    const newYCoordsToVh = React.useRef(0)
    React.useEffect(() => {
        rocketCoords.current = getCoords(rocket.current)
    }, []);

    function rocketAnimation() {
        if (newYCoordsToVh.current > -11) { // ракета долетает максимум до -11vh высоты экрана

            const speed = Math.exp(rocketExponentLaunch.current)
            const newYCoords = rocketCoords.current.y - speed
            newYCoordsToVh.current = (newYCoords / Constants.MAX_HEIGHT) * 100

            rocket.current.style.transform = `translateY(${newYCoordsToVh.current}vh)`
            rocketCoords.current.y = newYCoords
            
            if (rocketExponentLaunch.current < 1.4) {  // максимальная скорость вылета ракета со старта
                rocketExponentLaunch.current = rocketExponentLaunch.current + rocketStartIncreaseCoeff
                console.log(rocketExponentLaunch.current)
            }
        }
    }

    const animate = () => {
        rocketAnimation()
        requestRef.current = requestAnimationFrame(animate);
    }

    React.useEffect(() => {
        if (play) {
            requestRef.current = requestAnimationFrame(animate)
        
            return () => {
                if (requestRef.current) {
                    cancelAnimationFrame(requestRef.current)
                    console.log("stop")
                }
            }
        }
    }, [play]);


    return (
        <div className="game">
            <div className="game__road">
                <img className="game__rocket" src={String(RocketImg)} alt="" style={{width: `${rocketWidth}px`}} ref={rocket}/>

                <img className="game__coin bronzecoin" src={String(BronzecoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
                <img className="game__coin silvercoin" src={String(SilvercoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
                <img className="game__coin goldcoin" src={String(GoldcoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>

                <img className="game__asteroid" src={String(AsteroidImg)} alt="" style={{width: `${asteroidWidth}px`}}/>
                <img className="game__fuel" src={String(FuelImg)} alt="" style={{width: `${fuelWidth}px`}}/>

                <button className="game__button_start" onClick={() => setPlay(!play)}>
                    start game
                </button>
            </div>
        </div>
    )
}

export default Game