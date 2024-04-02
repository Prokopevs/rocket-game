export const Constants = {
    MAX_WIDTH: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    MAX_HEIGHT: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,

    MAX_ASTEROIDS_ON_SCREEN: 2,
    ADD_ASTEROID_SECOND_INTERVAL: 5,

    ADD_FUEL_SECOND_INTERVAL: 10,

    ROCKET_START_INCREACE_COEFF: 0.1,
    ROCKET_TOUCH_MOVE_SPEED: 3,
    ROCKET_Z_MOVE: 0.25,
    ROCKET_Z_DEGREE: 1,

    ELEMENT_DOWN_SPEED: 3,
    ELEMENT_COIN_INIT_POSITION: -80,
    ELEMENT_ASTEROID_INIT_POSITION: -90,
    ELEMENT_FUEL_INIT_POSITION: -60,
}