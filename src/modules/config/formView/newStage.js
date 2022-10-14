import React,{useState} from "react";
import NewStageAddModal from "./newStageAddModal";
import {Modal} from "antd";
import {CloseOutlined,ExclamationCircleOutlined} from "@ant-design/icons";
import Switch from "./switch";
import Forms from "./forms";

const NewStage = props =>{

    const {pipelineId,updateConfigure,data,del,setData,setBuildType,setDeployType} = props

    const [newStageVisible, setNewStageVisible] = useState(false)

    // 切换类型
    const changeType = group =>{
        Modal.confirm({
            title: "删除",
            icon: <ExclamationCircleOutlined />,
            content: "删除后数据无法恢复",
            onOk:()=>delNewStage(group),
            okText: "确认",
            cancelText: "取消",
        });
    }

    // 删除部分构建配置
    const delNewStage = group =>{
        const params = {
            pipelineId,
            type:group.dataType,
            message:"delete"
        }
        updateConfigure(params)
        del(group.dataType)
        for (let i = 0 ;i<data.length;i++){
            if(data[i].dataType === group.dataType){
                data.splice(i,1)
            }
            setData([...data])
        }
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

    const newStage = data =>{
        return data && data.map((group,index)=>{
            return  <div className="formView-wrapper" key={index} >
                <div className="formView-wrapper-Headline">
                    <div className="desc">
                        {title(group.dataType)}
                    </div>
                    <div className="formView-del">
                        <span className="desc-delete">
                            <CloseOutlined onClick={()=>changeType(group)} />
                        </span>
                    </div>
                </div>
                <Switch del={del} type={group.dataType}/>
                <div className="formView-wrapper-forms">
                    <Forms type={group.dataType}/>
                </div>
            </div>
        })
    }

    const isAddNewStage = data => {
        return data && data.length > 2 ?
            null :
            <>
                <div className="formView-wrapper">
                    <div className="formView-wrapper-Headline code-handle">新阶段</div>
                </div>
                <div className="formView-wrapper-handle"
                     onClick={() => setNewStageVisible(true)}
                >
                    新任务
                </div>
            </>
    }

    return(
        <>
            { newStage(data) }
            { isAddNewStage(data) }
            <NewStageAddModal
                data={data}
                setData={setData}
                newStageVisible={newStageVisible}
                setNewStageVisible={setNewStageVisible}
                setBuildType={setBuildType}
                setDeployType={setDeployType}
                updateConfigure={updateConfigure}
                pipelineId={pipelineId}
            />
        </>
    )
}

export default NewStage