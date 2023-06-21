import React,{useEffect,useState} from "react";
import {Space,Table} from "antd";
import authStore from "../store/AuthStore"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import EmptyText from "../../../common/emptyText/EmptyText";
import ListIcon from "../../../common/list/ListIcon";
import Listaction from "../../../common/list/Listaction";
import Profile from "../../../common/profile/Profile";
import AuthAddBtn from "./AuthAddBtn";
import "../../authCommon/Auth.scss";

/**
 * 认证配置页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Auth = props =>{

    const {deleteAuth,findAllAuth} = authStore

    const [authList,setAuthList] = useState([])

    const [visible,setVisible] = useState(false)
    const [formValue,setFormValue] = useState("")

    useEffect(()=>{
        // 初始化认证配置
        findAuth()
    },[])

    const findAuth = () =>{
        findAllAuth().then(res=>{
            if(res.code===0){
                setAuthList(res.data || [])
            }
        })
    }

    /**
     * 编辑认证配置
     * @param record
     */
    const editAuth = record => {
        setVisible(true)
        setFormValue(record)
    }

    /**
     * 删除认证配置
     * @param record
     */
    const delAuth = record => {
        deleteAuth(record.authId).then(r=>{
            if(r.code===0){
                findAuth()
            }
        })
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
                            <ListIcon text={text}/>
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
                            edit={()=>editAuth(record)}
                            del={()=>delAuth(record)}
                        />
            }
        }
    ]

    return(
        <div className="auth mf-home-limited mf">
            <div className="auth-upper">
                <BreadcrumbContent firstItem={"认证配置"}/>
                <AuthAddBtn
                    visible={visible}
                    setVisible={setVisible}
                    formValue={formValue}
                    setFormValue={setFormValue}
                    findAuth={findAuth}
                />
            </div>
            <div className="auth-content">
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

export default Auth
