import React,{useEffect,useState} from "react";
import {Space,Table,Row,Col} from "antd";
import {EllipsisOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import ListIcon from "../../../../common/component/list/ListIcon";
import ListAction from "../../../../common/component/list/ListAction";
import Profile from "../../../../common/component/profile/Profile";
import Btn from "../../../../common/component/btn/Btn";
import GroupingModal from "./GroupingModal";
import groupingStore from "../store/GroupingStore";
import "../../../common/Common.scss";

/**
 * 环境管理
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Grouping = props =>{

    const {findGroupList,deleteGroup} = groupingStore

    // 分组管理列表
    const [groupList,setGroupList] = useState([])

    // 弹出框状态
    const [visible,setVisible] = useState(false)

    // 弹出框form表单value
    const [formValue,setFormValue] = useState(null)

    useEffect(()=>{
        // 初始化认证配置
        findGrouping()
    },[])

    /**
     * 获取分组管理
     */
    const findGrouping = () =>{
        findGroupList().then(res=>{
            if(res.code===0){
                setGroupList(res.data || [])
            }
        })
    }

    const createEnv = () => {
        setVisible(true)
        setFormValue(null)
    }

    /**
     * 编辑分组管理
     * @param record
     */
    const editAuth = record => {
        setVisible(true)
        setFormValue(record)
    }

    /**
     * 删除分组管理
     * @param record
     */
    const delAuth = record => {
        deleteGroup(record.id).then(r=>{
            if(r.code===0){
                findGrouping()
            }
        })
    }

    const columns = [
        {
            title:"名称",
            dataIndex:"groupName",
            key:"groupName",
            width:"35%",
            ellipsis:true,
            render:text => {
                return  <span>
                            <ListIcon text={text}/>
                            <span>{text}</span>
                        </span>
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
                <div className='mf-home-limited mf'>
                    <BreadCrumb firstItem={"分组"}>
                        <Btn
                            type={'primary'}
                            title={"添加分组"}
                            onClick={createEnv}
                            icon={<PlusOutlined/>}
                        />
                    </BreadCrumb>
                    <GroupingModal
                        visible={visible}
                        setVisible={setVisible}
                        formValue={formValue}
                        findGrouping={findGrouping}
                    />
                    <div className="auth-content">
                        <Table
                            columns={columns}
                            dataSource={groupList}
                            rowKey={record=>record.id}
                            pagination={false}
                            locale={{emptyText: <ListEmpty title={'暂无环境管理'}/>}}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Grouping
