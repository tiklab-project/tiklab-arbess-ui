import React,{useState,useEffect} from "react";
import {Table, Popconfirm, Button} from "antd";
import {inject,observer} from "mobx-react";
import EnviModal from "../components/enviModal";
import "../components/envi.scss";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import EnviSwitch from "../components/enviSwitch";
import EmptyText from "../../../../common/emptyText/emptyText";
import Subtitle from "../../../config/components/formTitle/subtitle";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";

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
            render:text => <Subtitle type={text}/>
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
                        <span className="edit" onClick={()=>edit(text,record)}>
                            <EditOutlined />
                        </span>
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
                    </span>
                )
            }
        }
    ]

    // document.getElementsByName("")
    return <div className="envi home-limited">
        <div className="envi-upper">
            <BreadcrumbContent firstItem={"环境配置"} />
            <div>
                <Button onClick={()=>add()} type="primary">
                    <PlusOutlined/>添加配置
                </Button>
            </div>
        </div>
        <div className="envi-content">

            <EnviSwitch/>

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