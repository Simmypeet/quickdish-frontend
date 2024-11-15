import useAxiosPrivate  from "../hooks/useAxiosPrivate";


export const getUser = async () => {
    const axiosPrivate = useAxiosPrivate();
    const response = await axiosPrivate.get(
        process.env.QUICKDISH_BACKEND_URL + `/customers/me`
    );
    if (response.status !== 200) {
        throw new Error(
            `Error fetching user data status: ${response.status}; 
            body: ${response.data}`
        );
    }
    return response.data; 
}; 