import React,{useState,useEffect} from "react";
import {Drawer} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Btn from "../../../../../common/btn/Btn";
import Tabs from "../../../../../common/tabs/Tabs";
import Condition from "../../condition/components/Condition";
import Postprocess from "../../postprocess/Postprocess";
import Variable from "../../variable/Variable";
import BasicInfo from "../../basicInfo/BasicInfo";
import "./TaskDetails.scss";

const TaskDetails = props =>{

    const {taskFormDrawer,setTaskFormDrawer,taskStore,stageStore} = props

    const {dataItem} = taskStore
    const {updateStageName} = stageStore

    // 标签类型
    const [handleType,setHandleType] = useState(1)

    useEffect(()=>{
        return ()=>{
            setHandleType(1)
        }
    },[taskFormDrawer])

    const lis = [
        {
            id:1,
            title: "基本信息"
        },
        {
            id:2,
            title:"变量"
        },
        {
            id:3,
            title:"条件"
        },
        {
            id:4,
            title:"后置处理"
        },
    ]

    /**
     * task类型
     * @param item
     */
    const changHandleType = item =>{
        setHandleType(item.id)
    }

    return(
        <Drawer
            placement="right"
            visible={taskFormDrawer}
            onClose={()=>setTaskFormDrawer(false)}
            closable={false}
            destroyOnClose={true}
            mask={false}
            width={480}
            contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
            bodyStyle={{padding:0}}
            className="mf task-details"
        >
            <div className="task-details-up">
                <div className="wrapper-head-title">编辑</div>
                <Btn onClick={()=>setTaskFormDrawer(false)} title={<CloseOutlined />} type="text"/>
            </div>
            <div className="task-details-bottom">
                <div className="body">
                    <div className="body-taskForm">
                        <Tabs
                            tabLis={dataItem && dataItem.taskId ? lis: [{id:1, title: "基本信息"}]}
                            type={handleType}
                            onClick={changHandleType}
                        />
                        {
                            handleType===1 &&
                            <BasicInfo
                                dataItem={dataItem}
                                updateStageName={updateStageName}
                            />
                        }
                        {
                            handleType===2 &&
                            <Variable dataItem={dataItem}/>
                        }
                        {
                            handleType===3 &&
                            <Condition dataItem={dataItem}/>
                        }
                        {
                            handleType===4 &&
                            <Postprocess dataItem={dataItem}/>
                        }
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default inject("taskStore","stageStore")(observer(TaskDetails))

