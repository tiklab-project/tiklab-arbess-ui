import React,{useState,useEffect} from "react";
import {Table} from "antd";
import {inject,observer} from "mobx-react";
import {PlusOutlined} from "@ant-design/icons";
import EnviModal from "./EnviModal";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import EmptyText from "../../../common/emptyText/EmptyText";
import Listaction from "../../../common/list/Listaction";
import TaskTitleIcon from "../../../pipeline/design/processDesign/processDesign/components/TaskTitleIcon";
import "../../authCommon/Auth.scss";

/**
 * 环境配置页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Envi = props =>{

    const {enviStore} = props

    const {findAllPipelineScm,deletePipelineScm,updatePipelineScm,fresh} = enviStore

    const [visible,setVisible] = useState(false)
    const [enviData,setEnviData] = useState([])
    const [formValue,setFormValue] = useState("")

    useEffect(()=>{
        // 初始化环境配置
        findAllPipelineScm().then(res=>{
            if(res.code===0 && res.data){
                setEnviData(res.data)
            }
        })
    },[fresh])

    /**
     * 添加环境配置
     */
    const addEnvi = () =>{
        setFormValue("")
        setVisible(true)
    }

    /**
     * 删除环境配置
     * @param record
     */
    const delEnvi = record => {
        deletePipelineScm(record.scmId)
    }

    /**
     * 编辑环境配置
     * @param record
     */
    const editEnvi = record => {
        setFormValue(record)
        setVisible(true)
    }

    const columns = [
        {
            title:"类型",
            dataIndex:"scmType",
            key:"scmType",
            width:"30%",
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
            width:"30%",
            ellipsis:true,
        },
        {
            title:"地址",
            dataIndex:"scmAddress",
            key:"scmAddress",
            width:"30%",
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

    return <div className="auth mf-home-limited mf">
        <div className="auth-upper">
            <BreadcrumbContent firstItem={"环境配置"} />
            <Btn
                onClick={addEnvi}
                type={"primary"}
                title={"添加配置"}
                icon={<PlusOutlined/>}
            />
        </div>
        <div className="auth-content">

            <Table
                columns={columns}
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
            />
        </div>
    </div>
}

export default inject("enviStore")(observer(Envi))
