import req from '@/utils/request'

export function roleData() {
    return req.get('api/geshin/roles').then((res) => {
        return res.data.datas;
    });
}