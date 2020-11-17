import './imports.js';
import Header from '../components/Header';
import NewsList from '../components/NewsList/index.js';
import { reachToBottom, setPageData, getDocumentOffset } from '../utils/tools';
import PageLoading from '../components/PageLoading/index.js';
import MoreLoading from '../components/MoreLoading/index.js';
import ClearFollow from '../components/ClearFollow/index.js';
import NoDataTip from '../components/NoDataTip/index.js';
import Toast from '../components/Toast/index.js';

;((doc) => {
    const oApp = doc.querySelector('#app');
    let oNewsListWrapper = null;
    let initNewsListTimer = null;
    let loadMoreTimer = null;
    const followedList = JSON.parse(localStorage.getItem('followedList') || '[]');
    const config = {
        size: getDocumentOffset().h / 165 > 5 ? 10 : 5,
        pageNum: 0,
        isLoadingMore: false,
    }
    const newsData = setPageData(followedList, config.size); // 分页后的收藏列表
    const init = async() => {
        render();
        followedList.length && await initNewsList();
        bindEvent();
    }

    function bindEvent() {
        followedList.length && NewsList.bindEvent(oNewsListWrapper, setCurrentNews);
        ClearFollow.bindEvent(doClearFollowedList);
        window.addEventListener('scroll', reachToBottom.bind(null, getMoreList));
    }

    function initNewsList () {
        clearTimeout(initNewsListTimer);
        oNewsListWrapper.innerHTML = PageLoading.tpl();
        initNewsListTimer = setTimeout(() => {
            oNewsListWrapper.innerHTML = '';
            renderNewsList(newsData[config.pageNum]);
        }, 500);
    }

    function renderNewsList (data) {
        const listTpl = NewsList.listTpl({data, pageNum: config.pageNum});
        oNewsListWrapper.innerHTML += listTpl;
        NewsList.imgShow();
    }

    // 上拉获取更多
    function getMoreList() {
        // 加锁，不能频繁触发
        if(!config.isLoadingMore) {
            clearTimeout(loadMoreTimer);
            config.isLoadingMore = true;
            config.pageNum ++; // 页数+1
            if(config.pageNum >= newsData.length) {
                MoreLoading.add(oNewsListWrapper, false); // loading 提示已经加载全部
            }else {
                MoreLoading.add(oNewsListWrapper, true); // loading 提示加载动画图标
                loadMoreTimer = setTimeout(() => {
                    renderNewsList(newsData[config.pageNum]);
                    MoreLoading.remove(oNewsListWrapper); // 列表加载完成，移除加载提示
                    config.isLoadingMore = false;
                }, 500);
            }
        }
    }

    function setCurrentNews({index, pageNum}) {
        const currentNews = newsData[pageNum][index];
        localStorage.setItem('currentNews', JSON.stringify(currentNews));
    }

    function doClearFollowedList() {
        const isConfirm = window.confirm('确定清空收藏？');
        if(isConfirm) {
            localStorage.removeItem('followedList');
            Toast.toast('收藏已全部删除', 1000, ()=>{ location.reload() })
        }
    }

    function render() {
        const headerTpl = Header.tpl({
            url: '/',
            title: '我的收藏',
            showLeftIcon: true,
            showRightIcon: false
        })
        const newsListWrapperTpl = NewsList.wrapperTpl(1.76);
        let myTpl = '';
        if(followedList.length) {
            // 收藏列表不为空
            myTpl = newsListWrapperTpl + ClearFollow.tpl();
        }else {
            // 收藏列表为空
            myTpl = NoDataTip.tpl();
        }
        oApp.innerHTML += (headerTpl + myTpl);
        oNewsListWrapper = oApp.querySelector('.news-list');
    }
    init();
})(document);