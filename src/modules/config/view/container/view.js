import React,{useEffect,useState} from "react";
import {PlusOutlined, AppstoreOutlined, BarsOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {RemoteUmdComponent} from "tiklab-plugin-ui";
import {useSelector} from "tiklab-plugin-ui/es/_utils";
import {getVersionInfo} from "tiklab-core-ui";
import {inject,observer} from "mobx-react";
import FormView from "../components/formView/formView";
import Gui from "../../../gui/container/gui";
import AddModal from "../components/formView/addModal";
import Btn from "../../../common/btn/btn";

const View = props =>{

    const {configStore,pipelineStore} = props

    const {findAllConfigure,isPlugin,setIsPlugin,isFindConfig,valid,formInitialValues,setFormInitialValues,addConfigVisible,setAddConfigVisible} = configStore

    const {pipelineId,pipeline} = pipelineStore

    const pluginStore = useSelector(state =>state.pluginStore)

    const [view,setView] = useState("forms")
    const configView = localStorage.getItem("configView")

    useEffect(()=>{
        pluginStore && pluginStore.map(item=>{
            if(item.id==="gui"){setIsPlugin(true)}
        })
        if(getVersionInfo().expired || !isPlugin || !configView){
            setView("forms")
        }else {
            setView(configView)
        }
    },[])

    // 表单初始化
    useEffect(()=>{
        pipelineId && findAllConfigure(pipelineId).then(res=>{
            const initialData = res.data
            if(res.code===0){
                if(initialData === null || initialData.length===0){
                    nonData()
                }
                else {
                    renderFormData(initialData)
                }
            }
        })
    },[pipelineId,isFindConfig])

    useEffect(()=>{
        return ()=> nonData()
    },[pipelineId])

    const nonData = ()=>{
        setFormInitialValues({})
    }

    // 表单数据渲染
    const renderFormData = initialData => {
        for (let i = 0;i<initialData.length;i++){
            const data = initialData[i]
            if(data.type < 10){
                renderCodeData(data)
            }
            else if(data.type > 30 && data.type < 40 ){
                renderDeploy(data)
            }
            else if(data.type > 40 && data.type <50){
                renderScan(data)
            }
            else if(data.type>50 && data.type<60){
                renderGoods(data)
            }
            setFormInitialValues({...formInitialValues})
        }
    }

    const getId = (data,name) =>{
        return data.configId+"_"+name
    }

    // 源码管理
    const renderCodeData = data => {
        let codeFormValue
        switch (data.type) {
            case 1:
            case 4:
            case 5:
                codeFormValue = {
                    [getId(data,"codeName")]:data && data.codeName,
                    [getId(data,"codeBranch")]:data && data.codeBranch,
                    [getId(data,"codeAlias")]:data && data.codeAlias,
                    [getId(data,"svnFile")]:data && data.svnFile,
                    [getId(data,"authName")]:data.auth && data.auth.name+"("+(data.auth.authType === 1?data.auth.username:"私钥")+")",
                    [getId(data,"authId")]:data.authId
                }
                break
            default:
                codeFormValue = {
                    [getId(data,"codeName")]:data && data.codeName,
                    [getId(data,"codeBranch")]:data && data.codeBranch,
                    [getId(data,"codeAlias")]:data && data.codeAlias,
                    [getId(data,"authName")]:data.auth && data.auth.name+"("+ data.auth.message+")",
                    [getId(data,"authId")]:data.authId
                }
            
        }
        Object.assign(formInitialValues,codeFormValue)
    }
    
    // 部署
    const renderDeploy = data => {
        const DeployFormValue={
            [getId(data,"localAddress")]:data && data.localAddress,
            [getId(data,"deployAddress")]:data && data.deployAddress,
            [getId(data,"deployOrder")]:data && data.deployOrder,
            [getId(data,"startAddress")]:data && data.startAddress,
            [getId(data,"authType")]:data && data.authType,
            [getId(data,"authName")]:data.auth && data.auth.name+"("+ data.auth.ip+")",
            [getId(data,"authId")]: data.authId,
    
        }
        Object.assign(formInitialValues,DeployFormValue)
    }

    // 代码扫描
    const renderScan = data => {
        const scanFormValue={
            [getId(data,"projectName")]:data && data.projectName,
            [getId(data,"authName")]:data.auth && data.auth.name+"("+data.auth.username+")",
            [getId(data,"authId")]:data.authId
        }
        Object.assign(formInitialValues,scanFormValue)
    }

    // 推动制品
    const renderGoods = data => {
        let goodsFormValue
        switch (data.type) {
            case 51:
                goodsFormValue={
                    [getId(data,"groupId")]:data.groupId,
                    [getId(data,"artifactId")]:data.artifactId,
                    [getId(data,"version")]:data.version,
                    [getId(data,"fileType")]:data.fileType,
                    [getId(data,"fileAddress")]:data.fileAddress,
                    [getId(data,"authName")]:data.auth && data.auth.name+"("+data.auth.username+")",
                    [getId(data,"authId")]:data.authId
                }
                break
            case 52:
                goodsFormValue={
                    [getId(data,"groupId")]:data.groupId,
                    [getId(data,"artifactId")]:data.artifactId,
                    [getId(data,"version")]:data.version,
                    [getId(data,"fileType")]:data.fileType,
                    [getId(data,"fileAddress")]:data.fileAddress,
                    [getId(data,"authName")]:data.auth && data.auth.name+"("+ data.auth.ip+")",
                    [getId(data,"authId")]:data.authId
                }
        }
        Object.assign(formInitialValues,goodsFormValue)
    }

    const changeView = type => {
        setView(type)
        localStorage.setItem("configView",type)
    }

    return <>
        <div className="config-views">
            <div>
                <div className={`config-view ${view==="forms"?"config-view-active":""}`} onClick={()=>changeView("forms")}>
                    <BarsOutlined  />&nbsp;表单视图
                </div>
                {
                    getVersionInfo().expired || !isPlugin ?
                    <div className="config-view-ban" >
                        <AppstoreOutlined  />&nbsp;图形视图
                    </div>
                    :
                    <div className={`config-view ${view==="gui"?"config-view-active":""}`} onClick={()=>changeView("gui")}>
                        <AppstoreOutlined  />&nbsp;图形视图
                    </div>
                }               
            </div>
            <div>
                <div className="config-valid">
                    {valid && valid.length > 0 ?
                        <span>
                            <ExclamationCircleOutlined style={{fontSize:16}}/> &nbsp;
                            <span className="config-valid-num">{valid && valid.length}项未配置</span>
                        </span> :
                        null}
                </div>
                <div className="config-add">
                    <Btn
                        icon={<PlusOutlined/>}
                        onClick={() =>setAddConfigVisible(true)}
                        title={"添加任务"}
                    />
                </div>
                <AddModal
                    addConfigVisible={addConfigVisible}
                    setAddConfigVisible={setAddConfigVisible}
                />
            </div>
        </div>
        {
            view==="forms" ?
            <FormView
                pipeline={pipeline}
                configStore={configStore}
            />
            :
            <>
                {/*<Gui*/}
                {/*    {...props}*/}
                {/*    configStore={configStore}*/}
                {/*    pipelineStore={pipelineStore}*/}
                {/*/>*/}

                {
                    !getVersionInfo().expired && isPlugin &&
                        <RemoteUmdComponent
                            {...props}
                            point={"gui"}
                            pluginStore={pluginStore}
                            isModalType={true}
                            extraProps={{
                                pipelineStore:pipelineStore,
                                configStore:configStore,
                            }}
                       />
                }
            </>
        }
    </>
}

export default  inject("configStore","pipelineStore")(observer(View))