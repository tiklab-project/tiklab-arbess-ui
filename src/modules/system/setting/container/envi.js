import React,{useState,useEffect} from "react";
import {Table, Popconfirm, Button, Tooltip} from "antd";
import {inject,observer} from "mobx-react";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import EnviModal from "../components/enviModal";
import "../components/envi.scss";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import EmptyText from "../../../common/emptyText/emptyText";
import SubIcon from "../../../config/components/formTitle/subIcon";
import Btn from "../../../common/btn/btn";

/*
    系统环境配置
 */
const Envi = props =>{

    const {settingStore} = props

    const {findAllPipelineScm,deletePipelineScm,updatePipelineScm} = settingStore

    const [visible,setVisible] = useState(false)
    const [fresh,setFresh] = useState(false)
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
    const deletePart = (text,record) => {
        deletePipelineScm(record.scmId).then(res=>{
            if(res.code===0){
                setFresh(!fresh)
            }
        }).catch(error=>{
            console.log(error)
        })
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
            render:text => <SubIcon type={text}/>
        },
        {
            title:"名称",
            dataIndex:"scmName",
            key:"scmName",
        },
        {
            title:"地址",
            dataIndex:"scmAddress",
            key:"scmAddress",
        },
        {
            title:  "操作",
            dataIndex:"action",
            key:"action",
            render:(text,record)=>{
                return(
                    <span className="envi-content-action">
                        <Tooltip title="修改">
                            <span className="edit" onClick={()=>edit(text,record)}>
                                <EditOutlined />
                            </span>
                        </Tooltip>
                        <Tooltip title="删除">
                            <Popconfirm
                                style={{marginTop:100}}
                                title="你确定删除吗"
                                onConfirm={()=>deletePart(text,record)}
                                okText="确定"
                                cancelText="取消"
                            >
                                 <span className="del">
                                     <DeleteOutlined />
                                 </span>
                             </Popconfirm>
                        </Tooltip>
                    </span>
                )
            }
        }
    ]

    return <div className="envi home-limited mf">
        <div className="envi-upper">
            <BreadcrumbContent firstItem={"环境配置"} />
            <Btn
                onClick={add}
                type={"primary"}
                title={"添加配置"}
                icon={<PlusOutlined/>}
            />
        </div>
        <div className="envi-content">

            <Table
                columns={columns}
                dataSource={enviData}
                rowKey={record=>record.scmId}
                pagination={false}
                locale={{emptyText: <EmptyText/>}}
            />

            <EnviModal
                visible={visible}
                setVisible={setVisible}
                enviData={enviData}
                updatePipelineScm={updatePipelineScm}
                formValue={formValue}
                fresh={fresh}
                setFresh={setFresh}
            />
        </div>
    </div>
}

export default inject("settingStore")(observer(Envi))