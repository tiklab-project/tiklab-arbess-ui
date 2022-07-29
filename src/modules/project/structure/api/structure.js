import {serviceLoc} from "../../../../common/utils/requset";

//开始构建
export function  MatFlowStartStructure (data){
    return serviceLoc.request({
        url:"/matFlowExec/start",
        method: "post",
        data
    })
}

//判断当前流水线是否在构建
export function  FindExecState (data){
    return serviceLoc.request({
        url:"/matFlowExec/findExecState",
        method: "post",
        data
    })
}

//构建状态
export function  FindStructureState (data){
    return serviceLoc.request({
        url:"/matFlowExec/findState",
        method:"post",
        data
    })
}

//停止构建
export function  KillInstance(data){
    return serviceLoc.request({
        url:"/matFlowExec/killInstance",
        method:"post",
        data
    })
}

//历史详情日志
export function  FindHistoryLog (data){
    return serviceLoc.request({
        url:"/matFlowLog/findAllLog",
        method:"post",
        data
    })
}


//正在执行的详情
export function  FindAll(data){
    return serviceLoc.request({
        url:"/matFlowConfigure/findAll",
        method:"post",
        data
    })
}

//构建历史
export function  FindPageHistory (data){
    return serviceLoc.request({
        url:"/matFlowHistory/findPageHistory",
        method:"post",
        data
    })
}

//删除构建历史
export function  DeleteHistoryLog (data){
    return serviceLoc.request({
        url:"/matFlowHistory/deleteHistory",
        method:"post",
        data
    })
}

// 查询构建用户
export function  FindMatFlowUser(data){
    return serviceLoc.request({
        url:"/matFlow/findMatFlowUser",
        method:"post",
        data
    })
}