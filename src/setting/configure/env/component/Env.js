/**
 * @Description: 流水线环境管理
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useEffect,useState} from "react";
import {Space,Table,Row,Col} from "antd";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListIcon from "../../../../common/component/list/ListIcon";
import ListAction from "../../../../common/component/list/ListAction";
import Profile from "../../../../common/component/profile/Profile";
import Btn from "../../../../common/component/btn/Btn";
import EnvModal from "./EnvModal";
import envStore from "../store/EnvStore";
import "../../../common/Common.scss";

const Env = props =>{

    const {findEnvList,deleteEnv} = envStore

    //环境管理列表
    const [envList,setEnvList] = useState([])
    //弹出框状态
    const [visible,setVisible] = useState(false)
    //弹出框form表单value
    const [formValue,setFormValue] = useState(null)

    useEffect(()=>{
        // 初始化认证配置
        findEnv()
    },[])

    /**
     * 获取环境管理
     */
    const findEnv = () =>{
        findEnvList().then(res=>{
            if(res.code===0){
                setEnvList(res.data || [])
            }
        })
    }

    const createEnv = () => {
        setVisible(true)
        setFormValue(null)
    }

    /**
     * 编辑环境管理
     * @param record
     */
    const editAuth = record => {
        setVisible(true)
        setFormValue(record)
    }

    /**
     * 删除环境管理
     * @param record
     */
    const delAuth = record => {
        deleteEnv(record.id).then(r=>{
            if(r.code===0){
                findEnv()
            }
        })
    }

    const columns = [
        {
            title:"名称",
            dataIndex:"envName",
            key:"envName",
            width:"35%",
            ellipsis:true,
            render:text => {
                return (
                    <span>
                        <ListIcon text={text}/>
                        <span>{text}</span>
                    </span>
                )
            }
        },
        {
            title:"创建人",
            dataIndex:["user","nickname"],
            key:"user",
            width:"28%",
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
            width:"27%",
            ellipsis:true,
            render:text => text || "--"
        },
        {
            title:"操作",
            dataIndex: "action",
            key: "action",
            width:"10%",
            ellipsis:true,
            render:(_,record) => (
                record.id!=='default' &&
                <ListAction
                    edit={()=>editAuth(record)}
                    del={()=>delAuth(record)}
                />
            )
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
                            {title:'环境'}
                        ]}
                    >
                        <Btn
                            type={'primary'}
                            title={"添加环境"}
                            onClick={createEnv}
                        />
                    </BreadCrumb>
                    <EnvModal
                        visible={visible}
                        setVisible={setVisible}
                        formValue={formValue}
                        findEnv={findEnv}
                    />
                    <div className="auth-content">
                        <Table
                            columns={columns}
                            dataSource={envList}
                            rowKey={record=>record.id}
                            pagination={false}
                            locale={{emptyText: <ListEmpty />}}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Env
