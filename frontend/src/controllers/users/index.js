import indexTpl from '../../views/index.art'
import usersTpl from '../../views/users.art'
import usersListTpl from '../../views/users-list.art'

import pagination from '../../components/pagination'
import page from '../../databus/page'

import { addUser } from './add-user'
import { userList as userListModel } from '../../models/users-list'
import { auth as authModel } from '../../models/auth'
import { usersRemove as usersRemoveModel } from '../../models/users-remove'

let curPage = 1
const pageSize = 5

const htmlIndex = indexTpl({})

let dataList = []



// 装填list数据
const _list = (pageNo) => {
    let start = (pageNo - 1) * pageSize
    $('#users-list').html(usersListTpl({
        data: dataList.slice(start, start + pageSize)
    }))

}

// 后端加载数据
const _loadData = async () => {
    const result = await userListModel()
    dataList = result.data
    //分页
    pagination(dataList, pageSize)
    //数据渲染
    _list(curPage)
}

const _methods = () => {
     //删除事件绑定
     $('#users-list').on('click', '.remove' ,async function() {
        let result = await usersRemoveModel($(this).data('id'))
     
        if (result.ret) {
            _loadData()
            const  isLastPage = Math.ceil(dataList.length / pageSize)
            const  restOne = dataList.length % pageSize === 1
            const notPageFirst = page.curPage > 0
            if (isLastPage && restOne && notPageFirst > 0) {
                page.setCurPage(page.curPage - 1)
            }
        }
    })
       
    //登出事件绑定
    $('#users-signout').on('click', (e)=> {
        e.preventDefault()
        localStorage.setItem('node-token','')
        location.reload()
    })
    
}

// 订阅事件
const _subscribe = () => {
    $('body').on('changeCurPage', (e, index) => {
        // console.log('page-->',page.curPage)
        _list(index)
    })
    $('body').on('addUser', (e) => {
        _loadData()
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
        $('#add-user-btn').on('click', addUser)
        //初次渲染list
        _loadData()

        // 页面事件绑定
        _methods()
       
        // 订阅事件
        _subscribe() 
    }
    return async (req, res, next) => {
        const result = await authModel()
        if (result.ret) {
            loadIndex(res)
        } else {
            router.go('/signin')
        }
    }
}

// const signup = (router) => {
   
// }
export default index