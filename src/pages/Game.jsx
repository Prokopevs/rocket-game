import '../style/pages/game.css';
import { RocketImg, BronzecoinImg, SilvercoinImg, GoldcoinImg, AsteroidImg, FuelImg } from "../pictures"
import { Constants } from '../Constants';
import React from "react";
import { getCoords, mapValue } from '../lib/helpers';
import Player from '../components/fire/player';

const Game = () => {
    const rocketWidth = Constants.MAX_WIDTH / 7
    const coinsWidth = Constants.MAX_WIDTH / 13
    const asteroidWidth = Constants.MAX_WIDTH / 5
    const fuelWidth = Constants.MAX_WIDTH / 8
    const WidthDiveided2 = Constants.MAX_WIDTH / 2

    const maxRocketLaunchYHeightPx = (Constants.MAX_HEIGHT * 72) / 100
    const maxRocketRightMovePx = (Constants.MAX_WIDTH / 2) - (rocketWidth / 2) // для ракеты максимальное направо это 300
    const minRocketLeftMovePx = -maxRocketRightMovePx // мин налево -300 так как общая ширина 600

    const gameTouchAreaWigth = Constants.MAX_WIDTH * 55 / 100 // 45% ширина области для управления ракетой
    const minTouchAreaWigthMovePx = (Constants.MAX_WIDTH - gameTouchAreaWigth) / 2
    const maxTouchAreaWigthMovePx = gameTouchAreaWigth + minTouchAreaWigthMovePx
    const gameTouchAreaHeight = Constants.MAX_HEIGHT * 40 / 100 // 40% высота области для управления ракетой нужно менять в css
    const minTouchAreaHeightMovePx = Constants.MAX_HEIGHT - gameTouchAreaHeight
    const maxTouchAreaHeightMovePx = Constants.MAX_HEIGHT

    const rocket = React.useRef()
    const bronzeCoin = React.useRef()
    const silverCoin = React.useRef()
    const goldCoin = React.useRef()
    const asteroid = React.useRef()
    const fuel = React.useRef()

    const rocketExponentLaunch = React.useRef(-1)
    const requestRef = React.useRef()
    const [play, setPlay] = React.useState(false)

    const rocketCoords = React.useRef({x: 0, y: 0, z: 0})
    const bronzeCoinCoords = React.useRef({x: 0, y: 0, z: 0})
    const silverCoinCoords = React.useRef({x: 0, y: 0, z: 0})
    const goldCoinCoords = React.useRef({x: 0, y: 0, z: 0})
    const asteroidCoords = React.useRef({x: 0, y: 0, z: 0})
    const fuelCoords = React.useRef({x: 0, y: 0, z: 0})

    React.useEffect(() => {
        rocketCoords.current = getCoords(rocket.current)
        bronzeCoinCoords.current = getCoords(bronzeCoin.current)
        silverCoinCoords.current = getCoords(silverCoin.current)
        goldCoinCoords.current = getCoords(goldCoin.current)
        asteroidCoords.current = getCoords(asteroid.current)
        fuelCoords.current = getCoords(fuel.current)
    }, [])

    //----------------touch area----------------//
    const touchareaRef = React.useRef(null)
    const touchPositionRef = React.useRef({ x: Constants.MAX_WIDTH / 2 }) // начинаем с координаты по середине так как ракета по середине
    const isTouch = React.useRef(false)
    React.useEffect(() => {
        const handleTouchMove = (e) => {
            const touchX = e.touches[0].clientX
            const touchY = e.touches[0].clientY
            
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

    // ------------rocket animation--------------//
    function rocketAnimation() {
        if (rocketCoords.current.y > maxRocketLaunchYHeightPx) { //ракета долетает максимум до 72vh высоты экрана

            const speed = Math.exp(rocketExponentLaunch.current)
            const newYCoord = rocketCoords.current.y - speed
            rocketCoords.current.y = newYCoord // заранение поменяли координату

            rocket.current.style.transform = `translate(${rocketCoords.current.x}px, ${newYCoord}px)`
            
            if (rocketExponentLaunch.current < 1.4) {  // максимальная скорость вылета ракета со старта
                rocketExponentLaunch.current = rocketExponentLaunch.current + Constants.ROCKET_START_INCREACE_COEFF
            }
        }

        // движение направо
        if (touchPositionRef.current.x - mapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx) > 3) {
            const newXCoord = rocketCoords.current.x + 3
            let newZCoord = rocketCoords.current.z

            if (isTouch.current === true) {
                if (newZCoord < 2) {
                    newZCoord = rocketCoords.current.z + 0.5
                    rocketCoords.current.z = newZCoord
                }
                rocket.current.style.transform = `translate(${newXCoord}px, ${rocketCoords.current.y}px) rotate(${newZCoord}deg)`
                rocketCoords.current.x = newXCoord
            } else {
                const lastMovePosition = mapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx)
                touchPositionRef.current = lastMovePosition
            }   
        }

        // движение налево
        if (mapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx) - touchPositionRef.current.x > 3 ) {
            const newXCoord = rocketCoords.current.x - 3
            let newZCoord = rocketCoords.current.z

            if (isTouch.current === true) {
                if (newZCoord > -2) {
                    newZCoord = rocketCoords.current.z - 0.5
                    rocketCoords.current.z = newZCoord
                }
                rocket.current.style.transform = `translate(${newXCoord}px, ${rocketCoords.current.y}px) rotate(${newZCoord}deg)`
                rocketCoords.current.x = newXCoord
            } else {
                const lastMovePosition = mapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx)
                touchPositionRef.current = lastMovePosition
            }
        }

        if (isTouch.current === false) {
            let newZCoord = rocketCoords.current.z

            if (newZCoord > 0) {
                newZCoord = newZCoord - 0.5
                rocketCoords.current.z = newZCoord
                rocket.current.style.transform = `translate(${rocketCoords.current.x}px, ${rocketCoords.current.y}px) rotate(${newZCoord}deg)`
            }
            if(newZCoord < 0) {
                newZCoord = newZCoord + 0.5
                rocketCoords.current.z = newZCoord
                rocket.current.style.transform = `translate(${rocketCoords.current.x}px, ${rocketCoords.current.y}px) rotate(${newZCoord}deg)`
            }
        }
    }

    //----------------coin animation----------------//
    function elementAnimation(element, elementCoords, elementInitialYCoord) { 
        let newYelementCoord = elementCoords.current.y + 5 
        let newXelementCoord = elementCoords.current.x

        if (newYelementCoord > Constants.MAX_HEIGHT) {
            newYelementCoord = elementInitialYCoord // высота сверху

            const direction = parseInt(Math.random() * 2)
            const randomXCoord = parseInt(Math.random() * (WidthDiveided2 - (element.current.clientWidth / 2)))
            newXelementCoord = direction === 0 ? -randomXCoord : randomXCoord
        }

        elementCoords.current.y = newYelementCoord
        elementCoords.current.x = newXelementCoord
        element.current.style.transform = `translate(${newXelementCoord}px, ${newYelementCoord}px)`
    }


    const animate = () => {
        rocketAnimation()
        elementAnimation(bronzeCoin, bronzeCoinCoords, -60) // -60 менять также в css
        elementAnimation(silverCoin, silverCoinCoords, -60) // -60 менять также в css
        elementAnimation(goldCoin, goldCoinCoords, -60) // -60 менять также в css

        requestRef.current = requestAnimationFrame(animate)
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

                <div className="game__rocket" ref={rocket}>
                    <img  src={String(RocketImg)} alt="" style={{width: `${rocketWidth}px`}} />
                    {/* <Player/> */}
                </div>
                

                <img className="game__coin bronzecoin" ref={bronzeCoin} src={String(BronzecoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
                <img className="game__coin silvercoin" ref={silverCoin} src={String(SilvercoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
                <img className="game__coin goldcoin" ref={goldCoin} src={String(GoldcoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>

                <img className="game__asteroid" ref={asteroid} src={String(AsteroidImg)} alt="" style={{width: `${asteroidWidth}px`}}/>
                <img className="game__fuel" ref={fuel} src={String(FuelImg)} alt="" style={{width: `${fuelWidth}px`}}/>

                <button className="game__button_start" onClick={() => setPlay(!play)}>
                    start game
                </button>
            </div>
        </div>
    )
}

export default Game