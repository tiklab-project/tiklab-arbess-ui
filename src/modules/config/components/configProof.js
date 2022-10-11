import React,{useState} from "react";
import {Button,message,Row,Spin} from "antd";
import {inject,observer} from "mobx-react";
import {LoadingOutlined} from "@ant-design/icons";
import FindAllProof from "../../proof/components/findAllProof";
import AddProofButton from "../../proof/components/addProofButton";

const ConfigProof = props =>{

    const {allProofType,proofBtnType,testType,configDataStore,configStore} = props

    const {formInitialValues,codeType,gitProofId,deployProofId,deployType} = configDataStore
    const {codeTestPass} = configStore

    const [testStatus,setTestStatus] = useState(false)

    const testing = () =>{
        let port,url,proofId,type
        if(testType === "源码地址"){
            if(codeType === 5){
                type = 1
            } else {
                type = 0
            }
            proofId = gitProofId
            port = 0
            url = formInitialValues && formInitialValues[deployType+"codeName"]
        } else {
            proofId = deployProofId
            port = formInitialValues && formInitialValues[deployType+"sshPort"]
            url = formInitialValues && formInitialValues[deployType+"sshIp"]
            type = 2
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
        } else {testReminder(testType,"info")}
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

    return (
        <Row>
            <FindAllProof type={allProofType}/>
            <div className="config-details-link">
                {
                    testStatus ?
                        <Button>
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 25 }} spin />} />
                        </Button>
                        :
                        <Button onClick={()=>testing()}>连接测试</Button>
                }
            </div>
        </Row>
    )
}

export default inject("configDataStore","configStore")(observer(ConfigProof))
