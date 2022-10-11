import React,{useState} from "react";
import "../components/proof.scss";
import {Popconfirm,Input,Row,Col,Select} from "antd";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import UpdateProof from "../components/updateProof";
import {inject,observer} from "mobx-react";
import Tables from "../../../common/tables/tables";
import ProofSwitch from "../components/proofSwitch";

const Proof = props =>{

    const {proofStore,pipelineList,pipelineId,pipelineName} = props
    const {updateProof,deleteProof,proofList,setFresh,fresh} = proofStore

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
        deleteProof(record.proofId).then(()=>{
            setFresh(!fresh)
        }).catch(error=>{
            console.log(error)
        })
    }

    const columns = [
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
            title:"名称",
            dataIndex:"proofName",
            key:"proofName"
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
            key:"proofDescribe"
        },
        {
            title:"操作",
            dataIndex:"action",
            key:"action",
            render:(text,record)=>{
                return(
                    <span className="proof-content-action">
                        <span className="edit" onClick={()=>edit(text,record)}>
                            修改
                        </span>
                         <Popconfirm
                             style={{marginTop:100}}
                             title="你确定删除吗"
                             onConfirm={()=>del(text,record)}
                             okText="确定"
                             cancelText="取消"
                         >
                             <span className="del">删除</span>
                         </Popconfirm>
                    </span>
                )
            }
        }
    ]

    const inputChangeValue = value =>{
        // console.log(value)
    }

    return(
        <div className="proof home-limited">
            {
                pipelineName ?
                    <BreadcrumbContent firstItem={pipelineName} secondItem={"凭证设置"}/>
                    :
                    <BreadcrumbContent firstItem={"凭证设置"}/>
            }
            <div className="proof-content">
                <ProofSwitch
                    pipelineList={pipelineList}
                />
                <Tables
                    columns={columns}
                    dataSource={proofList}
                    rowKey={record=>record.proofId}
                />
            </div>
            <UpdateProof
                visible={visible}
                setVisible={setVisible}
                formValue={formValue}
                fresh={fresh}
                setFresh={setFresh}
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