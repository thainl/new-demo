import './imports.js';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import NewsList from '../components/NewsList';
import { news_type } from '../utils/data';
import service from '../services/index.js';


;((doc)=>{
    const oApp = doc.querySelector('#app');
    let oNewsListWrapper = null;

    const config = {
        type: 'top',
        size: 10,
        pageNum: 0, // 当前页数
    }

    const newsData = {}; // 存放各类新闻列表

    const init = async () => {
        render();
        await setNewsList();
        bindEvent();
    }

    function bindEvent() {
        // 表单分类导航的点击事件
        NavBar.bindEvent(setType)
    }

    // 设置当前新闻列表分类
    function setType(type) {
        config.type = type;
        console.log(config.type);
        setNewsList();
    }

    // 获取新闻列表数据
    async function setNewsList() {
        const { type, size, pageNum } = config;
        if(newsData[type]) {
            return;
        }else {
            newsData[type] = await service.getNewsList(type, size);
            renderNewsList(newsData[type][pageNum]);
        }
    }

    // 渲染新闻列表
    function renderNewsList(data) {
        const { pageNum } = config;
        const listTpl = NewsList.listTpl({ data, pageNum });
        oNewsListWrapper.innerHTML += listTpl;
        NewsList.imgShow(); // 显示图片
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