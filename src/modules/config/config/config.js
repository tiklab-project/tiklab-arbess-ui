import React,{Fragment,useState,useEffect} from "react";
import "../common/component/configCommon/config.scss";
import {Form} from "antd";
import {withRouter} from "react-router";
import ProjectBreadcrumb from "../../project/breadcrumb/projectBreadcrumb";
import FormView from "../common/component/configCommon/formView";
import ConfigChangeView from "../common/component/configCommon/configChangeView";
import {getUrlParam} from "../common/component/configCommon/getUrlParam";
import {inject, observer} from "mobx-react";
import {getUser} from "doublekit-core-ui";
import {useSelector, RemoteUmdComponent} from "doublekit-plugin-ui";

const Config = props =>{

    const {configStore,giteeStore,structureStore,configDataStore,githubStore,match} = props

    const {updateConfigure} = configStore
    const {code,getState} = giteeStore
    const {getAccessToken} = githubStore
    const {pipelineStartStructure} = structureStore

    const {setIsPrompt,codeData,setCodeData,formInitialValues,setFormInitialValues,setLinuxShellBlock,
        setUnitShellBlock,setMavenShellBlock,setCodeType
    } = configDataStore

    const [form] = Form.useForm()
    const pluginStore = useSelector(state =>state.pluginStore)
    const [view,setView] = useState(1)
    const [isBtn,setIsBtn] = useState(false)
    const jumpOrNot = match.params.pipelineName
    const codeValue = getUrlParam("code")
    const codeError = getUrlParam("error")
    const pipelineId = localStorage.getItem("pipelineId")
    const userId = getUser().userId

    useEffect(()=>{
        return () =>{
            localStorage.removeItem("gitProofId")
            localStorage.removeItem("deployProofId")
        }
    },[])

    useEffect(()=>{
        pluginStore.map(item=>{
            if(item.id === "gui"){
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
            default:delDetail("git")
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
                        jumpOrNot={jumpOrNot}
                        updateConfigure={updateConfigure}
                    />
                    :
                    <Fragment>
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


export default  withRouter(inject("configStore", "giteeStore","structureStore",
                "configDataStore","githubStore")(observer(Config)))