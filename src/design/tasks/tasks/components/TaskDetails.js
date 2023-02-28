import React,{useState,useEffect} from "react";
import {Drawer} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import Btn from "../../../../common/btn/Btn";
import Tabs from "../../../../common/tabs/Tabs";
import Condition from "../../condition/components/Condition";
import Postprocess from "../../postprocess/Postprocess";
import Variable from "../../variable/Variable";
import Forms from "../../basicInfo/Forms";
import "./TaskDetails.scss";

const TaskDetails = props =>{

    const {taskFormDrawer,setTaskFormDrawer,dataItem,updateStageName} = props

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
            className="mf"
        >
            <div className="wrapper">
                <div className="wrapper-head">
                    <div className="wrapper-head-title">编辑</div>
                    <Btn onClick={()=>setTaskFormDrawer(false)} title={<CloseOutlined />} type="text"/>
                </div>
                <div className="wrapper-body">
                    <div className="body">
                        <div className="body-taskForm">
                            <Tabs
                                tabLis={dataItem.configId ? lis: [{id:1, title: "基本信息"}]}
                                type={handleType}
                                onClick={changHandleType}
                            />
                            { handleType===1 && <Forms dataItem={dataItem} updateStageName={updateStageName}/>}
                            { handleType===2 && <Variable dataItem={dataItem}/>  }
                            { handleType===3 && <Condition dataItem={dataItem}/> }
                            { handleType===4 && <Postprocess dataItem={dataItem}/>  }
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default TaskDetails
