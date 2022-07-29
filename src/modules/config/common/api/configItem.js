import {serviceLoc} from "../../../../common/utils/requset";

// 测试配置
export function  CodeTestPass(data){
    return serviceLoc.request({
        url:"/codeCheck/checkAuth",
        method:"post",
        data
    })
}

// 配置文件地址
export function  FileAddress(data){
    return serviceLoc.request({
        url:"/matFlowCommon/fileAddress",
        method:"post",
        data
    })
}

// linux应用源文件地址
export function  GetFile(data){
    return serviceLoc.request({
        url:"/matFlowCommon/getFile",
        method:"post",
        data
    })
}
