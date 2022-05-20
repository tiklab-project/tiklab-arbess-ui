import React, {Fragment, useState,useEffect} from "react";
import {Button, Form, Row, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import Config_code_giteeModal from "./config_code_giteeModal";
import {inject, observer} from "mobx-react";
import ConfigCommonStore from "../../store/configCommonStore";

const {Option} =Select

const Config_code_gitee = props =>{

    const {GitAuthorizeStore,form,ProofStore,ConfigStore,ConfigCommonStore} = props
    const {url, getAllStorehouse, gitList,getBranch,branchList, getGiteeProof
    } = GitAuthorizeStore
    const {findAllProof,findOneProof} = ProofStore
    const {findAllConfigure} = ConfigStore
    const {setCodeName, setCodeBranch} = ConfigCommonStore

    const { getFieldValue } = form
    const [visible,setVisible]=useState(false)
    const [branch,setBranch]=useState(true)
    const [modalFormInvi,setModalFormInvi] = useState('')
    const pipelineId = localStorage.getItem('pipelineId')
    const codeTaken = JSON.parse(localStorage.getItem('AccessToken'))

    useEffect(()=>{
        const param = {
            pipelineId:pipelineId
        }
        findAllConfigure(param).then(res=>{
            console.log(res,'findAllConfigure')
            const type = res.data
            for (let i in type){
                if(type[i].type===2){
                    setModalFormInvi(type[i].proof)
                }
            }
        })
    },[])


    useEffect(()=>{
        const se = setTimeout(()=>{
            setBranch(false)
            if( getFieldValue('giteeCodeName') === null || getFieldValue('giteeCodeName') ===undefined || getFieldValue('giteeCodeName') === ''){
                setBranch(true)
            }
        },10)
        return ()=> clearTimeout(se)
    },[])


    const clickGitStoreHouse = () =>{
        if(codeTaken){
            const param = {
                accessToken:codeTaken.accessToken
            }
            getAllStorehouse(param)
        }
    }

    const changeGitStoreHouse = values =>{
        console.log(values)
        const params ={
            projectName:values,
            proofId:localStorage.getItem('giteeProofId')
        }
        getBranch(params)
        setBranch(false)
        setCodeName(values)
    }

    const inputCodeBranchValue = values =>{
        setCodeBranch(values)
    }

    return(
        <Fragment>
            <Row>
                <Form.Item
                    name='giteeCodeName'
                    label="git地址"
                >
                    <Select
                        style={{ width: 300 }}
                        onChange={changeGitStoreHouse}
                        onClick={clickGitStoreHouse}
                    >
                        <Option >
                            无
                        </Option>
                        {
                            gitList && gitList.map(item=>{
                                return (
                                    <Option key={item}>
                                        {item}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Button
                    className='config-details-link'
                    type="link"
                    onClick={()=>setVisible(true)}
                >
                    <PlusOutlined />
                    新增代码库
                </Button>
            </Row>
            <Form.Item name="giteeBranch" label="分支">
                <Select
                    style={{ width: 300 }}
                    disabled={branch}
                    onChange={()=>inputCodeBranchValue()}
                >
                    <Option >
                       无
                    </Option>
                    {
                        branchList && branchList.map(item=>{
                            return (
                                <Option key={item} value={item}>
                                    {item}
                                </Option>
                            )
                        })
                    }

                </Select>
            </Form.Item>
            
            <Config_code_giteeModal
                findAllProof={findAllProof}
                visible={visible}
                setVisible={setVisible}
                url={url}
                getGiteeProof={getGiteeProof}
                modalFormInvi={modalFormInvi}
                codeTaken={codeTaken}
            />
        </Fragment>
    )
}

export default inject('GitAuthorizeStore','ProofStore','ConfigStore','ConfigCommonStore')(observer(Config_code_gitee))
