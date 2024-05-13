import CryptoJS from "crypto-js"
 
export const createSignature = (id: number, multiplicator: string | number) => {
    const Timestamp = new Date().getTime() 
    let Data
    if (typeof multiplicator === 'number') {
        Data = {Id: id, Score: multiplicator}
    } else {
        Data = {Id: id, NameType: multiplicator}
    }
    const combinedData = {Timestamp, Data}; 
    const combinedDataString = JSON.stringify(combinedData); 
    
    const keyStr: any = process.env.REACT_APP_KEY
    const ivStr: any = process.env.REACT_APP_IV
    
    const key = CryptoJS.enc.Utf8.parse(keyStr); // 16-byte key 
    const iv = CryptoJS.enc.Utf8.parse(ivStr);  // 16-byte initialization vector 
    
    const encrypted = CryptoJS.AES.encrypt(combinedDataString, key, {iv: iv}).toString(); 
    
    return encrypted
};