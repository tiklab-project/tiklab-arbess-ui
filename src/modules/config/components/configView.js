import React,{Fragment,useEffect} from "react";
import {RemoteUmdComponent} from "tiklab-plugin-ui";
import {useSelector} from "tiklab-plugin-ui/es/_utils";
import {getVersionInfo} from "tiklab-core-ui";
import FormView from "../common/formView";
// import FormView from "./formView/formView";

const ConfigView = props =>{

    const {view,onFinish,form,pipelineStore,configDataStore} = props
    const {pipelineId} = pipelineStore
    const {isPlugin,setIsPlugin,formInitialValues,setUnitShellBlock,setMavenShellBlock,
        setOrderShellBlock,setLinuxShellBlock,setDeployProofId,setShellBlock,setCodeData,
        setGitProofId,setCodeType,setFormInitialValues,setIsPrompt
    } = configDataStore
    const pluginStore = useSelector(state =>state.pluginStore)

    useEffect(()=>{
        pluginStore && pluginStore.map(item=>{
            if(item.id==="gui"){
                setIsPlugin(true)
            }
        })
    },[])

    // 统一form表单里面需要删除的值
    const del = (i,type) => {
        switch (i) {
            case 11:
                formInitialValues.testOrder = null
                setUnitShellBlock("")
                break
            case 21:
            case 22:
                formInitialValues.buildAddress = null
                formInitialValues.buildOrder = null
                setMavenShellBlock("")
                break
            case 31:
            case 32:
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
                break
            default:
                formInitialValues.codeName = null
                formInitialValues.codeBranch = null
                formInitialValues.proofName = null
                formInitialValues.gitProofName = null
                setCodeData("")
                setCodeType(1)
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

export default ConfigView