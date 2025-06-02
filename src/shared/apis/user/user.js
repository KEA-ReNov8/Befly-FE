import { apiInstance } from '@shared/apis/instance'

export const fetchMyInfo = async () => {
    try {
        const response = await apiInstance.get('/user/profile')
        return response.data
    } catch (error) {
        console.error('Error fetching my info:', error)
        //throw error
    }
}
