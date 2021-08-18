import http from '../utils/http'
export const usersAdd = async (data) => {
    try {
        let { result: res, jqXHR } = await http({
            url: '/api/users',
            data,
            type: 'post',
        })
        return res
    } catch (error) {
        console.log(error);
    }
}

// export const usersAdd = (data) => {
//     return $.ajax({
//         url: '/api/users',
//         type: 'post',
//         headers: {
//             'X-Access-Token': localStorage.getItem('node-token') || ''
//         },
//         data,
//         success (res){
//            return res
//         }
//     })
// }