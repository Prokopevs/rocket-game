import '../style/pages/game.css';
import { BronzecoinImg, AsteroidImg, FuelImg, Oil, Pause } from "../pictures"
import { Constants } from '../Constants';
import React from "react";
import { RandomlyDefineElement, RandomlyDefineXCoord, RandomlyExpectFrames, getCoords } from '../lib/helpers';
import { DefineElemsWidth, deleteStars, elemCurrentCoords, elementAnimation, handleAnimateArrElement, initRocket, onTouchEndLeftFunc, onTouchEndRightFunc, 
    onTouchStartLeftFunc, onTouchStartRightFunc, removeAllVisibleElements, stars } from '../lib/gameHelp';
import GameFooterOver from '../components/GameFooter/GameFooterOver';
import GameFooterStopped from '../components/GameFooter/GameFooterStoped';
import { CSSTransition } from 'react-transition-group';
import Player from "../components/fire/player"; 
import PopupInfo from "../components/PopupInfo"; 
import { useNavigate } from "react-router-dom"
import { createSignature } from '../helpers/createSignature';
import { updateScore } from '../http/updateMultiplicator';

const Game = ({play, setPlay, onClickPlay, setScore, score, isNotReload, tickGas, userData, game}) => {
    const navigate = useNavigate()

    const obj = DefineElemsWidth()
    const {coinsWidth, asteroidWidth, fuelWidth, rocketWidth, rocketHeight, framerocketwidth} = obj
    const rocketWidthDevided2 = rocketWidth / 2
    const rocketCutWidth = 8 * rocketWidth / 100 // с каждой стороны уберем 2 % для коллизии.
    const rocketCutHeightTop = 4 * rocketHeight / 100 // с сверху уберем 2 % для коллизии.
    const rocketCutHeightBottom = 35 * rocketHeight / 100 // с снизу уберем 30 % для коллизии.

    const maxRocketLaunchYHeightPx = (Constants.MAX_HEIGHT * 72) / 100
    const maxRocketRightMovePx = (Constants.MAX_WIDTH / 2) - (rocketWidth / 2) // для ракеты максимальное направо это 300
    const minRocketLeftMovePx = -maxRocketRightMovePx // мин налево -300 так как общая ширина 600

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
    const asteroid2 = React.useRef()
    const fuel1 = React.useRef()

    const rocketExponentLaunch = React.useRef(-1)
    const requestRef = React.useRef()
    const StoreTick = React.useRef(0)
    const AsteroidCollTick = React.useRef(0)
    const [localScore, setLocalScore] = React.useState(0)
    const [gas, setGas] = React.useState(100)
   
    const [pause, setPause] = React.useState(false)
    const [gameOver, setGameOver] = React.useState(false)
    const allowTick = React.useRef(true)
    
    const [showPopup, setShowPopup] = React.useState(false)

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
    const asteroid2Coords = React.useRef({x: 0, y: 0, z: 0})
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
        asteroid2Coords.current = getCoords(asteroid2.current)
        fuel1Coords.current = getCoords(fuel1.current)
    }, [])

    //----------------touch area----------------//
    const isTouchRight = React.useRef(false)
    const isTouchLeft = React.useRef(false)

    // ------------rocket animation--------------//
    function rocketAnimation() {
        // движение вверх
        if (rocketCoords.current.y > maxRocketLaunchYHeightPx) { //ракета долетает максимум до 72vh высоты экрана

            const speed = Math.exp(rocketExponentLaunch.current)
            const newYCoord = rocketCoords.current.y - speed
            rocketCoords.current.y = newYCoord // заранение поменяли координату

            rocket.current.style.transform = `translate(${rocketCoords.current.x}px, ${newYCoord}px)`
            
            if (rocketExponentLaunch.current < 1.4) {  // максимальная скорость вылета ракета со старта
                rocketExponentLaunch.current = rocketExponentLaunch.current + Constants.ROCKET_START_INCREACE_COEFF
            }
        }

        if (isTouchLeft.current === true && isTouchRight.current === true) {
            //ничего не делаем
        } else {
            // движение направо
            if (isTouchRight.current === true && rocketCoords.current.x < maxRocketRightMovePx) {
                const newXCoord = rocketCoords.current.x + Constants.ROCKET_TOUCH_MOVE_SPEED
                let newZCoord = rocketCoords.current.z

                if (newZCoord < Constants.ROCKET_Z_DEGREE) {
                    newZCoord = rocketCoords.current.z + Constants.ROCKET_Z_MOVE
                    rocketCoords.current.z = newZCoord
                }
                rocket.current.style.transform = `translate(${newXCoord}px, ${rocketCoords.current.y}px) rotate(${newZCoord}deg)`
                rocketCoords.current.x = newXCoord
            }

            // движение налево
            if (isTouchLeft.current === true && rocketCoords.current.x > minRocketLeftMovePx) {
                const newXCoord = rocketCoords.current.x - Constants.ROCKET_TOUCH_MOVE_SPEED
                let newZCoord = rocketCoords.current.z

                if (newZCoord > -Constants.ROCKET_Z_DEGREE) {
                    newZCoord = rocketCoords.current.z - Constants.ROCKET_Z_MOVE
                    rocketCoords.current.z = newZCoord
                }
                rocket.current.style.transform = `translate(${newXCoord}px, ${rocketCoords.current.y}px) rotate(${newZCoord}deg)`
                rocketCoords.current.x = newXCoord
            }
        }
        

        if (isTouchRight.current === false && isTouchLeft.current === false) {
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
    const allAsteroid = ["asteroid1", "asteroid2"]
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
            if (animateArr.current[i].elem === "asteroid2") {
                const remove = elementAnimation(asteroid2, asteroid2Coords, animateArr.current[i].startPosition, Constants.ELEMENT_ASTEROID_INIT_POSITION)
                if (remove) elemsToRemove.push("asteroid2")
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
            Constants.MAX_WIDTH / 2, elemType, bronzeCoin1, fuel1, asteroid1) // отдаёт координаты в зависимости от элемента
            const framesQuantity = RandomlyExpectFrames()

            if (animateArr.current.length === 0) {
                if (elemType === "coin") animateArr.current.push({elem: allCoins[0], startPosition: newXElementCoord, removed: false})
                if (elemType === "asteroid") animateArr.current.push({elem: allAsteroid[0], startPosition: newXElementCoord, removed: false})
                if (elemType === "fuel") animateArr.current.push({elem: allFuel[0], startPosition: newXElementCoord, removed: false})
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
        const obj = {
            RocketYTop: rocketCoords.current.y + rocketCutHeightTop,
            RocketYBottom: rocketCoords.current.y + rocketHeight - rocketCutHeightBottom,
            RocketXLeft: rocketCoords.current.x - rocketWidthDevided2 + rocketCutWidth,
            RocketXRight: rocketCoords.current.x + rocketWidthDevided2 - rocketCutWidth,
        }
        
        for (let i = 0; i < animateArr.current.length; i++) { 
            if (animateArr.current[i].elem === "bronzeCoin1" && animateArr.current[i].removed === false) {
                const isCollision = elemCurrentCoords(bronzeCoin1, bronzeCoin1Coords, obj)
                if (isCollision) {
                    setLocalScore((localScore) => localScore + 1)
                    StoreTick.current = StoreTick.current + 1
                    animateArr.current[i].removed = true
                    continue
                }
            }
            if (animateArr.current[i].elem === "bronzeCoin2" && animateArr.current[i].removed === false) {
                const isCollision = elemCurrentCoords(bronzeCoin2, bronzeCoin2Coords, obj)
                if (isCollision) {
                    setLocalScore((localScore) => localScore + 1)
                    StoreTick.current = StoreTick.current + 1
                    animateArr.current[i].removed = true
                    continue
                }
            }
            if (animateArr.current[i].elem === "bronzeCoin3" && animateArr.current[i].removed === false) {
                const isCollision = elemCurrentCoords(bronzeCoin3, bronzeCoin3Coords, obj)
                if (isCollision) {
                    setLocalScore((localScore) => localScore + 1)
                    StoreTick.current = StoreTick.current + 1
                    animateArr.current[i].removed = true
                    continue
                }
            }
            if (animateArr.current[i].elem === "bronzeCoin4" && animateArr.current[i].removed === false) {
                const isCollision = elemCurrentCoords(bronzeCoin4, bronzeCoin4Coords, obj)
                if (isCollision) {
                    setLocalScore((localScore) => localScore + 1)
                    StoreTick.current = StoreTick.current + 1
                    animateArr.current[i].removed = true
                    continue
                }
            }
            if (animateArr.current[i].elem === "bronzeCoin5" && animateArr.current[i].removed === false) {
                const isCollision = elemCurrentCoords(bronzeCoin5, bronzeCoin5Coords, obj)
                if (isCollision) {
                    setLocalScore((localScore) => localScore + 1)
                    StoreTick.current = StoreTick.current + 1
                    animateArr.current[i].removed = true
                    continue
                }
            }
            if (animateArr.current[i].elem === "bronzeCoin6" && animateArr.current[i].removed === false) {
                const isCollision = elemCurrentCoords(bronzeCoin6, bronzeCoin6Coords, obj)
                if (isCollision) {
                    setLocalScore((localScore) => localScore + 1)
                    StoreTick.current = StoreTick.current + 1
                    animateArr.current[i].removed = true
                    continue
                }
            }
            if (animateArr.current[i].elem === "bronzeCoin7" && animateArr.current[i].removed === false) {
                const isCollision = elemCurrentCoords(bronzeCoin7, bronzeCoin7Coords, obj)
                if (isCollision) {
                    setLocalScore((localScore) => localScore + 1)
                    StoreTick.current = StoreTick.current + 1
                    animateArr.current[i].removed = true
                    continue
                }
            }
            if (animateArr.current[i].elem === "asteroid1" && animateArr.current[i].removed === false) {
                const isCollision = elemCurrentCoords(asteroid1, asteroid1Coords, obj)
                if (isCollision) {
                    AsteroidCollTick.current = AsteroidCollTick.current + 1
                    if (AsteroidCollTick.current === game.protection) {
                        finishGame()
                        return
                    }
                    animateArr.current[i].removed = true
                }
            }
            if (animateArr.current[i].elem === "asteroid2" && animateArr.current[i].removed === false) {
                const isCollision = elemCurrentCoords(asteroid2, asteroid2Coords, obj)
                if (isCollision) {
                    AsteroidCollTick.current = AsteroidCollTick.current + 1
                    if (AsteroidCollTick.current === game.protection) {
                        finishGame()
                        return
                    }
                    animateArr.current[i].removed = true
                }
            }
            if (animateArr.current[i].elem === "fuel1" && animateArr.current[i].removed === false) {
                const isCollision = elemCurrentCoords(fuel1, fuel1Coords, obj)
                if (isCollision) {
                    if ((tickGas.current - 5) < 0) {
                        tickGas.current = 0
                    } else {
                        tickGas.current = tickGas.current - 5
                    }
                    animateArr.current[i].removed = true
                    continue
                }
            }
        }
    }


    async function finishGame () {
        removeAllVisibleElements(animateArr, bronzeCoin1, bronzeCoin2, bronzeCoin3, bronzeCoin4, bronzeCoin5, bronzeCoin6, bronzeCoin7, asteroid1, asteroid2, fuel1,
            bronzeCoin1Coords, bronzeCoin2Coords, bronzeCoin3Coords, bronzeCoin4Coords, bronzeCoin5Coords, bronzeCoin6Coords, bronzeCoin7Coords, 
            asteroid1Coords, asteroid2Coords, fuel1Coords, Constants.ELEMENT_COIN_INIT_POSITION, Constants.ELEMENT_ASTEROID_INIT_POSITION, 
            Constants.ELEMENT_FUEL_INIT_POSITION)
        initRocket(rocket, rocketCoords)
        setPlay(() => false)
        setGameOver(() => true) // показать конечное модальное окно
        setScore(() => (score + StoreTick.current))

        const signature = createSignature(userData.id, StoreTick.current)
        const response = await updateScore(userData.id, StoreTick.current, signature)
    }

    function checkEndGame() {
        if(tickGas.current < Constants.TIME_TO_PLAY + game.gasStorage*20) {
            tickGas.current = tickGas.current + 1
            allowTick.current = true
            const percent = 100 - ((tickGas.current * 100) / (Constants.TIME_TO_PLAY + game.gasStorage*20))
            setGas(() => percent)
        } else {    
            tickGas.current = 0
            allowTick.current = true
            finishGame()
        }
    }

    function stopGame() {
        if (gameOver !== true) {
            setPlay(() => false)
            setPause(() => true)
        }
    }

    const animate = () => {
        rocketAnimation()
        addAnimateElem()
        startAnimateElem()
        hasCollision()

        if (allowTick.current === true) {
            allowTick.current = false
            setTimeout(checkEndGame, 250)
        }
        requestRef.current = requestAnimationFrame(animate)
    }

    React.useEffect(() => {
        if (play) {
            requestRef.current = requestAnimationFrame(animate)
            stars()
        
            return () => {
                if (requestRef.current) {
                    cancelAnimationFrame(requestRef.current)
                    console.log("stop")
                    deleteStars()
                }
            }
        }
    }, [play]);

    React.useEffect(() => {
        if (isNotReload === false) {
            navigate(`/rocket-game`)
        }
    }, []);

    return (
        <div className="game">
            <CSSTransition in={showPopup} timeout={150} classNames="my-node" unmountOnExit>
                <PopupInfo text={"Not enough gas"} />
            </CSSTransition>
            <div className="game__road">
                <div className="game__toucharea">
                    <div className="game__toucharea_button" 
                    onTouchStart={() => onTouchStartLeftFunc(isTouchLeft)} onTouchEnd={() => onTouchEndLeftFunc(isTouchLeft)}></div>

                    <div className="game__toucharea_button" 
                    onTouchStart={() => onTouchStartRightFunc(isTouchRight)} onTouchEnd={() => onTouchEndRightFunc(isTouchRight)}></div>
                </div>

                <div className="game__rocket" ref={rocket}>
                    {!gameOver && <Player rocketWidth = {rocketWidth} rocketHeight = {rocketHeight} framerocketwidth = {framerocketwidth}
                    pause = {pause}/>}
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
                <img className="game__asteroid" ref={asteroid2} src={String(AsteroidImg)} alt="" style={{width: `${asteroidWidth}px`}}/>

                <img className="game__fuel" ref={fuel1} src={String(FuelImg)} alt="" style={{width: `${fuelWidth}px`}}/>

                <img className="game__button_start" src={String(Pause)} alt="" onClick={() => stopGame()}/>

                <div className="game__info">
                    <div className="game__score">
                        <img className="game__score_img" src={String(BronzecoinImg)} alt="" style={{width: `${coinsWidth / 1.4}px`}}/>
                        <div className="game__score_coins"> {localScore} </div>
                    </div>
                    <div className="game__percent">
                        <img className="game__percent_img" src={String(Oil)} alt="" style={{width: `${coinsWidth / 1.8}px`}}/>
                        <div className="game__percent_num"> {Math.floor(gas)} % </div>
                    </div>
                </div>``

            </div>  
            <div className="game_popaps">
                <CSSTransition in={pause} timeout={150} classNames="my-node" unmountOnExit>
                    <GameFooterStopped setPlay={setPlay} setPause={setPause}/>
                </CSSTransition>

                <CSSTransition in={gameOver} timeout={150} classNames="my-node" unmountOnExit>
                    <GameFooterOver setPlay={setPlay} setGameOver ={setGameOver} onClickPlay={onClickPlay} showPopup={showPopup} 
                    setShowPopup={setShowPopup} localScore={localScore} setLocalScore={setLocalScore} StoreTick={StoreTick} AsteroidCollTick={AsteroidCollTick}/>
                </CSSTransition>
            </div>
        </div>
    )
}

export default Game

// src={String(AsteroidImg)}