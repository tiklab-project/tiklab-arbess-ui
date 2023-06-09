import React,{useState,useEffect} from "react";
import {inject,observer} from "mobx-react";
import {Form,Select,Divider} from "antd";
import ServerAddBtn from "../../../../setting/authServer/components/ServerAddBtn";
import AuthAddBtn from "../../../../setting/auth/components/AuthAddBtn";
import HostAddBtn from "../../../../setting/authHost/component/HostAddBtn";
import FormsSelect from "./FormsSelect";

/**
 * 任务配置
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
            case 'git':
            case 'gitlab':
            case 'svn':
                findAllAuth().then(res=>{getList(res)})
                return
            case 'gitee':
            case 'github':
            case 'xcode':
            case 'teston':
            case 'sonar':
            case 'nexus':
            case 'xpack':
                findAllAuthServerList(taskType).then(res=>{getList(res)})
                return
            case 'liunx':
            case 'docker':
            case 'ssh':
                findAllAuthHostList('common').then(res=>{getList(res)})
                return

        }
    }

    /**
     * 设置选择框List,setList
     * @param res
     */
    const getList = res =>{
        if(res.code===0){
            setList(res.data || [])
        }
    }

    /**
     * 改变凭证
     * @param value
     */
    const changeGitSelect = (value) =>{
        updateTask({
            taskId:dataItem.taskId,
            values: {authId:value}
        })
        setBordered(false)
    }

    /**
     * 认证标题
     * @param taskType
     * @returns {string}
     */
    const label = taskType => {
        switch (taskType) {
            case 'git':
            case 'gitlab':
            case 'svn':
                return "凭证"
            case 'gitee':
            case 'github':
                return "授权信息"
            case 'xcode':
            case 'teston':
            case 'sonar':
            case 'nexus':
            case 'xpack':
                return "服务地址"
            case 'liunx':
            case 'docker':
            case 'ssh':
                return "主机地址"
        }
    }

    /**
     * 选择框 value
     * @param item
     * @returns {number}
     */
    const setKey = item =>{
        switch (dataItem.taskType) {
            case 'git':
            case 'gitlab':
            case 'svn':
                return item.authId
            case 'gitee':
            case 'github':
            case 'xcode':
            case 'teston':
            case 'sonar':
            case 'nexus':
            case 'xpack':
                return item.serverId
            case 'liunx':
            case 'docker':
            case 'ssh':
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
            case 'git':
            case 'gitlab':
            case 'svn':
                return <AuthAddBtn isConfig={true}/>
            case 'gitee':
            case 'github':
            case 'sonar':
            case 'nexus':
                return <ServerAddBtn isConfig={true} type={taskType}/>
            case 'liunx':
            case 'docker':
            case 'ssh':
                return <HostAddBtn isConfig={true} type={taskType}/>
            case 'xcode':
            case 'teston':
            case 'xpack':
                if(version==='ce') return <ServerAddBtn isConfig={true} type={taskType}/>
                return null
        }
    }

    /**
     * 选择框label
     * @param item
     * @returns {string}
     */
    const selectLabel = item =>{
        switch (dataItem.taskType) {
            case 'git':
            case 'gitlab':
            case 'svn':
                return item.name+"("+(item.authType===1?item.username:"私钥")+")"
            case 'gitee':
            case 'github':
                return item.name+"("+(item.authType===1?item.message:"私钥")+")"
            case 'xcode':
            case 'teston':
            case 'sonar':
            case 'nexus':
            case 'xpack':
                return item.name+"("+(item.authType===1?item.username:"私钥")+")"
            case 'liunx':
            case 'docker':
            case 'ssh':
               return item.name+"("+item.ip+")"
        }
    }

    return(
        <Form.Item label={label(dataItem.taskType)} name={dataItem.taskId+"_authName"}>
            <FormsSelect
                label={label(dataItem.taskType)}
                border={bordered}
                open={open}
                isSpin={false}
                onFocus={()=>setBordered(true)}
                onBlur={()=>setBordered(false)}
                onChange={changeGitSelect}
                onDropdownVisibleChange={(visible)=>setOpen(visible)}
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
            </FormsSelect>
        </Form.Item>
    )
}

export default inject("taskStore","authStore","serverStore","hostStore")(observer(AuthFind))
