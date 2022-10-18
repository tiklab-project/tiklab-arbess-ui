import React,{Fragment,useEffect} from "react";
import {Form} from "antd";
import {toJS} from 'mobx'
import {RemoteUmdComponent} from "tiklab-plugin-ui";
import {useSelector} from "tiklab-plugin-ui/es/_utils";
import {getVersionInfo} from "tiklab-core-ui";
import {inject,observer} from "mobx-react";
import FormView from "../formView/formView";
import Gui from "../../../gui/container/gui";

const ConfigView = props =>{

    const {view,configDataStore,configStore,pipelineStore} = props

    const {findAllConfigure} = configStore

    const {isPlugin,setIsPlugin,setData,formInitialValues,setFormInitialValues,
        setCodeType,setBuildType,setDeployType,setGitProofId,setDeployProofId,
        setUnitShellBlock,setBuildShellBlock,
        setVirShellBlock,setDeployShellBlock,setDeployOrderShellBlock,
    } = configDataStore

    const {pipelineId} = pipelineStore

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
                    if(initialData === null || initialData.length===0){
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
        setVirShellBlock("")
        setDeployOrderShellBlock("")
        setDeployShellBlock("")
        setBuildShellBlock("")
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
        return lists.map(item=>del(item))
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
                deploy(data)
                setDeployType(data.type)
            }
            setData([...newData])
            Object.assign(formInitialValues, initialData[i])
            setFormInitialValues({...formInitialValues})
        }
    }

    // 源码管理
    const renderCodeData = data => {
        const codeFormValue = {
            gitProofName:data.proof ? data.proof && data.proof.proofName+ "(" + data.proof.proofType + ")":"无" ,
            proofName:data.proof && data.proof.proofName ,
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
        setUnitShellBlock(`${data.testOrder ? data.testOrder :""}`)
    }
    
    // 构建
    const renderBuild = data => {
        newData.push({
            dataId: data.buildId,
            dataType:data.type,
        })
        setBuildShellBlock(`${data.buildOrder ? data.buildOrder : ""}`)
    }
    
    // 部署
    const renderDeploy = data => {
        newData.push({
            dataId:data.deployId,
            dataType:data.type,
        })
        const DeployFormValue={
            deployProofName:data.proof ? data.proof && data.proof.proofName+ "(" + data.proof.proofType + ")":"无" ,
        }
        Object.assign(formInitialValues,DeployFormValue)
        setDeployProofId(data.proof && data.proof.proofId)
    }

    // 部署mirror
    const deploy =  data =>{
        if(data.deployType===0){
            setDeployOrderShellBlock(`${data.deployOrder ? data.deployOrder : ""}`)
            setVirShellBlock(`${data.startShell ? data.startShell : ""}`)
        }
        else setDeployShellBlock(`${data.startShell ? data.startShell : ""}`)
    }

    // 统一form表单里面需要删除的值
    const del = i => {
        switch (i) {
            case 11:
                setUnitShellBlock("")
                break
            case 21:
            case 22:
                formInitialValues.buildAddress = null
                setBuildShellBlock("")
                break
            case 31:
            case 32:
                formInitialValues.deployProofName = null
                formInitialValues.sourceAddress = null
                formInitialValues.sshIp = null
                formInitialValues.sshPort = null
                formInitialValues.deployAddress = null
                formInitialValues.deployOrder = null
                formInitialValues.startAddress = null
                formInitialValues.startPort = null
                formInitialValues.mappingPort = null
                setDeployProofId("")
                setVirShellBlock("")
                setDeployShellBlock("")
                setDeployOrderShellBlock("")
                break
            default:
                formInitialValues.codeName = null
                formInitialValues.codeBranch = null
                formInitialValues.gitproofName = null
                formInitialValues.proofName = null           
                setCodeType("")
                setGitProofId("")
        }
        setFormInitialValues({...formInitialValues})
    }

    return view==="forms" ?
        <FormView
            del={del}
            form={form}
            pipelineId={pipelineId}
        />
        :
        <>
            <Gui
                {...props}
                form={form}
                del={del}
                configDataStore={configDataStore}
                pipelineStore={pipelineStore}
            />
            {/*{*/}
            {/*    !getVersionInfo().expired && isPlugin?*/}
            {/*        <RemoteUmdComponent*/}
            {/*            {...props}*/}
            {/*            point={"gui"}*/}
            {/*            pluginStore={pluginStore}*/}
            {/*            isModalType={true}*/}
            {/*            extraProps={{*/}
            {/*                pipelineStore:toJS(pipelineStore),*/}
            {/*                configDataStore:toJS(configDataStore),*/}
            {/*                form,*/}
            {/*                del,*/}
            {/*            }}*/}
            {/*        />*/}
            {/*        :null*/}
            {/*}*/}
        </>
}

export default  inject("configStore","configDataStore","pipelineStore")(observer(ConfigView))