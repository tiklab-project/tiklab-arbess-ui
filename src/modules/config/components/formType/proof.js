import React,{useState} from "react";
import {message,Spin} from "antd";
import {inject,observer} from "mobx-react";
import {LoadingOutlined,ApiOutlined} from "@ant-design/icons";
import FindAllProof from "./findAllProof";

const Proof = props =>{

    const {allProofType,testType,configDataStore,configStore,type} = props

    const {formInitialValues} = configDataStore
    const {codeTestPass} = configStore

    const [testStatus,setTestStatus] = useState(false)

    const testing = () =>{
        let port,url,proofId
        if(testType === "源码地址"){
            proofId = formInitialValues && formInitialValues.gitProofId
            port = 0
            url = formInitialValues && formInitialValues.codeName
        } else {
            proofId = formInitialValues && formInitialValues.deployProofId
            port = formInitialValues && formInitialValues.sshPort
            url = formInitialValues && formInitialValues.sshIp
        }
        const params = {
            proofId:proofId,
            url:url,
            port:port,
            type:type
        }
        if(url){
            setTestStatus(true)
            codeTestPass(params).then(res=>{
                testReminder(res)
            }).catch(error=>{
                console.log(error)
            })
        } else { testReminder(testType,"info") }
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
            setTestStatus(false)
        }
    }

    const style={
        display:"flex",
    }

    return (
        <div style={style}>
            <FindAllProof type={allProofType}/>
            <div>
                {
                    testStatus ?
                        <div>
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 25 }} spin />} />
                        </div>
                        :
                        <div style={{color:"#1890ff",cursor:"pointer",padding:"5px 0 0 8px"}}
                             onClick={()=>testing()}
                        >
                            <ApiOutlined />
                            连接测试
                        </div>
                }
            </div>
        </div>
    )
}

export default inject("configDataStore","configStore")(observer(Proof))
