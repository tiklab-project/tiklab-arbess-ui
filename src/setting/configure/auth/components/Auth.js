/**
 * @Description: 认证配置
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useEffect,useState} from "react";
import {Space,Table, Row, Col} from "antd";
import authStore from "../store/AuthStore"
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListIcon from "../../../../common/component/list/ListIcon";
import ListAction from "../../../../common/component/list/ListAction";
import Profile from "../../../../common/component/profile/Profile";
import AuthAddBtn from "./AuthAddBtn";
import "../../../common/Common.scss";

const Auth = props =>{

    const {deleteAuth,findAllAuth} = authStore

    //认证配置列表
    const [authList,setAuthList] = useState([])
    //弹出框状态
    const [visible,setVisible] = useState(false)
    //弹出框form表单value
    const [formValue,setFormValue] = useState(null)

    useEffect(()=>{
        // 初始化认证配置
        findAuth()
    },[])

    /**
     * 获取认证配置
     */
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
            render:text =>  (
                <span>
                    <ListIcon text={text}/>
                    <span>{text}</span>
                </span>
            )
        },
        {
            title:"类型",
            dataIndex:"authType",
            key:"authType",
            width:"20%",
            ellipsis:true,
            render: text => text===1?"username&password":"私钥"
        },
        {
            title:"创建人",
            dataIndex:["user","nickname"],
            key:"user",
            width:"20%",
            ellipsis:true,
            render:(text,record) => {
                return (
                    <Space>
                        <Profile userInfo={record.user}/>
                        {text}
                    </Space>
                )
            }
        },
        {
            title:"创建时间",
            dataIndex:"createTime",
            key:"createTime",
            width:"25%",
            ellipsis:true,
        },
        {
            title:"操作",
            dataIndex: "action",
            key: "action",
            width:"10%",
            ellipsis:true,
            render:(_,record) => {
                return (
                    <ListAction
                        edit={()=>editAuth(record)}
                        del={()=>delAuth(record)}
                    />
                )
            }
        }
    ]

    return(
        <Row className="auth">
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='arbess-home-limited'>
                    <BreadCrumb
                        crumbs={[
                            {title:'认证'}
                        ]}
                    >
                        <AuthAddBtn
                            visible={visible}
                            setVisible={setVisible}
                            formValue={formValue}
                            setFormValue={setFormValue}
                            findAuth={findAuth}
                        />
                    </BreadCrumb>
                    <div className="auth-content">
                        <Table
                            columns={commonColumns}
                            dataSource={authList}
                            rowKey={record=>record.authId}
                            pagination={false}
                            locale={{emptyText: <ListEmpty />}}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Auth
