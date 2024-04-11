import { useState, useEffect } from "react";
 
function getStorageValue(key: any, defaultValue: any) {
    // getting stored value
    if (typeof window !== "undefined") {
        const saved = sessionStorage.getItem(key);
        const initial = saved !== null ? JSON.parse(saved) : defaultValue;
        return initial;
    }
}
 
export const useSessionStorage = (key: any, defaultValue: any) => {
    const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
    });
 
    useEffect(() => {
        // storing input name
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
 
    return [value, setValue];
};