import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { FoodData } from '../interface/FoodData';

const API_URL = 'http://portal-catalogo-online-qqlmpck1m-gustavolps1s-projects.vercel.app';

const postData = async (data: FoodData[]): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/produto', data);
    return response;
}

export function useFoodDataMutate(){
    
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 0,
        onSuccess: () => {
            queryClient.invalidateQueries(['food-data'])
        }
    })

    return mutate;
}