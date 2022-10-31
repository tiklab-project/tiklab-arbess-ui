import React,{useState,useEffect} from "react";
import {DeleteOutlined,EditOutlined} from "@ant-design/icons";
import {Popconfirm,Table} from "antd";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import EmptyText from "../../../../common/emptyText/emptyText";
import IdentifyModal from "../componets/identifyModal";
import IdentifySwitch from "../componets/identifySwitch";
import "../componets/identifyAuth.scss";
import {inject,observer} from "mobx-react";

const Identify = props =>{

    const {identifyStore} = props

    const {findAllAuth,deleteAuth,setVisible,setFormValue,fresh} = identifyStore

    const [identifyList,setIdentify] = useState([])

    useEffect(()=>{
        findAllAuth().then(res=>{
            if(res.code===0){
                setIdentify(res.data)
            }
        })
    },[fresh])

    const deletePart = (text,record) => {
        deleteAuth(record.id)
    }

    const edit = (text,record) => {
        setFormValue(record)
        setVisible(true)
    }

    const add = () =>{
        setFormValue("")
        setVisible(true)
    }

    const columns = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width: "220px",
            ellipsis:true,

        },
        {
            title:"认证类型",
            dataIndex:"type",
            key:"type",
            width: "200px",
            render:text => {
                switch (text) {
                    case 1:
                        return "代码扫描"
                }
            }
        },
        {
            title:"授权类型",
            dataIndex:"authType",
            key:"authType",
            width: "200px",
            render:text => {
                switch (text) {
                    case 0:
                        return "无"
                    case 1:
                        return "username"
                    case 2:
                        return "token"
                }
            }
        },
        {
            title:"地址",
            dataIndex:"url",
            key:"url",
            width: "220px",
            ellipsis:true,
        },
        {
            title:"创建时间",
            dataIndex:"createTime",
            key:"createTime",
            width: "200px",
        },
        {
            title:  "操作",
            dataIndex:"action",
            key:"action",
            render:(text,record)=>{
                return(
                    <span className="identify-content-action">
                        <span className="edit"
                              onClick={()=>edit(text,record)}
                        >
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

    return(
        <div className="identify home-limited">
            <BreadcrumbContent firstItem={"认证管理"} />
            <div className="identify-content">
                <IdentifySwitch
                    add={add}
                />
                <Table
                    columns={columns}
                    dataSource={identifyList}
                    rowKey={record=>record.authId}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
            </div>
        </div>
    )
}

export default inject("identifyStore")(observer(Identify))