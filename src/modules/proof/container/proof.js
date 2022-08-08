import React,{useState} from "react";
import "../components/proof.scss";
import {Popconfirm,Table} from "antd";
import AddProofButton from "../components/addProofButton";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import UpdateProof from "../components/updateProof";
import {inject,observer} from "mobx-react";

const Proof = props =>{

    const {proofStore,matFlowList,matFlowId} = props
    const {updateProof,deleteProof,proofList,setFresh,fresh} = proofStore

    const [formValue,setFormValue] = useState("")
    const [visible,setVisible] = useState(false)
    const [displayPart,setDisplayPart] = useState(false)
    const [isShowMatFlow,setIsShowMatFlow] = useState(1)

    const edit = (text,record) => {
        if(record.proofScope===2 || record.proofScope===3){
            setDisplayPart(true)
        }else {
            setDisplayPart(false)
        }
        setFormValue(record)
        setIsShowMatFlow(record.type)
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
                            编辑
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

    const style = "primary"

    return(
        <div className="proof">
            <BreadcrumbContent firstItem={"凭证管理"}/>
            <div className="proof-content">
                <div className="proof-content-btn">
                    <AddProofButton style={style} matFlowList={matFlowList}/>
                </div>
                <Table
                    bordered
                    rowKey={record=>record.proofId}
                    columns={columns}
                    dataSource={proofList}
                    pagination={{pageSize:12,hideOnSinglePage:true}}
                />
            </div>
            <UpdateProof
                visible={visible}
                setVisible={setVisible}
                formValue={formValue}
                fresh={fresh}
                setFresh={setFresh}
                displayPart={displayPart}
                matFlowList={matFlowList}
                isShowMatFlow={isShowMatFlow}
                setIsShowMatFlow={setIsShowMatFlow}
                updateProof={updateProof}
                matFlowId={matFlowId}
            />
        </div>
    )
}

export default inject("proofStore")(observer(Proof))