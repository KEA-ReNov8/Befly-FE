import { apiInstance } from '@shared/apis/instance'

export const fetchUserList = async () => {
    try {
        const response = await apiInstance.get('/user/profiles')
        return response.data
    } catch (error) {
        console.error('Error fetching user list:', error)
        //throw error
    }
}
