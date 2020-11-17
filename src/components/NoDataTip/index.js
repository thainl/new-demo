import tpl from './index.tpl';
import './index.scss';
import { tplReplace } from '../../utils/tools';

export default {
    name: 'NoDataTip',
    tpl() {
        return tplReplace(tpl, {
            text: '暂无收藏'
        });
    }
};