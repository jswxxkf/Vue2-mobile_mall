import {request} from "./request";

// 请求详情数据
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid: iid
    }
  })
}

// 请求推荐数据
export function getRecommend() {
  return request({
    url: '/recommend',
  })
}


// 商品数据
export class GoodsInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.price = itemInfo.price
    this.lowPrice = itemInfo.lowPrice
    this.highPrice = itemInfo.highPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

// 店铺数据
export class ShopInfo {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

// 尺寸数据
export class GoodsParams {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : "";
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
