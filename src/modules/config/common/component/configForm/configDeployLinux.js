import React, {Fragment, useState} from "react";
import {Button, Form, Input, message, Row, Select} from "antd";
import {inject, observer} from "mobx-react";
import ConfigDeployAddProofModal from "./configDeployAddProofModal";
import Mirror from "./mirror";
const {Option}=Select

const ConfigDeployLinux = props =>{
  
    const {proofStore,configDataStore,configStore} = props
    const {createProof,findAllProof} = proofStore
    const {setIsPrompt,linuxShellBlock,setLinuxShellBlock,formInitialValues} = configDataStore
    const {codeTestPass} = configStore

    const [allLinuxProofList,setAllLinuxProofList] = useState([])
    const [deployVisible,setDeployVisible] = useState(false)

    const validate = (rule,value) =>{
        if (!value) {
            return Promise.resolve();
        } else if (value< 1) {
            return Promise.reject("最小1");
        } else if (value > 10000) {
            return Promise.reject("最大10000");
        } else if (!/^\d+$|^\d+[.]?\d+$/.test(value)) {
            return Promise.reject("只能输入数字");
        } else {
            return Promise.resolve(); //验证通过
        }
    }

    const clickFindAllDeploy = () =>{
        findAllProof(31).then(res=>{
            console.log('linux凭证',res)
            setAllLinuxProofList(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const changeDeploySelect = (value,e) =>{
        localStorage.setItem('deployProofId',e.key)
    }

    const test = () => {
        const params = {
            proofId:localStorage.getItem('gitProofId'),
            url:formInitialValues && formInitialValues.ip,
            port:formInitialValues && formInitialValues.port,
        }
        codeTestPass(params).then(res=>{
            if(res.data === true){
                message.success({content: '连接成功', className:'message'})
            }else {
                message.error({content:'连接失败', className:'message'})
            }
        })
    }

    return(
        <Fragment>
            <Form.Item
                name='deployTargetAddress'
                label='请输入文件地址'
                rules={[{required:true, message:'请输入文件地址'}]}
            >
                <Input  placeholder="请输入需要发送的文件模块名以及文件后缀名"/>
            </Form.Item>
            <Form.Item
                label='Ip地址'
                name='ip'
                rules={[
                    {required:true, message:'输入IpV4地址'},
                    {
                        pattern:/((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)/,
                        message:'请输入正确的IpV4地址'
                    },
                ]}
                style={{ display: 'inline-block',  margin: '3px 3px' }}
            >
                <Input  placeholder='输入IpV4地址' style={{width:200}}/>
            </Form.Item>
            <Form.Item
                label='端口号'
                name='port'
                rules={[{validator: validate},{required:true, message:'请输入端口号'}]}
                style={{ display: 'inline-block',  margin: '3px 3px' }}
            >
                <Input placeholder="输入端口号"  style={{width:150}}/>
            </Form.Item>
            <Row>
                <Form.Item name='dockerProofName' label='凭证'>
                    <Select
                        style={{width:300}}
                        onChange={(value,e)=>changeDeploySelect(value,e)}
                        onClick={clickFindAllDeploy}
                    >
                        {
                            allLinuxProofList && allLinuxProofList.map(item=>{
                                return(
                                    <Option key={item.proofId} value={ item.proofName+ " (" + item.proofUsername + ")"}>
                                        { item.proofName+ " (" + item.proofUsername + ")"}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Button className='config-details-link' onClick={()=>setDeployVisible(true)}>
                    添加
                </Button>
            </Row>
            <Form.Item
                name='deployAddress'
                label='部署位置'
                rules={[{required:true, message:'请输入部署位置'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item name='deployShell' label='shell命令'>
                <Mirror
                    shellBlock={linuxShellBlock}
                    setShellBlock={setLinuxShellBlock}
                    setIsPrompt={setIsPrompt}
                />
            </Form.Item>

            <div className='config-details-gitTest'>
                <Button onClick={()=>test()}>连接测试</Button>
            </div>

            <ConfigDeployAddProofModal
                deployVisible={deployVisible}
                setDeployVisible={setDeployVisible}
                createProof={createProof}
            />
        </Fragment>
    )
}

export default inject('proofStore','configDataStore','configStore')
(observer(ConfigDeployLinux))


