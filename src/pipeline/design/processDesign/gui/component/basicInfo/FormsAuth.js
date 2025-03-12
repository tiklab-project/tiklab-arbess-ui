/**
 * @Description: 任务认证配置
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/11
 */
import React,{useState,useEffect} from "react";
import {inject,observer} from "mobx-react";
import {Select, Divider, Space} from "antd";
import ServerAddBtn from "../../../../../../setting/configure/server/components/ServerAddBtn";
import AuthAddBtn from "../../../../../../setting/configure/auth/components/AuthAddBtn";
import HostAddBtn from "../../../../../../setting/configure/host/component/HostAddBtn";
import K8sAddBtn from "../../../../../../setting/configure/k8s/components/K8sAddBtn";
import authStore from "../../../../../../setting/configure/auth/store/AuthStore";
import hostStore from "../../../../../../setting/configure/host/store/HostStore";
import hostGroupStore from "../../../../../../setting/configure/host/store/HostGroupStore";
import serverStore from "../../../../../../setting/configure/server/store/ServerStore";
import k8sStore from "../../../../../../setting/configure/k8s/store/K8sStore";
import FormsSelect from "./FormsSelect";
import {taskTitle} from "../TaskTitleIcon";

const FormsAuth = props =>{

    const {taskStore}=props;

    const {findAllAuth} = authStore;
    const {findAuthServerList} = serverStore;
    const {findAuthHostList} = hostStore;
    const {findHostGroupList} = hostGroupStore;
    const {findAuthHostK8sList} = k8sStore;
    const {updateTask,dataItem} = taskStore;

    //弹出框
    const [visible,setVisible] = useState(false);
    //选择框列表
    const [list,setList] = useState([]);
    //选择框visible
    const [open,setOpen] = useState(false);

    useEffect(()=>{
        //list
        findAuth()
    },[dataItem.task?.artifactType,dataItem.task?.pullType])

    /**
     * 获取选择框list
     */
    const findAuth = () =>{
        const {taskType,task:{artifactType=null,pullType=null}} = dataItem
        switch (taskType) {
            case 'git':
            case 'svn':
                findCommonAuth()
                break
            case 'gitee':
            case 'github':
            case 'gitlab':
            case 'gitpuk':
            case 'testhubo':
            case 'sonar':
                finsServer(taskType)
                break
            case 'liunx':
            case 'docker':
                findHost()
                break
            case 'k8s':
                findK8sHost()
                break
            case 'artifact_maven':
            case 'artifact_docker':
                artifactType==='ssh'? findHost():finsServer(artifactType)
                break
            case 'pull_maven':
            case 'pull_docker':
                pullType==='ssh'? findHost():finsServer(pullType)
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
        const hostRes = await findAuthHostList({});
        Promise.all([hostGroupRes,hostRes]).then(res=>{
            const filterRes = res.filter(item=>item.code ===0).map(li => li.data).flat();
            setList(filterRes)
        })
    }

    /**
     * 获取K8s
     */
    const findK8sHost = () => {
        findAuthHostK8sList({}).then(res=>{
            if(res.code===0){
                setList(res.data)
            }
        })
    }

    /**
     * 获取服务地址
     * @param serverType
     */
    const finsServer = (serverType) => {
        findAuthServerList({type:serverType}).then(res=>{
            if(res.code===0){
                setList(res.data)
            }
        })
    }

    /**
     * 改变凭证
     * @param value
     */
    const changeAuthSelect = value =>{
        updateTask({authId:value})
    }

    /**
     * 认证标题
     */
    const label = () => {
        const {taskType,task:{artifactType=null,pullType=null}} = dataItem;
        const title = taskTitle(taskType);
        switch (taskType) {
            case 'git':
            case 'svn':
                return "凭证"
            case 'gitee':
            case 'github':
            case 'gitlab':
                return `${title}授权信息`
            case 'gitpuk':
            case 'sonar':
                return `${title}服务地址`
            case 'testhubo':
                return 'TestHubo服务地址'
            case 'liunx':
            case 'docker':
                return "主机地址"
            case 'k8s':
                return "集群地址"
            case 'artifact_maven':
            case 'artifact_docker':
                return artifactType==='ssh'?'远程地址':'推送地址'
            case 'pull_maven':
            case 'pull_docker':
                return pullType==='ssh'?'远程地址':'拉取地址'
        }
    }

    /**
     * 选择框 value
     * @param item
     * @returns {number}
     */
    const setKey = item =>{
        const {taskType,task:{artifactType=null,pullType=null}} = dataItem
        switch (taskType) {
            case 'git':
            case 'svn':
                return item.authId
            case 'gitee':
            case 'github':
            case 'gitlab':
            case 'gitpuk':
            case 'testhubo':
            case 'sonar':
                return item.serverId
            case 'liunx':
            case 'docker':
                return item?.groupId ? item.groupId : item.hostId
            case 'k8s':
                return item.hostId
            case 'artifact_maven':
            case 'artifact_docker':
            case 'pull_maven':
            case 'pull_docker':
                const type = taskType.startsWith('artifact') ? artifactType : pullType;
                if(type!=='ssh'){
                    return item.serverId
                }
                return item?.groupId ? item.groupId : item.hostId
        }
    }

    /**
     * 选择框按钮
     */
    const renderBtn = () =>{
        const {taskType,task:{artifactType=null,pullType=null}} = dataItem;
        const commonProps = {
            isConfig: true,
            visible: visible,
            setVisible: setVisible,
            findAuth: findAuth
        };
        switch (taskType) {
            case 'git':
            case 'svn':
                return <AuthAddBtn {...commonProps}/>
            case 'gitpuk':
            case 'testhubo':
                return version === 'cloud' ? null : <ServerAddBtn type={taskType} {...commonProps}/>;
            case 'gitee':
            case 'github':
            case 'gitlab':
            case 'sonar':
                return <ServerAddBtn type={taskType} {...commonProps}/>;
            case 'liunx':
            case 'docker':
                return <HostAddBtn {...commonProps}/>
            case 'k8s':
                return <K8sAddBtn {...commonProps}/>
            case 'artifact_maven':
            case 'artifact_docker':
            case 'pull_maven':
            case 'pull_docker':
                const type = taskType.startsWith('artifact') ? artifactType : pullType;
                if(type==='ssh'){
                    return <HostAddBtn {...commonProps}/>
                }
                if((type==='hadess' && version!=='cloud') || type==='nexus'){
                    return <ServerAddBtn type={type} {...commonProps}/>
                }
                return null
            default: return null
        }
    }


    /**
     * 选择框label
     */
    const selectLabel = item => {
        const {taskType,task:{artifactType=null,pullType=null}} = dataItem;
        switch (taskType) {
            case 'git':
            case 'svn':
                return `${item.name}(${item.authType === 1 ? item.username : "私钥"})`;
            case 'gitpuk':
            case 'testhubo':
            case 'sonar':
                return `${item.name}(${item.serverAddress})`;
            case 'gitee':
            case 'gitlab':
            case 'github':
                return `${item.name}(${item.accessToken})`;
            case 'liunx':
            case 'docker':
                return item.groupName ? `${item.groupName}(主机组)` : `${item.name}(${item.ip})`;
            case 'k8s':
                return `${item.name}(${item.ip})`
            case 'artifact_maven':
            case 'artifact_docker':
            case 'pull_maven':
            case 'pull_docker':
                const type = taskType.startsWith('artifact') ? artifactType : pullType;
                if (type !== 'ssh') {
                    return `${item.name}(${item.serverAddress})`;
                }
                return item.groupName ? `${item.groupName}(主机组)` : `${item.name}(${item.ip})`;
            default:
                return '';
        }
    };


    /**
     * 效验
     */
    const rules = () => {
        const {taskType} = dataItem;
        let rule = [{required:false}];
        switch (taskType) {
            case 'pull_maven':
            case 'pull_docker':
            case 'artifact_maven':
            case 'artifact_docker':
            case 'liunx':
            case 'docker':
            case 'k8s':
            case 'testhubo':
            case 'sonar':
            case 'gitee':
            case 'github':
            case 'gitlab':
            case 'gitpuk':
                rule = [{required:true,message:`${label()}不能为空`}];
                break;
            default:
                break;
        }
        return rule;
    }

    return(
        <FormsSelect
            name={"authId"}
            label={label()}
            rules={rules()}
            open={open}
            isSpin={false}
            onChange={changeAuthSelect}
            onDropdownVisibleChange={(visible)=>setOpen(visible)}
            dropdownRender={menu=> (
                <>
                    {menu}
                    <Divider style={{margin:"4px 0"}} />
                    <div style={{cursor:"pointer"}} onClick={()=>setOpen(false)}>
                        {renderBtn()}
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
