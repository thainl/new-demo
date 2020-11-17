import './imports.js';
import Header from '../components/Header';
import { getUrlQueryValue } from '../utils/tools.js';
import Iframe from '../components/Iframe/index.js';
import Follow from '../components/Follow/index.js';
import Toast from '../components/Toast/index.js';
;((doc)=>{
    const oApp = doc.querySelector('#app');
    const currentNews = JSON.parse(localStorage.getItem('currentNews'));
    const followedList = JSON.parse(localStorage.getItem('followedList') || '[]');
    const init = () => {
        render();
        bindEvent();
    }

    function bindEvent() {
        Follow.bindEvent(doFollow);
    }

    // 判断当前新闻是否被收藏，返回对应的HTML模板
    function createFollowTpl() {
        const isFollowed = followedList.some(item=> item.uniquekey === currentNews.uniquekey); // 一样的方法也可以是find
        return isFollowed ? Follow.followed() : Follow.unFollowed();
    }

    // 点击收藏图标的逻辑
    function doFollow(status) {
        let followedList = JSON.parse(localStorage.getItem('followedList') || '[]');
        if(status) {
            // 如果当前新闻已被收藏
            followedList = followedList.filter(item => item.uniquekey !== currentNews.uniquekey);
        }else {
            // 未被收藏
            followedList.push(currentNews);
            Toast.toast('收藏成功');
        }
        localStorage.setItem('followedList', JSON.stringify(followedList));
    }

    function render() {
        const headerTpl = Header.tpl({
            url: getUrlQueryValue('path'), // 获取上级路径
            title: '新闻详情',
            showLeftIcon: true,
            showRightIcon: false
        })
        const iframeTpl = Iframe.tpl(currentNews.url);
        const followTpl = createFollowTpl();
        oApp.innerHTML += (headerTpl + iframeTpl + followTpl);
    }
    init();
})(document);