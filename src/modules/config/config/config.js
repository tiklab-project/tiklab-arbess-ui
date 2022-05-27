import React,{Fragment,useState,useEffect} from "react";
import '../common/style/config.scss';
import {Form} from "antd";
import {withRouter} from "react-router";
import ConfigTop from "./configTop";
import ConfigView2 from "../common/component/configCommon/configView2";
import ConfigView1 from "../common/component/configCommon/configView1";
import ConfigChangeView from "../common/component/configCommon/configChangeView";
import {getUrlParam} from '../common/component/configCommon/getUrlParam'
import {inject, observer} from "mobx-react";
import formAll from "../common/component/configForm/formAll";

const Config = props =>{

    const {configStore,giteeStore,structureStore,configDataStore,githubStore} = props

    const {updateConfigure} = configStore
    const {code} = giteeStore
    const {pipelineStartStructure,findStructureState} = structureStore

    const {setIsPrompt,codeName,codeBranch, codeData,setCodeData,formInitialValues,
        setFormInitialValues,setShellBlock,
    } = configDataStore

    const [form] = Form.useForm();

    const [view,setView] = useState(0)
    const codeValue = getUrlParam('code')
    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
        return () =>{
            localStorage.removeItem('gitProofId')
            localStorage.removeItem('deployProofId')
        }
    },[])

    //Gitee授权
    useEffect(() => {
        const se = setTimeout(()=>localStorage.removeItem('code'),100)
        if (codeValue && localStorage.getItem('code')) {
            code(codeValue).then(res=>{
                localStorage.setItem('AccessToken',JSON.stringify(res.data))
                window.close()
            })
        }
        return () => clearTimeout(se)
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
    }

    // 统一form表单里面需要删除的值
    const delDetail = i =>{
        switch (i) {
            case 'git':
                formInitialValues.codeName = null
                formInitialValues.codeBranch = null
                formInitialValues.proofDescribe = null
                formInitialValues.gitProofName = null
                break
            case 'test':
                formInitialValues.testOrder = null
                break
            case 'structure':
                formInitialValues.structureAddress = null
                formInitialValues.structureOrder = null
                break
            case 'deploy':
                formInitialValues.deployTargetAddress = null
                formInitialValues.deployAddress = null
                formInitialValues.dockerProofName = null
                formInitialValues.dockerPort = null
                formInitialValues.mappingPort = null
                setShellBlock('')
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
                return formAll.gitOrGitlab
            case 4:
                return formAll.gitOrGitlab
            case 11:
                return formAll.unit
            case 21:
                return formAll.maven
            case 22:
                return formAll.node
            case 31:
                return formAll.linux
            case 32:
                return formAll.docker
        }
    }

    return (
        <Fragment >
            <ConfigTop/>
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
        </Fragment>
    )
}


export default  withRouter(inject('configStore', 'giteeStore',
                    'structureStore','configDataStore','githubStore')
                (observer(Config)))