/**
 * 节假日工作申请
 */
import http from '@/utils/http.js';
const server = import.meta.env.MODE === 'development' ? '/system' : '/system';


// 详细信息
// export const getWorkApplyDetail = (data) =>
//   http({
//     method: 'get',
//     url: server + '/festival/detail/' + data,
//   });

