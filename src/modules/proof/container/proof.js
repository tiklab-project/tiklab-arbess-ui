import React,{useState} from "react";
import "../components/proof.scss";
import {Popconfirm,Table,Tooltip} from "antd";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import UpdateProof from "../components/updateProof";
import {inject,observer} from "mobx-react";
import ProofSwitch from "../components/proofSwitch";
import EmptyText from "../../../common/emptyText/emptyText";
import AddProofButton from "../components/addProofButton";

const Proof = props =>{

    const {proofStore,pipelineList,pipelineId,pipelineName} = props
    const {updateProof,deleteProof,proofList} = proofStore

    const [formValue,setFormValue] = useState("")
    const [visible,setVisible] = useState(false)
    const [displayPart,setDisplayPart] = useState(false)
    const [isShowPipeline,setIsShowPipeline] = useState(1)

    const edit = (text,record) => {
        if(record.proofScope===2 || record.proofScope===3){
            setDisplayPart(true)
        }else {
            setDisplayPart(false)
        }
        setFormValue(record)
        setIsShowPipeline(record.type)
        setVisible(true)
    }

    const del = (text,record) => {
        deleteProof(record.proofId)
    }

    const columns = [
        {
            title:"名称",
            dataIndex:"proofName",
            key:"proofName",
            width:"200px",
            ellipsis:true,
            render:text => {
                return <>
                    <span className="proof-content-icon">
                        {text.substring(0,1).toUpperCase()}
                    </span>
                    <span>
                        {text}
                    </span>
                </>
            }
        },
        {
            title:"作用域",
            dataIndex:"type",
            key:"type",
            render:text => {
                switch (text) {
                    case 1:
                        return "全局凭证"
                    default:
                        return "项目凭证"
                }
            }
        },
        {
            title   :"类型",
            dataIndex:"proofType",
            key:"proofType"
        },
        {
            title:"创建时间",
            dataIndex:"proofCreateTime",
            key:"proofCreateTime"
        },
        {
            title:"备注",
            dataIndex:"proofDescribe",
            key:"proofDescribe",
            width:"200px",
            ellipsis:true,
        },
        {
            title:"操作",
            dataIndex:"action",
            key:"action",
            render:(text,record)=>{
                return(
                    <span className="proof-content-action">
                        <Tooltip title="修改">
                            <span className="edit" onClick={()=>edit(text,record)}>
                                <EditOutlined />
                            </span>
                        </Tooltip>
                         <Tooltip title="删除">
                             <Popconfirm
                                 style={{marginTop:100}}
                                 title="你确定删除吗"
                                 onConfirm={()=>del(text,record)}
                                 okText="确定"
                                 cancelText="取消"
                             >
                                 <span className="del">
                                     <DeleteOutlined />
                                 </span>
                             </Popconfirm>
                         </Tooltip>
                    </span>
                )
            }
        }
    ]

    return(
        <div className="proof home-limited">
            <div className="proof-upper">
                {
                    pipelineName ?
                        <BreadcrumbContent firstItem={pipelineName} secondItem={"凭证"}/>
                        :
                        <BreadcrumbContent firstItem={"凭证"}/>
                }
                <AddProofButton style={"primary"} pipelineList={pipelineList}/>
            </div>
            <div className="proof-content">
                <ProofSwitch/>
                <Table
                    columns={columns}
                    dataSource={proofList}
                    rowKey={record=>record.proofId}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
            </div>
            <UpdateProof
                visible={visible}
                setVisible={setVisible}
                formValue={formValue}
                displayPart={displayPart}
                pipelineList={pipelineList}
                isShowPipeline={isShowPipeline}
                setIsShowPipeline={setIsShowPipeline}
                updateProof={updateProof}
                pipelineId={pipelineId}
            />
        </div>
    )
}

export default inject("proofStore")(observer(Proof))