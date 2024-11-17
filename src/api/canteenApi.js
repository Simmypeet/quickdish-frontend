import axios from 'axios'; 

export const getCanteenFromRestaurantId = async (resId) => {
    const response = await axios.get(
        process.env.QUICKDISH_BACKEND_URL + `/canteens/restaurants/${resId}`
    ); 
    // const response = await axios.get(`http://127.0.0.1:8000/canteens/restaurants/${resId}`
    // ); 
    if (response.status !== 200){
        throw new Error(
            `Error fetching restaurant data status: ${response.status};
            body: ${response.data}`
        ); 
    };
    console.log("canteen response: ", response.data); 
    return response.data; 
}

export const getCanteenImgFromId = async (canteenId) => {
    const response = await axios.get(
        process.env.QUICKDISH_BACKEND_URL + `/canteens/${canteenId}/img`,
        { responseType: 'blob'}
    ); 
    return response.data;
}
    // const response = await axios.get(
    //     `http://

//not done
export const getCanteenFromId = async (canteenId) => {
    const response = await axios.get(`/getcanteens/${canteenId}`); 
    return response.data; 
}


