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
    const maxRocketRightMovePx = (Constants.MAX_WIDTH / 2) - (rocketWidth / 2) // для ракеты максимальное направо это 300
    const minRocketLeftMovePx = -maxRocketRightMovePx // мин налево -300 так как общая ширина 600

    const gameTouchAreaWigth = Constants.MAX_WIDTH * 45 / 100 // 45% ширина области для управления ракетой
    const minTouchAreaWigthMovePx = (Constants.MAX_WIDTH - gameTouchAreaWigth) / 2
    const maxTouchAreaWigthMovePx = gameTouchAreaWigth + minTouchAreaWigthMovePx
    const gameTouchAreaHeight = Constants.MAX_HEIGHT * 40 / 100 // 40% высота области для управления ракетой нужно менять в css
    const minTouchAreaHeightMovePx = Constants.MAX_HEIGHT - gameTouchAreaHeight
    const maxTouchAreaHeightMovePx = Constants.MAX_HEIGHT


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
    const touchPositionRef = React.useRef({ x: Constants.MAX_WIDTH / 2 }) // начинаем с координаты по середине так как ракета по середине
    const isTouch = React.useRef(false)
    React.useEffect(() => {
        const handleTouchMove = (e) => {
            const touchX = e.touches[0].clientX
            const touchY = e.touches[0].clientY;
            
            if (touchX >= minTouchAreaWigthMovePx && touchX <= maxTouchAreaWigthMovePx 
                && touchY >= minTouchAreaHeightMovePx && touchY <= maxTouchAreaHeightMovePx && play) 
            {
                touchPositionRef.current = { x: touchX }
            }
        }
        const myArea = touchareaRef.current
        myArea?.addEventListener('touchmove', handleTouchMove)
        return () => {
            myArea?.removeEventListener('touchmove', handleTouchMove)
        }
    }, [play])

    const onTouchStartFunc = (event) => {
        isTouch.current = true
    }
    
    const onTouchEndFunc = (event) => {
        isTouch.current = false
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
        console.log(touchPositionRef.current.x, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx)
        if (touchPositionRef.current.x - mapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx) > 3) {
            const newXCoord = rocketCoords.current.x + 3
            if (isTouch.current === true) {
                rocket.current.style.transform = `translate(${newXCoord}px, ${rocketCoords.current.y}px)`
                rocketCoords.current.x = newXCoord
            } else {
                const lastMovePosition = mapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx)
                touchPositionRef.current = lastMovePosition
            }
            
        }

        if (mapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx) - touchPositionRef.current.x > 3 ) {
            const newXCoord = rocketCoords.current.x - 3
            if (isTouch.current === true) {
                rocket.current.style.transform = `translate(${newXCoord}px, ${rocketCoords.current.y}px)`
                rocketCoords.current.x = newXCoord
            } else {
                const lastMovePosition = mapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx)
                touchPositionRef.current = lastMovePosition
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