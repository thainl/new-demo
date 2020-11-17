import HTTP from '../utils/http';
import { setPageData } from '../utils/tools';

class Service extends HTTP {
    getNewsList (type, size) {
        return new Promise((resolve, reject) => {
            this.ajax({
                url: '/Juhe/getNewsList',
                type: 'POST',
                data: {
                    field: type
                },
                success (res) {
                    const pageData = setPageData(res.result.data, size);
                    resolve(pageData);
                },
                error (err) {
                    reject(404);
                }
            })
        })
    }
}

export default new Service();