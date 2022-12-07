import React,{useEffect,useState} from "react";
import {PlusOutlined, AppstoreOutlined,BarsOutlined,ExclamationCircleOutlined} from "@ant-design/icons";
import {RemoteUmdComponent} from "tiklab-plugin-ui";
import {useSelector} from "tiklab-plugin-ui/es/_utils";
import {getVersionInfo} from "tiklab-core-ui";
import {inject,observer} from "mobx-react";
// import FormView from "../components/formView/formView";
import Gui from "../components/guiView/gui";
import AddModal from "../components/formView/addModal";
import Btn from "../../../common/btn/btn";
import Loading from "../../../common/loading/loading";

const View = props =>{

    const {configStore,pipelineStore} = props

    const {findAllTaskConfig,isPlugin,setIsPlugin,isFindConfig,isLoading} = configStore

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
        pipelineId && findAllTaskConfig(pipelineId)
    },[pipeline,isFindConfig])

    const changeView = type => {
        setView(type)
        localStorage.setItem("configView",type)
    }

    // 加载状态
    if(isLoading){
        return <Loading/>
    }

    return  <Gui
                {...props}
                configStore={configStore}
                pipelineStore={pipelineStore}
            />


    // return <>
    //     <div className="config-views">
    //         <div>
    //             <div className={`config-view ${view==="forms"?"config-view-active":""}`} onClick={()=>changeView("forms")}>
    //                 <BarsOutlined  />&nbsp;表单视图
    //             </div>
    //             {
    //                 getVersionInfo().expired || !isPlugin ?
    //                 <div className="config-view-ban" >
    //                     <AppstoreOutlined  />&nbsp;图形视图
    //                 </div>
    //                 :
    //                 <div className={`config-view ${view==="gui"?"config-view-active":""}`} onClick={()=>changeView("gui")}>
    //                     <AppstoreOutlined  />&nbsp;图形视图
    //                 </div>
    //             }
    //         </div>
    //         <div>
    //             <div className="config-valid">
    //                 {valid && valid.length > 0 ?
    //                     <span>
    //                         <ExclamationCircleOutlined style={{fontSize:16}}/> &nbsp;
    //                         <span className="config-valid-num">{valid && valid.length}项未配置</span>
    //                     </span> :
    //                     null}
    //             </div>
    //             <div className="config-add">
    //                 <Btn
    //                     icon={<PlusOutlined/>}
    //                     onClick={() =>setAddConfigVisible(true)}
    //                     title={"添加任务"}
    //                 />
    //             </div>
    //             <AddModal
    //                 addConfigVisible={addConfigVisible}
    //                 setAddConfigVisible={setAddConfigVisible}
    //             />
    //         </div>
    //     </div>
    //     {
    //         view==="forms" ?
    //         <FormView
    //             pipeline={pipeline}
    //             configStore={configStore}
    //         />
    //         :
    //         <>
    //             <Gui
    //                 {...props}
    //                 configStore={configStore}
    //                 pipelineStore={pipelineStore}
    //             />
    //
    //             {
    //                 !getVersionInfo().expired && isPlugin &&
    //                     <RemoteUmdComponent
    //                         {...props}
    //                         point={"gui"}
    //                         pluginStore={pluginStore}
    //                         isModalType={true}
    //                         extraProps={{
    //                             pipelineStore:pipelineStore,
    //                             configStore:configStore,
    //                         }}
    //                    />
    //             }
    //         </>
    //     }
    // </>
}

export default  inject("configStore","pipelineStore")(observer(View))