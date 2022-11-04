import React,{useState,useEffect} from "react";
import "../components/proof.scss";
import {Popconfirm, Space, Table, Tooltip} from "antd";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import UpdateauthBasic from "../components/updateProof";
import {inject,observer} from "mobx-react";
import ProofSwitch from "../components/proofSwitch";
import EmptyText from "../../../common/emptyText/emptyText";
import AddauthBasicButton from "../components/addProofButton";
import {Profile} from "tiklab-eam-ui";

const authBasic = props =>{

    const {proofStore,pipelineList,pipelineId,pipelineName} = props
    const {authBasicList,findAllAuthBasic} = proofStore

    const [formValue,setFormValue] = useState("")
    const [visible,setVisible] = useState(false)
    const [displayPart,setDisplayPart] = useState(false)
    const [isShowPipeline,setIsShowPipeline] = useState(1)

    useEffect(()=>{
        findAllAuthBasic()
    },[])

    const edit = (text,record) => {
        if(record.authBasicScope===2 || record.authBasicScope===3){
            setDisplayPart(true)
        }else {
            setDisplayPart(false)
        }
        setFormValue(record)
        setIsShowPipeline(record.type)
        setVisible(true)
    }

    const del = (text,record) => {
        deleteauthBasic(record.authBasicId)
    }

    const commonColumns = [
        {
            title:"名称",
            dataIndex:"names",
            key:"names",
            render:text => {
                return  <>
                    <span className="authBasic-content-icon">
                        {text && text.substring(0,1).toUpperCase()}
                    </span>
                    <span>
                        {text}
                    </span>
                </>
            }
        },
        {
            title:"类型",
            dataIndex:"authType",
            key:"authType",
            render: text => {
                switch (text) {
                    case 2:
                        return "username&password"
                    case 3:
                        return "私钥"
                }
            }
        },
        {
            title:"创建人",
            dataIndex:["user","name"],
            key:"user",
            render:(text,record) => {
                return  <Space>
                            <Profile />
                            {text}
                        </Space>
            }
        },
        {
            title:"权限",
            dataIndex:"authPublic",
            key:"authPublic",
            render:text => {
                switch (text) {
                    case 1:
                        return "全局"
                    case 2:
                        return "私有"
                }
            }
        },
        {
            title:"创建时间",
            dataIndex:"createTime",
            key:"createTime",
        },
        {
            title:"操作",
            dataIndex: "action",
            key: "action",
            render:(text,record) => {
                return <span className="authBasic-content-action">
            <Tooltip title="修改">
                <span className="edit"
                      onClick={()=>edit(text,record)}
                >
                    <EditOutlined />
                </span>
            </Tooltip>
            <Tooltip title="删除">
                <Popconfirm
                    style={{marginTop:100}}
                    title="你确定删除吗"
                    onConfirm={()=>del(text,record)}
                    kText="确定"
                    cancelText="取消"
                >
                    <span className="del">
                        <DeleteOutlined />
                    </span>
                </Popconfirm>
            </Tooltip>
        </span>
            }
        }
    ]

    return(
        <div className="authBasic home-limited">
            <div className="authBasic-upper">
                {
                    pipelineName ?
                        <BreadcrumbContent firstItem={pipelineName} secondItem={"认证配置"}/>
                        :
                        <BreadcrumbContent firstItem={"凭证"}/>
                }
                <AddauthBasicButton style={"primary"} pipelineList={pipelineList}/>
            </div>
            <div className="authBasic-content">
                <ProofSwitch/>
                <Table
                    columns={commonColumns}
                    dataSource={authBasicList}
                    rowKey={record=>record.basicId}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
            </div>
            {/*<UpdateauthBasic*/}
            {/*    visible={visible}*/}
            {/*    setVisible={setVisible}*/}
            {/*    formValue={formValue}*/}
            {/*    displayPart={displayPart}*/}
            {/*    pipelineList={pipelineList}*/}
            {/*    isShowPipeline={isShowPipeline}*/}
            {/*    setIsShowPipeline={setIsShowPipeline}*/}
            {/*    updateauthBasic={updateauthBasic}*/}
            {/*    pipelineId={pipelineId}*/}
            {/*/>*/}
        </div>
    )
}

export default inject("proofStore")(observer(authBasic))