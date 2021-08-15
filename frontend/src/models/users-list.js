export const userList = () => {
    return $.ajax({
        url: '/api/users',
        headers: {
            'X-Access-Token': localStorage.getItem('node-token') || ''
        },
        success(res) {
            return res
        }
        
    })
}