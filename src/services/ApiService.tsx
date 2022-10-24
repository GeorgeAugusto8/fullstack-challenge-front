import axios from "axios";

const baseURL = `http://10.0.2.2:3000/api/`;

export const getRequest= async (route: string) => {
    try {
        const response = await axios.get(`${baseURL}${route}`)
        return response.data;
    } catch(e) {
        console.log(e);
        return null;
    };
};