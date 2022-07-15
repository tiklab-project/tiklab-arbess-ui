import React from "react";
import {Button,message} from "antd";
import {inject,observer} from "mobx-react";

const FormTest = props =>{

    const {configDataStore,configItemStore,git} = props
    const {formInitialValues,codeType} = configDataStore
    const {codeTestPass} = configItemStore

    const test = () =>{
        if(formInitialValues){
            let port,url,proofId,type
            if(git){
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
                    if(res.data === true && res.code === 0){
                        message.success({content:"连接成功", className:"message"})
                    }else {
                        message.error({content:"连接失败", className:"message"})
                    }
                }).catch(error=>{
                    console.log(error)
                })
            }
        }
    }

    return  <div className="config-details-gitTest config-details-link">
                <Button onClick={()=>test()}>连接测试</Button>
            </div>
}

export default inject("configDataStore","configItemStore")(observer(FormTest))