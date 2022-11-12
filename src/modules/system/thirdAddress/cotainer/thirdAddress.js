import React,{useState,useEffect} from "react";
import {DeleteOutlined,EditOutlined} from "@ant-design/icons";
import {Popconfirm,Table,Tooltip} from "antd";
import EmptyText from "../../../common/emptyText/emptyText";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import ThirdAddressModal from "../components/thirdAddressModal";
import ThirdAddressSwitch from "../components/thirdAddressSwitch";
import {inject,observer} from "mobx-react";
import "../components/thirdAddress.scss"

const ThirdAddress = props =>{

    const {thirdAddressStore} = props

    const {createAuthorize,updateAuthorize,deleteAuthorize,findAllAuthorize} = thirdAddressStore

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
            dataIndex:"authType",
            key:"authType",
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
                        <Tooltip title="修改">
                            <span className="edit"
                                  onClick={()=>edit(text,record)}
                            >
                                <EditOutlined />
                            </span>
                        </Tooltip>
                        <Tooltip title="删除">
                            <Popconfirm
                                style={{marginTop:100}}
                                title="你确定删除吗"
                                onConfirm={()=>deletePart(text,record)}
                                kText="确定"
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

    const add = () =>{
        setFormValue("")
        setVisible(true)
    }

    return(
        <div className="sysAuth home-limited">
            <BreadcrumbContent firstItem={"授权管理"} />
            <div className="sysAuth-content">
                <ThirdAddressSwitch
                    add={add}
                />
                <Table
                    columns={columns}
                    dataSource={authList}
                    rowKey={record=>record.authorizedId}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
                <ThirdAddressModal
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

export default inject("thirdAddressStore")(observer(ThirdAddress))