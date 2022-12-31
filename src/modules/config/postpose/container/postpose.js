import React,{useState,useEffect} from "react";
import {Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import EmptyText from "../../../common/emptyText/emptyText";
import PostposeAdd from "../components/postposeAdd";
import SubIcon from "../../common/components/subIcon";
import Listaction from "../../../common/list/listaction";
import Btn from "../../../common/btn/btn";
import "../components/postpose.scss";

// 后置处理
const Postpose = props =>{

    const {pipelineStore,postposeStore} = props

    const {findDmUserPage,pipelineId} = pipelineStore
    const {createPostConfig,findAllPostConfig,isFindPostposeData,postposeData,deletePostConfig,updatePostConfig} = postposeStore

    const [postposeVisible,setPostposeVisible] = useState(false)
    const [formValue,setFormValue] = useState("")

    const userId = getUser().userId

    useEffect(()=>{
        pipelineId && findAllPostConfig(pipelineId)
    },[pipelineId,isFindPostposeData])

    const addPostpose = () =>{
        setFormValue("")
        setPostposeVisible(true)
    }

    const edit = (text,record) =>{
        setFormValue(record)
        setPostposeVisible(true)
    }
    
    const del = (text,record) => {
        deletePostConfig(record.configId)
    }

    const columns = [
        {
            title: "类型",
            dataIndex: "type",
            key: "type",
            render:(text,record)=> <SubIcon type={text}/>
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            render:(text,record) => {
                return  <Listaction
                            edit={()=>edit(text,record)}
                            del={()=>del(text,record)}
                        />
            }
        },
    ]

    return(
        <div className="post-pose">
            <div className="post-pose-content mf-home-limited">
                <div className="post-pose-up">
                    <div className="post-pose-up-title">后置处理</div>
                    <div className="post-pose-up-num">共{postposeData && postposeData.length?postposeData.length:0}个后置处理</div>
                    <Btn
                        title={"添加"}
                        icon={<PlusOutlined/>}
                        onClick={()=>addPostpose()}
                    />
                    <PostposeAdd
                        postposeVisible={postposeVisible}
                        setPostposeVisible={setPostposeVisible}
                        createPostConfig={createPostConfig}
                        updatePostConfig={updatePostConfig}
                        findDmUserPage={findDmUserPage}
                        pipelineId={pipelineId}
                        formValue={formValue}
                        userId={userId}
                    />
                </div>
                <div className="trigger-tables">
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={postposeData}
                        rowKey={record=>record.configId}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={"没有查询到后置处理"}/>}}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject("postposeStore")(observer(Postpose))