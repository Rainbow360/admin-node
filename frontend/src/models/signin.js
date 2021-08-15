export const signin = (data) => {
    return new Promise((resolve) => {
        $.ajax({
            url: '/api/users/signin',
            type: 'post',
            dataType:'json',
            data,
            success (res, textStatus, jqXHR){
                resolve ({
                    res,
                    jqXHR
                })
            }
        })
    })
}