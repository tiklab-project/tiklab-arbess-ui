import React,{useState,useEffect} from "react";
import {Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import enviStore from "../store/EnviStore";
import EnviModal from "./EnviModal";
import Breadcrumb from "../../../common/component/breadcrumb/Breadcrumb";
import Btn from "../../../common/component/btn/Btn";
import EmptyText from "../../../common/component/emptyText/EmptyText";
import Listaction from "../../../common/component/list/Listaction";
import {TaskTitleIcon} from "../../../pipeline/design/processDesign/processDesign/components/TaskTitleIcon";
import ListIcon from "../../../common/component/list/ListIcon";
import "../../authCommon/Auth.scss";

/**
 * 环境配置页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Envi = props =>{

    const {findAllPipelineScm,deletePipelineScm,updatePipelineScm} = enviStore

    const [visible,setVisible] = useState(false)
    const [enviData,setEnviData] = useState([])
    const [formValue,setFormValue] = useState(null)

    useEffect(()=>{
        // 初始化环境配置
        findAllScm()
    },[])

    /**
     * 获取所有环境配置
     */
    const findAllScm = () =>{
        findAllPipelineScm().then(res=>{
            if(res.code===0 && res.data){
                setEnviData(res.data)
            }
        })
    }

    /**
     * 添加环境配置
     */
    const addEnvi = () =>{
        setFormValue(null)
        setVisible(true)
    }

    /**
     * 删除环境配置
     * @param record
     */
    const delEnvi = record => {
        deletePipelineScm(record.scmId).then(res=>{
            if(res.code===0){
                findAllScm()
            }
        })
    }

    /**
     * 编辑环境配置
     * @param record
     */
    const editEnvi = record => {
        setFormValue(record)
        setVisible(true)
    }

    const columnsCe = [
        {
            title:"名称",
            dataIndex:"scmName",
            key:"scmName",
            width:"30%",
            ellipsis:true,
            render:text => {
                return  <span>
                            <ListIcon text={text}/>
                            <span>{text}</span>
                        </span>
            }
        },
        {
            title:"类型",
            dataIndex:"scmType",
            key:"scmType",
            width:"25%",
            ellipsis:true,
            render:text =>{
                switch (text) {
                    case 1:  return <TaskTitleIcon type='git'/>
                    case 5:  return <TaskTitleIcon type='svn'/>
                    case 21: return <TaskTitleIcon type='maven'/>
                    case 22: return <TaskTitleIcon type='nodejs'/>
                }
            }
        },
        {
            title:"地址",
            dataIndex:"scmAddress",
            key:"scmAddress",
            width:"35%",
            ellipsis:true,
        },
        {
            title:  "操作",
            dataIndex:"action",
            key:"action",
            width:"10%",
            ellipsis:true,
            render:(text,record)=>{
                return  <Listaction
                            edit={()=>editEnvi(record)}
                            del={()=>delEnvi(record)}
                        />
            }
        }
    ]

    const columns = [
        {
            title:"类型",
            dataIndex:"scmType",
            key:"scmType",
            width:"32%",
            ellipsis:true,
            render:text =>{
                switch (text) {
                    case 1:  return <TaskTitleIcon type='git'/>
                    case 5:  return <TaskTitleIcon type='svn'/>
                    case 21: return <TaskTitleIcon type='maven'/>
                    case 22: return <TaskTitleIcon type='nodejs'/>
                }
            }
        },
        {
            title:"名称",
            dataIndex:"scmName",
            key:"scmName",
            width:"33%",
            ellipsis:true,
        },
        {
            title:"地址",
            dataIndex:"scmAddress",
            key:"scmAddress",
            width:"35%",
            ellipsis:true,
        }
    ]

    return <div className="auth mf-home-limited mf">
        <Breadcrumb firstItem={"环境配置"}>
            {
                version==='ce' &&
                <Btn
                    onClick={addEnvi}
                    type={"primary"}
                    title={"添加配置"}
                    icon={<PlusOutlined/>}
                />
            }
        </Breadcrumb>    
        <div className="auth-content">

            <Table
                columns={version!=='ce'?columns:columnsCe}
                dataSource={enviData}
                rowKey={record=>record.scmId}
                pagination={false}
                locale={{emptyText: <EmptyText title={'暂无环境配置'}/>}}
            />

            <EnviModal
                visible={visible}
                setVisible={setVisible}
                enviData={enviData}
                updatePipelineScm={updatePipelineScm}
                formValue={formValue}
                findAllScm={findAllScm}
            />
        </div>
    </div>
}

export default Envi
