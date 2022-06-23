import React, {useState, useEffect, Fragment} from "react";
import {PluginComponent, PLUGIN_STORE} from 'doublekit-plugin-ui'
import '../common/component/configCommon/config.scss'
import FormView from "../common/component/configCommon/formView";
import GuiView from "../common/component/configCommon/guiView";
import ConfigChangeView from "../common/component/configCommon/configChangeView";
import ProjectBreadcrumb from "../../project/breadcrumb/projectBreadcrumb";
import {Form, message} from "antd";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {getUrlParam} from '../common/component/configCommon/getUrlParam';
import {getUser} from "doublekit-core-ui";
import moment from "../../../common/moment/moment";

const ConfigDetails = props =>{

    const {configStore,giteeStore,structureStore,configDataStore,githubStore} = props

    const {updateConfigure,findAllConfigure} = configStore
    const {code,getState} = giteeStore
    const {getAccessToken} = githubStore
    const {pipelineStartStructure} = structureStore

    const {setIsPrompt,data,setData,codeData,setCodeData,formInitialValues,setFormInitialValues,setLinuxShellBlock,
        setUnitShellBlock,setMavenShellBlock,setCodeType,mavenShellBlock,linuxShellBlock,unitShellBlock
    } = configDataStore

    const [form] = Form.useForm();
    const userId = getUser().userId
    const [view,setView] = useState(1)
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
    },[pipelineId])

    //Gitee和Github授权
    useEffect(() => {
        if(codeValue){
            const params = {
                code:codeValue,
                state:1,
            }
            if(localStorage.getItem('giteeCode')){
                code(codeValue).then(res=>{
                    localStorage.setItem('giteeToken',JSON.stringify(res.data))
                    localStorage.removeItem('giteeCode')
                    localStorage.removeItem('githubToken')
                    getState(params)
                    window.close()
                })
            }else if(localStorage.getItem('githubCode')){
                getAccessToken(codeValue).then(res=>{
                    localStorage.setItem('githubToken',res.data)
                    localStorage.removeItem('githubCode')
                    localStorage.removeItem('giteeToken')
                    getState(params)
                    window.close()
                })
            }
        }
        if(codeError){
            const params = {
                code:codeError,
                state:1,
            }
            getState(params)
            window.close()
        }
    }, [codeValue])

    useEffect(()=>{
        if(codeData){
            if(codeData.codeType){
                const newCode = {
                    codeName:formInitialValues && formInitialValues.codeName,
                    codeBranch:formInitialValues && formInitialValues.codeBranch
                }
                Object.assign(codeData,newCode)
                setCodeData({...codeData})
            }
        }
    },[formInitialValues])

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
                            dockerProofName:j.proof && j.proof.proofName+ "(" + j.proof.proofUsername + ")" ,
                        }
                        Object.assign(formInitialValues,formValue)
                        setLinuxShellBlock(`${j.deployShell}`)
                        localStorage.setItem('deployId',j.deployId)
                        localStorage.setItem('deployProofId',j.proof && j.proof.proofId)
                    }
                    setData([...newData])
                    setCodeData(newCode)
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
                setCodeType('')
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
                formInitialValues.ip = null
                formInitialValues.port = null
                formInitialValues.dockerProofName = null
                formInitialValues.dockerPort = null
                formInitialValues.mappingPort = null
                setLinuxShellBlock('')
        }
    }

    const onFinish = values => {

        //排序
        let testSort,structureSort, deploySort = 0
        //配置别名
        let testAlias,structureAlias,deployAlias
        //配置类型
        let testType,structureType,deployType

        data && data.map((item,index)=>{
            if(item.dataType === 11){
                testSort = index + 2
                testAlias = item.title
                testType = item.dataType
            }
            if(item.dataType === 21 || item.dataType === 22){
                structureSort = index + 2
                structureAlias = item.title
                structureType = item.dataType
            }
            if(item.dataType === 31 || item.dataType === 32){
                deploySort = index + 2
                deployAlias = item.title
                deployType = item.dataType
            }
        })

        const configureList = {
            configureCreateTime:moment.moment,
            user:{id:userId,},
            pipeline:{pipelineId:pipelineId},
            pipelineCode:{
                codeId:localStorage.getItem('codeId'),
                sort:1,
                type:codeData && codeData.codeType,
                codeBranch:values.codeBranch,
                codeName:values.codeName,
                proof:{proofId:localStorage.getItem('gitProofId')}
            },
            pipelineTest:{
                testId:localStorage.getItem('testId'),
                sort:testSort,
                testAlias:testAlias,
                type:testType,
                testOrder:unitShellBlock,
            },
            pipelineStructure:{
                structureId:localStorage.getItem('structureId'),
                sort:structureSort,
                structureAlias:structureAlias,
                type:structureType,
                structureAddress:values.structureAddress,
                structureOrder:mavenShellBlock,
            },
            pipelineDeploy:{
                deployId:localStorage.getItem('deployId'),
                sort:deploySort,
                deployAlias:deployAlias,
                type:deployType,
                ip:values.ip,
                port:values.port,
                deployAddress: values.deployAddress,
                deployTargetAddress: values.deployTargetAddress,
                deployShell:linuxShellBlock,
                dockerPort:values.dockerPort,
                mappingPort:values.mappingPort,
                proof:{ proofId:localStorage.getItem('deployProofId') }
            }
        }
        updateConfigure(configureList).then(res=>{
            if(res.code!==0){
                message.error({content:'配置失败', className:'message',})
            }message.success({content: '配置成功', className:'message',})
            setIsPrompt(false)
        })
    }

    return (
        <Fragment>
            <div className='config-top '>
               <div className='config-top-content'>
                   <ProjectBreadcrumb config={'config'}/>
                   <ConfigChangeView
                       userId={userId}
                       view={view}
                       setView={setView}
                       setIsPrompt={setIsPrompt}
                       pipelineId={pipelineId}
                       pipelineStartStructure={pipelineStartStructure}
                   />
               </div>
            </div>
            {
                view === 1 ?
                    <FormView
                        form={form}
                        del={del}
                        onFinish={onFinish}
                    />
                    :
                    <PluginComponent
                        point='gui'
                        {...props}
                        pluginsStore={props.pluginsStore}
                        extraProps={{
                            configDataStore,
                            del,
                            form,
                            giteeStore,
                            githubStore,
                            onFinish,
                            proofStore:props.proofStore
                        }}
                    />
            }
        </Fragment>
    )
}

export default  withRouter(inject('configStore','giteeStore','structureStore',
                'configDataStore','githubStore',PLUGIN_STORE,'proofStore')
                (observer(ConfigDetails)))