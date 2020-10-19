import {request_} from "./request";

export function addUser(userInfo) {
  return request_({
    url: 'dispatcher.php',
    params: {
      entity: 'User',  // 为了对应 PHP 中的字符串可变函数
      oper: 'insert',
      userInfo: JSON.stringify(userInfo)
    }
  });
}