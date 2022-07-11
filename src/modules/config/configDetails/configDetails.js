import React, {useState, useEffect, Fragment} from "react";
import {useSelector, RemoteUmdComponent} from "doublekit-plugin-ui";
import "../common/component/configCommon/config.scss";
import FormView from "../common/component/configCommon/formView";
import GuiView from "../common/component/configCommon/guiView";
import ConfigChangeView from "../common/component/configCommon/configChangeView";
import ProjectBreadcrumb from "../../project/breadcrumb/projectBreadcrumb";
import {Form} from "antd";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {getUrlParam} from "../common/component/configCommon/getUrlParam";
import {getUser} from "doublekit-core-ui";

const ConfigDetails = props =>{

    const {configStore,giteeStore,structureStore,configDataStore,githubStore} = props

    const {updateConfigure,findAllConfigure} = configStore
    const {code,getState} = giteeStore
    const {getAccessToken} = githubStore
    const {pipelineStartStructure} = structureStore
    const {setIsPrompt,setData,codeData,setCodeData,formInitialValues,setFormInitialValues,setLinuxShellBlock,
        setUnitShellBlock,setMavenShellBlock,setCodeType} = configDataStore

    const [form] = Form.useForm()
    const pluginStore = useSelector(state =>state.pluginStore)
    const [view,setView] = useState(1)
    const [isBtn,setIsBtn] = useState(false)
    const codeValue = getUrlParam("code")
    const codeError = getUrlParam("error")
    const pipelineId = localStorage.getItem("pipelineId")
    const userId = getUser().userId

    useEffect(()=>{
        return () =>{
            localStorage.removeItem("gitProofId")
            localStorage.removeItem("deployProofId")
            localStorage.removeItem("codeId")
            localStorage.removeItem("testId")
            localStorage.removeItem("structureId")
            localStorage.removeItem("deployId")
        }
    },[])

    // 是否有图形化插件
    useEffect(()=>{
        pluginStore.map(item=>{
            if(item.id === "gui"){
                setIsBtn(true)
            }else setIsBtn(false)
        })
    },[])

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

    const lists = [1,2,3,4,5,11,21,22,31,32]
    // 表单初始化
    const newData = []
    useEffect(()=>{
        findAllConfigure(pipelineId).then(res=>{
            const initialData = res.data
            if(initialData.length === 0 ){
                setCodeData("")
                setData([])
                form.resetFields()
                setFormInitialValues({})
                setUnitShellBlock("")
                setMavenShellBlock("")
                setLinuxShellBlock("")
            }
            else {
                nonForm(initialData)
                renderFormData(initialData)
            }
        })
    },[pipelineId])

    // pipeline切换form数据渲染问题
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
            gitProofName:data.proof && data.proof.proofName+ "(" + data.proof.proofUsername + ")" ,
            proofName:data.proof && data.proof.proofName ,
        }
        Object.assign(formInitialValues,formValue)
        localStorage.setItem("codeId",data.codeId)
        localStorage.setItem("gitProofId",data.proof && data.proof.proofId)
        setCodeType(data.type)
        setCodeData(newCode)
    }

    const renderTestData = data =>{
        newData.push({
            dataId:data.testId,
            title:data.testAlias,
            dataType:data.type,
        })
        localStorage.setItem("testId",data.testId)
        setUnitShellBlock(`${data.testOrder ? data.testOrder :""}`)
    }
    
    const renderStructure = data => {
        newData.push({
            dataId: data.structureId,
            title: data.structureAlias,
            dataType:data.type,
        })
        localStorage.setItem("structureId",data.structureId)
        setMavenShellBlock(`${data.structureOrder ? data.structureOrder : ""}`)
    }
    
    const renderDeploy = data => {
        newData.push({
            dataId:data.deployId,
            title: data.deployAlias,
            dataType:data.type,
        })
        const formValue = {
            dockerProofName:data.proof && data.proof.proofName+ "(" + data.proof.proofUsername + ")" ,
        }
        Object.assign(formInitialValues,formValue)
        localStorage.setItem("deployId",data.deployId)
        localStorage.setItem("deployProofId",data.proof && data.proof.proofId)
        setLinuxShellBlock(`${data.deployShell ? data.deployShell : ""}`)
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
                formInitialValues.deployTargetAddress = null
                formInitialValues.deployAddress = null
                formInitialValues.ip = null
                formInitialValues.port = null
                formInitialValues.dockerProofName = null
                formInitialValues.dockerPort = null
                formInitialValues.mappingPort = null
                setLinuxShellBlock("")
        }
    }

    return (
        <Fragment>
            <div className="config-top">
               <div className="config-top-content">
                   <ProjectBreadcrumb config={"config"}/>
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
                        del={del}
                        form={form}
                        updateConfigure={updateConfigure}
                    />
                    :
                    <Fragment>
                        {/*<GuiView*/}
                        {/*    del={del}*/}
                        {/*    form={form}*/}
                        {/*    updateConfigure={updateConfigure}*/}
                        {/*/>*/}
                        {
                            isBtn ?
                                <RemoteUmdComponent
                                    point={"gui"}
                                    pluginStore={pluginStore}
                                    extraProps={{
                                        configDataStore,
                                        configStore,
                                        form,
                                        del
                                    }}
                                />
                                : null
                        }
                    </Fragment>
            }
        </Fragment>
    )
}

export default  withRouter(inject("configStore","giteeStore","structureStore",
                "configDataStore","githubStore")(observer(ConfigDetails)))