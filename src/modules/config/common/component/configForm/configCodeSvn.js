import React,{Fragment,useState} from "react";
import {Button, Form, Input, message, Row, Select} from "antd";
import ConfigCodeGitOrGitlabModal from "./configCodeGitOrGitlabModal";
import {inject, observer} from "mobx-react";

const {Option} = Select

const ConfigCodeSvn = props =>{

    const {proofStore,configDataStore,configStore}=props

    const {createProof,findAllProof} = proofStore
    const {codeName,setCodeName,codeType} = configDataStore
    const {testPass} = configStore

    const [visible,setVisible] = useState(false)
    const [allSvnProofList,setAllSvnProofList] = useState([])
    const gitProofId = localStorage.getItem('gitProofId')

    const clickFindAllSvn = () =>{
        findAllProof(1).then(res=>{
            console.log('Svn凭证',res)
            setAllSvnProofList(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const changeSvnSelect = (value,e) =>{
        localStorage.setItem('gitProofId',e.key)
    }

    const inputCodeNameValue = e =>{
        setCodeName(e.target.value)
    }

    const test = () =>{
        if(codeName){
            const params = {
                proofId:gitProofId,
                url:codeName
            }
            testPass(params).then(res=>{
                if(res.data === true){
                    message.success({content: '连接成功', className:'message'})
                }else {
                    message.error({content:'连接失败', className:'message'})
                }
            })
        }
    }

    return(
        <Fragment>
            <Form.Item
                name='codeName'
                label="svn地址"
                rules={[
                    {required:true, message:'请输入svn地址'},
                ]}
            >
                <Input onChange={e=>inputCodeNameValue(e)}/>
            </Form.Item>
            <Row>
                <Form.Item name='gitProofName' label="凭证">
                    <Select
                        style={{ width: 300 }}
                        onClick={clickFindAllSvn}
                        onChange={(value,e)=>changeSvnSelect(value,e)}
                    >
                        {
                            allSvnProofList && allSvnProofList.map(item=>{
                                return(
                                    <Option key={item.proofId} value={item.proofName+ "(" + item.proofUsername + ")"}>
                                        { item.proofName+ "(" + item.proofUsername + ")"}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Button className='config-details-link' onClick={()=>setVisible(true)}>
                    添加
                </Button>
            </Row>

            <div className='config-details-gitTest'>
                <Button onClick={()=>test()}>测试连接</Button>
            </div>

            <ConfigCodeGitOrGitlabModal
                visible={visible}
                setVisible={setVisible}
                createProof={createProof}
                codeType={codeType}
            />
        </Fragment>
    )
}
export default inject('proofStore','configDataStore','configStore')(observer(ConfigCodeSvn))
