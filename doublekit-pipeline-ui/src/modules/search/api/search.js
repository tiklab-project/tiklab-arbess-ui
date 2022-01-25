import {service} from "../../../common/utils/requset";

export function Search(data){
    return service.request({
        url: "/search/searchForTop",
        method: "post",
        data 
        //请求类型为post 时，
        // params: data 请求类型为get时
    })
}

export function SearchSort(data){
    return service.request({
        url: "/search/searchForCount",
        method: "post",
        data
    })
}

export function SearchForPage(data){
    return service.request({
        url: "/search/searchForPage",
        method: "post",
        data
    })
}