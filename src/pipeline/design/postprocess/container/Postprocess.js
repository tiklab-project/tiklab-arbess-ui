import React,{useState,useEffect} from "react";
import {message, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import EmptyText from "../../../../common/emptyText/EmptyText";
import PostprocessAdd from "../components/PostprocessAdd";
import TaskTitleIcon from "../../processDesign/processDesign/components/TaskTitleIcon";
import Listaction from "../../../../common/list/Listaction";
import Btn from "../../../../common/btn/Btn";
import "../components/Postprocess.scss";

/**
 * 后置处理页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Postprocess = props =>{

    const {pipelineStore,postprocessStore} = props

    const {findDmUserPage,pipeline} = pipelineStore
    const {createPost,findPipelinePost,isFindPostprocessData,postprocessData,deletePost,updatePost,
        messageSendType,mesSendData
    } = postprocessStore

    const userId = getUser().userId
    const [postprocessVisible,setPostprocessVisible] = useState(false)
    const [formValue,setFormValue] = useState("")

    useEffect(()=>{
        // 是否存在消息发送方式
        messageSendType()
    },[])

    useEffect(()=>{
        // 初始化后置处理
        pipeline && findPipelinePost(pipeline.id)
    },[pipeline,isFindPostprocessData])

    /**
     * 添加后置处理
     */
    const addPostprocess = () =>{
        setFormValue("")
        setPostprocessVisible(true)
    }

    /**
     * 编辑后置处理
     * @param text
     * @param record
     */
    const editPostprocess = (text,record) =>{
        setFormValue(record)
        setPostprocessVisible(true)
    }

    /**
     * 删除后置处理
     * @param text
     * @param record
     */
    const delPostprocess = (text,record) => {
        deletePost(record.postprocessId).then(res=>{
            res.code===0 && message.info("删除成功",0.5)
        })
    }

    const columns = [
        {
            title: "类型",
            dataIndex: "taskType",
            key: "taskType",
            render:(text,record)=> <TaskTitleIcon type={text}/>
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            render:(text,record) => {
                return  <Listaction
                            edit={()=>editPostprocess(text,record)}
                            del={()=>delPostprocess(text,record)}
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
                    <Btn title={"添加"} icon={<PlusOutlined/>} onClick={()=>addPostprocess()}/>
                    <PostprocessAdd
                        postprocessVisible={postprocessVisible}
                        setPostprocessVisible={setPostprocessVisible}
                        createPost={createPost}
                        updatePost={updatePost}
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
                        rowKey={record=>record.postprocessId}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={"暂无后置处理"}/>}}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject("postprocessStore")(observer(Postprocess))
