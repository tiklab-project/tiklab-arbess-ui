import React,{Fragment,useState,useEffect} from "react";
import '../common/component/configCommon/config.scss';
import './config.scss';
import {Form} from "antd";
import {withRouter} from "react-router";
import ProjectBreadcrumb from "../../project/breadcrumb/projectBreadcrumb";
import ConfigView2 from "../common/component/configCommon/configView2";
import ConfigView1 from "../common/component/configCommon/configView1";
import ConfigChangeView from "../common/component/configCommon/configChangeView";
import {getUrlParam} from '../common/component/configCommon/getUrlParam';
import {inject, observer} from "mobx-react";
import {getUser} from "doublekit-core-ui";

const Config = props =>{

    const {configStore,giteeStore,structureStore,configDataStore,githubStore} = props

    const {updateConfigure} = configStore
    const {code,getState} = giteeStore
    const {getAccessToken} = githubStore
    const {pipelineStartStructure,findStructureState} = structureStore

    const {setIsPrompt,codeData,setCodeData,formInitialValues,setData,setFormInitialValues,setLinuxShellBlock,
        setUnitShellBlock,setMavenShellBlock,
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
            setCodeData('')
            setData([])
            setFormInitialValues('')
        }
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

    const style = {
        'position':'fixed',
        'top':'55px',
        'paddingTop':'20px'
    }

    return (
        <Fragment >
            <ProjectBreadcrumb style={style}/>
            <ConfigChangeView
                userId={userId}
                view={view}
                setView={setView}
                setIsPrompt={setIsPrompt}
                pipelineId={pipelineId}
                pipelineStartStructure={pipelineStartStructure}
                findStructureState={findStructureState}
            />
            {
                view === 1 ?
                    <ConfigView1
                        userId={userId}
                        form={form}
                        del={del}
                        updateConfigure={updateConfigure}
                        Salta={'Salta'}
                    />
                    :
                    <ConfigView2
                        userId={userId}
                        form={form}
                        del={del}
                        updateConfigure={updateConfigure}
                        Salta={'Salta'}
                    />
            }
        </Fragment>
    )
}


export default  withRouter(inject('configStore', 'giteeStore',
                'structureStore','configDataStore','githubStore')
                (observer(Config)))