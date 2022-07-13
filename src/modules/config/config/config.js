import React,{Fragment,useState,useEffect} from "react";
import "../common/component/configCommon/config.scss";
import {withRouter} from "react-router";
import {getUrlParam} from "../common/component/configCommon/getUrlParam";
import {inject,observer} from "mobx-react";
import ConfigTop from "../common/component/configCommon/configTop";
import PromptContent from "../../../common/prompt/prompt";
import FormView from "../common/component/configCommon/formView";
import {Form} from "antd";
import {getUser} from "doublekit-core-ui";
import {RemoteUmdComponent} from "doublekit-plugin-ui";
import {useSelector} from "doublekit-plugin-ui/es/_utils";

const Config = props =>{

    const {configStore,giteeStore,structureStore,configDataStore,githubStore,match} = props

    const {updateConfigure,findAllConfigure} = configStore
    const {code,getState} = giteeStore
    const {getAccessToken} = githubStore
    const {pipelineStartStructure} = structureStore
    const {isPrompt,setIsPrompt,codeData,setCodeData,formInitialValues,setFormInitialValues,setLinuxShellBlock,
        setUnitShellBlock,setMavenShellBlock,setCodeType,setData} = configDataStore

    const [form] = Form.useForm()
    const pluginStore = useSelector(state =>state.pluginStore)
    const [view,setView] = useState(1)
    const [isBtn,setIsBtn] = useState(false)
    const codeValue = getUrlParam("code")
    const codeError = getUrlParam("error")
    const pipelineId = localStorage.getItem("pipelineId")
    const userId = getUser().userId
    const jumpOrNot = match.params.newConfig

    useEffect(()=>{
        return () =>{
            localStorage.removeItem("gitProofId")
            localStorage.removeItem("deployProofId")
        }
    },[])

    useEffect(()=>{
        findAllConfigure(pipelineId).then(()=>{
            setCodeData("")
            setData([])
            setFormInitialValues({})
            setUnitShellBlock("")
            setMavenShellBlock("")
            setLinuxShellBlock("")
        })
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
                formInitialValues.startType = null
                formInitialValues.startAddress = null
                setLinuxShellBlock("")
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

    return (
        <Fragment>
            <div className="config-top config-top-width">
                <ConfigTop
                    userId={userId}
                    view={view}
                    setView={setView}
                    setIsPrompt={setIsPrompt}
                    pipelineId={pipelineId}
                    pipelineStartStructure={pipelineStartStructure}
                    isBtn={isBtn}
                />
            </div>
            <Fragment>
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
                                            jumpOrNot,
                                            form,
                                            del
                                        }}
                                    />
                                    : null
                            }
                        </Fragment>
                }
            </Fragment>
            <PromptContent
                isPrompt={isPrompt}
                confirmLeave={confirmLeave}
            />
        </Fragment>
    )
}


export default  withRouter(inject("configStore", "giteeStore","structureStore",
                "configDataStore","githubStore")(observer(Config)))