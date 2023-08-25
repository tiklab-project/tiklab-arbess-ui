import React, {useState} from "react";
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

/**
 * 任务详情
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TaskDetails = props =>{

    const {taskFormDrawer,setTaskFormDrawer,taskStore,stageStore} = props

    const {dataItem} = taskStore
    const {updateStageName} = stageStore

    // 标签类型
    const [handleType,setHandleType] = useState(1)

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

    /**
     * 编辑类型
     * @returns {string}
     */
    const titleType = () => {
        switch (dataItem?.taskType) {
            case 'git':
            case 'gitlab':
            case 'svn':
            case 'xcode':
            case 'gitee':
            case 'github':
                return '源码'
            case 'sonar':
                return '代码扫描'
            case 'maventest':
            case 'teston':
                return '测试'
            case 'maven':
            case 'nodejs':
                return '构建'
            case 'nexus':
            case 'ssh':
            case 'xpack':
                return '推送制品'
            case 'liunx':
            case 'docker':
                return '部署'
        }
    }

    /**
     * 关闭弹出框
     */
    const close = () =>{
        setHandleType(1)
        setTaskFormDrawer(false)
    }

    return(
        <Drawer
            placement="right"
            visible={taskFormDrawer}
            onClose={close}
            closable={false}
            destroyOnClose={true}
            width={480}
            contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
            bodyStyle={{padding:0}}
            className="mf task-details"
        >
            <div className="task-details-up">
                <div className="wrapper-head-title">{titleType()}</div>
                <Btn onClick={close} title={<CloseOutlined />} type="text"/>
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

