import { Constants } from "../Constants"
import { RocketObject } from "./types"

export function handleAnimateArrElement(element: string, animateArr: any, newXElementCoord: number) {
    for (let j = 0; j < animateArr.current.length; j++) {
      if (element === animateArr.current[j].elem) {
        break
      }
      if (j === animateArr.current.length - 1) { // последняя итерация
        animateArr.current.push({elem: element, startPosition: newXElementCoord, removed: false})
        // consoleRef(animateArr)
        return true
      }
    }
    return false
  }

export function elementAnimation(element: any, elementCoords: any, startPosition: number, elementInitialYCoord: number) { 
    let newYElementCoord = elementCoords.current.y + Constants.ELEMENT_DOWN_SPEED 

    if (newYElementCoord > Constants.MAX_HEIGHT) { // если спустился вниз
        elementCoords.current.y = elementInitialYCoord
        element.current.style.transform = `translate(${startPosition}px, 
        ${elementInitialYCoord}px)`
        element.current.style.display = 'initial'
        return true
    }

    elementCoords.current.y = newYElementCoord
    elementCoords.current.x = startPosition
    element.current.style.transform = `translate(${startPosition}px, ${newYElementCoord}px)`
    return false
}

export function elemCurrentCoords(elem: any, elemCoords: any, rocketObj: RocketObject) {
  const elemWidthDeveded2 = elem.current.clientWidth / 2
  const elemYTop = elemCoords.current.y
  const elemYBottom = elemCoords.current.y + elem.current.clientHeight
  const elemXLeft = elemCoords.current.x - elemWidthDeveded2
  const elemXRight = elemCoords.current.x + elemWidthDeveded2
  
  const { RocketYTop, RocketYBottom, RocketXLeft, RocketXRight } = rocketObj

  if ((RocketYTop < elemYBottom && RocketYBottom > elemYTop) && (RocketXLeft < elemXRight && RocketXRight > elemXLeft)) {
    elem.current.style.display = 'none'
    return true
  }
  return false
}

export function removeAllVisibleElements(animateArr: any, bronzeCoin1: any, bronzeCoin2: any, bronzeCoin3: any, bronzeCoin4: any, bronzeCoin5: any, bronzeCoin6: any, 
  bronzeCoin7: any, asteroid1: any, asteroid2: any, fuel1: any,bronzeCoin1Coords: any, bronzeCoin2Coords: any, bronzeCoin3Coords: any, bronzeCoin4Coords: any, 
  bronzeCoin5Coords: any, bronzeCoin6Coords: any, bronzeCoin7Coords: any, asteroid1Coords: any, asteroid2Coords: any, fuel1Coords: any, 
  ELEMENT_COIN_INIT_POSITION: number, ELEMENT_ASTEROID_INIT_POSITION: number, ELEMENT_FUEL_INIT_POSITION: number) 
  {
    for (let i = 0; i < animateArr.current.length; i++) {
      if (animateArr.current[i].elem === "bronzeCoin1") {
        remove(bronzeCoin1, bronzeCoin1Coords, ELEMENT_COIN_INIT_POSITION)
      }
      if (animateArr.current[i].elem === "bronzeCoin2") {
        remove(bronzeCoin2, bronzeCoin2Coords, ELEMENT_COIN_INIT_POSITION)
      }
      if (animateArr.current[i].elem === "bronzeCoin3") {
        remove(bronzeCoin3, bronzeCoin3Coords, ELEMENT_COIN_INIT_POSITION)
      }
      if (animateArr.current[i].elem === "bronzeCoin4") {
        remove(bronzeCoin4, bronzeCoin4Coords, ELEMENT_COIN_INIT_POSITION)
      }
      if (animateArr.current[i].elem === "bronzeCoin5") {
        remove(bronzeCoin5, bronzeCoin5Coords, ELEMENT_COIN_INIT_POSITION)
      }
      if (animateArr.current[i].elem === "bronzeCoin6") {
        remove(bronzeCoin6, bronzeCoin6Coords, ELEMENT_COIN_INIT_POSITION)
      }
      if (animateArr.current[i].elem === "bronzeCoin7") {
        remove(bronzeCoin7, bronzeCoin7Coords, ELEMENT_COIN_INIT_POSITION)
      }
      if (animateArr.current[i].elem === "asteroid1") {
        remove(asteroid1, asteroid1Coords, ELEMENT_ASTEROID_INIT_POSITION)
      }
      if (animateArr.current[i].elem === "asteroid2") {
        remove(asteroid2, asteroid2Coords, ELEMENT_ASTEROID_INIT_POSITION)
      }
      if (animateArr.current[i].elem === "fuel1") {
        remove(fuel1, fuel1Coords, ELEMENT_FUEL_INIT_POSITION)
      }
    }

    animateArr.current = []
  }

function remove(element: any, elementCoords: any, elementInitialYCoord: any) {
  elementCoords.current.y = elementInitialYCoord
  element.current.style.transform = `translate(${elementCoords.current.x}px, ${elementInitialYCoord}px)`
  element.current.style.display = 'initial'
}

  export function stars() {
    let count = 20
    let game = document.querySelector('.game')
    let i = 0
    while (i < count) {
      let star = document.createElement('i')
      let x = Math.floor(Math.random() * window.innerWidth)

      let duration = Math.random() * 3
      let h = Math.random() * 50
      
      star.style.left = x + 'px'
      star.style.width = 1 + 'px'
      star.style.height = 10 + h + 'px'
      star.style.animationDuration = duration + 's'
      
      game?.appendChild(star);
      i++
    }
  } 

export function deleteStars() {
  let stars = document.querySelectorAll('.game i');
  stars.forEach(star => {
    star.remove();
  });
}