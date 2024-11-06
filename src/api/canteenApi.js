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

export const getRestaurantsFromCanteenId = async (canteenId) => {

}

//not done
export const getCanteenFromId = async (canteenId) => {
    const response = await axios.get(`/getcanteens/${canteenId}`); 
    return response.data; 
}


