import React,{Fragment,useEffect} from "react";
import {Form,message} from "antd";
import {RemoteUmdComponent} from "tiklab-plugin-ui";
import {useSelector} from "tiklab-plugin-ui/es/_utils";
import {getVersionInfo} from "tiklab-core-ui";
import {inject,observer} from "mobx-react";
import FormView from "./formView/formView";

const ConfigView = props =>{

    const {view,pipelineId,configDataStore,configStore,pipelineStore} = props


    const {updateConfigure,findAllConfigure} = configStore

    const {isPlugin,setIsPlugin,setIsPrompt,setData,data,formInitialValues,setFormInitialValues,
        codeType,setCodeType,buildType,setBuildType,deployType,setDeployType,
        gitProofId,setGitProofId,deployProofId,setDeployProofId,
        unitShellBlock,setUnitShellBlock,
        mavenShellBlock,setMavenShellBlock,nodeShellBlock,setNodeShellBlock,
        virShellBlock,setVirShellBlock,
        virOrderShellBlock,setVirOrderShellBlock,docOrderShellBlock,setDocOrderShellBlock,
        virStartShellBlock,setVirStartShellBlock,docStartShellBlock,setDocStartShellBlock
    } = configDataStore

    const pluginStore = useSelector(state =>state.pluginStore)

    const [form] = Form.useForm()

    useEffect(()=>{
        pluginStore && pluginStore.map(item=>{
            if(item.id==="gui"){setIsPlugin(true)}
        })
    },[])

    const lists = [1,2,3,4,5,11,21,22,31,32]
    // 表单初始化
    const newData = []
    useEffect(()=>{
        if(pipelineId){
            findAllConfigure(pipelineId).then(res=>{
                const initialData = res.data
                if(res.code===0){
                    if(initialData.length === 0 ){
                        nonData()
                    }
                    else {
                        nonForm(initialData)
                        renderFormData(initialData)
                    }
                }
            })
        }
    },[pipelineId])

    useEffect(()=>{
        return ()=> nonData()
    },[pipelineId])

    const nonData = ()=>{
        setCodeType("")
        setData([])
        form.resetFields()
        setFormInitialValues({})
        setUnitShellBlock("")
        setMavenShellBlock("")
        setDocOrderShellBlock("")
        setDocStartShellBlock("")
        setVirOrderShellBlock("")
        setVirStartShellBlock("")
        setVirShellBlock("")
        setGitProofId("")
        setDeployProofId("")
    }

    // pipeline切换form数据渲染问题
    const nonForm = initialData =>{
        for (let i=0; i<initialData.length;i++){
            for (let j=0; j<lists.length;j++) {
                const type = parseInt(initialData[i].type/10)
                if (type*10 < lists[j] && (type+1) *10 > lists[j]) {
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
                setCodeType(data.type)
            }
            else if(data.type > 10 && data.type < 20){
                renderTestData(data)
            }
            else if(data.type > 20 && data.type < 30 ){
                renderBuild(data)
                setBuildType(data.type)
            }
            else if(data.type > 30 || data.type < 40 ){
                renderDeploy(data)
                setDeployType(data.type)
            }
            setData([...newData])
            setFormInitialValues({...formInitialValues})
        }
    }

    // 源码管理
    const renderCodeData = data => {
        const codeTypeProofName=data.proof && data.proof.proofName+ "(" + data.proof.proofType + ")"
        const codeFormValue = {
            [data.type+"codeName"]:data.codeName,
            [data.type+"codeBranch"]:data.codeBranch,
            [data.type+"proofName"]:data.proof.proofName?codeTypeProofName:null,
            proofName:data.proof && data.proof.proofName ,
            codeId:data.codeId,
        }
        Object.assign(formInitialValues,codeFormValue)
        setGitProofId(data.proof && data.proof.proofId)
    }

    // 测试
    const renderTestData = data =>{
        newData.push({
            dataId:data.testId,
            dataType:data.type,
        })
        const testFOrmValue = {
            testId: data.testId
        }
        Object.assign(formInitialValues,testFOrmValue)
        setUnitShellBlock(`${data.testOrder ? data.testOrder :""}`)
    }
    
    // 构建
    const renderBuild = data => {
        newData.push({
            dataId: data.buildId,
            dataType:data.type,
        })
        const buildFormValue = {
            [data.type+"buildAddress"] :data.buildAddress,
            buildId:data.buildId
        }
        switch (data.type){
            case 21:
                setMavenShellBlock(`${data.buildOrder ? data.buildOrder : ""}`)
                break
            case 22:
                setNodeShellBlock(`${data.buildOrder ? data.buildOrder : ""}`)
        }
        Object.assign(formInitialValues,buildFormValue)
    }
    
    // 部署
    const renderDeploy = data => {
        newData.push({
            dataId:data.deployId,
            dataType:data.type,
        })
        const deployTypeProofName=data.proof && data.proof.proofName+ "(" + data.proof.proofType + ")"
        const DeployFormValue={
            [data.type+"deployType"]:data.deployType, 
            [data.type+"proofName"]:data.proof.proofName?deployTypeProofName:null ,
            [data.type+"sourceAddress"]:data.sourceAddress,
            [data.type+"sshIp"]:data.sshIp,
            [data.type+"sshPort"]:data.sshPort,
            [data.type+"deployAddress"]:data.deployAddress,
            [data.type+"deployOrder"]:data.deployOrder,    
            [data.type+"startAddress"]:data.startAddress, 
            startPort:data.startPort,
            mappingPort:data.mappingPort,
            deployId:data.deployId
        }
        deployShellBlock(data)
        Object.assign(formInitialValues,DeployFormValue)
        setDeployProofId(data.proof && data.proof.proofId)
    }

    // 部署mirror
    const deployShellBlock = data =>{
        if(data.type===31){
            if(data.deployType===0){
                setVirOrderShellBlock(`${data.deployOrder ? data.deployOrder : ""}`)
                setVirShellBlock(`${data.startShell ? data.startShell : ""}`)
            }
            else setVirStartShellBlock(`${data.startShell ? data.startShell : ""}`)
        }
        if(data.type===32){
            if(data.deployType===0){
                setDocOrderShellBlock(`${data.deployOrder ? data.deployOrder : ""}`)
            }
            else setDocStartShellBlock(`${data.startShell ? data.startShell : ""}`)
        }
    }

    const onFinish = values => {
        //排序
        let testSort,buildSort, deploySort = 0

        data && data.map((item,index)=>{
            if(item.dataType > 10 && item.dataType < 20 ){
                testSort = index + 2
            }
            if(item.dataType > 20 && item.dataType < 30){
                buildSort = index + 2
            }
            if(item.dataType > 30 && item.dataType < 40){
                deploySort = index + 2
            }
        })    

        const configureList = {
            pipelineCode:{
                codeId:formInitialValues && formInitialValues.codeId,
                sort:codeType===""?0:1,
                type:codeType,
                codeName:values[codeType+"codeName"],
                codeBranch:values[codeType+"codeBranch"],
                proof:{proofId:gitProofId},
                pipeline:{pipelineId:pipelineId},
            },
            pipelineTest:{
                testId:formInitialValues && formInitialValues.testId,
                sort:testSort,
                type:11,
                testOrder:unitShellBlock,
                pipeline:{pipelineId:pipelineId},
            },
            pipelineBuild:{
                buildId:formInitialValues && formInitialValues.buildId,
                sort:buildSort,
                type:buildType,
                buildAddress:values[buildType+"buildAddress"],
                buildOrder:buildType===21?mavenShellBlock:nodeShellBlock,
                pipeline:{pipelineId:pipelineId},
            },
            pipelineDeploy:{
                deployId:formInitialValues && formInitialValues.deployId,
                sort:deploySort,
                type:deployType,
                proof:{proofId:deployProofId},
                pipeline:{pipelineId:pipelineId},
                deployType:values[deployType+"deployType"],
                sourceAddress:values[deployType+"sourceAddress"],
                sshIp:values[deployType+"sshIp"],
                sshPort:values[deployType+"sshPort"],
                deployAddress:values[deployType+"deployAddress"],
                startAddress:values[deployType+"startAddress"],
                startPort:deployType===32?values.startPort:"",
                mappingPort:deployType===32?values.mappingPort:"",
                deployOrder:deployType===32?docOrderShellBlock:virOrderShellBlock,
                startShell:deployType===32?docStartShellBlock:values[deployType+"deployType"]===1?virStartShellBlock:virShellBlock
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

    // 统一form表单里面需要删除的值
    const del = (i,type) => {
        switch (i) {
            case 11:
                setUnitShellBlock("")
                break
            case 21:
            case 22:
                formInitialValues[buildType+"buildAddress"] = null
                setMavenShellBlock("")
                setNodeShellBlock("")
                break
            case 31:
            case 32:
                formInitialValues[deployType+"proofName"] = null
                formInitialValues[deployType+"sourceAddress"] = null
                formInitialValues[deployType+"sshIp"] = null
                formInitialValues[deployType+"sshPort"] = null
                formInitialValues[deployType+"deployAddress"] = null
                formInitialValues[deployType+"deployOrder"] = null
                formInitialValues[deployType+"startAddress"] = null
                formInitialValues.startPort = null
                formInitialValues.mappingPort = null
                setDeployProofId("")
                setVirOrderShellBlock("")
                setVirShellBlock("")
                setVirStartShellBlock("")
                setDocOrderShellBlock("")
                setDocStartShellBlock("")
                break
            default:
                formInitialValues[codeType+"codeName"] = null
                formInitialValues[codeType+"codeBranch"] = null
                formInitialValues[codeType+"proofName"] = null
                formInitialValues.proofName = null           
                setCodeType("")
                setGitProofId("")
        }
        setFormInitialValues({...formInitialValues})
        if(!type){
            setIsPrompt(true)
        }
    }

    return view==="forms" ?
        <FormView
            del={del}
            form={form}
            onFinish={onFinish}
            pipelineId={pipelineId}
        />
        :
        <Fragment>
            {
                !getVersionInfo().expired && isPlugin?
                    <RemoteUmdComponent
                        {...props}
                        point={"gui"}
                        pluginStore={pluginStore}
                        isModalType={true}
                        extraProps={{
                            pipelineStore,
                            configDataStore,
                            form,
                            onFinish,
                            del
                        }}
                    />
                    :null
            }
        </Fragment>
}

export default  inject("configStore","configDataStore","pipelineStore")(observer(ConfigView))