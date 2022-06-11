import {serviceLoc} from "../../../../common/api/requset";

//更新流水线配置
export function  UpdateConfigure (data){
    return serviceLoc.request({
        url:'/pipelineConfigure/updateConfigure',
        method:'post',
        data
    })
}

//查看所有配置
export function  FindAllConfigure(data){
    return serviceLoc.request({
        url:'/pipelineConfigure/findAllConfigure',
        method:'post',
        data
    })
}

// 测试配置
export function  CodeTestPass(data){
    return serviceLoc.request({
        url:'/codeCheck/checkAuth',
        method:'post',
        data
    })
}


