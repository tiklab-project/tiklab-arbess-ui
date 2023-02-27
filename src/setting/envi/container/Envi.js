import React,{useState,useEffect} from "react";
import {Table} from "antd";
import {inject,observer} from "mobx-react";
import {PlusOutlined} from "@ant-design/icons";
import EnviModal from "../components/EnviModal";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import EmptyText from "../../../common/emptyText/EmptyText";
import TaskTitleIcon from "../../../design/tasks/tasks/components/TaskTitleIcon";
import Btn from "../../../common/btn/Btn";
import Listaction from "../../../common/list/Listaction";
import "../../authCommon/Auth.scss";

/**
 * 环境配置
 */
const Envi = props =>{

    const {enviStore} = props

    const {findAllPipelineScm,deletePipelineScm,updatePipelineScm,fresh} = enviStore

    const [visible,setVisible] = useState(false)
    const [enviData,setEnviData] = useState([])
    const [formValue,setFormValue] = useState("")

    // 初始化
    useEffect(()=>{
        findAllPipelineScm().then(res=>{
            if(res.code===0 && res.data){
                setEnviData(res.data)
            }
        })
    },[fresh])

    const add = () =>{
        setFormValue("")
        setVisible(true)
    }

    // 删除配置
    const del = (text,record) => {
        deletePipelineScm(record.scmId)
    }

    const edit = (text,record) => {
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
            render:text => <TaskTitleIcon type={text}/>
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
                            edit={()=>edit(text,record)}
                            del={()=>del(text,record)}
                        />
            }
        }
    ]

    return <div className="resources mf-home-limited mf">
        <div className="resources-upper">
            <BreadcrumbContent firstItem={"环境配置"} />
            <Btn
                onClick={add}
                type={"primary"}
                title={"添加配置"}
                icon={<PlusOutlined/>}
            />
        </div>
        <div className="resources-content">

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
