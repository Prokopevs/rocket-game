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