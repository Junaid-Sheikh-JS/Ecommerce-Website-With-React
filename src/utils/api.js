// import axios from "axios";

// const params = {
//     headers: {
//         Authorization: "bearer " + process.env.REACT_APP_API_KEY,
//     },
// };

// export const fetchDataFromApi = async (url) => {
//     try {
//         const { data } = await axios.get(
//             process.env.REACT_APP_DEV_URL + url,
//             params
//         );
//         return data;
//     } catch (err) {
//         console.log(err);
//         return err;
//     }
// };






































import axios from "axios";

// Ensure REACT_APP_API_KEY and REACT_APP_DEV_URL are set correctly in your environment variables
const apiUrl = process.env.REACT_APP_DEV_URL;

const params = {
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
};

export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.get(`${apiUrl}${url}`, params);
        return data;
    } catch (err) {
        console.error("Error fetching data:", err.message);
        return null; // Return null or an empty object/array as appropriate
    }
};



















