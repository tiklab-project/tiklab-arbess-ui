import React from "react";
import {Button, message} from "antd";
import {inject,observer} from "mobx-react";

const FormTest = props =>{

    const {configDataStore,configStore,proofId,type} = props
    const {formInitialValues} = configDataStore
    const {codeTestPass} = configStore

    const test = () =>{
        if(formInitialValues){
            let port,url
            if(type){
                port = 0
                url = formInitialValues && formInitialValues.codeName
            }else {
                port = formInitialValues && formInitialValues.port
                url = formInitialValues && formInitialValues.ip
            }
            const params = {
                proofId:proofId,
                url:url,
                port:port,
            }
            codeTestPass(params).then(res=>{
                if(res.data === true){
                    message.success({content: '连接成功', className:'message'})
                }else {
                    message.error({content:'连接失败', className:'message'})
                }
            })
        }
    }

    return  <div className='config-details-gitTest'>
                <Button onClick={()=>test()}>连接测试</Button>
            </div>
}

export default inject('configStore','configDataStore')(observer(FormTest))