import $api from "../http";

export interface IPrices {
    "1": number
    "2": number
    "3": number
    "4": number
    "5": number
}

interface IData {
    Data: IPrices
}

export const getReferralsReq = async () => {
    try{
        const response = await $api.get<IData>(`game/getPrices`)
        return response
    }
    catch(error) {
        console.log(error)
    }
};