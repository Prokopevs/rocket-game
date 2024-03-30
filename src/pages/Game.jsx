import '../style/pages/game.css';
import { RocketImg, BronzecoinImg, SilvercoinImg, GoldcoinImg, AsteroidImg, FuelImg } from "../pictures"
import { Constants } from '../Constants';
import React from "react";
import { MapValue, RandomlyDefineElement, RandomlyDefineXCoord, RandomlyExpectFrames, consoleRef, getCoords } from '../lib/helpers';
import Player from '../components/fire/player';
import { elementAnimation, handleAnimateArrElement } from '../lib/gameHelp';

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
    const bronzeCoin1 = React.useRef()
    const bronzeCoin2 = React.useRef()
    const bronzeCoin3 = React.useRef()
    const bronzeCoin4 = React.useRef()
    const bronzeCoin5 = React.useRef()
    const bronzeCoin6 = React.useRef()
    const bronzeCoin7 = React.useRef()
    const bronzeCoin8 = React.useRef()
    const bronzeCoin9 = React.useRef()
    const bronzeCoin10 = React.useRef()
    const asteroid1 = React.useRef()
    const fuel1 = React.useRef()

    const rocketExponentLaunch = React.useRef(-1)
    const requestRef = React.useRef()
    const [play, setPlay] = React.useState(false)

    const rocketCoords = React.useRef({x: 0, y: 0, z: 0})
    const bronzeCoin1Coords = React.useRef({x: 0, y: 0, z: 0})
    const bronzeCoin2Coords = React.useRef({x: 0, y: 0, z: 0})
    const bronzeCoin3Coords = React.useRef({x: 0, y: 0, z: 0})
    const bronzeCoin4Coords = React.useRef({x: 0, y: 0, z: 0})
    const bronzeCoin5Coords = React.useRef({x: 0, y: 0, z: 0})
    const bronzeCoin6Coords = React.useRef({x: 0, y: 0, z: 0})
    const bronzeCoin7Coords = React.useRef({x: 0, y: 0, z: 0})
    const bronzeCoin8Coords = React.useRef({x: 0, y: 0, z: 0})
    const bronzeCoin9Coords = React.useRef({x: 0, y: 0, z: 0})
    const bronzeCoin10Coords = React.useRef({x: 0, y: 0, z: 0})
    const asteroid1Coords = React.useRef({x: 0, y: 0, z: 0})
    const fuel1Coords = React.useRef({x: 0, y: 0, z: 0})

    const frames = React.useRef({currentFrames: 0, expectFrames: 80})

    React.useEffect(() => {
        rocketCoords.current = getCoords(rocket.current)
        bronzeCoin1Coords.current = getCoords(bronzeCoin1.current)
        bronzeCoin2Coords.current = getCoords(bronzeCoin2.current)
        bronzeCoin3Coords.current = getCoords(bronzeCoin3.current)
        bronzeCoin4Coords.current = getCoords(bronzeCoin4.current)
        bronzeCoin5Coords.current = getCoords(bronzeCoin5.current)
        bronzeCoin6Coords.current = getCoords(bronzeCoin6.current)
        bronzeCoin7Coords.current = getCoords(bronzeCoin7.current)
        bronzeCoin8Coords.current = getCoords(bronzeCoin8.current)
        bronzeCoin9Coords.current = getCoords(bronzeCoin9.current)
        bronzeCoin10Coords.current = getCoords(bronzeCoin10.current)
        asteroid1Coords.current = getCoords(asteroid1.current)
        fuel1Coords.current = getCoords(fuel1.current)
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
        if (touchPositionRef.current.x - MapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx) > 3) {
            const newXCoord = rocketCoords.current.x + Constants.ROCKET_TOUCH_MOVE_SPEED
            let newZCoord = rocketCoords.current.z

            if (isTouch.current === true) {
                if (newZCoord < Constants.ROCKET_Z_DEGREE) {
                    newZCoord = rocketCoords.current.z + Constants.ROCKET_Z_MOVE
                    rocketCoords.current.z = newZCoord
                }
                rocket.current.style.transform = `translate(${newXCoord}px, ${rocketCoords.current.y}px) rotate(${newZCoord}deg)`
                rocketCoords.current.x = newXCoord
            } else {
                const lastMovePosition = MapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx)
                touchPositionRef.current = lastMovePosition
            }   
        }

        // движение налево
        if (MapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx) - touchPositionRef.current.x > 3 ) {
            const newXCoord = rocketCoords.current.x - Constants.ROCKET_TOUCH_MOVE_SPEED
            let newZCoord = rocketCoords.current.z

            if (isTouch.current === true) {
                if (newZCoord > -Constants.ROCKET_Z_DEGREE) {
                    newZCoord = rocketCoords.current.z - Constants.ROCKET_Z_MOVE
                    rocketCoords.current.z = newZCoord
                }
                rocket.current.style.transform = `translate(${newXCoord}px, ${rocketCoords.current.y}px) rotate(${newZCoord}deg)`
                rocketCoords.current.x = newXCoord
            } else {
                const lastMovePosition = MapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx)
                touchPositionRef.current = lastMovePosition
            }
        }

        if (isTouch.current === false) {
            let newZCoord = rocketCoords.current.z

            if (newZCoord > 0) {
                newZCoord = newZCoord - Constants.ROCKET_Z_MOVE
                rocketCoords.current.z = newZCoord
                rocket.current.style.transform = `translate(${rocketCoords.current.x}px, ${rocketCoords.current.y}px) rotate(${newZCoord}deg)`
            }
            if(newZCoord < 0) {
                newZCoord = newZCoord + Constants.ROCKET_Z_MOVE
                rocketCoords.current.z = newZCoord
                rocket.current.style.transform = `translate(${rocketCoords.current.x}px, ${rocketCoords.current.y}px) rotate(${newZCoord}deg)`
            }
        }
    }

    //----------------element animation----------------//
    const animateArr = React.useRef([]) // {elem: bronzeCoin1, startPosition: 13}
    const allCoins = ["bronzeCoin1", "bronzeCoin2", "bronzeCoin3", "bronzeCoin4", "bronzeCoin5", "bronzeCoin6", "bronzeCoin7", "bronzeCoin8", 
    "bronzeCoin9", "bronzeCoin10"]
    const allAsteroid = ["asteroid1"]
    const allFuel = ["fuel1"]

    
    function startAnimateElem() {
        const elemsToRemove = []
        for (let i = 0; i < animateArr.current.length; i++) { 
            if (animateArr.current[i].elem === "bronzeCoin1") {
                const remove = elementAnimation(bronzeCoin1, bronzeCoin1Coords, animateArr.current[i].startPosition, Constants.ELEMENT_COIN_INIT_POSITION)
                if (remove) elemsToRemove.push("bronzeCoin1")
            }
            if (animateArr.current[i].elem === "bronzeCoin2") {
                const remove = elementAnimation(bronzeCoin2, bronzeCoin2Coords, animateArr.current[i].startPosition, Constants.ELEMENT_COIN_INIT_POSITION)
                if (remove) elemsToRemove.push("bronzeCoin2")
            }
            if (animateArr.current[i].elem === "bronzeCoin3") {
                const remove = elementAnimation(bronzeCoin3, bronzeCoin3Coords, animateArr.current[i].startPosition, Constants.ELEMENT_COIN_INIT_POSITION)
                if (remove) elemsToRemove.push("bronzeCoin3")
            }
            if (animateArr.current[i].elem === "bronzeCoin4") {
                const remove = elementAnimation(bronzeCoin4, bronzeCoin4Coords, animateArr.current[i].startPosition, Constants.ELEMENT_COIN_INIT_POSITION)
                if (remove) elemsToRemove.push("bronzeCoin4")
            }
            if (animateArr.current[i].elem === "bronzeCoin5") {
                const remove = elementAnimation(bronzeCoin5, bronzeCoin5Coords, animateArr.current[i].startPosition, Constants.ELEMENT_COIN_INIT_POSITION)
                if (remove) elemsToRemove.push("bronzeCoin5")
            }
            if (animateArr.current[i].elem === "bronzeCoin6") {
                const remove = elementAnimation(bronzeCoin6, bronzeCoin6Coords, animateArr.current[i].startPosition, Constants.ELEMENT_COIN_INIT_POSITION)
                if (remove) elemsToRemove.push("bronzeCoin6")
            }
            if (animateArr.current[i].elem === "bronzeCoin7") {
                const remove = elementAnimation(bronzeCoin7, bronzeCoin7Coords, animateArr.current[i].startPosition, Constants.ELEMENT_COIN_INIT_POSITION)
                if (remove) elemsToRemove.push("bronzeCoin7")
            }
            if (animateArr.current[i].elem === "asteroid1") {
                const remove = elementAnimation(asteroid1, asteroid1Coords, animateArr.current[i].startPosition, Constants.ELEMENT_ASTEROID_INIT_POSITION)
                if (remove) elemsToRemove.push("asteroid1")
            }
            if (animateArr.current[i].elem === "fuel1") {
                const remove = elementAnimation(fuel1, fuel1Coords, animateArr.current[i].startPosition, Constants.ELEMENT_FUEL_INIT_POSITION)
                if (remove) elemsToRemove.push("fuel1")
            }
        }

        for (let i = 0; i < elemsToRemove.length; i++) {
            for (let j = 0; j < animateArr.current.length; j++) {
                if (elemsToRemove[i] === animateArr.current[j].elem) {
                    // consoleRef(animateArr)
                    // console.log(elemsToRemove)
                    animateArr.current.splice(j, 1)
                    elemsToRemove.splice(i, 1)
                    i--
                    // consoleRef(animateArr)
                    break
                }
            }
        }
    }

    function addAnimateElem() {
        if (frames.current.currentFrames > frames.current.expectFrames) {
            const elemType = RandomlyDefineElement() // "coin" or "asteroid" or "fuel"
            const newXElementCoord = RandomlyDefineXCoord(
            WidthDiveided2, elemType, bronzeCoin1, fuel1, asteroid1) // отдаёт координаты в зависимости от элемента
            const framesQuantity = RandomlyExpectFrames()

            if (animateArr.current.length === 0) {
                if (elemType === "coin") animateArr.current.push({elem: allCoins[0], startPosition: newXElementCoord})
                if (elemType === "asteroid") animateArr.current.push({elem: allAsteroid[0], startPosition: newXElementCoord})
                if (elemType === "fuel") animateArr.current.push({elem: allFuel[0], startPosition: newXElementCoord})
                // consoleRef(animateArr)
            } else {
                if (elemType === "coin") {
                    for (let i = 0; i < allCoins.length; i++) {
                        const pushed = handleAnimateArrElement(allCoins[i], animateArr, newXElementCoord)
                        if (pushed === true) break
                    }
                }
                if (elemType === "asteroid") {                  
                    for (let i = 0; i < allAsteroid.length; i++) {
                        const pushed = handleAnimateArrElement(allAsteroid[i], animateArr, newXElementCoord)
                        if (pushed === true) break
                    }
                }
                if (elemType === "fuel") {           
                    for (let i = 0; i < allFuel.length; i++) {
                        const pushed = handleAnimateArrElement(allFuel[i], animateArr, newXElementCoord)
                        if (pushed === true) break
                    }  
                }
            }
            frames.current.currentFrames = -1
            frames.current.expectFrames = framesQuantity
            // consoleRef(animateArr)
        }
        frames.current.currentFrames++
    }

    // collision
    function hasCollision() {
        const RocketYTop = rocketCoords.current.y
        const RocketYBottom = rocketCoords.current.y + rocket.current.clientHeight
        
        for (let i = 0; i < animateArr.current.length; i++) { 
            let elemYTop
            let elemYBottom 
            if (animateArr.current[i].elem === "bronzeCoin1") {
                elemYTop = bronzeCoin1Coords.current.y
                elemYBottom = bronzeCoin1Coords.current.y + bronzeCoin1.current.clientHeight
            }
            if (animateArr.current[i].elem === "bronzeCoin2") {
                elemYTop = bronzeCoin2Coords.current.y
                elemYBottom = bronzeCoin2Coords.current.y + bronzeCoin2.current.clientHeight
            }
            if (animateArr.current[i].elem === "bronzeCoin3") {
                elemYTop = bronzeCoin3Coords.current.y
                elemYBottom = bronzeCoin3Coords.current.y + bronzeCoin3.current.clientHeight
            }
            if (animateArr.current[i].elem === "bronzeCoin4") {
                elemYTop = bronzeCoin4Coords.current.y
                elemYBottom = bronzeCoin4Coords.current.y + bronzeCoin4.current.clientHeight
            }
            if (animateArr.current[i].elem === "bronzeCoin5") {
                elemYTop = bronzeCoin5Coords.current.y
                elemYBottom = bronzeCoin5Coords.current.y + bronzeCoin5.current.clientHeight
            }
            if (animateArr.current[i].elem === "bronzeCoin6") {
                elemYTop = bronzeCoin6Coords.current.y
                elemYBottom = bronzeCoin6Coords.current.y + bronzeCoin6.current.clientHeight
            }
            if (animateArr.current[i].elem === "bronzeCoin7") {
                elemYTop = bronzeCoin7Coords.current.y
                elemYBottom = bronzeCoin7Coords.current.y + bronzeCoin7.current.clientHeight
            }
            if (animateArr.current[i].elem === "asteroid1") {
                elemYTop = asteroid1Coords.current.y
                elemYBottom = asteroid1Coords.current.y + asteroid1.current.clientHeight
            }
            if (animateArr.current[i].elem === "fuel1") {
                elemYTop = fuel1Coords.current.y
                elemYBottom = fuel1Coords.current.y + fuel1.current.clientHeight
            }

            if (RocketYTop < elemYBottom && RocketYBottom > elemYTop) {
                console.log("collizion false")
            }
        }
    }

    const animate = () => {
        rocketAnimation()
        addAnimateElem()
        startAnimateElem()
        hasCollision()

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
                

                <img className="game__coin bronzecoin" ref={bronzeCoin1} src={String(BronzecoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
                <img className="game__coin bronzecoin" ref={bronzeCoin2} src={String(BronzecoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
                <img className="game__coin bronzecoin" ref={bronzeCoin3} src={String(BronzecoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
                <img className="game__coin bronzecoin" ref={bronzeCoin4} src={String(BronzecoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
                <img className="game__coin bronzecoin" ref={bronzeCoin5} src={String(BronzecoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
                <img className="game__coin bronzecoin" ref={bronzeCoin6} src={String(BronzecoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
                <img className="game__coin bronzecoin" ref={bronzeCoin7} src={String(BronzecoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
                <img className="game__coin bronzecoin" ref={bronzeCoin8} src={String(BronzecoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
                <img className="game__coin bronzecoin" ref={bronzeCoin9} src={String(BronzecoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
                <img className="game__coin bronzecoin" ref={bronzeCoin10} src={String(BronzecoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>

                <img className="game__asteroid" ref={asteroid1} src={String(AsteroidImg)} alt="" style={{width: `${asteroidWidth}px`}}/>
                <img className="game__fuel" ref={fuel1} src={String(FuelImg)} alt="" style={{width: `${fuelWidth}px`}}/>

                <button className="game__button_start" onClick={() => setPlay(!play)}>
                    start game
                </button>
            </div>
        </div>
    )
}

export default Game