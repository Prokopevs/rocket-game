import { Constants } from "../Constants"

export function handleAnimateArrElement(element: string, animateArr: any, newXElementCoord: number) {
    for (let j = 0; j < animateArr.current.length; j++) {
      if (element === animateArr.current[j].elem) {
        break
      }
      if (j === animateArr.current.length - 1) { // последняя итерация
        animateArr.current.push({elem: element, startPosition: newXElementCoord})
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
        return true
    }

    elementCoords.current.y = newYElementCoord
    elementCoords.current.x = startPosition
    element.current.style.transform = `translate(${startPosition}px, ${newYElementCoord}px)`
    return false
}