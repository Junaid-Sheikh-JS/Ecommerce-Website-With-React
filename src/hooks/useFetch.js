// import { useEffect, useState } from "react";
// import { fetchDataFromApi } from "../utils/api";

// const useFetch = (endpoint) => {
//     const [data, setData] = useState();

//     useEffect(() => {
//         const makeApiCall = async () => {
//             const res = await fetchDataFromApi(endpoint);
//             setData(res);
//         };

//         makeApiCall();
//     }, [endpoint]);

//     return { data };
// };

// export default useFetch;





































import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (endpoint) => {
    const [data, setData] = useState(null); // Default to null to handle initial state
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        const makeApiCall = async () => {
            setLoading(true); // Start loading
            setError(null); // Clear previous errors
            try {
                const res = await fetchDataFromApi(endpoint);
                if (res) {
                    setData(res);
                } else {
                    setError("No data found");
                }
            } catch (err) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false); // Stop loading
            }
        };

        makeApiCall();
    }, [endpoint]);

    return { data, loading, error }; // Return loading and error states
};

export default useFetch;
