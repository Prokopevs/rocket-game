import $api from "../http";

interface IUser {
    referralId: number
    firstname: string
    username: string
}

interface IData {
    Data: IUser
}

export const getReferralsReq = async (id: number) => {
    try{
        const response = await $api.get<IData>(`/auth/referrals/${id}`)
        return response
    } catch(error) {
        console.log(error)
    }
};