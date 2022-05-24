import React, {Fragment, useState,useEffect} from "react";
import {Button, Form, Row, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ConfigCodeGiteeModal from "./configCodeGiteeModal";
import {inject, observer} from "mobx-react";
import GithubStore from "../../store/githubStore";

const {Option} =Select

const ConfigCodeGithub = props =>{

    const {GithubStore,ProofStore,ConfigStore,ConfigDataStore} = props

    const {GetCode, GetAccessToken, getAllGithubStorehouse,getGithubBranch,
    } = GithubStore
    const {findAllProof} = ProofStore
    const {findAllConfigure} = ConfigStore
    const {setCodeName,setCodeBranch} = ConfigDataStore

    const [visible,setVisible]=useState(false)
    const [modalFormInvi,setModalFormInvi] = useState('')
    const [giteeProhibited,setGiteeProhibited] = useState(true)
    const pipelineId = localStorage.getItem('pipelineId')
    const codeTaken = JSON.parse(localStorage.getItem('AccessToken'))

    useEffect(()=>{
        const param = {
            pipelineId:pipelineId
        }
        findAllConfigure(param).then(res=>{
            const type = res.data
            for (let i in type){
                if(type[i].type===2){
                    setModalFormInvi(type[i].proof)
                    if(!type[i].codeName || type[i].codeName !== null ){
                        setGiteeProhibited(false)
                    }
                }
            }
        })
    },[])

    const clickGitStoreHouse = () =>{
        // if(codeTaken){
        //     const param = {
        //         accessToken:codeTaken.accessToken
        //     }
        //     getAllStorehouse(param)
        // }
    }

    const changeGitStoreHouse = values =>{
        // console.log(values)
        // const params ={
        //     projectName:values,
        //     proofId:localStorage.getItem('githubProofId')
        // }
        // getBranch(params)
        // setGiteeProhibited(false)
        // setCodeName(values)
    }

    const inputCodeBranchValue = values =>{
        setCodeBranch(values)
    }

    return(
        <Fragment>
            <Row>
                <Form.Item
                    name='codeName'
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
                        {/*{*/}
                        {/*    gitList && gitList.map(item=>{*/}
                        {/*        return (*/}
                        {/*            <Option key={item}>*/}
                        {/*                {item}*/}
                        {/*            </Option>*/}
                        {/*        )*/}
                        {/*    })*/}
                        {/*}*/}
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
            <Form.Item name="codeBranch" label="分支">
                <Select
                    style={{ width: 300 }}
                    disabled={giteeProhibited}
                    onChange={()=>inputCodeBranchValue()}
                >
                    <Option >
                        无
                    </Option>
                    {/*{*/}
                    {/*    branchList && branchList.map(item=>{*/}
                    {/*        return (*/}
                    {/*            <Option key={item} value={item}>*/}
                    {/*                {item}*/}
                    {/*            </Option>*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*}*/}

                </Select>
            </Form.Item>

            <ConfigCodeGiteeModal
                findAllProof={findAllProof}
                visible={visible}
                setVisible={setVisible}
                url={GetCode}
                // getGiteeProof={getGiteeProof}
                modalFormInvi={modalFormInvi}
                codeTaken={codeTaken}
            />
        </Fragment>
    )
}

export default inject('GithubStore','ProofStore',
    'ConfigStore','ConfigDataStore')
(observer(ConfigCodeGithub))
