import React,{Fragment,useState,useEffect} from "react";
import {Form,message} from "antd";
import {getUser} from "tiklab-core-ui";
import moment from "../../../common/moment/moment";
import ConfigTop from "../common/component/configCommon/configTop";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import {getUrlParam} from "../../../common/getUrlParam/getUrlParam";
import ConfigView from "../common/component/configCommon/configView";

const ConfigDetails = props =>{

    const {configStore,giteeStore,configDataStore,githubStore,matFlowStore} = props

    const {updateConfigure,findAllConfigure} = configStore
    const {code,getState} = giteeStore
    const {getAccessToken} = githubStore
    const {matFlowId,matFlowName} = matFlowStore

    const {setIsPrompt,setData,data,codeData,setCodeData,formInitialValues,setFormInitialValues,setLinuxShellBlock,
        setUnitShellBlock,setMavenShellBlock,setCodeType,setOrderShellBlock,setShellBlock,
        mavenShellBlock,linuxShellBlock,shellBlock,deployProofId,setDeployProofId,
        gitProofId,setGitProofId,orderShellBlock,unitShellBlock} = configDataStore

    const [form] = Form.useForm()
    const [view,setView] = useState(1)
    const codeValue = getUrlParam("code")
    const codeError = getUrlParam("error")
    const userId = getUser().userId

    // Gitee和Github授权
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
            }
            else if(localStorage.getItem("githubCode")){
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
    },[formInitialValues,matFlowId])

    const lists = [1,2,3,4,5,11,21,22,31,32]
    // 表单初始化
    const newData = []
    useEffect(()=>{
        if(matFlowId){
            findAllConfigure(matFlowId).then(res=>{
                const initialData = res.data
                if(res.code===0){
                    if(initialData.length === 0 ){
                        setCodeData("")
                        setData([])
                        form.resetFields()
                        setFormInitialValues({})
                        setUnitShellBlock("")
                        setMavenShellBlock("")
                        setLinuxShellBlock("")
                        setOrderShellBlock("")
                        setGitProofId("")
                        setDeployProofId("")
                    }
                    else {
                        nonForm(initialData)
                        renderFormData(initialData)
                    }
                }
            })
        }
    },[matFlowId])

    // matFlow切换form数据渲染问题
    const nonForm = initialData =>{
        for (let i=0; i<initialData.length;i++){
            for (let j=0; j<lists.length;j++) {
                const type = parseInt(initialData[i].type/10)
                if (type*10 < lists[j] && lists[j]< (type+1) *10) {
                    lists.splice(j, 1)
                    j--
                }
            }
        }
        return lists.map(item=>{del(item,"111")})
    }

    // 表单数据渲染
    const renderFormData = initialData => {
        for (let i = 0;i<initialData.length;i++){
            const data = initialData[i]
            if(data.type < 6){
                renderCodeData(data)
            }
            else if(data.type > 10 && data.type < 20){
                renderTestData(data)
            }
            else if(data.type > 20 && data.type < 30 ){
                renderStructure(data)
            }
            else if(data.type > 30 || data.type < 40 ){
                renderDeploy(data)
            }
            setData([...newData])
            Object.assign(formInitialValues,data)
            setFormInitialValues({...formInitialValues})
        }
    }

    const renderCodeData = data => {
        let newCode = {
            codeId:data.codeId,
            codeType:data.type,
            codeName:data.codeName,
            codeBranch:data.codeBranch,
        }
        const formValue = {
            gitProofName:data.proof && data.proof.proofName+ "(" + data.proof.proofType + ")" ,
            proofName:data.proof && data.proof.proofName ,
        }
        Object.assign(formInitialValues,formValue)
        setGitProofId(data.proof && data.proof.proofId)
        setCodeType(data.type)
        setCodeData(newCode)
    }

    const renderTestData = data =>{
        newData.push({
            dataId:data.testId,
            title:data.testAlias,
            dataType:data.type,
        })
        setUnitShellBlock(`${data.testOrder ? data.testOrder :""}`)
    }
    
    const renderStructure = data => {
        newData.push({
            dataId: data.structureId,
            title: data.structureAlias,
            dataType:data.type,
        })
        setMavenShellBlock(`${data.structureOrder ? data.structureOrder : ""}`)
    }
    
    const renderDeploy = data => {
        newData.push({
            dataId:data.deployId,
            title: data.deployAlias,
            dataType:data.type,
        })
        const formValue = {
            dockerProofName:data.proof && data.proof.proofName+ "(" + data.proof.proofType + ")" ,
        }
        Object.assign(formInitialValues,formValue)
        setDeployProofId(data.proof && data.proof.proofId)
        setOrderShellBlock(`${data.deployOrder ? data.deployOrder : ""}`)
        if(data.deployType===0){
            setLinuxShellBlock(`${data.startShell ? data.startShell : ""}`)
        }else {
            setShellBlock(`${data.startShell ? data.startShell : ""}`)
        }
    }

    // 按需清空表单的值
    const del = (i,type) => {
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
            default:
                delDetail("git")
        }
        setFormInitialValues({...formInitialValues})
        if(!type){
            setIsPrompt(true)
        }
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
                codeId:formInitialValues && formInitialValues.codeId,
                sort:codeSort,
                type:codeData && codeData.codeType,
                codeBranch:values.codeBranch,
                codeName:values.codeName,
                proof:{proofId:gitProofId}
            },
            matFlowTest:{
                testId:formInitialValues && formInitialValues.testId,
                sort:testSort,
                testAlias:testAlias,
                type:testType,
                testOrder:unitShellBlock,
            },
            matFlowStructure:{
                structureId:formInitialValues && formInitialValues.structureId,
                sort:structureSort,
                structureAlias:structureAlias,
                type:structureType,
                structureAddress:values.structureAddress,
                structureOrder:mavenShellBlock,
            },
            matFlowDeploy:{
                deployId:formInitialValues && formInitialValues.deployId,
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
            if(res.code!==0){
                message.error({content:"配置失败",className:"message"})
            }else {
                message.success({content:"配置成功",className:"message"})
            }
        })
    }

    return (
        <Fragment>
            <div className="config-top">
                <ConfigTop
                    userId={userId}
                    view={view}
                    setView={setView}
                    setIsPrompt={setIsPrompt}
                    matFlowId={matFlowId}
                    matFlowName={matFlowName}
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
        </Fragment>
    )
}

export default  withRouter(inject("configStore","giteeStore","structureStore",
                "configDataStore","githubStore","matFlowStore")(observer(ConfigDetails)))