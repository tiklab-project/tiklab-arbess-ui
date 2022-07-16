import React from "react";
import {Button,message} from "antd";
import {inject,observer} from "mobx-react";

const FormTest = props =>{

    const {configDataStore,configItemStore,test} = props
    const {formInitialValues,codeType} = configDataStore
    const {codeTestPass} = configItemStore

    const testing = () =>{
        let port,url,proofId,type
        if(test === "源码地址"){
            if(codeType === 5){
                type = 1
            } else {
                type = 0
            }
            proofId = localStorage.getItem("gitProofId")
            port = 0
            url = formInitialValues && formInitialValues.codeName
        } else {
            proofId = localStorage.getItem("deployProofId")
            port = formInitialValues && formInitialValues.sshPort
            url = formInitialValues && formInitialValues.sshIp
            type = 2
        }
        const params = {
            proofId:proofId,
            url:url,
            port:port,
            type:type
        }
        if(url){
            codeTestPass(params).then(res=>{
                testReminder(res)
            }).catch(error=>{
                console.log(error)
            })
        } else {testReminder(test,"info")}
    }
    
    const testReminder = (data,info) => {
        if(info){
            message.warn({content:`${data}不能为空`, className:"message"})
        }else{
            if(data.data === true && data.code === 0){
                message.success({content:"连接成功", className:"message"})
            } message.error({content:"连接失败", className:"message"})
        }
    }


    return  <div className="config-details-gitTest config-details-link">
                <Button onClick={()=>testing()}>连接测试</Button>
            </div>
}

export default inject("configDataStore","configItemStore")(observer(FormTest))