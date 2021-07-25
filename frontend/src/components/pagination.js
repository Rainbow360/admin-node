import usersListPageTpl from '../views/users-pages.art'
import page from '../databus/page'

const _setPageActive = (index) => {
    $('#users-page #users-page-list li:not(:first-child,:last-child)')
    .eq(index - 1)    
    .addClass('active')
    .siblings()
    .removeClass('active')
}

// 显示分页效果
const pagination = (data, pageSize) => {
    const total = data.length
    const pageCount = Math.ceil(total/pageSize)
    const pageArray = new Array(pageCount)
    const htmlPage = usersListPageTpl({
        pageArray
    })
    
    $('#users-page').html(htmlPage)
    
    _setPageActive(page.curPage)

    _bindEvent(data, pageSize)
}

const _bindEvent = (data, pageSize) => {
    //分页事件绑定
    $('#users-page').on('click', '#users-page-list li:not(:first-child,:last-child)',function() {
        const index = $(this).index()
        page.setCurPage(index)
        // $(this).addClass('active').siblings().removeClass('active')
        $('body').trigger('changeCurPage', index)
        
        _setPageActive(index)
    })
    $('#users-page').on('click', '#users-page-list li:first-child',function() {
    if (page.curPage > 1) {
        page.setCurPage(page.curPage-1)
        // curPage --
        $('body').trigger('changeCurPage', page.curPage)
        _setPageActive(page.curPage)
    }
    })
    $('#users-page').on('click', '#users-page-list li:last-child',function() {
        if (page.curPage < Math.ceil(data.length / pageSize)) {
        page.setCurPage(page.curPage+1)
        $('body').trigger('changeCurPage', page.curPage)
        _setPageActive(page.curPage)
        }
    })
}
export default pagination