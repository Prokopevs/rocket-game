// import '../style/pages/game.css';
// import { RocketImg, BronzecoinImg, SilvercoinImg, GoldcoinImg, AsteroidImg, FuelImg } from "../pictures"
// import { Constants } from '../Constants';
// import React from "react";
// import { getCoords, mapValue } from '../lib/helpers';

// const Game = () => {
//     const rocketWidth = Constants.MAX_WIDTH / 7
//     const coinsWidth = Constants.MAX_WIDTH / 13
//     const asteroidWidth = Constants.MAX_WIDTH / 5
//     const fuelWidth = Constants.MAX_WIDTH / 8

//     const maxRocketLaunchYHeightPx = (Constants.MAX_HEIGHT * 65) / 100
//     const maxRocketRightMovePx = Constants.MAX_WIDTH - rocketWidth // для ракеты максимальное направо
//     const minRocketLeftMovePx = 0 // мин налево

//     const gameTouchAreaWigth = Constants.MAX_WIDTH * 45 / 100 // 45% ширина области для управления ракетой
//     const minTouchAreaWigthMovePx = (Constants.MAX_WIDTH - gameTouchAreaWigth) / 2 
//     const maxTouchAreaWigthMovePx = gameTouchAreaWigth + minTouchAreaWigthMovePx
//     const gameTouchAreaHeight = Constants.MAX_HEIGHT * 40 / 100 // 40% высота области для управления ракетой нужно менять в css
//     const minTouchAreaHeightMovePx = Constants.MAX_HEIGHT - gameTouchAreaHeight
//     const maxTouchAreaHeightMovePx = Constants.MAX_HEIGHT

//     const rocket = React.useRef()
//     const requestRef = React.useRef()
//     const [play, setPlay] = React.useState(false)
    
//     // ------------rocket animation--------------//
//     const rocketCoords = React.useRef({x: 0, y: 0})
//     const rocketExponentLaunch = React.useRef(-1)
//     React.useEffect(() => {
//         rocketCoords.current = getCoords(rocket.current)
//     }, [])

//     const touchareaRef = React.useRef(null)
//     const touchPositionRef = React.useRef({ x: Constants.MAX_WIDTH / 2 }) // начинаем с координаты по середине так как ракета по середине
//     const isTouch = React.useRef(false)
//     React.useEffect(() => {
//         const handleTouchMove = (e) => {
//             const touchX = e.touches[0].clientX
//             const touchY = e.touches[0].clientY;
            
//             if (touchX >= minTouchAreaWigthMovePx && touchX <= maxTouchAreaWigthMovePx 
//                 && touchY >= minTouchAreaHeightMovePx && touchY <= maxTouchAreaHeightMovePx && play) 
//             {
//                 touchPositionRef.current = { x: touchX }
//             }
//         }
//         const myArea = touchareaRef.current
//         myArea?.addEventListener('touchmove', handleTouchMove)
//         return () => {
//             myArea?.removeEventListener('touchmove', handleTouchMove)
//         }
//     }, [play])

//     const onTouchStartFunc = (event) => {
//         isTouch.current = true
//     }
    
//     const onTouchEndFunc = (event) => {
//         isTouch.current = false
//     }


//     function rocketAnimation() {
//         if (rocketCoords.current.y > maxRocketLaunchYHeightPx) { // ракета долетает максимум до 65vh высоты экрана

//             const speed = Math.exp(rocketExponentLaunch.current)
//             const newYCoord = rocketCoords.current.y - speed
//             rocketCoords.current.y = newYCoord // заранение поменяли координату

//             rocket.current.style.transform = `translate(${rocketCoords.current.x}px, ${newYCoord}px)`
            
//             if (rocketExponentLaunch.current < 1.4) {  // максимальная скорость вылета ракета со старта
//                 rocketExponentLaunch.current = rocketExponentLaunch.current + Constants.ROCKET_START_INCREACE_COEFF
//             }
//         }
//         console.log(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx,)
//         if (touchPositionRef.current.x - mapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx) > 3) {
            
//             const newXCoord = rocketCoords.current.x + 3
//             if (isTouch.current === true) {
//                 rocket.current.style.transform = `translate(${newXCoord}px, ${rocketCoords.current.y}px)`
//                 rocketCoords.current.x = newXCoord
//             } else {
//                 const lastMovePosition = mapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx)
//                 touchPositionRef.current = lastMovePosition
//             }
            
//         }

//         if (mapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx) - touchPositionRef.current.x > 3 ) {
//             const newXCoord = rocketCoords.current.x - 3
//             if (isTouch.current === true) {
//                 rocket.current.style.transform = `translate(${newXCoord}px, ${rocketCoords.current.y}px)`
//                 rocketCoords.current.x = newXCoord
//             } else {
//                 const lastMovePosition = mapValue(rocketCoords.current.x, minRocketLeftMovePx, maxRocketRightMovePx, minTouchAreaWigthMovePx, maxTouchAreaWigthMovePx)
//                 touchPositionRef.current = lastMovePosition
//             }
//         }
//     }


//     const animate = () => {
//         rocketAnimation()
//         requestRef.current = requestAnimationFrame(animate);
//     }

//     React.useEffect(() => {
//         if (play) {
//             requestRef.current = requestAnimationFrame(animate)
        
//             return () => {
//                 if (requestRef.current) {
//                     cancelAnimationFrame(requestRef.current)
//                     console.log("stop")
//                 }
//             }
//         }
//     }, [play]);


//     return (
//         <div className="game">
//             <div className="game__road">
//                 <div className="game__toucharea" ref={touchareaRef} onTouchStart={onTouchStartFunc} onTouchEnd={onTouchEndFunc}></div>

//                 <img className="game__rocket" src={String(RocketImg)} alt="" style={{width: `${rocketWidth}px`}} ref={rocket}/>

//                 <img className="game__coin bronzecoin" src={String(BronzecoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
//                 <img className="game__coin silvercoin" src={String(SilvercoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>
//                 <img className="game__coin goldcoin" src={String(GoldcoinImg)} alt="" style={{width: `${coinsWidth}px`}}/>

//                 <img className="game__asteroid" src={String(AsteroidImg)} alt="" style={{width: `${asteroidWidth}px`}}/>
//                 <img className="game__fuel" src={String(FuelImg)} alt="" style={{width: `${fuelWidth}px`}}/>

//                 <button className="game__button_start" onClick={() => setPlay(!play)}>
//                     start game
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default Game




// .game {
//     background-image: url("../../assets/space.jpg");
//     background-size: cover;
//     height: 100vh;
//     width: 100vw;
//     background-repeat: no-repeat;
// }

// .game__road {
    
//     height: 100%;
//     width: 100%;
// }

// .game__toucharea {
//     height: 40%;
//     width: 100%;  
//     bottom: 0;
//     position: absolute;
//     z-index: 100;
// }

// .game__rocket {
//     position: absolute;
//     transform: translate(43vw, 80vh);
// }

// .game__coin {
//     position: absolute;
// }

// .bronzecoin {
//     /* transform: translate(100px, -15vh); */
// }

// .silvercoin {
//     /* transform: translate(-100px, -30vh); */
// }

// .goldcoin {
//     /* transform: translate(50px, 9vh); */
// }

// .game__asteroid {
//     /* position: absolute; */
//     /* transform: translate(120px, -30vh); */

// }

// .game__fuel{
//     /* position: absolute;
//     transform: translate(-100px, 20vh); */
// }


// .game__button_start {
//     /* background: transparent;
//     border: none;
//     padding: 0; */
//     z-index: 1000;

// }



// function addAnimateElem() {
//     if (frames.current.currentFrames > frames.current.expectFrames) {
//         const direction = parseInt(Math.random() * 2)
//         const randomXCoord = parseInt(Math.random() * (WidthDiveided2 - (bronzeCoin1.current.clientWidth / 2))) // todo clientWidth
//         const newXelementCoord = direction === 0 ? -randomXCoord : randomXCoord

//         if (animateArr.current.length === 0) {
//             animateArr.current.push({elem: allCoins[0], startPosition: newXelementCoord})
//             frames.current.currentFrames = -1
//             frames.current.expectFrames = 50
//             console.log(animateArr.current)
//             return
//         }
        
//         for (let i = 0; i < allCoins.length; i++) {
//             for (let j = 0; j < animateArr.current.length; j++) {
//                 if (allCoins[i] === animateArr.current[j].elem) {
//                     break
//                 }
//                 if (j === animateArr.current.length - 1) {
//                     animateArr.current.push({elem: allCoins[i], startPosition: newXelementCoord})
//                     frames.current.currentFrames = -1
//                     frames.current.expectFrames = 50
//                     console.log(animateArr.current)
//                     return
//                 }
//             }
//         }
        
//         frames.current.currentFrames = -1
//         frames.current.expectFrames = 50
//         console.log(animateArr.current)
//     }
//     frames.current.currentFrames++
// }