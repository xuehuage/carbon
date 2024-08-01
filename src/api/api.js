import fetch from "@/api/fetch.js";
import config from "@/assets/config/index";
const qs = require('qs');
const api_name = {
  /** 
   * 查询代币类型
   */
  getTokenTransferLogs: () => {
      return fetch.get(`${config.baseUrl}/v1/token-transfer-logs/type`);
  },

   /** 
   * 分页列表
   */
  getTokenTransferPages: (params) => {
      return fetch.get(`${config.baseUrl}/v1/token-transfer-logs/page`,{ params: qs.stringify(params)});
  },
  
}

export {api_name}