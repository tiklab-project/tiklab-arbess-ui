import React,{Fragment,useState,useEffect} from "react";
import '../../common/style/config.scss'
import ConfigDetails_view1 from "../components/configDetails_view1";
import ConfigDetails_view2 from "../components/configDetails_view2";
import Config_changeView from "./config_changeView";
import {Form, Modal} from "antd";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {Prompt} from "react-router-dom";
import {getUrlParam} from '../../common/component/config_common/getUrlParam'

const ConfigDetails = props =>{

    const {ConfigStore,ProofStore,GitAuthorizeStore} = props

    const {updateConfigure,findAllConfigure} = ConfigStore
    const {createProof,findAllGitProof,allGitProofList,findAllDeployProof,allDeployProofList
    } = ProofStore
    const {code} = GitAuthorizeStore

    const [form] = Form.useForm();
    const [formInitialValues, setFormInitialValues] = useState({})
    const [view,setView] = useState(0)
    const [codeData, setCodeData] = useState('')
    const [data,setData] = useState([])
    const [isPrompt, setIsPrompt] = useState(false);

    const codeValue = getUrlParam('code')
    const AccessToken = localStorage.getItem('AccessToken')
    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
      return () =>{
          localStorage.removeItem('gitProofId')
          localStorage.removeItem('deployProofId')
          localStorage.removeItem('codeId')
          localStorage.removeItem('testId')
          localStorage.removeItem('structureId')
          localStorage.removeItem('deployId')
      }
    },[])

    //Gitee授权
    useEffect(() => {
        const se = setTimeout(()=>localStorage.removeItem('code'),100)
        if (codeValue && localStorage.getItem('code')) {
            code(codeValue).then(res=>{
                localStorage.setItem('AccessToken',res.data)
                window.close()
            })
        }
        return () => clearTimeout(se)
    }, [])

    useEffect(()=>{
        const param = {
            pipelineId:pipelineId
        }
        let newCode = {}
        const newData = []
        findAllConfigure(param).then(res=>{
            const initialData = res.data
            for (let i = 0;i<initialData.length;i++){
                const j = initialData[i]
                if(j.type===1){
                    newCode = {
                        codeId:j.codeId,
                        title:'源码管理',
                        desc: '通用Git'
                    }
                    localStorage.setItem('gitProofId',j.proof && j.proof.proofId)
                    localStorage.setItem('codeId',j.codeId)
                    setCodeData(newCode)
                    const formValue = {
                        gitBranch:j.codeBranch,
                        gitCodeName:j.codeName,
                        gitProofName:j.proof && j.proof.proofName+ "(" + j.proof.proofUsername + ")" ,
                    }
                    form.setFieldsValue(formValue)
                    Object.assign(formInitialValues,formValue)
                }else if(j.type===2){
                    newCode = {
                        codeId:j.codeId,
                        title:'源码管理',
                        desc: 'Gitee'
                    }
                    localStorage.setItem('gitProofId',j.proof && j.proof.proofId)
                    localStorage.setItem('codeId',j.codeId)
                    const formValue = {
                        giteeBranch:j.codeBranch,
                        giteeCodeName:j.codeName,
                    }
                    setCodeData(newCode)
                    form.setFieldsValue(formValue)
                    Object.assign(formInitialValues,formValue)
                }
                else if(j.type===11){
                    newData.push({
                        dataId:  j.testId,
                        title:j.testAlias,
                        desc: '单元测试'
                    })
                    localStorage.setItem('testId',j.testId)
                    const formValue = {
                        testOrder:j.testOrder
                    }
                    form.setFieldsValue(formValue)
                    Object.assign(formInitialValues,formValue)
                } else if(j.type===21){
                    newData.push({
                        dataId: j.structureId,
                        title: j.structureAlias,
                        desc: 'maven'
                    })
                    localStorage.setItem('structureId',j.structureId)
                    const formValue = {
                        mavenAddress:j.structureAddress,
                        mavenOrder:j.structureOrder
                    }
                    form.setFieldsValue(formValue)
                    Object.assign(formInitialValues,formValue)
                } else if(j.type===22){
                    newData.push({
                        dataId: j.structureId,
                        title: j.structureAlias,
                        desc: 'node'
                    })
                    localStorage.setItem('structureId',j.structureId)
                    const formValue = {
                        nodeAddress:j.structureAddress,
                        nodeOrder:j.structureOrder
                    }
                    form.setFieldsValue(formValue)
                    Object.assign(formInitialValues,formValue)
                } else if(j.type===31){
                    newData.push({
                        dataId:  j.deployId,
                        title: j.deployAlias,
                        desc: 'linux'
                    })
                    localStorage.setItem('deployId',j.deployId)
                    localStorage.setItem('deployProofId',j.proof && j.proof.proofId)
                    const formValue = {
                        linuxAddress:j.deployAddress,
                        linuxTargetAddress:j.deployTargetAddress,
                        linuxProofName:j.proof && j.proof.proofDescribe+ "(" + j.proof.proofIp + ")" ,
                    }
                    form.setFieldsValue(formValue)
                    Object.assign(formInitialValues,formValue)
                } else if(j.type===32){
                    newData.push({
                        dataId:j.deployId,
                        title: j.deployAlias,
                        desc: 'docker'
                    })
                    localStorage.setItem('deployId',j.deployId)
                    localStorage.setItem('deployProofId',j.proof && j.proof.proofId)
                    const formValue = {
                        dockerAddress:j.deployAddress,
                        dockerTargetAddress:j.deployTargetAddress,
                        dockerProofName:j.proof && j.proof.proofDescribe+ "(" +j.proof.proofIp + ")",
                    }
                    form.setFieldsValue(formValue)
                    Object.assign(formInitialValues,formValue)
                }
                setData([...newData])
                form.setFieldsValue({...j})
                setFormInitialValues({...formInitialValues})
            }

        })
    },[pipelineId])

    const confirmLeave = pathname =>{
        setIsPrompt(false)
        if(pathname!=='/home/task/config'){
            pathname && setTimeout(()=>{
                props.history.push(pathname)
            })
        }
    }

    return (
        <Fragment>
            <Config_changeView
                view={view}
                setView={setView}
            />
            {
                view === 0 ? 
                    <ConfigDetails_view1
                        formInitialValues={formInitialValues}
                        codeData={codeData}
                        setCodeData={setCodeData}
                        data={data}
                        setData={setData}
                        isPrompt={isPrompt}
                        setIsPrompt={setIsPrompt}
                        form={form}
                        updateConfigure={updateConfigure}
                        createProof={createProof}
                        findAllGitProof={findAllGitProof}
                        allGitProofList={allGitProofList}
                        findAllDeployProof={findAllDeployProof}
                        allDeployProofList={allDeployProofList}
                    />
                    :null
            }
            {
                view === 1 ?
                    <ConfigDetails_view2
                        formInitialValues={formInitialValues}
                        codeData={codeData}
                        setCodeData={setCodeData}
                        data={data}
                        setData={setData}
                        setIsPrompt={setIsPrompt}
                        form={form}
                        updateConfigure={updateConfigure}
                        createProof={createProof}
                        findAllGitProof={findAllGitProof}
                        allGitProofList={allGitProofList}
                        findAllDeployProof={findAllDeployProof}
                        allDeployProofList={allDeployProofList}
                    />
                    :null
            }

            <Prompt
                when={isPrompt}
                message={location =>{
                    if(!isPrompt){
                        return true
                    }
                    Modal.confirm({
                        title:'有编辑未保存，确定离开吗',
                        okText:'离开',
                        cancelText:'取消',
                        onOk:()=>confirmLeave(location.pathname)
                    })
                    return false
                }}
            />

        </Fragment>
    )
}

export default  withRouter(inject('ConfigStore','ProofStore','GitAuthorizeStore')(observer(ConfigDetails)))