import React,{useEffect} from "react";
import {toJS} from "mobx";
import {RemoteUmdComponent} from "tiklab-plugin-ui";
import {useSelector} from "tiklab-plugin-ui/es/_utils";
import {getVersionInfo} from "tiklab-core-ui";
import {inject,observer} from "mobx-react";
import FormView from "../formView/formView";
import Gui from "../../../gui/container/gui";
import {Empty} from "antd";
import AuthBtn from "../../../resources/auth/components/authBtn";
import ServerBtn from "../../../resources/server/components/serverBtn";
import HostBtn from "../../../resources/host/component/hostBtn";

const ConfigView = props =>{

    const {view,configDataStore,configStore,pipelineStore} = props

    const {findAllConfigure,isPlugin,setIsPlugin,setValidLength} = configStore

    const {setData,formInitialValues,setFormInitialValues,
        setCodeType,setBuildType,setDeployType,setTestType,setScanType,setGoodsType,
        setUnitShellBlock,setBuildShellBlock,codeType,data,
        setVirShellBlock,setDeployShellBlock,setDeployOrderShellBlock,
    } = configDataStore

    const {pipelineId} = pipelineStore

    const pluginStore = useSelector(state =>state.pluginStore)

    useEffect(()=>{
        pluginStore && pluginStore.map(item=>{
            if(item.id==="gui"){setIsPlugin(true)}
        })
    },[])


    const lists = [1,2,3,4,5,11,21,22,31,32]
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
                    nonForm(initialData)
                    renderFormData(initialData)
                }
            }
        })
    },[pipelineId])

    useEffect(()=>{
        return ()=> nonData()
    },[pipelineId])

    const nonData = ()=>{
        setCodeType("")
        setData([])
        setValidLength([])
        setFormInitialValues({})
        setUnitShellBlock("")
        setVirShellBlock("")
        setDeployOrderShellBlock("")
        setDeployShellBlock("")
        setBuildShellBlock("")
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
            newData.push({
                dataId:i,
                dataType:data.type,
            })
            if(data.type < 10){
                renderCodeData(data)
                setCodeType(data.type)
            }
            else if(data.type > 10 && data.type < 20){
                renderTestData(data)
                setTestType(data.type)
            }
            else if(data.type > 20 && data.type < 30 ){
                renderBuild(data)
                setBuildType(data.type)
            }
            else if(data.type > 30 && data.type < 40 ){
                renderDeploy(data)
                deploy(data)
                setDeployType(data.type)
            }
            else if(data.type > 40 && data.type <50){
                renderScan(data)
                setScanType(data.type)
            }
            else if(data.type>50 && data.type<60){
                renderGoods(data)
                setGoodsType(data.type)
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
        Object.assign(formInitialValues,codeFormValue)
    }

    // 测试
    const renderTestData = data =>{
        setUnitShellBlock(`${data.testOrder ? data.testOrder :""}`)
    }
    
    // 构建
    const renderBuild = data => {
        setBuildShellBlock(`${data.buildOrder ? data.buildOrder : ""}`)
    }
    
    // 部署
    const renderDeploy = data => {
        const DeployFormValue={
            deployAuthName:data.auth && data.auth.name,
            deployAuthId: data.authId
        }
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
        Object.assign(formInitialValues,scanFormValue)
    }

    // 推动制品
    const renderGoods = data => {
        const goodsFormValue={
            goodsAuthName:data.auth && data.auth.name,
            goodsAuthId:data.authId
        }
        Object.assign(formInitialValues,goodsFormValue)
    }

    // 统一form表单里面需要删除的值
    const del = i => {
        switch (i) {
            case 11:
                setUnitShellBlock("")
                setTestType("")
                break
            case 21:
            case 22:
                formInitialValues.buildAddress = null
                setBuildShellBlock("")
                setBuildType("")
                break
            case 31:
            case 32:
                formInitialValues.deployAuthName = null
                formInitialValues.localAddress = null
                formInitialValues.deployAddress = null
                formInitialValues.deployOrder = null
                formInitialValues.startAddress = null
                formInitialValues.authType = 1
                formInitialValues.deployAuthId = 0
                setDeployType("")
                setVirShellBlock("")
                setDeployShellBlock("")
                setDeployOrderShellBlock("")
                break
            case 41:
                formInitialValues.scanAuthName = null
                formInitialValues.scanAuthId = null
                formInitialValues.projectName = null
                setScanType("")
                break
            case 51:
                formInitialValues.groupId = null
                formInitialValues.artifactId = null
                formInitialValues.version = null
                formInitialValues.fileType = null
                formInitialValues.fileAddress = null
                setGoodsType("")
                break
            default:
                formInitialValues.codeName = null
                formInitialValues.codeBranch = null
                formInitialValues.gitAuthName = null
                formInitialValues.gitAuthId = null
                setCodeType("")
        }
        setFormInitialValues({...formInitialValues})
    }

    const renderFormView = () => {
        if(codeType==="" && data&&data.length===0 ){
            return <div style={{paddingTop:55}}>
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            description="当前没有配置"
                        />
                    </div>
        }return <>
            <FormView
                del={del}
                pipelineId={pipelineId}
            />
        </>
    }
    
    return view==="forms" ?
        // <FormView
        //     del={del}
        //     pipelineId={pipelineId}
        // />
        renderFormView()
        :
        <>
            <Gui
                {...props}
                del={del}
                configStore={configStore}
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
            {/*                del,*/}
            {/*            }}*/}
            {/*        />*/}
            {/*        :null*/}
            {/*}*/}
        </>
}

export default  inject("configStore","configDataStore","pipelineStore")(observer(ConfigView))