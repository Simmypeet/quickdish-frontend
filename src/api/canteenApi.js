import axios from 'axios'; 

export const getCanteenData = async () => {
    try{
        const response = await axios.get("https://8caccc42-a1cd-4bba-845c-7dedfe4de271.mock.pstmn.io/getcanteens"); 
        console.log("response: ", response.data);
        return response.data; 
    } catch (error) {
        console.log("Error fetching: ", error);
        return null; 
    }
}

export const getNearestCanteen = async (userLocation) => { //latitute and longitude
    //call getCanteenData, rank canteens based on distance from userLocation, return canteen id

}

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

//not done
export const getCanteenFromId = async (canteenId) => {
    const response = await axios.get(`/getcanteens/${canteenId}`); 
    return response.data; 
}


