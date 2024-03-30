export const isMobileNavigator = () => {
    let hasTouchScreen = false
    if ("maxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0
    } else if ("msMaxTouchPoints" in navigator) {
      hasTouchScreen = (navigator as any).msMaxTouchPoints > 0
    } else {
      const mQ = typeof window !== 'undefined' &&window.matchMedia && window.matchMedia('(pointer:coarse)');
      if (mQ && mQ.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches
      } else if ("orientation" in window) {
        hasTouchScreen = true; // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = (navigator as Navigator).userAgent
        hasTouchScreen =
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
      }
    }
    return hasTouchScreen
}

export function getCoords(element: any) {
  const matrix = window.getComputedStyle(element).transform
  const array = matrix.split(',')
  const y = array[array.length - 1]
  const x = array[array.length - 2]


  const numericY = parseFloat(y)
  const numericX = parseFloat(x)

  // если понадобится в будующем
  // const computedStyle = window.getComputedStyle(element, null)
  // const val = computedStyle.getPropertyValue('transform')
  // || computedStyle.getPropertyValue('-moz-transform')
  // || computedStyle.getPropertyValue('-webkit-transform')
  // || computedStyle.getPropertyValue('-ms-transform')
  // || computedStyle.getPropertyValue('-o-transform');
  // console.log(val)

  return {x: numericX, y: numericY, z: 0}
}

export function MapValue(value: number, min1: number, max1: number, min2: number, max2: number) {
    return min2 + (max2 - min2) * ((value - min1) / (max1 - min1))
}


const normalElemProbability = 70;
const epicElemProbability = 10;

export function RandomlyDefineElement() {
  const calculated = Math.random() * 100
  if (calculated <= normalElemProbability && calculated > epicElemProbability) {
    // normal 70%
    return "coin"
  } else if (calculated <= epicElemProbability) {
    // epic 10%  
    return "fuel"
  }
  // gas 20%
  return "asteroid"
}


const normalCoinProbability = 80;
const epicCoinProbability = 5;

export function RandomlyDefineCoin() {
  const calculated = Math.random() * 100
  if (calculated <= normalCoinProbability && calculated > epicCoinProbability) {
    // normal 80%
    return "bronze"
  } else if (calculated <= epicCoinProbability) {
    // epic 5%  
    return "gold"
  }
  // gas 15%
  return "silver"
}

export function RandomlyDefineXCoord(
  WidthDiveided2: number, elemType: string, bronzeCoin1: any, fuel1: any, asteroid1: any) 
{
  const direction = parseInt("" + Math.random() * 2)
  let randomXCoord = 0 // по умолчанию
  if (elemType === "coin") {
    randomXCoord = parseInt("" + Math.random() * (WidthDiveided2 - (bronzeCoin1.current.clientWidth / 2)))
  } else if (elemType === "asteroid") {
    randomXCoord = parseInt("" + Math.random() * (WidthDiveided2 - (asteroid1.current.clientWidth / 2)))
  } else if (elemType === "fuel") {
    randomXCoord = parseInt("" + Math.random() * (WidthDiveided2 - (fuel1.current.clientWidth / 2)))
  }
  const newXElementCoord = direction === 0 ? -randomXCoord : randomXCoord

  return newXElementCoord
}

const numbers = [40, 50, 60, 70]
export function RandomlyExpectFrames() {
  const randomIndex = Math.floor(Math.random() * numbers.length)
  return numbers[randomIndex]
}

export function consoleRef(ref: any) {
  const arr = []
  for (let i = 0; i < ref.current.length; i++) {
    arr.push(ref.current[i])
  }
  console.log(arr)
}


