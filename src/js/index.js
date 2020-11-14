import './imports.js';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import { news_type } from '../utils/data';
// import server from '../services/index.js';

// async function getNewsList(type, count=10) {
//     const data = await server.getNewsList(type, count);
//     console.log(data);
// }

// getNewsList('top');

;((doc)=>{
    const oApp = doc.querySelector('#app');

    const config = {
        type: 'top'
    }

    const init = () => {
        render();
        bindEvent();
    }

    function bindEvent() {
        NavBar.bindEvent(setType)
    }

    // 设置当前新闻列表分类
    function setType(type) {
        config.type = type;
        console.log(config.type);
    }

    function render() {
        const headerTpl = Header.tpl({
            url: '/',
            title: '新闻头条',
            showLeftIcon: false,
            showRightIcon: true
        });
        const navBarTpl = NavBar.tpl(news_type);

        oApp.innerHTML += (headerTpl + navBarTpl);
    }

    init();
})(document);