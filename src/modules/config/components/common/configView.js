import React,{useEffect} from "react";
import {RemoteUmdComponent} from "tiklab-plugin-ui";
import {useSelector} from "tiklab-plugin-ui/es/_utils";
import {getVersionInfo} from "tiklab-core-ui";
import {inject,observer} from "mobx-react";
import FormView from "../formView/formView";
import Gui from "../../../gui/container/gui";

const ConfigView = props =>{

    const {view,configDataStore,configStore,pipelineStore} = props

    const {findAllConfigure,isPlugin,setIsPlugin,isFindConfig} = configStore

    const {setData,formInitialValues,setFormInitialValues,
        setCodeType,setBuildType,setDeployType,setTestType,setScanType,setGoodsType,
        setUnitShellBlock,setBuildShellBlock,
        setVirShellBlock,setDeployShellBlock,setDeployOrderShellBlock,
    } = configDataStore

    const {pipelineId,pipeline} = pipelineStore

    const pluginStore = useSelector(state =>state.pluginStore)

    useEffect(()=>{
        pluginStore && pluginStore.map(item=>{
            if(item.id==="gui"){setIsPlugin(true)}
        })
    },[])

    // 表单初始化
    const newData = []
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
        setData([])
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
            newData.push({
                dataId:i,
                dataType:data.type,
            })
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
            setData([...newData])
            Object.assign(formInitialValues, initialData[i])
            setFormInitialValues({...formInitialValues})
        }
    }

    // 源码管理
    const renderCodeData = data => {
        const codeFormValue = {
            gitAuthName:data.auth && data.auth.name,
            gitAuthId:data.authId
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
            deployAuthName:data.auth && data.auth.name,
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
            scanAuthName:data.auth && data.auth.name,
            scanAuthId:data.authId
        }
        setScanType(data.type)
        Object.assign(formInitialValues,scanFormValue)
    }

    // 推动制品
    const renderGoods = data => {
        const goodsFormValue={
            goodsAuthName:data.auth && data.auth.name,
            goodsAuthId:data.authId
        }
        setGoodsType(data.type)
        Object.assign(formInitialValues,goodsFormValue)
    }

    return view==="forms" ?
        <FormView
            pipeline={pipeline}
            configStore={configStore}
            configDataStore={configDataStore}
        />
        :
         <>
            {/*<Gui*/}
            {/*    {...props}*/}
            {/*    configStore={configStore}*/}
            {/*    configDataStore={configDataStore}*/}
            {/*    pipelineStore={pipelineStore}*/}
            {/*/>*/}


             {
                 !getVersionInfo().expired && isPlugin?
                     <RemoteUmdComponent
                         {...props}
                         point={"gui"}
                         pluginStore={pluginStore}
                         isModalType={true}
                         extraProps={{
                             pipelineStore:pipelineStore,
                             configDataStore:configDataStore,
                             configStore:configStore,
                         }}
                    />
                    :null
            }
        </>
}

export default  inject("configStore","configDataStore","pipelineStore")(observer(ConfigView))