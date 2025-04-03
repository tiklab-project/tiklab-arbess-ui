/**
 * @Description: 任务认证配置
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/11
 */
import React,{useState,useEffect} from "react";
import {inject,observer} from "mobx-react";
import {Select, Divider} from "antd";
import ServerAddBtn from "../../../../../../setting/configure/server/components/ServerAddBtn";
import HostAddBtn from "../../../../../../setting/configure/host/component/HostAddBtn";
import K8sAddBtn from "../../../../../../setting/configure/k8s/components/K8sAddBtn";
import hostStore from "../../../../../../setting/configure/host/store/HostStore";
import hostGroupStore from "../../../../../../setting/configure/host/store/HostGroupStore";
import serverStore from "../../../../../../setting/configure/server/store/ServerStore";
import k8sStore from "../../../../../../setting/configure/k8s/store/K8sStore";
import FormsSelect from "./FormsSelect";
import {
    docker,
    gitee,
    github,
    gitlab,
    gitpuk,
    k8s,
    liunx,
    pri_gitlab,
    sonar,
    testhubo,
    upload_ssh,
    upload_hadess,
    upload_nexus,
    download_hadess,
    download_ssh,
    download_nexus,
} from "../../../../../../common/utils/Constant";
import {taskTitle} from "../TaskTitleIcon";

const FormsAuth = props =>{

    const {taskStore}=props;

    const {findAuthServerList} = serverStore;
    const {findAuthHostList} = hostStore;
    const {findHostGroupList} = hostGroupStore;
    const {findAuthHostK8sList} = k8sStore;
    const {updateTask, dataItem: {taskType = ''} = {}} = taskStore;

    //弹出框
    const [visible,setVisible] = useState(false);
    //选择框列表
    const [list,setList] = useState([]);
    //选择框visible
    const [open,setOpen] = useState(false);

    useEffect(()=>{
        //获取服务列表
        findAuth()
    },[])

    /**
     * 获取选择框list
     */
    const findAuth = () =>{
        switch (taskType) {
            case liunx:
            case docker:
                findAllHost()
                break
            case upload_ssh:
            case download_ssh:
                findHost()
                break
            case k8s:
                findK8sHost()
                break
            case gitee:
            case github:
            case gitlab:
            case pri_gitlab:
            case gitpuk:
            case testhubo:
            case sonar:
                finsServer(taskType)
                break
            case upload_hadess:
            case download_hadess:
                finsServer('hadess')
                break
            case upload_nexus:
            case download_nexus:
                finsServer('nexus')
        }
    }

    /**
     * 获取主机和主机组
     */
    const findAllHost = async () => {
        const hostGroupRes = await findHostGroupList();
        const hostRes = await findAuthHostList({});
        Promise.all([hostGroupRes,hostRes]).then(res=>{
            const filterRes = res.filter(item=>item.code ===0).map(li => li.data).flat();
            setList(filterRes)
        })
    }

    /**
     * 获取主机
     */
    const findHost = () => {
        findAuthHostList({}).then(res=>{
            if(res.code===0){
                setList(res.data)
            }
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
        const title = taskTitle(taskType);
        switch (taskType) {
            case gitee:
            case github:
            case gitlab:
            case pri_gitlab:
                return `${title}授权信息`
            case gitpuk:
            case sonar:
                return `${title}服务`
            case testhubo:
                return 'TestHubo服务'
            case liunx:
            case docker:
                return "主机地址"
            case k8s:
                return "集群地址"
            case upload_hadess:
            case download_hadess:
                return 'Hadess服务'
            case upload_ssh:
            case upload_nexus:
                return "上传地址"
            case download_ssh:
            case download_nexus:
                return '下载地址'
        }
    }

    /**
     * 选择框 value
     * @param item
     * @returns {number}
     */
    const setKey = item =>{
        switch (taskType) {
            case gitee:
            case github:
            case gitlab:
            case pri_gitlab:
            case gitpuk:
            case testhubo:
            case sonar:
            case upload_hadess:
            case upload_nexus:
            case download_hadess:
            case download_nexus:
                return item.serverId
            case liunx:
            case docker:
                return item?.groupId ? item.groupId : item.hostId
            case k8s:
            case upload_ssh:
            case download_ssh:
                return item.hostId
        }
    }

    /**
     * 选择框按钮
     */
    const renderBtn = () =>{
        const commonProps = {
            isConfig: true,
            visible: visible,
            setVisible: setVisible,
            findAuth: findAuth
        };
        switch (taskType) {
            case liunx:
            case docker:
            case upload_ssh:
            case download_ssh:
                return <HostAddBtn {...commonProps}/>
            case k8s:
                return <K8sAddBtn {...commonProps}/>
            case gitee:
            case github:
            case gitlab:
            case pri_gitlab:
            case sonar:
                return <ServerAddBtn type={taskType} {...commonProps}/>;
            case gitpuk:
            case testhubo:
                return version === 'cloud' ? null : <ServerAddBtn type={taskType} {...commonProps}/>;
            case upload_hadess:
            case download_hadess:
                return version === 'cloud' ? null : <ServerAddBtn type={'hadess'} {...commonProps}/>
            case upload_nexus:
            case download_nexus:
                return version === 'cloud' ? null : <ServerAddBtn type={'nexus'} {...commonProps}/>
            default: return null
        }
    }


    /**
     * 选择框label
     */
    const selectLabel = item => {
        switch (taskType) {
            case gitpuk:
            case testhubo:
            case sonar:
            case upload_hadess:
            case upload_nexus:
            case download_hadess:
            case download_nexus:
                return `${item.name}(${item.serverAddress})`;
            case gitee:
            case gitlab:
            case pri_gitlab:
            case github:
                return `${item.name}(${item.accessToken})`;
            case liunx:
            case docker:
                return item.groupName ? `${item.groupName}(主机组)` : `${item.name}(${item.ip})`;
            case k8s:
            case upload_ssh:
            case download_ssh:
                return `${item.name}(${item.ip})`
            default:
                return '';
        }
    };


    /**
     * 效验
     */
    const rules = () => {
        let rule = [{required:false}];
        switch (taskType) {
            case upload_ssh:
            case upload_hadess:
            case upload_nexus:
            case download_hadess:
            case download_ssh:
            case download_nexus:
            case liunx:
            case docker:
            case k8s:
            case testhubo:
            case sonar:
            case gitee:
            case github:
            case gitlab:
            case pri_gitlab:
            case gitpuk:
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
            placeholder={`请选择${label()}`}
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
