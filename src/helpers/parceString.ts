
export const parceString = (str: string) => {
    let url = new URL(str);
    let params = new URLSearchParams(url.search);
    let startappParam = params.get('startapp');

    const startIndex = str.indexOf('tgWebAppData=') + 'tgWebAppData='.length;
    const endIndex = str.indexOf('&tgWebAppVersion');
    let substring = str.substring(startIndex, endIndex);

    // if (substring.length < 30) {
    //     substring = "query_id%3DAAHcpXgkAAAAANyleCTA3hkg%26user%3D%257B%2522id%2522%253A611886556%252C%2522first_name%2522%253A%2522%25D0%25A1%25D0%25B0%25D0%25B2%25D0%25B2%25D0%25B0%2522%252C%2522last_name%2522%253A%2522%25D0%259F%25D1%2580%25D0%25BE%25D0%25BA%25D0%25BE%25D0%25BF%25D1%258C%25D0%25B5%25D0%25B2%2522%252C%2522username%2522%253A%2522Savva_Prokopev%2522%252C%2522language_code%2522%253A%2522ru%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26auth_date%3D1716459674%26hash%3D503274f06d264c42201a0968e559f38e3c957b0cde4293ab8b0d4b77e58346d1"
    //     // substring = "query_id%3DAAEJHb4lAwAAAAkdviV3dSb0%26user%3D%257B%2522id%2522%253A7075667209%252C%2522first_name%2522%253A%2522Vova%2522%252C%2522last_name%2522%253A%2522%2522%252C%2522language_code%2522%253A%2522ru%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26auth_date%3D1713978060%26hash%3Dd5fe9d3e1bb6c0d998c831673d02cefe9cb9f49262f0266e377ca77ca01bed58"
    // }
 
    const obj = {
        startapp: startappParam,
        header: substring
    }

    return obj
};