import '../style/pages/game.css';
import { RocketImg, BronzecoinImg, SilvercoinImg, GoldcoinImg, AsteroidImg, FuelImg } from "../pictures"
import { Constants } from '../Constants';
import React from "react";
import { getCoords, mapValue } from '../lib/helpers';

const Game = () => {
    const rocketWidth = Constants.MAX_WIDTH / 7
    const coinsWidth = Constants.MAX_WIDTH / 13
    const asteroidWidth = Constants.MAX_WIDTH / 5
    const fuelWidth = Constants.MAX_WIDTH / 8

    const maxRocketLaunchYHeightPx = (Constants.MAX_HEIGHT * 28) / 100
    const maxRocketRightMovePx = (Constants.MAX_WIDTH / 2) - (rocketWidth / 2) // ракета стоит по середине с координатам 0 по x 
    const minRocketLeftMovePx = -maxRocketRightMovePx
    console.log(maxRocketRightMovePx)
    console.log(minRocketLeftMovePx)

    const gameTouchAreaWigth = Constants.MAX_WIDTH * 45 / 100 // ширина области для управления ракетой обязательно менять в css тоже
    const minGameTouchAreaMovePx = (Constants.MAX_WIDTH - gameTouchAreaWigth) / 2
    const maxGameTouchAreaMovePx = gameTouchAreaWigth + minGameTouchAreaMovePx

    const rocket = React.useRef()
    const requestRef = React.useRef()
    const [play, setPlay] = React.useState(false)
    
    // ------------rocket animation--------------//
    const rocketCoords = React.useRef({x: 0, y: 0})
    const rocketExponentLaunch = React.useRef(-1)
    React.useEffect(() => {
        rocketCoords.current = getCoords(rocket.current)
    }, [])

    const touchareaRef = React.useRef(null)
    const touchPositionRef = React.useRef({ x: Constants.MAX_WIDTH / 2 })
    React.useEffect(() => {
        const handleTouchMove = (e) => {
            const touchX = e.touches[0].clientX
            const touchY = e.touches[0].clientY;
            const rect = myArea.getBoundingClientRect()

            if (touchX >= rect.left && touchX <= rect.right && touchY >= rect.top && touchY <= rect.bottom) {
                touchPositionRef.current = { x: touchX }
                // console.log(touchX)
            }
        }
        
        const myArea = touchareaRef.current
        myArea?.addEventListener('touchmove', handleTouchMove)
        return () => {
            myArea?.removeEventListener('touchmove', handleTouchMove)
        }
    }, [])

    const onTouchStartFunc = (event) => {
        // console.log("Touch Start!")
    }
    
    const onTouchEndFunc = (event) => {
        // console.log("Touch End!")
    }


    function rocketAnimation() {
        if (rocketCoords.current.y > maxRocketLaunchYHeightPx) { // ракета долетает максимум до 28vh высоты экрана

            const speed = Math.exp(rocketExponentLaunch.current)
            const newYCoord = rocketCoords.current.y - speed
            rocketCoords.current.y = newYCoord // заранение поменяли координату

            rocket.current.style.transform = `translate(${rocketCoords.current.x}px, ${newYCoord}px)`
            
            if (rocketExponentLaunch.current < 1.4) {  // максимальная скорость вылета ракета со старта
                rocketExponentLaunch.current = rocketExponentLaunch.current + Constants.ROCKET_START_INCREACE_COEFF
            }
        }

        if (touchPositionRef.current.x - mapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minGameTouchAreaMovePx, maxGameTouchAreaMovePx) > 3) {
            const newXCoord = rocketCoords.current.x + 3
            rocket.current.style.transform = `translate(${newXCoord}px, ${rocketCoords.current.y}px)`
            rocketCoords.current.x = newXCoord
        }

        if (mapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minGameTouchAreaMovePx, maxGameTouchAreaMovePx) - touchPositionRef.current.x > 3 ) {
            const newXCoord = rocketCoords.current.x - 3
            rocket.current.style.transform = `translate(${newXCoord}px, ${rocketCoords.current.y}px)`
            rocketCoords.current.x = newXCoord
        }

        // console.log(touchPositionRef.current)
        // console.log(mapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minGameTouchAreaMovePx, maxGameTouchAreaMovePx))
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
                <div className="game__toucharea" ref={touchareaRef} onTouchStart={onTouchStartFunc} onTouchEnd={onTouchEndFunc}></div>

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