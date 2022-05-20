import React,{Fragment,useState,useEffect} from "react";
import '../common/style/config.scss'
import Config_view1 from "../common/component/config_common/config_view1";
import Config_view2 from "../common/component/config_common/config_view2";
import Config_changeView from "../common/component/config_common/config_changeView";
import {Form} from "antd";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {getUrlParam} from '../common/component/config_form/getUrlParam'

const ConfigDetails = props =>{

    const {ConfigStore,ProofStore,GitAuthorizeStore,StructureStore,ConfigCommonStore} = props

    const {updateConfigure,findAllConfigure} = ConfigStore
    const {createProof,findAllGitProof,allGitProofList,findAllDeployProof,allDeployProofList
    } = ProofStore
    const {code} = GitAuthorizeStore
    const {pipelineStartStructure,findStructureState} = StructureStore
    const {isPrompt,setIsPrompt,codeBlockContent,setCodeBlockContent,
        codeName,setCodeName,codeBranch,setCodeBranch
    } = ConfigCommonStore

    const [form] = Form.useForm();

    const [formInitialValues, setFormInitialValues] = useState({})
    const [view,setView] = useState(0)
    const [data,setData] = useState([])
    const [codeData, setCodeData] = useState('')
    const [newStageForm,setNewStageForm] = useState({})

    const codeValue = getUrlParam('code')
    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
        return () =>{
            localStorage.removeItem('gitProofId')
            localStorage.removeItem('giteeProofId')
            localStorage.removeItem('dockerProofId')
            localStorage.removeItem('linuxProofId')
            localStorage.removeItem('codeId')
            localStorage.removeItem('testId')
            localStorage.removeItem('structureId')
            localStorage.removeItem('deployId')
            // setCodeName('')
            // setCodeBranch('')
            // setCodeData('')
            // setData([])
        }
    },[])

    //Gitee授权
    useEffect(() => {
        const param = {
            code:codeValue
        }
        // const se = setTimeout(()=>localStorage.removeItem('code'),200)
        if (codeValue && localStorage.getItem('code')) {
            code(param).then(res=>{
                console.log(res,'res')
                localStorage.setItem('AccessToken',JSON.stringify(res.data))
                window.close()
            })
        }
        // return () => clearTimeout(se)
    }, [])

    useEffect(()=>{
        if(codeData){
            if(codeData.desc){
                const newCode = {
                    codeName:codeName,
                    codeBranch:codeBranch
                }
                Object.assign(codeData,newCode)
                setCodeData({...codeData})
            }
        }
    },[codeName,codeBranch])

    useEffect(()=>{
        const param = {
            pipelineId:pipelineId
        }
        let newCode = {}
        const newData = []
        findAllConfigure(param).then(res=>{
            const initialData = res.data
            if(initialData.length!==0){
                for (let i = 0;i<initialData.length;i++){
                    const j = initialData[i]
                    if(j.type===1){
                        newCode = {
                            codeId:j.codeId,
                            title:'源码管理',
                            desc: '通用Git' ,
                            codeName:j.codeName,
                            codeBranch:j.codeBranch
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
                        localStorage.setItem('giteeProofId',j.proof && j.proof.proofId)
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
                        localStorage.setItem('linuxProofId',j.proof && j.proof.proofId)
                        const formValue = {
                            linuxAddress:j.deployAddress,
                            linuxTargetAddress:j.deployTargetAddress,
                            linuxProofName:j.proof && j.proof.proofName+ "(" + j.proof.proofIp + ")" ,
                        }
                        setCodeBlockContent(`${j.deployShell}`)
                        form.setFieldsValue(formValue)
                        Object.assign(formInitialValues,formValue)
                    } else if(j.type===32){
                        newData.push({
                            dataId:j.deployId,
                            title: j.deployAlias,
                            desc: 'docker'
                        })
                        localStorage.setItem('deployId',j.deployId)
                        localStorage.setItem('dockerProofId',j.proof && j.proof.proofId)
                        const formValue = {
                            dockerAddress:j.deployAddress,
                            dockerTargetAddress:j.deployTargetAddress,
                            dockerProofName:j.proof && j.proof.proofName+ "(" +j.proof.proofIp + ")",
                        }
                        form.setFieldsValue(formValue)
                        Object.assign(formInitialValues,formValue)
                    }
                    setData([...newData])
                    form.setFieldsValue({...j})
                    form.setFieldsValue({...j})
                    setFormInitialValues({...formInitialValues})
                }
            } else{
                setCodeData('')
                setData([])
                form.resetFields();
            }
        })
    },[pipelineId])

    return (
        <Fragment >
            <Config_changeView
                view={view}
                setView={setView}
                setIsPrompt={setIsPrompt}
                pipelineId={pipelineId}
                pipelineStartStructure={pipelineStartStructure}
                findStructureState={findStructureState}
            />
            {
                view === 0 ?
                    <Config_view1
                        codeBlockContent={codeBlockContent}
                        formInitialValues={formInitialValues}
                        codeData={codeData}
                        setCodeData={setCodeData}
                        data={data}
                        setData={setData}
                        newStageForm={newStageForm}
                        setNewStageForm={setNewStageForm}
                        isPrompt={isPrompt}
                        setIsPrompt={setIsPrompt}
                        form={form}
                        codeName={codeName}
                        setCodeName={setCodeName}
                        codeBranch={codeBranch}
                        setCodeBranch={setCodeBranch}
                        updateConfigure={updateConfigure}
                        createProof={createProof}
                        findAllGitProof={findAllGitProof}
                        allGitProofList={allGitProofList}
                        findAllDeployProof={findAllDeployProof}
                        allDeployProofList={allDeployProofList}
                    />
                    :
                    <Config_view2
                        formInitialValues={formInitialValues}
                        codeData={codeData}
                        setCodeData={setCodeData}
                        data={data}
                        setData={setData}
                        setIsPrompt={setIsPrompt}
                        form={form}
                        codeName={codeName}
                        setCodeName={setCodeName}
                        codeBranch={codeBranch}
                        setCodeBranch={setCodeBranch}
                        newStageForm={newStageForm}
                        setNewStageForm={setNewStageForm}
                        updateConfigure={updateConfigure}
                        createProof={createProof}
                        findAllGitProof={findAllGitProof}
                        allGitProofList={allGitProofList}
                        findAllDeployProof={findAllDeployProof}
                        allDeployProofList={allDeployProofList}
                    />
            }

        </Fragment>
    )
}

export default  withRouter(inject('ConfigStore','ProofStore','GitAuthorizeStore','StructureStore','ConfigCommonStore')(observer(ConfigDetails)))