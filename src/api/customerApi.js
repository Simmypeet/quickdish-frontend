

export const getUser = async (axiosPrivate) => {
    const response = await axiosPrivate.get(
        'http://127.0.0.1:8000/customers/me'
    );
    if (response.status !== 200) {
        throw new Error(
            `Error fetching user data status: ${response.status}; 
            body: ${response.data}`
        );
    }
    return response.data; 
}; 