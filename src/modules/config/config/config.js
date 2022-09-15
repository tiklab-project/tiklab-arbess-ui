import React,{Fragment,useState,useEffect} from "react";
import {withRouter} from "react-router";
import {getUser} from "tiklab-core-ui";
import {Form,message} from "antd";
import moment from "../../../common/moment/moment";
import {inject,observer} from "mobx-react";
import ConfigTop from "../common/component/configCommon/configTop";
import PromptContent from "../../../common/prompt/prompt";
import {getUrlParam} from "../../../common/getUrlParam/getUrlParam";
import ConfigView from "../common/component/configCommon/configView";

const Config = props =>{

    const {configStore,giteeStore,configDataStore,githubStore,match,matFlowStore} = props

    const {updateConfigure,findAllConfigure} = configStore
    const {code,getState} = giteeStore
    const {getAccessToken} = githubStore
    const {setMatFlowName,setMatFlowId,matFlowId,findAllMatFlowStatus} = matFlowStore

    const {isPrompt,setIsPrompt,data,codeData,setCodeData,formInitialValues,setFormInitialValues,setLinuxShellBlock,
        setUnitShellBlock,setMavenShellBlock,setCodeType,setData,unitShellBlock,mavenShellBlock,
        linuxShellBlock,shellBlock,orderShellBlock,setOrderShellBlock,setShellBlock,
        deployProofId,setDeployProofId, gitProofId,setGitProofId} = configDataStore

    const [form] = Form.useForm()
    const [view,setView] = useState(1)
    const [runOrSave,setRunOrSave] = useState(true)
    const codeValue = getUrlParam("code")
    const codeError = getUrlParam("error")
    const userId = getUser().userId
    const jumpOrNot = match.params.matFlowName

    useEffect(()=>{
        // 流水线name
        setMatFlowName(jumpOrNot)
        // 设置流水线id
        findAllMatFlowStatus(userId).then(res=>{
            const data = res.data
            if(res.code===0 && data){
                // // 如果不存在就重定向404
                // if(!isMatFlow(data)){
                //     props.history.push("/index/404")
                // }else {
                //     data && data.map(item=>{
                //         if(item.matFlowName === matFlowName){
                //             setMatFlowId(item.matFlowId)
                //         }
                //     })
                // }
                data && data.map(item=>{
                    if(item.matFlowName === jumpOrNot){
                        setMatFlowId(item.matFlowId)
                    }
                })
            }
        })
        // 查看流水线配置
        findAllConfigure("").then(()=>{
            setCodeData("")
            setData([])
            setFormInitialValues({})
            form.resetFields()
            setUnitShellBlock("")
            setMavenShellBlock("")
            setLinuxShellBlock("")
            setOrderShellBlock("")
            setDeployProofId("")
            setGitProofId("")
        })
    },[])

    const isMatFlow = data => {
        return data && data.some(item=>item.matFlowName === jumpOrNot)
    }

    //Gitee和Github授权
    useEffect(() => {
        if(codeValue){
            const params = {
                code:codeValue,
                state:1,
            }
            if(localStorage.getItem("giteeCode")){
                code(codeValue).then(res=>{
                    localStorage.setItem("giteeToken",JSON.stringify(res.data))
                    localStorage.removeItem("giteeCode")
                    localStorage.removeItem("githubToken")
                    getState(params)
                    window.close()
                })
            }else if(localStorage.getItem("githubCode")){
                getAccessToken(codeValue).then(res=>{
                    localStorage.setItem("githubToken",res.data)
                    localStorage.removeItem("githubCode")
                    localStorage.removeItem("giteeToken")
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
    const del = (i) => {
        switch (i) {
            case 11:
                delDetail("test")
                break
            case 21:
            case 22:
                delDetail("structure")
                break
            case 31:
            case 32:
                delDetail("deploy")
                break
            default:delDetail("git")
        }
        setFormInitialValues({...formInitialValues})
        setIsPrompt(true)
    }

    // 统一form表单里面需要删除的值
    const delDetail = i =>{
        switch (i) {
            case "git":
                formInitialValues.codeName = null
                formInitialValues.codeBranch = null
                formInitialValues.proofName = null
                formInitialValues.gitProofName = null
                setCodeData("")
                setCodeType(1)
                setGitProofId("")
                break
            case "test":
                formInitialValues.testOrder = null
                setUnitShellBlock("")
                break
            case "structure":
                formInitialValues.structureAddress = null
                formInitialValues.structureOrder = null
                setMavenShellBlock("")
                break
            case "deploy":
                formInitialValues.sshPort = null
                formInitialValues.deployAddress = null
                formInitialValues.sshIp = null
                formInitialValues.sourceAddress = null
                formInitialValues.dockerProofName = null
                formInitialValues.startPort = null
                formInitialValues.mappingPort = null
                formInitialValues.startAddress = ""
                formInitialValues.deployOrder = ""
                setLinuxShellBlock("")
                setOrderShellBlock("")
                setShellBlock("")
                setDeployProofId("")
        }
    }

    const confirmLeave = pathname =>{
        if(pathname.indexOf("/index/config") !== 0 ){
            pathname && setTimeout(()=>{
                props.history.push(pathname)
            })
        }
        setIsPrompt(false)
    }

    const onFinish = values => {
        //排序
        let codeSort, testSort,structureSort, deploySort = 0
        //配置别名
        let testAlias,structureAlias,deployAlias
        //配置类型
        let testType,structureType,deployType

        switch (codeData){
            case "":
                codeSort = 0
                break
            default:codeSort = 1
        }

        data && data.map((item,index)=>{
            if(item.dataType > 10 && item.dataType < 20 ){
                testSort = index + 2
                testAlias = item.title
                testType = item.dataType
            }
            if(item.dataType > 20 && item.dataType < 30){
                structureSort = index + 2
                structureAlias = item.title
                structureType = item.dataType
            }
            if(item.dataType > 30 && item.dataType < 40){
                deploySort = index + 2
                deployAlias = item.title
                deployType = item.dataType
            }
        })

        const configureList = {
            configureCreateTime:moment.moment,
            user:{id:userId},
            matFlow:{matflowId:matFlowId},
            matFlowCode:{
                codeId:null,
                sort:codeSort,
                type:codeData && codeData.codeType,
                codeBranch:values.codeBranch,
                codeName:values.codeName,
                proof:{proofId:gitProofId}
            },
            matFlowTest:{
                testId:null,
                sort:testSort,
                testAlias:testAlias,
                type:testType,
                testOrder:unitShellBlock,
            },
            matFlowStructure:{
                structureId:null,
                sort:structureSort,
                structureAlias:structureAlias,
                type:structureType,
                structureAddress:values.structureAddress,
                structureOrder:mavenShellBlock,
            },
            matFlowDeploy:{
                deployId:null,
                sort:deploySort,
                deployAlias:deployAlias,
                type:deployType,
                deployType:values.deployType,
                sshIp:values.deployType === 0 ? values.sshIp :null,
                sshPort:values.deployType === 0 ? values.sshPort :null,
                deployAddress:values.deployType === 0 ? values.deployAddress :null,
                sourceAddress:values.deployType === 0 ? values.sourceAddress:null,
                startShell:values.deployType === 0 ? linuxShellBlock:shellBlock,
                startPort:values.deployType === 0 ? values.startPort:null,
                mappingPort:values.deployType === 0 ?values.mappingPort:null,
                startAddress:values.deployType === 0 ? values.startAddress :null,
                deployOrder:values.deployType === 0 ? orderShellBlock :null,
                proof:{proofId:deployProofId}
            }
        }
        updateConfigure(configureList).then(res=>{
            setIsPrompt(false)
            if(runOrSave){
                props.history.push(`/index/task/${jumpOrNot}/config`)
            }
            if(res.code===0){
                message.success({content:"配置成功",className:"message"})
            }else {
                message.error({content:"配置失败",className:"message"})
            }
        })
    }

    return (
        <Fragment>
            <div className="config-top config-top-width">
                <ConfigTop
                    view={view}
                    setView={setView}
                    matFlowId={matFlowId}
                    matFlowName={jumpOrNot}
                    userId={userId}
                    setRunOrSave={setRunOrSave}
                />
            </div>
            <ConfigView
                del={del}
                view={view}
                form={form}
                onFinish={onFinish}
                matFlowStore={matFlowStore}
                configDataStore={configDataStore}
            />
            <PromptContent
                isPrompt={isPrompt}
                confirmLeave={confirmLeave}
            />
        </Fragment>
    )
}


export default  withRouter(inject("configStore", "giteeStore","configDataStore",
                "githubStore","matFlowStore")(observer(Config)))