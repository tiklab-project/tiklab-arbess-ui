import React,{useState,useEffect} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {message,Table} from "antd";
import {inject,observer} from "mobx-react";
import EmptyText from "../../../common/emptyText/emptyText";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import ThirdAddressModal from "../components/thirdAddressModal";
import "../../common/resources.scss";
import Btn from "../../../common/btn/btn";
import SubIcon from "../../../config/components/formTitle/subIcon";
import Listaction from "../../../common/list/listaction";

const ThirdAddress = props =>{

    const {thirdAddressStore} = props

    const {createAuthorize,updateAuthorize,deleteAuthorize,findAllAuthorize,thirdList} = thirdAddressStore

    const [visible,setVisible] = useState(false)
    const [formValue,setFormValue] = useState("")

    useEffect(()=>{
        findAllAuthorize()
    },[])

    // 删除配置
    const del = (text,record) => {
        deleteAuthorize(record.id).then(res=>{
            res.code===0 && message.info("删除成功")
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
            width:"10%",
            ellipsis:true,
            render:text => {
                return <SubIcon type={text}/>
            }
        },
        {
            title:"授权id",
            dataIndex:"clientId",
            key:"clientId",
            width:"25%",
            ellipsis:true,
        },
        {
            title:"授权密码",
            dataIndex:"clientSecret",
            key:"clientSecret",
            width:"30%",
            ellipsis:true
        },
        {
            title:"回调地址",
            dataIndex:"callbackUrl",
            key:"callbackUrl",
            width:"30%",
            ellipsis:true
        },
        {
            title:  "操作",
            dataIndex:"action",
            key:"action",
            width:"5%",
            ellipsis:true,
            render:(text,record)=>{
                return <Listaction
                            edit={()=>edit(text,record)}
                            del={()=>del(text,record)}
                        />
            }
        }
    ]

    const add = () =>{
        setFormValue("")
        setVisible(true)
    }

    return(
        <div className="resources home-limited mf">
            <div className="resources-upper">
                <BreadcrumbContent firstItem={"服务配置"} />
                <Btn
                    onClick={()=>add()}
                    type={"primary"}
                    title={"添加配置"}
                    icon={<PlusOutlined/>}
                />
            </div>
            <div className="resources-content">
                <Table
                    columns={columns}
                    dataSource={thirdList}
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
                />
            </div>
        </div>
    )
}

export default inject("thirdAddressStore")(observer(ThirdAddress))