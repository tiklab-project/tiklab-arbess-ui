import React,{useState,useEffect} from "react";
import {inject,observer} from "mobx-react";
import {Select,Divider} from "antd";
import ServerAddBtn from "../../../../../../setting/server/components/ServerAddBtn";
import AuthAddBtn from "../../../../../../setting/configure/auth/components/AuthAddBtn";
import HostAddBtn from "../../../../../../setting/configure/host/component/HostAddBtn";
import K8sAddBtn from "../../../../../../setting/k8s/components/K8sAddBtn";
import authStore from "../../../../../../setting/configure/auth/store/AuthStore";
import hostStore from "../../../../../../setting/configure/host/store/HostStore";
import hostGroupStore from "../../../../../../setting/configure/host/store/HostGroupStore";
import serverStore from "../../../../../../setting/server/store/ServerStore";
import FormsSelect from "./FormsSelect";

/**
 * 任务配置
 * 认证，授权，凭证……
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const FormsAuth = props =>{

    const {taskStore}=props;

    const {findAllAuth} = authStore;
    const {findAuthServerList} = serverStore;
    const {findAllAuthHostList} = hostStore;
    const {findHostGroupList} = hostGroupStore;
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
        const {taskType,task:{artifactType,pullType}} = dataItem
        switch (taskType) {
            case 'git':
            case 'svn':
                findCommonAuth()
                break
            case 'gitee':
            case 'github':
            case 'gitlab':
            case 'gittok':
            case 'teston':
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
        const hostRes = await findAllAuthHostList('all');
        Promise.all([hostGroupRes,hostRes]).then(res=>{
            const filterRes = res.filter(item=>item.code ===0).map(li => li.data).flat();
            setList(filterRes)
        })
    }

    /**
     * 获取K8s
     */
    const findK8sHost = () => {
        findAllAuthHostList('k8s').then(res=>{
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
        findAuthServerList(serverType).then(res=>{
            if(res.code===0){
                setList(res.data)
            }
        })
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
     */
    const label = () => {
        const {taskType,task:{artifactType,pullType}} = dataItem
        switch (taskType) {
            case 'git':
            case 'svn':
                return "凭证"
            case 'gitee':
            case 'github':
            case 'gitlab':
                return "授权信息"
            case 'gittok':
            case 'teston':
            case 'sonar':
                return "服务地址"
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
        const {taskType,task:{artifactType,pullType}} = dataItem
        switch (taskType) {
            case 'git':
            case 'svn':
                return item.authId
            case 'gitee':
            case 'github':
            case 'gitlab':
            case 'gittok':
            case 'teston':
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
    const renderBtn = taskType =>{
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
            case 'gittok':
            case 'teston':
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
                const { task:{artifactType,pullType}} = dataItem;
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
     * @param item
     * @returns {string}
     */
    const selectLabel = item => {
        const {taskType,task:{artifactType,pullType}} = dataItem;
        switch (taskType) {
            case 'git':
            case 'svn':
            case 'teston':
            case 'gittok':
                return `${item.name}(${item.authType === 1 ? item.username : "私钥"})`;
            case 'gitee':
            case 'github':
            case 'gitlab':
                return `${item.name}(私钥)`;
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
                    return `${item.name}(${item.authType === 1 ? item.username : "私钥"})`;
                }
                return item.groupName ? `${item.groupName}(主机组)` : `${item.name}(${item.ip})`;
            default:
                return '';
        }
    };


    return(
        <FormsSelect
            name={"authId"}
            label={label()}
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
