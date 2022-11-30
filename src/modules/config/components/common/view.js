import React,{useEffect,useState} from "react";
import {PlusOutlined,AppstoreOutlined,BarsOutlined} from "@ant-design/icons";
import {RemoteUmdComponent} from "tiklab-plugin-ui";
import {useSelector} from "tiklab-plugin-ui/es/_utils";
import {getVersionInfo} from "tiklab-core-ui";
import {inject,observer} from "mobx-react";
import FormView from "../formView/formView";
import Gui from "../../../gui/container/gui";
import AddModal from "../formView/addModal";
import Btn from "../../../common/btn/btn";

const View = props =>{

    const {configDataStore,configStore,pipelineStore} = props

    const {findAllConfigure,isPlugin,setIsPlugin,isFindConfig} = configStore

    const {formInitialValues,setFormInitialValues,
        setCodeType,setBuildType,setDeployType,setTestType,setScanType,setGoodsType,
        setUnitShellBlock,setBuildShellBlock,
        setVirShellBlock,setDeployShellBlock,setDeployOrderShellBlock,
        addConfigVisible,setAddConfigVisible,
    } = configDataStore

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
        // setView(configView)
    },[])

    // 表单初始化
    useEffect(()=>{
        // 配置详情
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
        setCodeType("")
        setFormInitialValues({})
        setUnitShellBlock("")
        setVirShellBlock("")
        setDeployOrderShellBlock("")
        setDeployShellBlock("")
        setBuildShellBlock("")
    }

    // 表单数据渲染
    const renderFormData = initialData => {
        for (let i = 0;i<initialData.length;i++){
            const data = initialData[i]
            if(data.type < 10){
                renderCodeData(data)
            }
            else if(data.type > 10 && data.type < 20){
                renderTestData(data)
            }
            else if(data.type > 20 && data.type < 30 ){
                renderBuild(data)
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
            Object.assign(formInitialValues, initialData[i])
            setFormInitialValues({...formInitialValues})
        }
    }

    // 源码管理
    const renderCodeData = data => {
        let codeFormValue
        switch (data.type) {
            case 1:
            case 4:
            case 5:
                codeFormValue = {
                    gitAuthName:data.auth && data.auth.name+"("+(data.auth.authType === 1?data.auth.username:"私钥")+")",
                    gitAuthId:data.authId
                }
                break
            default:
                codeFormValue = {
                    gitAuthName:data.auth && data.auth.name+"("+ data.auth.message+")",
                    gitAuthId:data.authId
                }
        }
        setCodeType(data.type)
        Object.assign(formInitialValues,codeFormValue)
    }

    // 测试
    const renderTestData = data =>{
        setTestType(data.type)
        setUnitShellBlock(`${data.testOrder ? data.testOrder :""}`)
    }
    
    // 构建
    const renderBuild = data => {
        setBuildType(data.type)
        setBuildShellBlock(`${data.buildOrder ? data.buildOrder : ""}`)
    }
    
    // 部署
    const renderDeploy = data => {
        const DeployFormValue={
            deployAuthName:data.auth && data.auth.name+"("+ data.auth.ip+")",
            deployAuthId: data.authId
        }
        deploy(data)
        setDeployType(data.type)
        Object.assign(formInitialValues,DeployFormValue)
    }

    // 部署mirror
    const deploy =  data =>{
        if(data.authType===1){
            setDeployOrderShellBlock(`${data.deployOrder ? data.deployOrder : ""}`)
            setVirShellBlock(`${data.startOrder ? data.startOrder : ""}`)
        }
        else setDeployShellBlock(`${data.startOrder ? data.startOrder : ""}`)
    }

    // 代码扫描
    const renderScan = data => {
        const scanFormValue={
            scanAuthName:data.auth && data.auth.name+"("+data.auth.username+")",
            scanAuthId:data.authId
        }
        setScanType(data.type)
        Object.assign(formInitialValues,scanFormValue)
    }

    // 推动制品
    const renderGoods = data => {
        let goodsFormValue
        switch (data.type) {
            case 51:
                goodsFormValue={
                    goodsAuthName:data.auth && data.auth.name+"("+data.auth.username+")",
                    goodsAuthId:data.authId
                }
                break
            case 52:
                goodsFormValue={
                    goodsAuthName:data.auth && data.auth.name+"("+ data.auth.ip+")",
                    goodsAuthId:data.authId
                }
        }
        setGoodsType(data.type)
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
                    <div className="config-view-ban">
                        <AppstoreOutlined  />&nbsp;图形视图
                    </div>
                    :
                    <div className={`config-view ${view==="gui"?"config-view-active":""}`} onClick={()=>changeView("gui")}>
                        <AppstoreOutlined  />&nbsp;图形视图
                    </div>
                }               
            </div>
            <div>
                <Btn
                    icon={<PlusOutlined/>}
                    onClick={() =>setAddConfigVisible(true)}
                    title={"添加任务"}
                />
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
                configDataStore={configDataStore}
            />
            :
            <>
                <Gui
                    {...props}
                    configStore={configStore}
                    configDataStore={configDataStore}
                    pipelineStore={pipelineStore}
                />

                {/*{*/}
                {/*    !getVersionInfo().expired && isPlugin &&*/}
                {/*        <RemoteUmdComponent*/}
                {/*            {...props}*/}
                {/*            point={"gui"}*/}
                {/*            pluginStore={pluginStore}*/}
                {/*            isModalType={true}*/}
                {/*            extraProps={{*/}
                {/*                pipelineStore:pipelineStore,*/}
                {/*                configDataStore:configDataStore,*/}
                {/*                configStore:configStore,*/}
                {/*            }}*/}
                {/*       />*/}
                {/*}*/}
            </>
        }
    </>
}

export default  inject("configStore","configDataStore","pipelineStore")(observer(View))