import React,{Fragment,useState,useEffect} from "react";
import "./gui.scss";
// import {enableAxiosPlugin} from "tiklab-enable-axios-plugin";
import ConfigCode from "../components/common/configCode";
import ConfigAddNewStage from "../components/common/configAddNewStage";
import ConfigAddCodeDrawer from "../components/common/configAddCodeDrawer";
import ConfigAddNewStageDrawer from "../components/common/configAddNewStageDrawer";
import ConfigFormDetailsDrawer from "../components/common/configFormDetailsDrawer";
import ConfigName from "../components/form/configName";
import {observer} from "mobx-react";
import {Form} from "antd";
import {EditOutlined} from "@ant-design/icons";
import TestContext from "../components/common/testContext";

// enableAxiosPlugin()

const Gui = props =>{

    const {pipelineStore,configDataStore,form,onFinish,del} = props

    const {pipelineId,pipelineName} = pipelineStore
    const {formInitialValues,data,setData,codeType,setFormInitialValues,setIsPrompt,setDeployType,setBuildTYpe,
        } = configDataStore

    const [codeDrawer,setCodeDrawer] = useState(false) // 新建源码抽屉
    const [newStageDrawer,setNewStageDrawer] = useState(false) // 添加新阶段抽屉
    const [taskFormDrawer,setTaskFormDrawer] = useState(false) // 表单详情抽屉
    const [index,setIndex] = useState("")  // 配置位置的插入
    const [newStage,setNewStage] = useState("")

    useEffect(()=>{
        form.setFieldsValue({...formInitialValues})
    },[formInitialValues,pipelineId])

    const showStage = item =>{
        setNewStage(item.dataType)
        setTaskFormDrawer(true)
    }

    const insertData = (item,index) => {
        setNewStageDrawer(true)
        setIndex(index)
    }

    const onValuesChange = value =>{
        Object.assign(formInitialValues,value)
        setFormInitialValues({...formInitialValues})
        setIsPrompt(true)
    }

    const title = dataType =>{
        switch (parseInt(dataType)) {
            case 11:
                return renderTitle("ceshi1","测试")
            case 21:
            case 22:
                return renderTitle("goujiangongju","构建")
            case 31:
            case 32:
                return renderTitle("bushubanben","部署")
        }
    }

    const renderTitle = (icon,title) =>{
        return  <>
                    <span className="desc-icon">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#icon-${icon}`} />
                        </svg>
                    </span>
                    <span className="desc-title">
                        {title}
                    </span>
                </>
    }

    const newStageShow = data =>{
        console.log(data)
        return data && data.map((item,index)=>{
            return(
                <Fragment key={index}>
                    <div className="group-flow">
                        <div className="group-flow_btn" >
                            <svg className="icon group-flow_btn_i"
                                 aria-hidden="true"
                                 onClick={()=>insertData(item,index)}
                            >
                                <use xlinkHref="#icon-zengjia"/>
                            </svg>
                        </div>
                    </div>
                    <div className="group-table">
                        <div className="group-head">
                            <div className="name">
                                <div  className="label">
                                    <span>{title(item.dataType)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="newStages">
                            <div className="newStages-step">
                                <div className="newStages-content"  >
                                    <div className="newStages-task">
                                        <div className="newStages-job">
                                            <div className="newStages-job_text" onClick={()=>showStage(item)}>
                                                <ConfigName type={item.dataType}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        })
    }

    return (
        <TestContext.Provider value={{pipelineId,pipelineName,configDataStore}}>
            <div className="guiView">
                <div className="guiView-content">
                   <ConfigCode
                       codeType={codeType}
                       setCodeDrawer={setCodeDrawer}
                       setNewStage={setNewStage}
                       setTaskFormDrawer={setTaskFormDrawer}
                       formInitialValues={formInitialValues}
                   />
                   <div className="guiView-main">
                       <div className="guiView-main_container">
                           <div className="guiView-main_group">
                               { newStageShow(data) }
                               <ConfigAddNewStage
                                   setIndex={setIndex}
                                   setNewStageDrawer={setNewStageDrawer}
                               />
                           </div>
                       </div>
                   </div>
               </div>
                <Form
                    id="form"
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onFinish}
                    onValuesChange={onValuesChange}
                    initialValues={{deployType:1}}
                >
                    <ConfigAddCodeDrawer
                        codeDrawer={codeDrawer}
                        setCodeDrawer={setCodeDrawer}
                        configDataStore={configDataStore}
                    />

                    <ConfigAddNewStageDrawer
                        setIsPrompt={setIsPrompt}
                        newStageDrawer={newStageDrawer}
                        setNewStageDrawer={setNewStageDrawer}
                        taskFormDrawer={taskFormDrawer}
                        setTaskFormDrawer={setTaskFormDrawer}
                        setNewStage={setNewStage}
                        data={data}
                        setData={setData}
                        index={index}
                        setIndex={setIndex}
                        setDeployType={setDeployType}
                        setBuildType={setBuildTYpe}
                    />

                    <ConfigFormDetailsDrawer
                        taskFormDrawer={taskFormDrawer}
                        setTaskFormDrawer={setTaskFormDrawer}
                        newStage={newStage}
                        del={del}
                        configDataStore={configDataStore}
                    />
                </Form>
            </div>
       </TestContext.Provider>
    )
}

export default observer(Gui)