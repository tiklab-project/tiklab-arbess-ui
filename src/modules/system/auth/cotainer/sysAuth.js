import React,{useState,useEffect} from "react";
import {DeleteOutlined,EditOutlined} from "@ant-design/icons";
import {Popconfirm, Table} from "antd";
import EmptyText from "../../../../common/emptyText/emptyText";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import AuthModal from "../components/authModal";
import AuthSwitch from "../components/authSwitch";
import {inject,observer} from "mobx-react";
import "../components/sysAuth.scss"

const SysAuth = props =>{

    const {authStore} = props

    const {createAuthorize,updateAuthorize,deleteAuthorize,findAllAuthorize} = authStore

    const [visible,setVisible] = useState(false)
    const [formValue,setFormValue] = useState("")
    const [authList,setAuthList] = useState([])
    const [fresh,setFresh] = useState(false)

    useEffect(()=>{
        findAllAuthorize().then(res=>{
            if(res.code===0 && res.data){
                setAuthList(res.data)
            }
        })
    },[fresh])

    // 删除配置
    const deletePart = (text,record) => {
        deleteAuthorize(record.id).then(res=>{
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
            dataIndex:"type",
            key:"type",
            width: "160px",
            render:text => {
                switch (text) {
                    case 2:
                        return "gitee"
                    case 3:
                        return "github"
                }
            }
        },
        {
            title:"授权id",
            dataIndex:"clientId",
            key:"clientId",
            width:"300px",
            ellipsis:true,
        },
        {
            title:"授权密码",
            dataIndex:"clientSecret",
            key:"clientSecret",
            width:"300px",
            ellipsis:true
        },
        {
            title:"回调地址",
            dataIndex:"callbackUrl",
            key:"callbackUrl",
            width:"300px",
            ellipsis:true
        },
        {
            title:  "操作",
            dataIndex:"action",
            key:"action",
            render:(text,record)=>{
                return(
                    <span className="sysAuth-content-action">
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

    const add = () =>{
        setFormValue("")
        setVisible(true)
    }

    return(
        <div className="sysAuth home-limited">
            <BreadcrumbContent firstItem={"授权管理"} />
            <div className="sysAuth-content">
                <AuthSwitch
                    add={add}
                />
                <Table
                    columns={columns}
                    dataSource={authList}
                    rowKey={record=>record.id}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
                <AuthModal
                    visible={visible}
                    setVisible={setVisible}
                    formValue={formValue}
                    updateAuthorize={updateAuthorize}
                    createAuthorize={createAuthorize}
                    fresh={fresh}
                    setFresh={setFresh}
                />
            </div>
        </div>
    )
}

export default inject("authStore")(observer(SysAuth))