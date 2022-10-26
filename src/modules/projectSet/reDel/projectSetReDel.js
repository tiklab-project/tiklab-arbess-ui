import React,{useState} from "react";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import {Button,Form,message,Modal} from "antd";
import {ExclamationCircleOutlined,DeleteOutlined,CaretDownOutlined,EditOutlined} from "@ant-design/icons";
import {getUser} from "tiklab-core-ui";
import {inject,observer} from "mobx-react";
import "./projectSetReDel.scss";
import ProjectRename from "./projectRename";

const ProjectSetReDel = props =>{

    const {pipelineStore} = props

    const {deletePipeline,updatePipeline,pipelineList,pipelineId,pipeline,setPipelineName}=pipelineStore

    const [expandedTree,setExpandedTree] = useState([])  // 树的展开与闭合

    const [form]=Form.useForm()
    const userId = getUser().userId

    const del = () =>{
        const params = {
            userId:userId,
            pipelineId
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
                setPipelineName(value.pipelineName)
                props.history.push(`/index/task/${pipelineId}/work`)
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

    const lis = [
        {
            key:1,
            title:"修改流水线名称",
            icon: <EditOutlined />,
            content:<ProjectRename
                        form={form}
                        re={re}
                        pipelineList={pipelineList}
                        layout={"inline"}
                    />
        },
        {
            key:2,
            title:"删除流水线",
            icon: <DeleteOutlined />,
            content: <Button type="primary" onClick={onConfirm}>
                        <DeleteOutlined/> 删除
                    </Button>
        }
    ]


    // 是否存在key -- ture || false
    const isExpandedTree = key => {
        return expandedTree.some(item => item ===key)
    }

    // 展开和闭合
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            // false--闭合
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            // ture--展开
            setExpandedTree(expandedTree.concat(key))
        }
    }
    
    const renderLisItem = item => {
        return  <div key={item.key} className="pipelineReDel-li">
                    <div
                        className={`pipelineReDel-li-top ${isExpandedTree(item.key) ?"pipelineReDel-li-select":null}`}
                        onClick={()=>setOpenOrClose(item.key)}
                    >
                        <div className="pipelineReDel-li-title">
                            <span className="pipelineReDel-li-title-icon">{item.icon}</span>
                            <span className="pipelineReDel-li-title-name">{item.title}</span>
                        </div>
                        <div>
                            <CaretDownOutlined/>
                        </div>
                    </div>
                    <div className={`${isExpandedTree(item.key)? "pipelineReDel-li-bottom":"pipelineReDel-li-none"}`}>
                        {
                            isExpandedTree(item.key)?
                                item.content:null
                        }
                    </div>
                </div>
    }

    return(
        <div className="pipelineReDel">
            <BreadcrumbContent firstItem={pipeline.pipelineName} secondItem={"设置"}/>
            <div className="pipelineReDel-content">
                <div className="pipelineReDel-ul">
                    {
                        lis.map(item=>{
                            return renderLisItem(item)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default inject("pipelineStore")(observer(ProjectSetReDel))