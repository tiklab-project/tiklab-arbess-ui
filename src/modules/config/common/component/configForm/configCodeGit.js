import React, {Fragment,useState} from "react";
import {Button, Form, Input, Row, Select} from "antd";
import ConfigCodeGitModal from "./configCodeGitModal";
import {inject, observer} from "mobx-react";

const {Option} = Select

const ConfigCodeGit = props =>{

    const {ProofStore,ConfigDataStore}=props
    const {createProof,findAllProof,findOneProof} = ProofStore
    const {setCodeName, setCodeBranch} = ConfigDataStore

    const [allGitProofList,setAllGitProofList] = useState([])
    const [visible,setVisible]=useState(false)

    const clickFindAllGit = () =>{
        const param = {
            type :1
        }
        findAllProof(param).then(res=>{
            console.log('git凭证',res)
            setAllGitProofList(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const changeGitSelect = value =>{
        const param = {
            proofId:value
        }
        findOneProof(param)
        localStorage.setItem('gitProofId',value)
    }

    const inputCodeNameValue = e =>{
        setCodeName(e.target.value)
    }

    const inputCodeBranchValue = e =>{
        setCodeBranch(e.target.value)
    }

    return(
        <Fragment>
            <Form.Item
                name='gitCodeName'
                label="git地址"
                rules={[
                    {
                        pattern: /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/,
                        message:'请输入正确的git地址'
                    }
                ]}
            >
                <Input  onChange={e=>inputCodeNameValue(e)}/>
            </Form.Item>
            <Form.Item
                name="gitBranch"
                label="分支"
            >
                <Input
                    style={{ width: 300 }}
                    placeholder="请输入分支，默认是master"
                    onChange={e=>inputCodeBranchValue(e)}
                />
            </Form.Item>
            <Row>
                <Form.Item
                    name='gitProofName'
                    label="凭证"
                >
                    <Select
                        style={{ width: 300 }}
                        onClick={clickFindAllGit}
                        onChange={changeGitSelect}
                    >
                        <Option>
                            无
                        </Option>
                        {
                            allGitProofList && allGitProofList.map(item=>{
                                return(
                                    <Option key={item.proofId} >
                                        { item.proofName+ "(" + item.proofUsername + ")"}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Button
                    onClick={()=> setVisible(true)}
                    className='config-details-link'
                >
                    添加
                </Button>
            </Row>

            <div className='config-details-gitTest'>
                <Button>测试</Button>
            </div>
            <ConfigCodeGitModal
                visible={visible}
                setVisible={setVisible}
                createProof={createProof}
            />

        </Fragment>
    )
}

export default inject('ProofStore','ConfigDataStore')(observer(ConfigCodeGit))
