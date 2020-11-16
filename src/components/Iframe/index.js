import tpl from './index.tpl';
import './index.scss';
import { tplReplace } from '../../utils/tools';
export default {
    name: 'Iframe',
    tpl(url) {
        return tplReplace(tpl, { url });
    }
};