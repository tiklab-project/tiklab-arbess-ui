import React,{useState,useEffect} from "react";
import {Col, message, Row, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import PostprocessAddEdit from "./PostprocessAddEdit";
import {TaskTitleIcon} from "../../processDesign/gui/TaskTitleIcon";
import Btn from "../../../../common/component/btn/Btn";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListAction from "../../../../common/component/list/ListAction";
import "./Postprocess.scss";

/**
 * 后置处理页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Postprocess = props =>{

    const {postprocessStore,match:{params}} = props

    const {findPipelinePost,isFindPostprocessData,postprocessData,deletePost,
        findMessageSendType,findOnePost
    } = postprocessStore

    // 后置处理添加编辑弹出框
    const [postprocessVisible,setPostprocessVisible] = useState(false)
    // 编辑内容
    const [formValue,setFormValue] = useState(null)

    useEffect(()=>{
        // 是否存在消息发送方式
        findMessageSendType()
    },[])

    useEffect(()=>{
        // 初始化后置处理
        findPipelinePost(params.id)
    },[isFindPostprocessData])

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
            res.code===0 && message.info("删除成功")
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
            render:(text,record)=> <TaskTitleIcon type={text}/>
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            render:(_,record) => {
                return  <ListAction
                            edit={()=>editPostprocess(record)}
                            del={()=>delPostprocess(record)}
                        />
            }
        },
    ]


    return(
        <Row className="design-content">
            <Col md={{ span: 24 }} lg={{ span: "18", offset: "3" }}>
                <div className="post-pose">
                    <div className="post-pose-content">
                        <div className="post-pose-up">
                            <div className="post-pose-up-title">后置处理</div>
                            <div className="post-pose-up-num">共{postprocessData && postprocessData.length?postprocessData.length:0}个后置处理</div>
                            <Btn title={"添加"} icon={<PlusOutlined/>} onClick={()=>addPostprocess()}/>
                            <PostprocessAddEdit
                                {...props}
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
                                locale={{emptyText: <ListEmpty title={"暂无后置处理"}/>}}
                            />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default inject("pipelineStore","postprocessStore")(observer(Postprocess))
