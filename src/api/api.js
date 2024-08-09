import fetch from "@/api/fetch.js";
import config from "@/assets/config/index";
const qs = require('qs');
const api_name = {
  /** 
   * 查询代币类型
   */
  getTokenTransferLogs: () => {
      return fetch.get(`${config.baseUrl}/v1/coin-transfer/coin/list`);
  },

   /** 
   * 提交转账(未补齐)
   */
  submitTransition: (params) => {
      return fetch.get(`${config.baseUrl}/v1/coin-transfer/batch`,{ params: qs.stringify(params)});
  },
  
}

export {api_name}