import indexTpl from '../views/index.art'
import usersTpl from '../views/users.art'
import usersListTpl from '../views/users-list.art'

import pagination from '../components/pagination'
import page from '../databus/page'

let curPage = 1
const pageSize = 2

const htmlIndex = indexTpl({})

let dataList = []

// 注册
const _signup = (router) => {
    const $btnClose = $('#users-close')

    //提交表单
    const data = $('#users-form').serialize()
    $.ajax({
        url: '/api/users',
        type: 'post',
        headers: {
            'X-Access-Token': localStorage.getItem('node-token') || ''
        },
        data,
        success (res){
            //添加数据后渲染
            page.setCurPage(1)
            _loadData()
        }
    })
    $btnClose.click()
}

// 装填list数据
const _list = (pageNo) => {
    let start = (pageNo - 1) * pageSize
    $('#users-list').html(usersListTpl({
        data: dataList.slice(start, start + pageSize)
    }))

}

// 后端加载数据
const _loadData = () => {
    return $.ajax({
        url: '/api/users',
        headers: {
            'X-Access-Token': localStorage.getItem('node-token') || ''
        },
        success(res) {
            dataList = res.data

            //分页
            pagination(dataList, pageSize)
            
            //数据渲染
            _list(curPage)
        }
        
    })
}

const _methods = () => {
     //删除事件绑定
     $('#users-list').on('click', '.remove' ,function() {
        $.ajax({
            url: 'api/users',
            type: 'delete',
            headers: {
                'X-Access-Token': localStorage.getItem('node-token') || ''
            },
            data: {
                id: $(this).data('id')
            },
            success() {
                _loadData()

                const  isLastPage = Math.ceil(dataList.length / pageSize)
                const  restOne = dataList.length % pageSize === 1
                const notPageFirst = page.curPage > 0
                if (isLastPage && restOne && notPageFirst > 0) {
                    page.setCurPage(page.curPage - 1)
                }
            }
        })
    })
       
    //登出事件绑定
    $('#users-signout').on('click', (e)=> {
        e.preventDefault()
        localStorage.setItem('node-token','')
        location.reload()
        // $.ajax({
        //     url: '/api/users/signout',
        //     dataType:'json',
        //     headers: {
        //         'X-Access-Token': localStorage.getItem('node-token') || ''
        //     },
        //     success(res) {
               
        //         if (res.ret) {
        //             alert('退出成功')

        //             location.reload()
        //         }
                
        //     }
            
        // })
    })

    //添加用户点击提交表单
    $('#users-save').on('click', _signup)
}

// 订阅事件
const _subscribe = () => {
    $('body').on('changeCurPage', (e, index) => {
        console.log('page-->',page.curPage)
        _list(index)
    })
}

const index = (router) => {
    const loadIndex = (res) => {
        
        //渲染首页
        res.render(htmlIndex)

        //window resize, 让页面撑满整个屏幕
        $(window, '.wwrapper').resize()

        //填充用户列表
        $('#content').html(usersTpl())
        //初次渲染list
        _loadData()

        // 页面事件绑定
        _methods()
       
        // 订阅事件
        _subscribe() 
    }
    return (req, res, next) => {
        $.ajax({
            url: '/api/users/isAuth',
            dataType:'json',
            headers: {
                'X-Access-Token': localStorage.getItem('node-token') || ''
            },
            success(result) {
            
                if (result.ret) {
                    loadIndex(res)
                } else {
                    router.go('/signin')
                }
            }
        })
    }
}

// const signup = (router) => {
   
// }
export default index