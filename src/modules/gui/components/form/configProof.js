import React from "react";
import FindAllProof from "./findAllProof";
import {Button,message,Row} from "antd";
import configItemStore from "../../store/configItemStore";

const ConfigProof = props =>{

    const {allProofType,testType,configDataStore} = props

    const {formInitialValues,codeType,gitProofId,deployProofId} = configDataStore
    const {codeTestPass} = configItemStore

    const testing = () =>{
        if(formInitialValues){
            let port,url,proofId,type
            if(testType === "源码地址"){
                if(codeType === 5){
                    type = 1
                } else {
                    type = 0
                }
                proofId = gitProofId
                port = 0
                url = formInitialValues && formInitialValues.codeName
            } else {
                proofId = deployProofId
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
            } else {testReminder(testType,"info")}
        }
    }

    const testReminder = (data,info) => {
        if(info){
            message.warn({content:`${data}不能为空`, className:"message"})
        }else{
            if(data.data === true && data.code === 0){
                message.success({content:"连接成功", className:"message"})
            }else {
                message.error({content:"连接失败", className:"message"})
            }
        }
    }

    return (
        <Row>
            <FindAllProof type={allProofType} configDataStore={configDataStore}/>
            <div className="config-details-link">
                <Button onClick={()=>testing()}>连接测试</Button>
            </div>
        </Row>
    )
}

export default ConfigProof