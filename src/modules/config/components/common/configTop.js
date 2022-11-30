import React,{useEffect,useState} from "react";
import "./configTop.scss";
import {Select} from "antd";
import {
    AppstoreOutlined,
    BarsOutlined,
    CaretRightOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined, PlusOutlined,
} from "@ant-design/icons";
import {message,Spin} from "antd";
import {getVersionInfo} from "tiklab-core-ui";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import Btn from "../../../common/btn/btn";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import AddModal from "../formView/addModal";
import ConfigTabs from "./configTabs";
import View from "./view";
import Trigger from "./trigger";
import Postpose from "./postpose";

const ConfigTop = props =>{

    const {setView,pipelineStore,configStore,structureStore,configDataStore} = props

    const {pipelineStartStructure} = structureStore
    const {valid,isPlugin,validType} = configStore
    const {data,addConfigVisible,setAddConfigVisible} = configDataStore
    const {pipelinePermissions,pipeline,pipelineId} = pipelineStore

    const [processVisible,setProcessVisible] = useState(false)
    const [type,setType] = useState(1)
    
    const configView = localStorage.getItem("configView")

    useEffect(()=>{
        // if(getVersionInfo().expired || !isPlugin || !configView){
        //     setView("forms")
        // }else {
        //     setView(configView)
        // }
        setView(configView)
    },[configView])

    const run = () => {
        // 改变按钮
        setProcessVisible(true)
        pipelineStartStructure(pipelineId).then(res=>{
            if(res.code===0){
                if(!res.data){
                    message.info("流水线正在运行")
                }
                props.history.push(`/index/task/${pipelineId}/structure`)
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    const changeView = type => {
        setView(type)
        localStorage.setItem("configView",type)
    }

    // 权限是否存在
    const isPermissions = () => pipelinePermissions && pipelinePermissions.some(item=>item==="pipeline_run")

    // 是否能运行
    // const runStatu = () => !(!isPermissions() || data && data.length < 1 || valid && valid.length > 0)
    const runStatu = () => !(data && data.length < 1 || validType && validType.length > 0)

    return(
        <>
        <div className="config-up">
            <div className="config-top">
                <div className="config_bread">
                    <BreadcrumbContent firstItem={pipeline.pipelineName} secondItem={"配置"}/>
                </div>
                <ConfigTabs type={type} setType={setType}/>
                <div className="config_changeView">
                <div className="changeView">
                    <div className="changeView-valid">
                        {validType && validType.length > 0 ?
                            <span>
                                <ExclamationCircleOutlined style={{fontSize:16}}/> &nbsp;
                                <span className="changeView-valid-num">{validType && validType.length}</span>
                            </span> :
                        null}
                    </div>
                    {/* <div className="changeView-addConfig">
                        <Btn
                            icon={<PlusOutlined/>}
                            onClick={() =>setAddConfigVisible(true)}
                            title={"添加任务"}
                        />
                        <AddModal
                            addConfigVisible={addConfigVisible}
                            setAddConfigVisible={setAddConfigVisible}
                        />
                    </div> */}
                    <div className="changeView-btn">
                        {
                            processVisible ?
                                <Btn
                                    type={"primary"}
                                    title={<Spin indicator={<LoadingOutlined style={{ fontSize: 25 }} spin />} />}
                                />
                                :
                                <Btn
                                    type={runStatu() ? "primary" : "disabled" }
                                    onClick={runStatu() ? ()=>run() : null }
                                    icon={<CaretRightOutlined />}
                                    title={"运行"}
                                />

                        }
                    </div>
                    {/* <Select onChange={changeView} value={view} style={{width:90}}>
                        <Select.Option value={"forms"}>
                            <BarsOutlined  />&nbsp;表单
                        </Select.Option>
                        <Select.Option value={"gui"}
                                        // disabled={getVersionInfo().expired || !isPlugin}
                        >
                            <AppstoreOutlined  />&nbsp;图形
                        </Select.Option>
                    </Select> */}
                    </div>
                </div>
            </div>
        </div>
        {
            type === 1 &&
            <View/>
        }
        {
            type===2 &&
            <Trigger/>
        }
        {
            type===3 &&
            <Postpose/>
        }
        </>
    )
}

export default withRouter(inject("structureStore","configStore","configDataStore","pipelineStore")
(observer(ConfigTop)))