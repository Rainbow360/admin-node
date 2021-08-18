import http from '../utils/http'
export const signin = async (data) => {
    try {
        let { result: res, jqXHR } = await http({
            url: '/api/users/signin',
            data,
            type: 'post',
        })
        return {
            res,
            jqXHR
        }
    } catch (error) {
        console.log(error);
    }
}

// export const signin = (data) => {
//     return new Promise((resolve) => {
//         $.ajax({
//             url: '/api/users/signin',
//             type: 'post',
//             dataType:'json',
//             data,
//             success (res, textStatus, jqXHR){
//                 resolve ({
//                     res,
//                     jqXHR
//                 })
//             }
//         })
//     })
// }