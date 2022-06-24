import React,{Fragment,useState,useEffect} from "react";
import '../common/component/configCommon/config.scss';
import {Form, message} from "antd";
import {withRouter} from "react-router";
import ProjectBreadcrumb from "../../project/breadcrumb/projectBreadcrumb";
import FormView from "../common/component/configCommon/formView";
import GuiView from "../common/component/configCommon/guiView";
import ConfigChangeView from "../common/component/configCommon/configChangeView";
import {getUrlParam} from '../common/component/configCommon/getUrlParam';
import {inject, observer} from "mobx-react";
import {getUser} from "doublekit-core-ui";
import moment from "../../../common/moment/moment";
import {PLUGIN_STORE, PluginComponent} from "doublekit-plugin-ui";

const Config = props =>{

    const {configStore,giteeStore,structureStore,configDataStore,githubStore,proofStore} = props

    const {updateConfigure} = configStore
    const {code,getState} = giteeStore
    const {getAccessToken} = githubStore
    const {pipelineStartStructure} = structureStore

    const {setIsPrompt,codeData,setCodeData,formInitialValues,setData,setFormInitialValues,setLinuxShellBlock,
        setUnitShellBlock,setMavenShellBlock,setCodeType,mavenShellBlock,linuxShellBlock,unitShellBlock
    } = configDataStore

    const [form] = Form.useForm()
    const userId = getUser().userId
    const [view,setView] = useState(1)
    const [isBtn,setIsBtn] = useState(false)
    const codeValue = getUrlParam('code')
    const codeError = getUrlParam('error')
    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
        return () =>{
            localStorage.removeItem('gitProofId')
            localStorage.removeItem('deployProofId')
            setCodeData('')
            setData([])
            setFormInitialValues('')
        }
    },[])

    useEffect(()=>{
        pluginsStore.plugins && pluginsStore.plugins.map(item=>{
            if(item.id === 'gui'){
                setIsBtn(true)
            }else setIsBtn(false)
        })
    },[])

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
                formInitialValues.dockerProofName = null
                formInitialValues.dockerPort = null
                formInitialValues.mappingPort = null
                setLinuxShellBlock('')
        }
    }

    // 提交
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
            }else {
                message.success({content: '配置成功', className:'message',})
                props.history.push('/index/task/config')
            }
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
                        isBtn={isBtn}
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
                    <Fragment>
                        {
                            isBtn ?
                                <PluginComponent
                                    point='gui'
                                    {...props}
                                    pluginsStore={pluginsStore}
                                    extraProps={{
                                        configDataStore,
                                        del,
                                        form,
                                        giteeStore,
                                        githubStore,
                                        onFinish,
                                        proofStore
                                    }}
                                />
                                : null
                        }
                    </Fragment>

            }
        </Fragment>
    )
}


export default  withRouter(inject('configStore', 'giteeStore','structureStore',
                'configDataStore','githubStore',PLUGIN_STORE,'proofStore')
                (observer(Config)))