import React,{Fragment,useState,useEffect} from "react";
import '../common/style/config.scss'
import ConfigView1 from "../common/component/configCommon/configView1";
import ConfigView2 from "../common/component/configCommon/configView2";
import ConfigChangeView from "../common/component/configCommon/configChangeView";
import {Form, message} from "antd";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {getUrlParam} from '../common/component/configCommon/getUrlParam'

const ConfigDetails = props =>{

    const {ConfigStore,GiteeStore,StructureStore,ConfigDataStore,GithubStore} = props

    const {updateConfigure,findAllConfigure} = ConfigStore

    const {code} = GiteeStore
    const {getAccessToken} = GithubStore
    const {pipelineStartStructure,findStructureState} = StructureStore

    const {setIsPrompt,codeName,codeBranch,setCodeBlockContent,setData,
        codeData,setCodeData,formInitialValues,setFormInitialValues,
    } = ConfigDataStore

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
        const param = {
            code:codeValue
        }
        if (codeValue && localStorage.getItem('giteeCode')) {
            code(param).then(res=>{
                console.log(res,'gitee授权')
                localStorage.setItem('giteeToken',JSON.stringify(res.data))
                localStorage.setItem('authorize','success')
                localStorage.removeItem('giteeCode')
                window.close()
            })
        }
        if(codeValue && localStorage.getItem('githubCode')){
            getAccessToken(param).then(res=>{
                console.log(res,'res')
                if(res.data === null ){
                }else {
                    localStorage.setItem('githubToken',res.data)
                }
                localStorage.removeItem('githubCode')
                window.close()
            })
        }
        if(codeError){
            localStorage.removeItem('giteeCode')
            localStorage.removeItem('githubCode')
            localStorage.removeItem('giteeToken')
            localStorage.removeItem('githubToken')
            window.close()
        }
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
                            gitProofName:j.proof && j.proof.proofName+ "(" + j.proof.proofUsername + ")" ,
                        }
                        Object.assign(formInitialValues,formValue)
                    }else if(j.type===2){
                        newCode = {
                            codeId:j.codeId,
                            title:'源码管理',
                            desc: 'Gitee',
                            codeName:j.codeName,
                            codeBranch:j.codeBranch
                        }
                        localStorage.setItem('gitProofId',j.proof && j.proof.proofId)
                        localStorage.setItem('codeId',j.codeId)
                        setCodeData(newCode)
                    }else if(j.type===3){
                        newCode = {
                            codeId:j.codeId,
                            title:'源码管理',
                            desc: 'Github',
                            codeName:j.codeName,
                            codeBranch:j.codeBranch
                        }
                        localStorage.setItem('gitProofId',j.proof && j.proof.proofId)
                        localStorage.setItem('codeId',j.codeId)
                        setCodeData(newCode)
                        const formValue = {
                            gitProofName:j.proof && j.proof.proofName+ "(" + j.proof.proofUsername + ")" ,
                        }
                        Object.assign(formInitialValues,formValue)
                    }
                    else if(j.type===4){
                        newCode = {
                            codeId:j.codeId,
                            title:'源码管理',
                            desc: 'Gitlab',
                            codeName:j.codeName,
                            codeBranch:j.codeBranch
                        }
                        localStorage.setItem('gitProofId',j.proof && j.proof.proofId)
                        localStorage.setItem('codeId',j.codeId)
                        setCodeData(newCode)
                    } else if(j.type===11){
                        newData.push({
                            dataId:  j.testId,
                            title:j.testAlias,
                            desc: '单元测试'
                        })
                        localStorage.setItem('testId',j.testId)
                    } else if(j.type===21){
                        newData.push({
                            dataId: j.structureId,
                            title: j.structureAlias,
                            desc: 'maven'
                        })
                        localStorage.setItem('structureId',j.structureId)
                    } else if(j.type===22){
                        newData.push({
                            dataId: j.structureId,
                            title: j.structureAlias,
                            desc: 'node'
                        })
                        localStorage.setItem('structureId',j.structureId)
                    } else if(j.type===31){
                        newData.push({
                            dataId:  j.deployId,
                            title: j.deployAlias,
                            desc: 'linux'
                        })
                        localStorage.setItem('deployId',j.deployId)
                        localStorage.setItem('deployProofId',j.proof && j.proof.proofId)
                        const formValue = {
                            dockerProofName:j.proof && j.proof.proofName+ "(" + j.proof.proofIp + ")" ,
                        }
                        setCodeBlockContent(`${j.deployShell}`)
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
                            dockerProofName:j.proof && j.proof.proofName+ "(" +j.proof.proofIp + ")",
                        }
                        Object.assign(formInitialValues,formValue)
                    }
                    setData([...newData])
                    form.setFieldsValue({...j})
                    Object.assign(formInitialValues,j)
                    setFormInitialValues({...formInitialValues})
                }
            } else{
                setCodeData('')
                setData([])
                form.resetFields();
            }
        })
    },[pipelineId])

    const git = () =>{
        formInitialValues.codeName = null
        formInitialValues.codeBranch = null
        formInitialValues.proofName = null
        formInitialValues.gitProofName = null
    }

    const test = () =>{
        formInitialValues.testOrder = null
    }

    const structure = () =>{
        formInitialValues.structureAddress = null
        formInitialValues.structureOrder = null
    }

    const deploy = () => {
        formInitialValues.deployTargetAddress = null
        formInitialValues.deployAddress = null
        formInitialValues.deployShell = null
        formInitialValues.dockerProofName = null
        formInitialValues.dockerPort = null
        formInitialValues.mappingPort = null
    }

    const del = i => {
        switch (i) {
            case '单元测试' :
                test()
                break
            case 'maven' :
                structure()
                break
            case 'node':
                structure()
                break
            case 'linux':
                deploy()
                setCodeBlockContent('')
                break
            case 'docker':
                deploy()
                break
            default:
                git()
        }
        setFormInitialValues({...formInitialValues})
    }

    return (
        <Fragment >
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
                        updateConfigure={updateConfigure}
                        git={git}
                    />
                    :
                    <ConfigView2
                        form={form}
                        del={del}
                        updateConfigure={updateConfigure}
                    />
            }

        </Fragment>
    )
}

export default  withRouter(inject('ConfigStore', 'GiteeStore',
                'StructureStore','ConfigDataStore','GithubStore')
                (observer(ConfigDetails)))