/**
 * @Description: 后置处理
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/11
 */
import React,{useState,useEffect} from "react";
import {Col, Row, Table} from "antd";
import {inject,observer} from "mobx-react";
import PostprocessAddEdit from "./PostprocessAddEdit";
import {TaskIcon, taskTitle} from "../../processDesign/gui/component/TaskCommon";
import Btn from "../../../../common/component/btn/Btn";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListAction from "../../../../common/component/list/ListAction";
import "./Postprocess.scss";
import {pipeline_task_update} from "../../../../common/utils/Constant";

const Postprocess = props =>{

    const {taskStore,postprocessStore,match:{params}} = props

    const {findPipelinePost,postprocessData,deletePost,findMessageSendType,findOnePost} = postprocessStore
    const {taskPermissions} = taskStore

    const taskUpdate = taskPermissions?.includes(pipeline_task_update);

    // 后置处理添加编辑弹出框
    const [postprocessVisible,setPostprocessVisible] = useState(false)
    // 编辑内容
    const [formValue,setFormValue] = useState(null)

    useEffect(()=>{
        // 是否存在消息发送方式
        findMessageSendType()
    },[])

    /**
     * 获取后置处理
     */
    const findPost = () =>{
        findPipelinePost(params.id)
    }

    /**
     * 添加后置处理
     */
    const addPostprocess = () =>{
        setFormValue(null)
        setPostprocessVisible(true)
    }

    /**
     * 编辑后置处理
     * @param record
     */
    const editPostprocess = record =>{
        if(record.taskType==='script'){
            setFormValue(record)
            setPostprocessVisible(true)
            return
        }
        findOnePost(record.postId).then(res=>{
            if(res.code===0){
                setFormValue(res.data && res.data)
                setPostprocessVisible(true)
                return
            }
            setFormValue(record)
            setPostprocessVisible(true)
        })
    }

    /**
     * 删除后置处理
     * @param record
     */
    const delPostprocess = record => {
        deletePost(record.postId).then(res=>{
            if(res.code===0){
                findPost()
            }
        })
    }

    const columns = [
        {
            title: "名称",
            dataIndex: "postName",
            key: "postName",
            width:"60%",
        },
        {
            title: "类型",
            dataIndex: "taskType",
            key: "taskType",
            width:"30%",
            render:(text,record)=> (
                <>
                    <TaskIcon type={text} width={20} height={20}/>
                    <span style={{paddingLeft:5}}>{ taskTitle(text) }</span>
                </>
            )
        },
        taskUpdate ? {
            title: "操作",
            dataIndex: "action",
            key: "action",
            ellipsis:true,
            render:(_,record) => {
                return (
                    <ListAction
                        edit={()=>editPostprocess(record)}
                        del={()=>delPostprocess(record)}
                        isMore={true}
                    />
                )
            }
        } : {width: 0},
    ]


    return(
        <Row className="design-content">
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "16", offset: "4" }}
                className="post-pose"
            >
                <div className="post-pose-up">
                    <div className="post-pose-up-num">共{postprocessData && postprocessData.length?postprocessData.length:0}条</div>
                    { taskUpdate && <Btn title={"添加"} onClick={addPostprocess}/> }
                    <PostprocessAddEdit
                        {...props}
                        findPost={findPost}
                        formValue={formValue}
                        postprocessVisible={postprocessVisible}
                        setPostprocessVisible={setPostprocessVisible}
                    />
                </div>
                <div className="trigger-tables">
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={postprocessData}
                        rowKey={record=>record.postId}
                        pagination={false}
                        locale={{emptyText: <ListEmpty />}}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default inject("pipelineStore","postprocessStore","taskStore")(observer(Postprocess))
