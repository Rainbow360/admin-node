import http from '../utils/http'
export const userList = async () => {
    try {
        let { result: res, jqXHR } = await http({
            url: '/api/users',
        })
        return res
    } catch (error) {
        console.log(error);
    }
}
// export const userList = () => {
//     return $.ajax({
//         url: '/api/users',
//         headers: {
//             'X-Access-Token': localStorage.getItem('node-token') || ''
//         },
//         success(res) {
//             return res
//         }
        
//     })
// }