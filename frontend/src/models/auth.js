import http from '../utils/http'
export const auth = async () => {
    try {
        let { result } = await http({
            url: '/api/users/isAuth'
        })
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
    }
}

