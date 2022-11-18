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
import {getUser,getVersionInfo} from "tiklab-core-ui";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import Btn from "../../../common/btn/btn";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import AddModal from "../formView/addModal";


const ConfigTop = props =>{

    const {view,setView,pipelineId,pipelineName,configStore,structureStore,configDataStore} = props

    const {pipelineStartStructure} = structureStore
    const {validLength,isPlugin} = configStore
    const {data,addConfigVisible,setAddConfigVisible} = configDataStore

    const [processVisible,setProcessVisible] = useState(false)

    const configView = localStorage.getItem("configView")
    const userId = getUser().userId

    useEffect(()=>{
        setView(configView)
    },[configView])

    const run = () => {
        const params = {
            userId:userId,
            pipelineId:pipelineId
        }
        // 改变按钮
        setProcessVisible(true)
        pipelineStartStructure(params).then(res=>{
            if(res.code===0){
                if(!res.data){
                    // props.history.push(`/index/task/${pipelineId}/structure`)
                    message.info("流水线正在运行")
                }
                props.history.push(`/index/task/${pipelineId}/structure`)
                // setTimeout(()=>props.history.push(`/index/task/${pipelineId}/structure`),1000)
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    const changeView = type => {
        setView(type)
        localStorage.setItem("configView",type)
    }

    const runStatu = () =>{ 
           if(data && data.length===0 || validLength>0){
                return false
           }
           else{
                return "primary"
           }
    }

    return(
        <div className="config-up">
            <div className="config-top">
                <div className="config-top-content">
                    <BreadcrumbContent
                        firstItem={pipelineName}
                        secondItem={"配置"}
                    />
                    <div className="config_changeView">
                        <div className="changeView">
                            <div className="changeView-valid">
                                {validLength && validLength > 0 ?
                                    <span>
                                    <ExclamationCircleOutlined />
                                        &nbsp;
                                        {validLength}项配置未完成
                                </span> : null}
                            </div>
                            <div className="changeView-addConfig">
                                <Btn
                                    icon={<PlusOutlined/>}
                                    onClick={() =>setAddConfigVisible(true)}
                                    title={"添加配置"}
                                />
                                <AddModal
                                    addConfigVisible={addConfigVisible}
                                    setAddConfigVisible={setAddConfigVisible}
                                />
                            </div>
                            <div className="changeView-btn">
                                {
                                    processVisible ?
                                        <Btn
                                            type={"primary"}
                                            title={<Spin indicator={<LoadingOutlined style={{ fontSize: 25 }} spin />} />}
                                        />
                                        :
                                        <Btn
                                            type={runStatu()?"primary":"disabled"}
                                            onClick={runStatu()?()=>run():null}
                                            icon={<CaretRightOutlined />}
                                            title={"运行"}
                                        />

                                }
                            </div>
                            <Select onChange={changeView} value={view} style={{width:90}}>
                                <Select.Option value={"forms"}>
                                    <BarsOutlined  />&nbsp;表单
                                </Select.Option>
                                <Select.Option value={"gui"}
                                               // disabled={getVersionInfo().expired || !isPlugin}
                                               disabled={!isPlugin}
                                >
                                    <AppstoreOutlined  />&nbsp;图形
                                </Select.Option>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(inject("structureStore","configStore","configDataStore")(observer(ConfigTop)))