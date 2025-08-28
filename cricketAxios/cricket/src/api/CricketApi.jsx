import axios from "axios"

const api = axios.create({
    baseURL: "https://api.cricapi.com"
});

export const getData = () => {
    return api.get("/v1/countries?apikey=c3c41fec-b8d1-4a26-8e0b-b91f8beec42f&offset=0") 
}

export const deleteData = (id) => {
    return api.delete(`/v1/countries?apikey=c3c41fec-b8d1-4a26-8e0b-b91f8beec42f&offset=0/${id}`)
}