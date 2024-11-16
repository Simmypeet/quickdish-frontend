

export const getUser = async (axiosPrivate) => {
    // const response = await axiosPrivate.get(
    //     'http://127.0.0.1:8000/customers/me'
    // );
    const response = await axiosPrivate.get(
        '/customers/me'
    );
    return response.data; 
}; 