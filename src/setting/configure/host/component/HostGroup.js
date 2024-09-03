import React,{useEffect,useState} from "react";
import {Col, Row, Space, Table} from "antd";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import hostGroupStore from "../store/HostGroupStore";
import Btn from "../../../../common/component/btn/Btn";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListIcon from "../../../../common/component/list/ListIcon";
import HostGroupAdd from "./HostGroupAdd";
import Profile from "../../../../common/component/profile/Profile";
import ListAction from "../../../../common/component/list/ListAction";
import "../../../common/Common.scss";

/**
 * 主机组
 * @param props
 * @returns {Element}
 * @constructor
 */
const HostGroup = (props) => {

    const {findHostGroupList,deleteAuthHostGroup} = hostGroupStore;

    const [hostGroupList,setHostGroupList ] = useState([]);

    // 弹出框状态
    const [visible,setVisible] = useState(false);

    // 弹出框form表单value
    const [formValue,setFormValue] = useState(null);

    useEffect(()=>{
        // 获取主机组
        findAllHostGroup()
    },[])

    const findAllHostGroup = () =>{
        findHostGroupList().then(res=>{
            if(res.code===0){
                setHostGroupList(res.data)
            }
        })
    }

    /**
     * 添加主机组
     */
    const addHostGroup = () => {
        setVisible(true)
        setFormValue(null)
    }

    /**
     * 删除主机组
     */
    const editHostGroup = (record) => {
        setVisible(true)
        setFormValue(record)
    }

    /**
     * 删除主机组
     */
    const delHostGroup = (record) => {
        deleteAuthHostGroup(record.groupId).then(res=>{
            if(res.code===0){
                findAllHostGroup()
            }
        })
    }

    const columns = [
        {
            title:"名称",
            dataIndex:"groupName",
            key:"groupName",
            width:"30%",
            ellipsis:true,
            render:text => {
                return  <span>
                            <ListIcon text={text}/>
                            <span>{text}</span>
                        </span>
            }
        },
        {
            title:"主机数量",
            dataIndex:"detailsList.length",
            key:"detailsList.length",
            width:"15%",
            ellipsis:true,
            render:(_,record) => {
                const {detailsList} = record
                return  detailsList?.length || 0
            }
        },
        {
            title:"创建人",
            dataIndex:["user","nickname"],
            key:"user",
            width:"20%",
            ellipsis:true,
            render:(text,record) => {
                return  <Space>
                    <Profile userInfo={record.user}/>
                    {text}
                </Space>
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
            width:"9%",
            ellipsis:true,
            render:(_,record) => {
                return (
                    <ListAction
                        edit={()=>editHostGroup(record)}
                        del={()=>delHostGroup(record)}
                    />
                )
            }
        }
    ]

    return (
        <Row className="auth">
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='arbess-home-limited'>
                    <BreadCrumb firstItem={"主机组"}>
                        <Btn
                            type={"primary"}
                            title={"添加主机组"}
                            onClick={addHostGroup}
                        />
                    </BreadCrumb>
                    <HostGroupAdd
                        visible={visible}
                        setVisible={setVisible}
                        formValue={formValue}
                        findAuth={findAllHostGroup}
                    />
                    <div className="auth-content">
                        <Table
                            columns={columns}
                            dataSource={hostGroupList}
                            rowKey={record=>record.groupId}
                            pagination={false}
                            locale={{emptyText: <ListEmpty />}}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default HostGroup
