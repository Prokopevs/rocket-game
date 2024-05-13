import $api from "../http";

interface IReq {
    referralId: number
}


export const updateMultiplicator = async (id: number, multiplicator: string, signature: string) => {
    try{
        const response = await $api.post<IReq>(`/game/updateMultiplicator`, {
            id: id,
            nameType: multiplicator
        }, 
        {
            headers: {
                signature: signature
            }
        })
        return response
    } catch (error) {
        console.log(error)
    }
};

export const updateScore = async (id: number, score: string, signature: string) => {
    try{
        const response = await $api.post<IReq>(`/game/updateScore`, {
            id: id,
            score: score
        }, 
        {
            headers: {
                signature: signature
            }
        })
        return response
    } catch (error) {
        console.log(error)
    }
};