import React from "react";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import {Button,Form,message,Modal} from "antd";
import {ExclamationCircleOutlined,DeleteOutlined} from "@ant-design/icons";
import {getUser} from "tiklab-core-ui";
import {inject,observer} from "mobx-react";
import "./projectSetReDel.scss";
import ProjectRename from "./projectRename";

const ProjectSetReDel = props =>{

    const {pipelineStore} = props
    const {deletePipeline,updatePipeline,pipelineList,pipelineId,pipelineName}=pipelineStore

    const [form]=Form.useForm()
    const userId = getUser().userId

    const del = () =>{
        const params = {
            userId:userId,
            pipelineId:pipelineId
        }
        deletePipeline(params).then(res=>{
            if(res.code === 0 && res.data === 1){
                message.info({content: "删除成功", className: "message"})
            }else {
                message.error({content:"删除失败", className:"message"})
            }
            props.history.push("/index/pipeline")
        }).catch(error=>{
            console.log(error)
        })
    }

    const re = value =>{
        const params={
            user:{id:userId},
            pipelineId:pipelineId,
            pipelineName:value.pipelineName
        }
        updatePipeline(params).then(res=>{
            if(res.code === 0){
                props.history.push(`/index/task/${value.pipelineName}/work`)
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    const onConfirm = () =>{
        Modal.confirm({
            title: "删除",
            icon: <ExclamationCircleOutlined />,
            content: "删除后数据无法恢复",
            onOk:()=>del(),
            okText: "确认",
            cancelText: "取消",
        });
    }

    return(
        <div className="pipelineReDel home-limited">
            <BreadcrumbContent firstItem={pipelineName} secondItem={"设置"}/>
            <div className="pipelineReDel-content">
                <div className="pipelineReDel-content-rename pipelineReDel-content-div">
                    <div className="pipelineReDel-content-title">修改流水线名称</div>
                    <ProjectRename
                        form={form}
                        re={re}
                        pipelineList={pipelineList}
                    />
                </div>
                <div className="pipelineReDel-content-del pipelineReDel-content-div">
                    <div className="pipelineReDel-content-title">删除流水线</div>
                    <Button type="primary" onClick={onConfirm}>
                       <DeleteOutlined/> 删除
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default inject("pipelineStore")(observer(ProjectSetReDel))