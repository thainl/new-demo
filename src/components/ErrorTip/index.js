import tpl from './index.tpl';
import './index.scss';
import { tplReplace } from '../../utils/tools';

export default {
    name: 'ErrorTip',
    tpl(text) {
        return tplReplace(tpl, {
            text
        });
    }
};