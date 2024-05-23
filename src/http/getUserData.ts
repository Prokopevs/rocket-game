import $api from "../http";
import { IUserData, IGame } from "../models/IUserData"

export const getUserData = async (id: string | null, header: string) => {
    try{
        const idReq = id !== null ? `?inviterId=${id}` : ""
        const response = await $api.get<IUserData>(`/auth/me${idReq}`, {
        headers: {
          initData: header
        }
       })
        return response
    } catch(error) {
        console.log(error)
    }
    
};

export const getGame = async (id: number) => {
    try{
        const response = await $api.get<IGame>(`/game/getGame/${id}`)
        return response
    } catch(error) {
        console.log(error)
    }
};