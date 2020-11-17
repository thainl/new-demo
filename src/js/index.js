import './imports.js';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import NewsList from '../components/NewsList';
import PageLoading from '../components/PageLoading';
import { news_type } from '../utils/data';
import service from '../services/index.js';
import { reachToBottom } from '../utils/tools.js';
import MoreLoading from '../components/MoreLoading/index.js';
import ErrorTip from '../components/ErrorTip/index.js';


;((doc)=>{
    const oApp = doc.querySelector('#app');
    let oNewsListWrapper = null;
    let loadMoreTimer = null;
    let setNewsListTimer = null;
    const config = {
        type: 'top',
        size: 10,
        pageNum: 0, // 当前页数
        isLoadingMore: false, // 列表是否在加载更多
        is404Error: false,
    }

    const newsData = {}; // 存放各类新闻列表

    const init = async () => {
        render();
        await setNewsList();
        bindEvent();
    }

    function bindEvent() {
        // 表单分类导航的点击事件
        NavBar.bindEvent(setType);
        !config.is404Error && NewsList.bindEvent(oNewsListWrapper, setCurrentNews);
        !config.is404Error && window.addEventListener('scroll', reachToBottom.bind(null, getMoreList));
    }

    // 设置当前新闻列表分类
    function setType(type) {
        config.type = type;
        config.pageNum = 0; // 当前页数初始化为0
        config.isLoadingMore = false; // 重置锁
        oNewsListWrapper.innerHTML = ''; // 每次改变分类清空列表
        setNewsList();
    }

    // 获取新闻列表数据
    async function setNewsList() {
        const { type, size, pageNum } = config;
        clearTimeout(setNewsListTimer)
        if(newsData[type]) {
            renderNewsList(newsData[type][pageNum]); // 从缓冲池里取出数据
            return;
        }else {
            oNewsListWrapper.innerHTML = PageLoading.tpl(); // 打开loading图标
            // 获取数据
            try {
                newsData[type] = await service.getNewsList(type, size);
            } catch (error) {
                if(error == 404) {
                    oNewsListWrapper.innerHTML = ErrorTip.tpl('请求出错');
                    config.is404Error = true;
                    return;
                }
            }
            setNewsListTimer = setTimeout(() => {
                oNewsListWrapper.innerHTML = '';
                renderNewsList(newsData[type][pageNum]);
            }, 1000);
        }
    }

    // 渲染新闻列表
    function renderNewsList(data) {
        const { pageNum } = config;
        const listTpl = NewsList.listTpl({ data, pageNum });
        oNewsListWrapper.innerHTML += listTpl;
        NewsList.imgShow(); // 显示图片
    }

    // 上拉获取更多新闻
    function getMoreList() {
        // 加锁，不能频繁触发
        if(!config.isLoadingMore) {
            clearTimeout(loadMoreTimer);
            config.isLoadingMore = true;
            config.pageNum ++; // 页数+1
            if(config.pageNum >= newsData[config.type].length) {
                MoreLoading.add(oNewsListWrapper, false); // loading 提示已经加载全部
            }else {
                MoreLoading.add(oNewsListWrapper, true); // loading 提示加载动画图标
                loadMoreTimer = setTimeout(() => {
                    renderNewsList(newsData[config.type][config.pageNum]);
                    MoreLoading.remove(oNewsListWrapper); // 列表加载完成，移除加载提示
                    config.isLoadingMore = false;
                }, 1000);
            }
        }
    }

    // 设置当前展示详情的新闻
    function setCurrentNews({index, pageNum}) {
        const currentNews = newsData[config.type][pageNum][index];
        localStorage.setItem('currentNews', JSON.stringify(currentNews));
    }

    function render() {
        const headerTpl = Header.tpl({
            url: '/',
            title: '新闻头条',
            showLeftIcon: false,
            showRightIcon: true
        });
        const navBarTpl = NavBar.tpl(news_type);
        const newsListWrapperTpl = NewsList.wrapperTpl(3.16);
        oApp.innerHTML += (headerTpl + navBarTpl + newsListWrapperTpl);
        oNewsListWrapper = oApp.querySelector('.news-list'); // 获取列表盒子，方便插入列表项
    }

    init();
})(document);