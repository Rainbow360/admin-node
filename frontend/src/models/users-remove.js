import http from '../utils/http'
export const usersRemove = async (id) => {
    try {
        let { result: res, jqXHR } = await http({
            url: 'api/users',
            type: 'delete',
            data: {
                id
            },
        })
        return res
    } catch (error) {
        console.log(error);
    }
}
// export const usersRemove = (id) => {
//     return  $.ajax({
//         url: 'api/users',
//         type: 'delete',
//         headers: {
//             'X-Access-Token': localStorage.getItem('node-token') || ''
//         },
//         data: {
//             id
//         },
//         success(res) {
//             return res
//         }
//     })
// }