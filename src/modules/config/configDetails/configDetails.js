import React,{useState,useEffect} from "react";
import '../common/style/config.scss'
import ConfigView1 from "../common/component/configCommon/configView1";
import ConfigView2 from "../common/component/configCommon/configView2";
import ConfigChangeView from "../common/component/configCommon/configChangeView";
import {Form, message, Modal} from "antd";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {getUrlParam} from '../common/component/configCommon/getUrlParam'
import formAll from "../common/component/configForm/formAll";

const ConfigDetails = props =>{

    const {configStore,giteeStore,structureStore,configDataStore,githubStore} = props

    const {updateConfigure,findAllConfigure} = configStore

    const {code} = giteeStore
    const {getAccessToken} = githubStore
    const {pipelineStartStructure,findStructureState} = structureStore

    const {setIsPrompt,codeName,setCodeName,codeBranch,setCodeBranch,setData,codeData,setCodeData,formInitialValues,
        setFormInitialValues,setLinuxShellBlock,setUnitShellBlock,setMavenShellBlock,setCodeType,
    } = configDataStore

    const [form] = Form.useForm();
    const [view,setView] = useState(0)
    const codeValue = getUrlParam('code')
    const codeError = getUrlParam('error')
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

    //Gitee和Github授权
    useEffect(() => {
        if(codeValue){
            if(localStorage.getItem('giteeCode')){
                localStorage.removeItem('githubToken')
                code(codeValue).then(res=>{
                    if(res.data){
                        localStorage.setItem('giteeToken',JSON.stringify(res.data))
                        tips(1)
                    }else{
                        tips(2)
                    }
                    console.log(res,'gitee授权')
                    localStorage.removeItem('giteeCode')
                })
            }else if(localStorage.getItem('githubCode')){
                localStorage.removeItem('giteeToken')
                getAccessToken(codeValue).then(res=>{
                    console.log(res,'github')
                    if(res.data === null ){
                        tips(1)
                    }else {
                        tips(2)
                        localStorage.setItem('githubToken',res.data)
                    }
                    localStorage.removeItem('githubCode')
                })
            }
        }
        if(codeError){
            tips(2)
        }
    }, [])

    const tips = i =>{
        switch (i){
            case 1:
                message.success({content: '授权成功', className:'message'})
                break
            case 2:
                message.error({content:'授权失败', className:'message'})
        }
    }

    useEffect(()=>{
        if(codeData){
            if(codeData.codeType){
                const newCode = {
                    codeName:codeName,
                    codeBranch:codeBranch
                }
                Object.assign(codeData,newCode)
                setCodeData({...codeData})
            }
        }
    },[codeName,codeBranch])

    // form表单初始化
    useEffect(()=>{
        let newCode
        const newData = []
        findAllConfigure(pipelineId).then(res=>{
            const initialData = res.data
            if(initialData.length === 0 ){
                setCodeData('')
                setData([])
                form.resetFields()
                setFormInitialValues({})
            }else {
                for (let i = 0;i<initialData.length;i++){
                    const j = initialData[i]
                    if(j.type < 6){
                        newCode = {
                            codeId:j.codeId,
                            codeType:j.type,
                            codeName:j.codeName,
                            codeBranch:j.codeBranch,
                        }
                        const formValue = {
                            gitProofName:j.proof && j.proof.proofName+ "(" + j.proof.proofUsername + ")" ,
                            proofName:j.proof && j.proof.proofName ,
                        }
                        Object.assign(formInitialValues,formValue)
                        setCodeName(j.codeName)
                        setCodeBranch(j.codeBranch)
                        setCodeType(j.type)
                        localStorage.setItem('codeId',j.codeId)
                        localStorage.setItem('gitProofId',j.proof && j.proof.proofId)
                    }
                    else if(j.type === 11){
                        newData.push({
                            dataId:  j.testId,
                            title:j.testAlias,
                            dataType:j.type,
                        })
                        localStorage.setItem('testId',j.testId)
                        setUnitShellBlock(`${j.testOrder}`)
                    }
                    else if(j.type === 21 || j.type === 22 ){
                        newData.push({
                            dataId: j.structureId,
                            title: j.structureAlias,
                            dataType:j.type,
                        })
                        localStorage.setItem('structureId',j.structureId)
                        setMavenShellBlock(`${j.structureOrder}`)
                    }
                    else if(j.type === 31 || j.type === 32 ){
                        newData.push({
                            dataId:j.deployId,
                            title: j.deployAlias,
                            dataType:j.type,
                        })
                        const formValue = {
                            dockerProofName:j.proof && j.proof.proofName+ "(" + j.proof.proofIp + ")" ,
                        }
                        Object.assign(formInitialValues,formValue)
                        setLinuxShellBlock(`${j.deployShell}`)
                        localStorage.setItem('deployId',j.deployId)
                        localStorage.setItem('deployProofId',j.proof && j.proof.proofId)
                    }
                    setData([...newData])
                    setCodeData(newCode)
                    form.setFieldsValue({...j})
                    Object.assign(formInitialValues,j)
                    setFormInitialValues({...formInitialValues})
                }
            }
        })
    },[pipelineId])

    // 按需清空表单的值
    const del = i => {
        switch (i) {
            case 11 :
                delDetail('test')
                break
            case 21 :
                delDetail('structure')
                break
            case 22:
                delDetail('structure')
                break
            case 31:
                delDetail('deploy')
                break
            case 32:
                delDetail('deploy')
                break
            default:
                delDetail('git')
        }
        setFormInitialValues({...formInitialValues})
        setIsPrompt(true)
    }

    // 统一form表单里面需要删除的值
    const delDetail = i =>{
        switch (i) {
            case 'git':
                formInitialValues.codeName = null
                formInitialValues.codeBranch = null
                formInitialValues.proofName = null
                formInitialValues.gitProofName = null
                setCodeData('')
                setCodeName('')
                setCodeBranch('')
                break
            case 'test':
                formInitialValues.testOrder = null
                setUnitShellBlock('')
                break
            case 'structure':
                formInitialValues.structureAddress = null
                formInitialValues.structureOrder = null
                setMavenShellBlock('')
                break
            case 'deploy':
                formInitialValues.deployTargetAddress = null
                formInitialValues.deployAddress = null
                formInitialValues.dockerProofName = null
                formInitialValues.dockerPort = null
                formInitialValues.mappingPort = null
                setLinuxShellBlock('')
        }
    }

    // 配置名称
    const configName = i =>{
        switch (i) {
            case 1:
                return '通用Git'
            case 2:
                return 'Gitee'
            case 3:
                return 'Github'
            case 4:
                return 'Gitlab'
            case 5:
                return 'SVN'
            case 11:
                return '单元测试'
            case 21:
                return 'maven'
            case 22:
                return 'node'
            case 31:
                return 'linux'
            case 32:
                return 'docker'
        }
    }

    // 按需配置表单
    const configForm = i => {
        switch (i){
            case 1:
                return formAll.gitOrGitlab
            case 2:
                return formAll.giteeOrGithub
            case 3:
                return formAll.giteeOrGithub
            case 4:
                return formAll.gitOrGitlab
            case 5:
                return formAll.svn
            case 11:
                return formAll.unit
            case 21:
                return formAll.mavenOrNode
            case 22:
                return formAll.mavenOrNode
            case 31:
                return formAll.linux
            case 32:
                return formAll.docker
        }
    }

    return (
        <div shouldupdate='true'>
            <ConfigChangeView
                view={view}
                setView={setView}
                setIsPrompt={setIsPrompt}
                pipelineId={pipelineId}
                pipelineStartStructure={pipelineStartStructure}
                findStructureState={findStructureState}
            />
            {
                view === 0 ?
                    <ConfigView1
                        form={form}
                        del={del}
                        configName={configName}
                        configForm={configForm}
                        updateConfigure={updateConfigure}
                    />
                    :
                    <ConfigView2
                        form={form}
                        del={del}
                        configName={configName}
                        configForm={configForm}
                        updateConfigure={updateConfigure}
                    />
            }
        </div>
    )
}

export default  withRouter(inject('configStore', 'giteeStore',
                    'structureStore','configDataStore','githubStore')
                (observer(ConfigDetails)))