import React,{useState,useEffect} from "react";
import {inject,observer} from "mobx-react";
import {Select,Divider} from "antd";
import ServerAddBtn from "../../../../../../setting/authServer/components/ServerAddBtn";
import AuthAddBtn from "../../../../../../setting/auth/components/AuthAddBtn";
import HostAddBtn from "../../../../../../setting/authHost/component/HostAddBtn";
import authStore from "../../../../../../setting/auth/store/AuthStore";
import hostStore from "../../../../../../setting/authHost/store/HostStore";
import hostGroupStore from "../../../../../../setting/authHost/store/HostGroupStore";
import serverStore from "../../../../../../setting/authServer/store/ServerStore";
import FormsSelect from "./FormsSelect";

/**
 * 任务配置
 * 认证，授权，凭证……
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const FormsAuth = props =>{

    const {taskStore}=props

    const {findAllAuth} = authStore
    const {findAllAuthServerList} = serverStore
    const {findAllAuthHostList} = hostStore
    const {findHostGroupList} = hostGroupStore
    const {updateTask,dataItem} = taskStore

    // 是否重新查询
    const [fresh,setFresh] = useState(false)

    // 弹出框
    const [visible,setVisible] = useState(false)

    //选择框列表
    const [list,setList] = useState([])

    //选择框visible
    const [open,setOpen] = useState(false)

    useEffect(()=>{
        // 初始化选择框list
        initList(dataItem.taskType)
    },[fresh,dataItem.task?.artifactType,dataItem.task?.pullType])

    /**
     * 获取选择框list
     * @param taskType
     */
    const initList = taskType =>{
        switch (taskType) {
            case 'git':
            case 'gitlab':
            case 'svn':
                return findCommonAuth()
            case 'gitee':
            case 'github':
            case 'xcode':
            case 'teston':
            case 'sonar':
                return finsServer(taskType)
            case 'liunx':
            case 'docker':
                return findHost()
            case 'artifact_maven':
            case 'artifact_docker':
            case 'pull_maven':
            case 'pull_docker':
                const artifactType = (dataItem.taskType==='pull_maven' || dataItem.taskType==='pull_docker') ?
                      dataItem.task?.pullType : dataItem.task?.artifactType
                if(artifactType==='ssh'){
                    return findHost()
                }
                return finsServer(artifactType)
        }
    }

    /**
     * 获取认证
     */
    const findCommonAuth = () =>{
        findAllAuth().then(res=>{
            if(res.code===0){
                setList(res.data)
            }
        })
    }

    /**
     * 获取主机
     * @returns {Promise<void>}
     */
    const findHost = async () => {
        const hostGroupRes = await findHostGroupList();
        const hostRes = await findAllAuthHostList('all');
        Promise.all([hostGroupRes,hostRes]).then(res=>{
            const filterRes = res.filter(item=>item.code ===0).map(li => li.data).flat();
            setList(filterRes)
        })
    }

    /**
     * 获取服务地址
     * @param serverType
     */
    const finsServer = (serverType) => {
        findAllAuthServerList(serverType).then(res=>{
            if(res.code===0){
                setList(res.data)
            }
        })
    }

    /**
     * 重新查询
     */
    const findAuth = () => {
        setFresh(!fresh)
    }

    /**
     * 改变凭证
     * @param value
     */
    const changeGitSelect = value =>{
        updateTask({authId:value})
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
                return "服务地址"
            case 'liunx':
            case 'docker':
                return "主机地址"
            case 'artifact_maven':
            case 'artifact_docker':
                const artifactType = dataItem.task?.artifactType
                if(artifactType==='ssh'){return "远程地址"}
                return "推送地址"
            case 'pull_maven':
            case 'pull_docker':
                const pullType =dataItem.task?.pullType
                if(pullType==='ssh'){return "远程地址"}
                return "拉取地址"
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
                return item.serverId
            case 'liunx':
            case 'docker':
                if(item.groupId){
                    return item.groupId
                }
                return item.hostId
            case 'artifact_maven':
            case 'artifact_docker':
                if(dataItem.task?.artifactType !=='ssh'){
                    return item.serverId
                }
                if(item.groupId){
                    return item.groupId
                }
                return item.hostId
            case 'pull_maven':
            case 'pull_docker':
                if(dataItem.task?.pullType !=='ssh'){
                    return item.serverId
                }
                if(item.groupId){
                    return item.groupId
                }
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
                return (
                    <AuthAddBtn
                        isConfig={true}
                        visible={visible}
                        setVisible={setVisible}
                        findAuth={findAuth}
                    />
                )
            case 'gitee':
            case 'github':
            case 'sonar':
            case 'xcode':
            case 'teston':
                if((taskType==='xcode' || taskType==='teston') && version!=='ce'){
                    return null
                }
                return (
                    <ServerAddBtn
                        type={taskType}
                        isConfig={true}
                        visible={visible}
                        setVisible={setVisible}
                        findAuth={findAuth}
                    />
                )
            case 'liunx':
            case 'docker':
                return (
                    <HostAddBtn
                        isConfig={true}
                        visible={visible}
                        setVisible={setVisible}
                        findAuth={findAuth}
                    />
                )
            case 'artifact_maven':
            case 'artifact_docker':
            case 'pull_maven':
            case 'pull_docker':
                const artifactType = (dataItem.taskType==='pull_maven' || dataItem.taskType==='pull_docker') ?
                      dataItem.task?.pullType : dataItem.task?.artifactType
                if(artifactType==='ssh'){
                    return  <HostAddBtn
                                isConfig={true}
                                visible={visible}
                                setVisible={setVisible}
                                findAuth={findAuth}
                            />
                }
                if((artifactType==='xpack' && version==='ce') || artifactType==='nexus'){
                    return (
                        <ServerAddBtn
                            type={artifactType}
                            isConfig={true}
                            visible={visible}
                            setVisible={setVisible}
                            findAuth={findAuth}
                        />
                    )
                }
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
            case 'xcode':
            case 'teston':
                return item.name+"("+(item.authType===1?item.username:"私钥")+")"
            case 'gitee':
            case 'github':
                return item.name+"("+(item.authType===1?item.message:"私钥")+")"
            case 'liunx':
            case 'docker':
                if(item.groupName) {
                    return item.groupName + "(主机组)"
                }
               return item.name+"("+item.ip+")"
            case 'artifact_maven':
            case 'artifact_docker':
                if(dataItem.task?.artifactType !=='ssh'){
                    return item.name+"("+(item.authType===1? item.username:"私钥")+")"
                }
                if(item.groupName){
                    return item.groupName + "(主机组)"
                }
                return item.name+"("+item.ip+")"
            case 'pull_maven':
            case 'pull_docker':
                if(dataItem.task?.pullType !=='ssh'){
                    return item.name+"("+(item.authType===1? item.username:"私钥")+")"
                }
                if(item.groupName){
                    return item.groupName + "(主机组)"
                }
                return item.name+"("+item.ip+")"
        }
    }

    return(
        <FormsSelect
            name={"authId"}
            label={label(dataItem.taskType)}
            open={open}
            isSpin={false}
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
    )
}

export default inject("taskStore")(observer(FormsAuth))
