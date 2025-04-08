/**
 * @Description: 任务后置处理
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/11
 */
import React,{useState,useEffect,useRef} from "react";
import {Checkbox, Select, Tooltip, Form, Input, Popconfirm,Dropdown} from "antd";
import {
    CaretRightOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
    CaretDownOutlined
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import Btn from "../../../../../../common/component/btn/Btn";
import {Validation} from "../../../../../../common/utils/Client";
import ListEmpty from "../../../../../../common/component/list/ListEmpty";
import TaskMirror from "../../../../../../common/component/editor/CodeMirror";
import PostprocessUserAdd from "../../../../postprocess/components/PostprocessUserAdd";
import {TaskIcon, taskTitle} from "../TaskCommon";
import "./Postprocess.scss";


const Postprocess = props =>{

    const {pipelineStore,postprocessStore,dataItem} = props

    const {deletePost,createPost,findTaskPost,updatePost,findMessageSendType,mesSendData
    } = postprocessStore

    const userId = getUser().userId;

    const [form] = Form.useForm();

    const mirrorRefs = useRef();

    const [postprocessData,setPostprocessData] = useState([])

    // 添加后置处理下拉菜单
    const [addVisible,setAddVisible] = useState(false)

    // 代码块高亮
    const [styleActiveLine,setStyleActiveLine] = useState(false)

    // 当前编辑的内容
    const [poseObj,setPoseObj] = useState({})

    useEffect(()=>{
        // 初始化是否存在消息发送方式
        findMessageSendType()
    },[])

    useEffect(()=>{
        // 初始化task的后置处理
        findTaskPost(dataItem.taskId)
    },[dataItem.taskId])

    const findPost = () =>{
        findTaskPost(dataItem.taskId,'task').then(res=>{
            if(res.code===0){
                setPostprocessData(res?.data || [])
            }
        })
    }

    useEffect(() => {
        if(poseObj.name){
            form.setFieldsValue({
                name:poseObj.name,
                typeList:poseObj.typeList,
            })
        }
    }, [poseObj]);

    /**
     * 添加后置处理
     * @param type
     */
    const addPose = type => {
        const {userId,nickname,name} = getUser()
        setPoseObj({
            pose:'add',
            taskType:type,
            name:taskTitle(type),
            userList:[ {receiveType:1,user:{id:userId,nickname,name} }],
            typeList:['site']
        })
        setAddVisible(false)
    }

    /**
     * 删除后置处理
     * @param e
     * @param item
     */
    const del = (e,item) => {
        e.stopPropagation()
        deletePost(item.postId)
    }

    /**
     * 取消修改
     */
    const onCancel = () => {
        setStyleActiveLine(false)
        setPoseObj({})
    }

    const edit = item =>{
        setPoseObj({
            pose:'edit',
            postName:item.postName,
            taskType:item.taskType,
            postId:item.postId,
            userList:item.task.values.userList,
            typeList:item.task.values.typeList,
            scriptOrder:item.task.values.scriptOrder,
        })
    }

    /**
     * 确定更新
     */
    const onOk = () => {
        form.validateFields().then((values) => {
            if(poseObj.taskType==='message'){
                const userList = poseObj.userList.map(item=>({receiveType:item.receiveType,user:{id:item.user.id}}))
                update({
                    postName:values.postName,
                    values:{
                        typeList:values.typeList,
                        userList
                    }
                })
            }else {
                update({
                    postName:values.postName,
                    values:{
                        scriptOrder: mirrorRefs.current.editor.getValue()
                    }
                })
            }
        })
    }

    const update = values =>{
        if(poseObj.pose==='add'){
            createPost({
                taskId:dataItem.taskId,
                taskType:poseObj.taskType,
                ...values
            }).then(res=>{
                if(res.code===0){
                    findPost()
                    onCancel()
                }
            })
            return
        }
        updatePost({
            postId: poseObj.postId,
            taskType:poseObj.taskType,
            ...values
        }).then(res=>{
            if(res.code===0){
                findPost()
                onCancel()
            }
        })

    }

    /**
     * 移出用户
     */
    const removeUser = (record) =>{
        poseObj.userList = poseObj.userList.filter(item=>item.user.id!==record.user.id)
        setPoseObj({...poseObj})
    }

    /**
     * 改变用户通知事件
     */
    const changEnev = (record,value) =>{
        poseObj.userList.map(it=>{
            if(it.user.id===record.user.id){
                it.receiveType = value
            }
        })
        setPoseObj({...poseObj})
    }

    const typeList = [
        {value:"site", title:"站内信"},
        {value:"email", title:"邮箱通知"},
        {value:"sms", title:"短信通知"},
        {value:"qywechat", title:"企业微信机器人"},
        // {value:"dingding", title:"钉钉机器人"},
    ]

    /**
     * 表单更改
     * @param value
     */
    const onValuesChange = value => {
        setPoseObj({
            ...poseObj,
            ...value
        })
    }

    const poseHtml = item =>{
        const isType = type => mesSendData && mesSendData.some(item=>item===type)
        return (
            <div className="pose-item-content">
                <Form form={form} layout={"vertical"} onValuesChange={onValuesChange}>
                    <Form.Item name="postName" label={"名称"} rules={[{required:true, message:"名称不能为空"},Validation("名称")]}>
                        <Input/>
                    </Form.Item>
                    {
                        poseObj?.taskType==='message' ?
                        <>
                            <Form.Item label={"消息发送方式"} name={"typeList"} rules={[{required:true, message:"消息发送方式不能为空"}]}>
                                <Checkbox.Group>
                                    {
                                        typeList.map(item=>{
                                            if(version!=='cloud' && item.value==='sms') return;
                                            return (
                                                <Tooltip title={isType(item.value) && `未配置${item.title}`} key={item.value}>
                                                    <Checkbox value={item.value} disabled={isType(item.value)}>{item.title}</Checkbox>
                                                </Tooltip>
                                            )
                                        })
                                    }
                                </Checkbox.Group>
                            </Form.Item>
                            <div className="pose-item-user">
                                <div className="user-title">
                                    <div className="title-user">消息通知人员</div>
                                    <PostprocessUserAdd
                                        type={'task'}
                                        yUserList={poseObj}
                                        setYUserList={setPoseObj}
                                        pipelineStore={pipelineStore}
                                    />
                                </div>
                                {
                                    poseObj.userList.map(userItem=>{
                                        const {receiveType,user} = userItem
                                        return (
                                            <div className="pose-item-user-list" key={user.id}>
                                                <div className="user-list-name">{user.nickname}</div>
                                                <div className="user-list-receive">
                                                    <Select
                                                        value={receiveType}
                                                        bordered={false}
                                                        style={{width:80}}
                                                        getPopupContainer={e=>e.parentElement}
                                                        onChange={value=>changEnev(userItem,value)}
                                                    >
                                                        <Select.Option value={1}>全部</Select.Option>
                                                        <Select.Option value={2}>仅成功</Select.Option>
                                                        <Select.Option value={3}>仅失败</Select.Option>
                                                    </Select>
                                                </div>
                                                <div className="user-list-remove">
                                                    {
                                                        user.id===userId ?
                                                        <span className="remove-ban">
                                                            <DeleteOutlined />
                                                        </span>
                                                        :
                                                        <span data-title-bottom="移出用户" onClick={()=>removeUser(userItem)}>
                                                            <DeleteOutlined />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                        :
                        <div className="config-scenario">
                            <div className="config-scenario-title">脚本命令</div>
                            <TaskMirror
                                mirrorValue={poseObj.scriptOrder}
                                mirrorRef={mirrorRefs}
                                onFocus={()=>setStyleActiveLine(true)}
                                options={{
                                    mode: poseObj.taskType ,
                                    lineNumbers: true,
                                    lineWrapping:true,
                                    styleActiveLine:styleActiveLine,
                                    foldGutter: true,
                                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                                }}
                            />
                        </div>
                    }
                </Form>
                <div className="post-pose-btn">
                    <Btn title={"取消"} isMar={true} onClick={onCancel}/>
                    <Btn title={"保存"} type={"primary"} onClick={onOk}/>
                </div>
            </div>
        )
    }

    const renderPose = (item,index) => {
        return (
            <div className="pose-pose-item" key={index}>
                <div className="pose-item-head"
                     onClick={()=>poseObj?.postId ===item.postId ? onCancel():edit(item)}
                >
                    <div className="pose-item-line">
                        {
                            poseObj?.postId === item.postId?
                                <CaretDownOutlined />:<CaretRightOutlined />
                        }
                    </div>
                    <div className="pose-item-line">
                        <TaskIcon type={item.taskType}/>
                    </div>
                    <div className="pose-item-title">
                        {item.name}
                    </div>
                    <div className="pose-item-del">
                        <span data-title-bottom={"删除"} onClick={e=>e.stopPropagation()}>
                             <Popconfirm
                                 placement="bottomRight"
                                 title={"你确定删除吗"}
                                 okText="确定"
                                 cancelText="取消"
                                 onConfirm={e=>del(e,item)}
                             >
                                <DeleteOutlined />
                             </Popconfirm>
                        </span>
                    </div>
                </div>
                {
                    poseObj?.postId === item.postId && poseHtml(item)
                }
            </div>
        )
    }

    return(
        <div className="pose-pose">
            <div className="pose-pose-up">
                <div>
                    <span style={{paddingRight:5}}>后置处理</span>
                    <span style={{fontSize:13}}>({postprocessData && postprocessData.length?postprocessData.length:0}个)</span>
                </div>
                <Dropdown
                    overlay={
                        <div className="pose-pose-dropdown">
                            <div className="dropdown-item"  onClick={()=>addPose("message")}>消息通知</div>
                            <div className="dropdown-item"  onClick={()=>addPose("shell")}>shell脚本</div>
                            <div className="dropdown-item"  onClick={()=>addPose("bat")}>bat脚本</div>
                        </div>
                    }
                    trigger={['click']}
                    placement={"bottomRight"}
                    visible={addVisible}
                    onVisibleChange={visible => setAddVisible(visible)}
                    overlayStyle={{width:140}}
                >
                    <Btn
                        title={"添加后置处理"}
                        type={"link-nopadding"}
                    />
                </Dropdown>
            </div>
            <div className="pose-pose-content">
                { poseObj?.pose==='add' && poseHtml()}
                {
                    postprocessData && postprocessData.length > 0 ?
                        postprocessData.map((item,index)=>renderPose(item,index))
                        :
                        <ListEmpty />
                }
            </div>
        </div>
    )
}

export default inject("pipelineStore","postprocessStore")(observer(Postprocess))
