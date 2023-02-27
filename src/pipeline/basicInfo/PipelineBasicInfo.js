import React,{useState,useEffect} from "react";
import {Modal} from "antd";
import {
    ExclamationCircleOutlined,
    DeleteOutlined,
    DownOutlined,
    RightOutlined,
    EditOutlined
} from "@ant-design/icons";
import {PrivilegeProjectButton} from "tiklab-privilege-ui";
import {inject,observer} from "mobx-react";
import Btn from "../../common/btn/Btn";
import BreadcrumbContent from "../../common/breadcrumb/Breadcrumb";
import PipelineAddInfo from "../pipeline/components/PipelineAddInfo";
import {Loading} from "../../common/loading/Loading";
import "./PipelineBasicInfo.scss";

const PipelineBasicInfo = props =>{

    const {pipelineStore} = props

    const {deletePipeline,pipeline,isLoading}=pipelineStore

    const [expandedTree,setExpandedTree] = useState([])  // 树的展开与闭合
    const [powerType,setPowerType] = useState(1)

    useEffect(()=>{
        pipeline && setPowerType(pipeline && pipeline.power)
    },[pipeline])

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

    const del = () =>{
        deletePipeline(pipeline.id).then(res=>{
            props.history.push("/index/pipeline")
        })
    }

    const lis = [
        {
            key:1,
            title:"流水线信息",
            desc: "更新流水线信息",
            icon: <EditOutlined />,
            enCode:"pipeline_update",
            content: <div className="bottom-rename">
                <PipelineAddInfo
                    {...props}
                    powerType={powerType}
                    setPowerType={setPowerType}
                    set={true}
                    onClick={()=>setOpenOrClose(1)}
                />
            </div>
        },
        {
            key:2,
            title:"流水线删除",
            desc: "删除流水线",
            icon: <DeleteOutlined />,
            enCode:"pipeline_delete",
            content: <div className="bottom-delete">
                        <div style={{color:"#ff0000",paddingBottom:5,fontSize:13}}>
                            此操作无法恢复！请慎重操作！
                        </div>
                        <Btn
                            onClick={()=>setOpenOrClose(2)}
                            title={"取消"}
                            isMar={true}
                        />
                        <Btn
                            onClick={onConfirm}
                            type={"dangerous"}
                            title={"删除"}
                        />
                    </div>
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

    const lisItem = item =>{
        return <div key={item.key} className="pipelineReDel-li">
            <div className={`pipelineReDel-li-top ${isExpandedTree(item.key) ?"pipelineReDel-li-select":""}`}
                onClick={()=>setOpenOrClose(item.key)}
            >
                <div className="pipelineReDel-li-icon">{item.icon}</div>
                <div className="pipelineReDel-li-center">
                    <div className="pipelineReDel-li-title">{item.title}</div>
                    {
                        !isExpandedTree(item.key) &&
                        <div className="pipelineReDel-li-desc">{item.desc}</div>
                    }
                </div>
                <div className="pipelineReDel-li-down">
                    { isExpandedTree(item.key)? <DownOutlined />:<RightOutlined /> }
                </div>
            </div>
            <div className={`${isExpandedTree(item.key)? "pipelineReDel-li-bottom":"pipelineReDel-li-none"}`}>
                { isExpandedTree(item.key) && item.content }
            </div>
        </div>
    }

    const renderLisItem = item => {
        return  <PrivilegeProjectButton code={item.enCode} key={item.key} domainId={pipeline.id}>
                    {lisItem(item)}
                </PrivilegeProjectButton>
    }

    return(
        <div className="pipelineReDel mf-home-limited mf">
            <div className="pipelineReDel-up">
                <BreadcrumbContent firstItem={"流水线信息"}/>
            </div>
            <div className="pipelineReDel-content">
                <div className="pipelineReDel-ul">
                    {
                        lis.map(item=> renderLisItem(item))
                    }
                </div>
            </div>
            {
                isLoading && <Loading/>
            }
        </div>
    )
}

export default inject("pipelineStore")(observer(PipelineBasicInfo))
