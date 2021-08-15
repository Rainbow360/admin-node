export const auth = () => {
    return $.ajax({
        url: '/api/users/isAuth',
        dataType:'json',
        headers: {
            'X-Access-Token': localStorage.getItem('node-token') || ''
        },
        success(res) {
            return res
        }
    })
}

