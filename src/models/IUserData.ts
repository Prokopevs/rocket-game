export interface IUserData {
    id: number;
    firstname: string;
    username: string;
}

export interface IGame {
    ownerId: number
    score: number
    gasStorage: number
    gasMining: number
    protection: number
}