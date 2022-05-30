import React,{useState,useEffect} from "react";
import '../common/style/config.scss'
import ConfigView1 from "../common/component/configCommon/configView1";
import ConfigView2 from "../common/component/configCommon/configView2";
import ConfigChangeView from "../common/component/configCommon/configChangeView";
import {Form, Modal} from "antd";
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

    const {setIsPrompt,codeName,setCodeName,codeBranch,setCodeBranch,setData,codeData,
        setCodeData, formInitialValues, setFormInitialValues,setLinuxShellBlock,
        setUnitShellBlock, setMavenShellBlock,
    } = configDataStore

    const [form] = Form.useForm();
    const [view,setView] = useState(0)
    const codeValue = getUrlParam('code')
    const codeError = getUrlParam('error')
    const pipelineId = localStorage.getItem('pipelineId')
    const isCode = localStorage.getItem('codeValue')

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
        const param = {
            code:isCode
        }
        if(codeValue){
            localStorage.setItem('codeValue',codeValue)
            window.close()
        }
        if (isCode && localStorage.getItem('giteeCode')) {
            code(param).then(res=>{
                console.log(res,'gitee授权')
                localStorage.setItem('giteeToken',JSON.stringify(res.data))
                localStorage.removeItem('giteeCode')
                localStorage.removeItem('codeValue')
                window.close()
            })
        }
        if(isCode && localStorage.getItem('githubCode')){
            getAccessToken(param).then(res=>{
                console.log(res,'res')
                if(res.data === null ){
                }else {
                    localStorage.setItem('githubToken',res.data)
                }
                localStorage.removeItem('githubCode')
                localStorage.removeItem('codeValue')
            })
        }
        if(codeError){
            localStorage.removeItem('giteeCode')
            localStorage.removeItem('githubCode')
            localStorage.removeItem('giteeToken')
            localStorage.removeItem('githubToken')
            window.close()
        }
    }, [codeValue,isCode])

    // useEffect(()=>{
    //     const param = {
    //         code:isCode
    //     }
    //     console.log('isCode',isCode)
    //     if(isCode){
    //         forceUpdate({})
    //         code(param).then(res=>{
    //             console.log(res,'gitee授权')
    //             localStorage.setItem('giteeToken',JSON.stringify(res.data))
    //             localStorage.removeItem('giteeCode')
    //             // window.close()
    //             localStorage.removeItem('codeValue')
    //         })
    //     }
    // },[codeValue,isCode])

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
                setFormInitialValues({})
                form.resetFields()
            }else {
                for (let i = 0;i<initialData.length;i++){
                    const j = initialData[i]
                    if(j.type < 5){
                        newCode = {
                            codeId:j.codeId,
                            codeType:j.type,
                            codeName:j.codeName,
                            codeBranch:j.codeBranch,
                        }
                        const formValue = {
                            gitProofName:j.proof && j.proof.proofName+ "(" + j.proof.proofUsername + ")" ,
                            proofDescribe:j.proof && j.proof.proofDescribe ,
                        }
                        Object.assign(formInitialValues,formValue)
                        setCodeName(j.codeName)
                        setCodeBranch(j.codeBranch)
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
                    else if(j.type ===31 || j.type ===32 ){
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
                formInitialValues.proofDescribe = null
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