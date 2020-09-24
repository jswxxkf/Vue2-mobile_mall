import {ADD_COUNTER, ADD_TO_CART} from "./mutation_types";

export default {
  [ADD_TO_CART](context, payload) {
    return new Promise(((resolve, reject) => {
      // // 看购物车中是否已有相同商品 法1
      // let oldProduct = null;
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item;
      //   }
      // }
      // 看购物车中是否已有相同商品 法2
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve('当前商品数量 + 1')
      } else {
        payload.count = 1;
        context.commit(ADD_TO_CART, payload);
        resolve('添加了新的商品')
      }
    }));
  }
}
