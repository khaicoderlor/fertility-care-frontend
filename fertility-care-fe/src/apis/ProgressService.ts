import axios from "axios"


export const getOrderSteps = async (
    orderId: string
) => {
    const response = await axios.get(`https://localhost:7245/api/v1/steps/${orderId}`);
    return response.data.data;
}