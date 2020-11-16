import tpl from './index.tpl';
import './index.scss';
import { tplReplace } from '../../utils/tools';

export default {
    name: 'Follow',
    followed() { // 当前新闻已被收藏
        return tplReplace(tpl, {star: 'icon-collection-fill'});
    },
    unFollowed() { // 当前新闻未被收藏
        return tplReplace(tpl, {star: 'icon-collection'});
    },
    bindEvent(doFollow) {
        const oFollow = document.querySelector('.follow');
        oFollow.addEventListener('click', this._setFollow.bind(this, oFollow, doFollow));
    },
    _setFollow(oFollow, doFollow) {
        const classList = oFollow.classList;
        // 被收藏样式为icon-collection-fill 未被收藏为icon-collection
        const isFollowed = [...classList].indexOf('icon-collection-fill') !== -1;
        classList.remove(isFollowed ? 'icon-collection-fill' : 'icon-collection');
        classList.add(isFollowed ? 'icon-collection' : 'icon-collection-fill');
        doFollow(isFollowed);
    }
};