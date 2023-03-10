import React,{useState,useEffect} from "react";
import {inject,observer} from "mobx-react";
import {Form,Select,Divider} from "antd";
import ServerAddBtn from "../../../../setting/authServer/components/ServerAddBtn";
import AuthAddBtn from "../../../../setting/auth/components/AuthAddBtn";
import HostAddBtn from "../../../../setting/authHost/component/HostAddBtn";
import EmptyText from "../../../../common/emptyText/EmptyText";

/**
 * form选择框
 * 认证，授权，凭证……
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AuthFind = props =>{

    const {taskStore,authStore,serverStore,hostStore}=props

    const {findAllAuth,authFresh} = authStore
    const {findAllAuthServerList,serverFresh} = serverStore
    const {findAllAuthHostList,hostFresh} = hostStore
    const {updateTask,dataItem} = taskStore

    //选择框列表
    const [list,setList] = useState([])

    //选择框visible
    const [open,setOpen] = useState(false)

    //选择框边框
    const [bordered,setBordered] = useState(false)

    //选择框下拉图标
    const [showArrow,setShowArrow] = useState(false)

    useEffect(()=>{
        // 初始化选择框list
        initList(dataItem.taskType)
    },[authFresh,serverFresh,hostFresh])

    /**
     * 获取选择框list
     * @param taskType
     */
    const initList = taskType =>{
        switch (taskType) {
            case 1:
            case 4:
            case 5:
                findAllAuth().then(res=>{getList(res)})
                return
            case 2:
            case 3:
            case 41:
            case 51:
                findAllAuthServerList(taskType).then(res=>{getList(res)})
                return
            case 31:
            case 32:
            case 52:
                findAllAuthHostList(0).then(res=>{getList(res)})
                return

        }
    }

    /**
     * 设置选择框List,setList
     * @param res
     */
    const getList = res =>{
        if(res.code===0 && res.data){
            setList(res.data)
        }
    }

    /**
     * 改变凭证
     * @param value
     */
    const changeGitSelect = value =>{

        updateTask({
            taskId:dataItem.taskId,
            values: {authId:value}
        })
        setItem(value)
        setBordered(false)
    }

    /**
     * dataItem添加对象
     * @param value
     */
    const setItem = value => {
        list && list.map(item=>{
            if(setKey(item)===value){
                Object.assign(dataItem,{task:{auth:item}})
                return
            }
            return null
        })
    }

    /**
     * 认证标题
     * @param taskType
     * @returns {string}
     */
    const label = taskType => {
        switch (taskType) {
            case 1:
            case 5:
            case 4:
                return "凭证"
            case 3:
            case 2:
                return "授权信息"
            case 41:
            case 51:
                return "服务地址"
            case 31:
            case 32:
            case 52:
                return "主机地址"
        }
    }

    /**
     * 选择框 id
     * @param item
     * @returns {id}
     */
    const setKey = item =>{
        switch (dataItem.taskType) {
            case 1:
            case 4:
            case 5:
                return item.authId
            case 3:
            case 2:
            case 41:
            case 51:
                return item.serverId
            case 31:
            case 32:
            case 52:
                return item.hostId
        }
    }

    /**
     * 选择框按钮
     * @param taskType
     * @returns {JSX.Element}
     */
    const renderBtn = taskType =>{
        switch (taskType) {
            case 1:
            case 4:
            case 5:
                return <AuthAddBtn isConfig={true}/>
            case 2:
            case 3:
            case 41:
            case 51:
                return <ServerAddBtn isConfig={true} taskType={taskType}/>
            case 31:
            case 32:
            case 52:
                return <HostAddBtn isConfig={true} taskType={taskType}/>
        }
    }

    /**
     * 选择框label
     * @param item
     * @returns {string}
     */
    const selectLabel = item =>{
        switch (dataItem.taskType) {
            case 1:
            case 4:
            case 5:
                return item.name+"("+(item.authType===1?item.username:"私钥")+")"
            case 2:
            case 3:
                return item.name+"("+(item.authType===1?item.message:"私钥")+")"
            case 41:
            case 51:
                return item.name+"("+(item.authType===1?item.username:"私钥")+")"
            case 31:
            case 32:
            case 52:
               return item.name+"("+item.ip+")"
        }
    }

    return(
        <Form.Item label={label(dataItem.taskType)} name={dataItem.taskId+"_authName"}>
            <Select
                // bordered={bordered}
                showSearch={bordered}
                placeholder={bordered ? label(dataItem.taskType):"未选择"}
                className={`${bordered?'':'input-hover'}`}
                showArrow={showArrow}
                onMouseEnter={()=>setShowArrow(true)}
                onMouseLeave={()=>setShowArrow(false)}
                onFocus={()=>setBordered(true)}
                onBlur={()=>setBordered(false)}
                onChange={changeGitSelect}
                notFoundContent={<EmptyText/>}
                open={open}
                onDropdownVisibleChange={(visible)=>setOpen(visible)}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                dropdownRender={menu=> (
                    <>
                        {menu}
                        <Divider style={{margin:"4px 0"}} />
                        <div style={{cursor:"pointer"}} onClick={()=>setOpen(false)}>
                            {renderBtn(dataItem.taskType)}
                        </div>
                    </>
                )}
            >
                {list && list.map((item,index)=>{
                    return <Select.Option value={setKey(item)} key={index}>{selectLabel(item)}</Select.Option>
                })}
            </Select>
        </Form.Item>
    )
}

export default inject("taskStore","authStore","serverStore","hostStore")(observer(AuthFind))
