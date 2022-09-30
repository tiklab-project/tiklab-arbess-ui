import React,{Fragment,useEffect,useState} from "react";
import {Form,Input,Select} from "antd";
import Mirror from "../../components/configForm/mirror";
import {inject,observer} from "mobx-react";
import ConfigProof from "../../components/configForm/configProof";

const Deploy = props =>{

    const {type} = props

    const {configItemStore,configDataStore,pipelineStore} = props

    const {formInitialValues,setIsPrompt,orderShellBlock,setOrderShellBlock,isVirOrDocker,linuxShellBlock,setLinuxShellBlock,shellBlock,setShellBlock,} = configDataStore
    const {fileAddress,getFile,profileAddress} = configItemStore
    const {pipelineId,pipelineName} = pipelineStore

    const [messageInfo,setMessageInfo] = useState("")

    useEffect(()=>{
        return ()=>{
            setMessageInfo("")
        }
    },[pipelineId])

    useEffect(()=>{
        fileAddress()
    },[])

    useEffect(()=>{

        const params = {
            pipelineName:pipelineName,
            regex:formInitialValues.sourceAddress
        }
        if(formInitialValues.sourceAddress && pipelineId){
            getFile(params).then(res=>{
                addMessageInfo(res)
            }).catch(error=>{
                console.log(error)
            })
        }else{
            setMessageInfo("")
        }
    },[formInitialValues.sourceAddress,pipelineId,isVirOrDocker])

    const addMessageInfo = data => {
        if(data.code===0){
            if(data.data){
                setMessageInfo("匹配到文件"+data.data)
            }else setMessageInfo("")
        }
    }

    const validate = (rule,value) =>{
        if (!value) {
            return Promise.resolve()
        } else if (value< 3000) {
            return Promise.reject("最小3000")
        } else if (value > 30000) {
            return Promise.reject("最大30000")
        } else if (!/^\d+$|^\d+[.]?\d+$/.test(value)) {
            return Promise.reject("只能输入数字")
        } else {
            return Promise.resolve() //验证通过
        }
    }

    const portValidator = (rule,value) =>{
        if (!value) {
            return Promise.resolve()
        } else if (value< 1) {
            return Promise.reject("最小3000")
        } else if (value > 30000) {
            return Promise.reject("最大30000")
        } else if (!/^\d+$|^\d+[.]?\d+$/.test(value)) {
            return Promise.reject("只能输入数字")
        } else {
            return Promise.resolve() //验证通过
        }
    }

    return(
        <Fragment>
            <Form.Item name="deployType" label="部署类型" className="noRequired">
                <Select>
                    <Select.Option value={0}>结构化部署</Select.Option>
                    <Select.Option value={1}>自定义部署</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item shouldUpdate={(prevValues,currentValues)=>prevValues.deployType!==currentValues.deployType}>
                {({ getFieldValue })=>
                    getFieldValue("deployType") === 0 ? (
                        <Fragment>
                            <>
                                <Form.Item
                                    name={isVirOrDocker===31?"sourceAddress":"dockerSourceAddress"}
                                    label="应用源文件地址"
                                    rules={[{required:true,message:"请输入应用源文件地址"}]}
                                >
                                    <Input
                                        addonBefore={profileAddress+pipelineName}
                                        placeholder="请输入该文件的唯一标识，如:Jar,zip等（支持正则表达式）"
                                    />
                                </Form.Item>
                                <div className="deployTargetAddress">{messageInfo}</div>
                                <Form.Item
                                    label="Ip地址"
                                    name={isVirOrDocker===31?"sshIp":"dockerSshIp"}
                                    rules={[
                                        {required:true, message:"输入Ip地址"},
                                        {
                                            pattern:/((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)/,
                                            message:"请输入正确的Ip地址"
                                        },
                                    ]}
                                >
                                    <Input placeholder="输入Ip地址"/>
                                </Form.Item>
                                <Form.Item
                                    label="端口号"
                                    name={isVirOrDocker===31?"sshPort":"dockerSshPort"}

                                    rules={[{validator:portValidator},{required:true,message:"请输入端口号"}]}
                                >
                                    <Input placeholder="输入端口号"/>
                                </Form.Item>
                                <ConfigProof
                                    allProofType={31}
                                    proofBtnType={5}
                                    testType={"Ip地址"}
                                />
                                <Form.Item
                                    name={isVirOrDocker===31?"deployAddress":"dockerDeployAddress"}
                                    label="部署位置"
                                    rules={[{required:true, message:"请输入部署位置"}]}
                                >
                                    <Input addonBefore={"/"} placeholder="请输入部署位置"/>
                                </Form.Item>
                                <Form.Item
                                    name={isVirOrDocker===31?"deployOrder":"dockerDeployOrder"}
                                    label="部署文件命令">
                                    <Mirror
                                        shellBlock={orderShellBlock}
                                        setShellBlock={setOrderShellBlock}
                                        setIsPrompt={setIsPrompt}
                                    />
                                </Form.Item>
                            </>
                            {type === 31 ?
                                <>
                                    <Form.Item name="startAddress" label="启动文件地址">
                                        <Input addonBefore={"/"} placeholder=" / 启动文件地址"/>
                                    </Form.Item>
                                    <Form.Item name="startShell" label="启动命令" className="noRequired">
                                        <Mirror
                                            shellBlock={linuxShellBlock}
                                            setShellBlock={setLinuxShellBlock}
                                            setIsPrompt={setIsPrompt}
                                        />
                                    </Form.Item>
                                </>
                                :
                                <>
                                    <Form.Item name="startAddress" label="dockerfile文件地址">
                                        <Input addonBefore={"/"} placeholder=" / 代表部署位置"/>
                                    </Form.Item>
                                    <Form.Item
                                        name="startPort"
                                        label="启动端口"
                                        rules={[
                                            {required:true, message:"请输入启动端口"},
                                            {validator: validate}
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        name="mappingPort"
                                        label="映射端口"
                                        rules={[
                                            {required:true, message:"请输入映射端口"},
                                            {validator: validate}
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </>
                            }
                        </Fragment>) :
                        <Form.Item name="startShell" label="Shell命令">
                            <Mirror
                                shellBlock={shellBlock}
                                setShellBlock={setShellBlock}
                                setIsPrompt={setIsPrompt}
                            />
                        </Form.Item>
                }
            </Form.Item>
        </Fragment>
    )
}

export default inject("configItemStore","configDataStore","pipelineStore")(observer(Deploy))