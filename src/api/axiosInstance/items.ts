import {AxiosInstance} from "@/api/axiosInstance/AxiosInstance";
import {ICard} from "@/types/cardTypes";

export const getItems = async () => {
    const {data} = await AxiosInstance.get('/getItems');

    return data;
}

export const addItem = async (payload: Partial<ICard>) => {
    const {data} = await AxiosInstance.post<ICard>('/addItem', payload);

    return data;
}
