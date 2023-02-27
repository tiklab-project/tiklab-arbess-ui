import React,{useState,useEffect} from "react";
import {message, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import EmptyText from "../../../common/emptyText/EmptyText";
import PostprocessAdd from "../components/PostprocessAdd";
import TaskTitleIcon from "../../tasks/tasks/components/TaskTitleIcon";
import Listaction from "../../../common/list/Listaction";
import Btn from "../../../common/btn/Btn";
import "../components/Postprocess.scss";

// 后置处理
const Postprocess = props =>{

    const {pipelineStore,postprocessStore} = props

    const {findDmUserPage,pipeline} = pipelineStore
    const {createPostConfig,findAllPostConfig,isFindPostprocessData,postprocessData,deletePostConfig,updatePostConfig,
        messageSendType,mesSendData
    } = postprocessStore

    const [postprocessVisible,setPostprocessVisible] = useState(false)
    const [formValue,setFormValue] = useState("")

    const userId = getUser().userId

    useEffect(()=>{
        pipeline && findAllPostConfig(pipeline.id)
    },[pipeline,isFindPostprocessData])

    useEffect(()=>{
        messageSendType()
    },[])

    const addPostprocess = () =>{
        setFormValue("")
        setPostprocessVisible(true)
    }

    const edit = (text,record) =>{
        setFormValue(record)
        setPostprocessVisible(true)
    }

    const del = (text,record) => {
        deletePostConfig(record.configId).then(res=>{
            res.code===0 && message.info("删除成功",0.5)
        })
    }

    const columns = [
        {
            title: "类型",
            dataIndex: "type",
            key: "type",
            render:(text,record)=> <TaskTitleIcon type={text}/>
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
                    <div className="post-pose-up-num">共{postprocessData && postprocessData.length?postprocessData.length:0}个后置处理</div>
                    <Btn
                        title={"添加"}
                        icon={<PlusOutlined/>}
                        onClick={()=>addPostprocess()}
                    />
                    <PostprocessAdd
                        postprocessVisible={postprocessVisible}
                        setPostprocessVisible={setPostprocessVisible}
                        createPostConfig={createPostConfig}
                        updatePostConfig={updatePostConfig}
                        findDmUserPage={findDmUserPage}
                        mesSendData={mesSendData}
                        pipelineId={pipeline && pipeline.id}
                        formValue={formValue}
                        userId={userId}
                    />
                </div>
                <div className="trigger-tables">
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={postprocessData}
                        rowKey={record=>record.configId}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={"暂无后置处理"}/>}}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject("postprocessStore")(observer(Postprocess))
