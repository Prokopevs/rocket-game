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

export function mapValue(value: number, min1: number, max1: number, min2: number, max2: number) {
    return min2 + (max2 - min2) * ((value - min1) / (max1 - min1))
}