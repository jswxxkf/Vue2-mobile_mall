import {request} from "./request";

export function getCategory() {
  return request({
    url: '/category'
  }).catch(err => err);
}

export function getSubCategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey: maitKey
    }
  }).catch(res => res);
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  }).catch(err => err);
}