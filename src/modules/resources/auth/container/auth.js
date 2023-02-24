import React,{useEffect} from "react";
import {Space,Table} from "antd";
import {inject,observer} from "mobx-react";
import {Profile} from "tiklab-eam-ui";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import EmptyText from "../../../common/emptyText/emptyText";
import AuthBtn from "../components/authBtn";
import Listname from "../../../common/list/listname";
import Listaction from "../../../common/list/listaction";
import "../../common/resources.scss";

/**
 * 认证配置
 */
const Auth = props =>{

    const {authStore} = props
    const {deleteAuth,findAllAuth,authList,authFresh,setModalVisible,setFormValue} = authStore

    useEffect(()=>{
        findAllAuth()
    },[authFresh])

    const edit = (text,record) => {
        setModalVisible(true)
        setFormValue(record)
    }

    const del = (text,record) => {
        deleteAuth(record.authId)
    }

    const commonColumns = [
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"25%",
            ellipsis:true,
            render:text => {
                return  <span>
                            <Listname text={text}/>
                            <span>{text}</span>
                        </span>
            }
        },
        {
            title:"类型",
            dataIndex:"authType",
            key:"authType",
            width:"20%",
            ellipsis:true,
            render: text => {
                switch (text) {
                    case 1:
                        return "username&password"
                    case 2:
                        return "私钥"
                }
            }
        },
        {
            title:"创建人",
            dataIndex:["user","nickname"],
            key:"user",
            width:"15%",
            ellipsis:true,
            render:(text,record) => {
                return  <Space>
                            <Profile userInfo={record.user}/>
                            {text}
                        </Space>
            }
        },
        {
            title:"权 限",
            dataIndex:"authPublic",
            key:"authPublic",
            width:"10%",
            ellipsis:true,
            render:text => {
                switch (text) {
                    case 1:
                        return "全局"
                    case 2:
                        return "私有"
                }
            }
        },
        {
            title:"创建时间",
            dataIndex:"createTime",
            key:"createTime",
            width:"20%",
            ellipsis:true,
        },
        {
            title:"操作",
            dataIndex: "action",
            key: "action",
            width:"10%",
            ellipsis:true,
            render:(text,record) => {
                return  <Listaction
                            edit={()=>edit(text,record)}
                            del={()=>del(text,record)}
                        />
            }
        }
    ]

    return(
        <div className="resources mf-home-limited mf">
            <div className="resources-upper">
                <BreadcrumbContent firstItem={"认证配置"}/>
                <AuthBtn/>
            </div>
            <div className="resources-content">
                <Table
                    columns={commonColumns}
                    dataSource={authList}
                    rowKey={record=>record.authId}
                    pagination={false}
                    locale={{emptyText: <EmptyText title={'暂无认证配置'}/>}}
                />
            </div>
        </div>
    )
}

export default inject("authStore")(observer(Auth))
