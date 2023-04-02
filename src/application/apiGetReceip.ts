import axios from 'axios'

export const apiGetReceip = async (ingredients: string) => {
    const response = await axios.get(`/api/receip?ingredients=${ingredients}`)
    return response.data.name
}