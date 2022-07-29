import {serviceLoc} from "../../../../common/utils/requset";

//新建流水线
export function  CreateMatFlow(data){
    return serviceLoc.request({
        url:"/matFlow/createMatFlow",
        method:"post",
        data
    })
}

//获取所有流水线
export function FindAllMatFlowStatus(data) {
    return serviceLoc.request({
        url:"/matFlowHome/findUserMatFlow",
        method:"post",
        data
    })
}

//模糊搜索流水线
export function FindOneName(data){
    return serviceLoc.request({
        url:"/matFlow/findOneName",
        method:"post",
        data
    })
}

//删除流水线
export function  DeleteMatFlow (data){
    return serviceLoc.request({
        url:"/matFlow/deleteMatFlow",
        method:"post",
        data
    })
}

//重命名流水线
export function UpdateMatFlow(data){
    return serviceLoc.request({
        url:"/matFlow/updateMatFlow",
        method:"post",
        data
    })
}
