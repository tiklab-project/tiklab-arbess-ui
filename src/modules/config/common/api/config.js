import {serviceLoc} from "../../../../common/utils/requset";

//更新流水线配置
export function  UpdateConfigure (data){
    return serviceLoc.request({
        url:"/matFlowConfigure/updateConfigure",
        method:"post",
        data
    })
}

//查看所有配置
export function  FindAllConfigure(data){
    return serviceLoc.request({
        url:"/matFlowConfigure/findAllConfigure",
        method:"post",
        data
    })
}




