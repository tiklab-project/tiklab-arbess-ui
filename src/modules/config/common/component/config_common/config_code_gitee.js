import React, {Fragment, useState,useEffect} from "react";
import {Button, Form, Row, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import Config_code_giteeModal from "./config_code_giteeModal";
import {inject, observer} from "mobx-react";
import GitAuthorizeStore from "../../store/gitAuthorizeStore";
import ProofStore from "../../store/proofStore";

const {Option} =Select

const Config_code_gitee = props =>{

    const {GitAuthorizeStore,form,ProofStore,ConfigStore} = props
    const {url,getAllStorehouse,gitList,getBranch,branchList,
        getGiteeProof} = GitAuthorizeStore
    const {findAllProof} = ProofStore
    const {findAllConfigure} = ConfigStore

    const { getFieldValue } = form
    const [visible,setVisible]=useState(false)
    const [branch,setBranch]=useState(true)
    const [modalFormInvi,setModalFormInvi] = useState('')
    const pipelineId = localStorage.getItem('pipelineId')

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
        getAllStorehouse()
    }

    const changeGitStoreHouse = values =>{
        console.log(values)
        setBranch(false)
        getBranch(values)
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
                >
                    <Option >
                       无
                    </Option>
                    {
                        branchList && branchList.map(item=>{
                            return (
                                <Option key={item}>
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
            />
        </Fragment>
    )
}

export default inject('GitAuthorizeStore','ProofStore','ConfigStore')(observer(Config_code_gitee))
