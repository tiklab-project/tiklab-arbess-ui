import React,{useEffect,useState} from "react";
import {Modal,Space,Table} from "antd";
import {Profile} from "tiklab-eam-ui";
import {autoHeight} from "../../../common/client/client";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import EmptyText from "../../../common/emptyText/emptyText";
import Btn from "../../../common/btn/btn";

const PostposeUserAdd = props =>{

    const {userAddVisible,setUserAddVisible,allUserList,yUserList,setYUserList} = props

    const [height,setHeight] = useState(0)
    const [addUser,setAddUser] = useState([])
    const [userList,setUserList] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    useEffect(()=>{
        setSelectedRowKeys([])
        setAddUser([])
    },[userAddVisible])

    useEffect(()=>{
        const newArr = yUserList && yUserList.map(item=>item.user.id)
        userAddVisible && setUserList(allUserList.filter(item=>!newArr.includes(item.id)))
    },[userAddVisible])

    useEffect(()=>{
        setHeight(autoHeight())
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    const onOk = () => {
        setYUserList(yUserList.concat(addUser))
        setUserAddVisible(false)
    }

    const modalFooter = (
        <>
            <Btn
                onClick={()=>setUserAddVisible(false)}
                title={"取消"}
                isMar={true}
            />
            <Btn
                onClick={onOk}
                title={"确定"}
                type={"primary"}
            />
        </>
    )

    const columns = [
        {
            title:"昵称",
            dataIndex:"nickname",
            key:"nickname",
            width:"25%",
            ellipsis:true,
            render:(text,record)=>{
                return <Space>
                    <Profile userInfo={record}/>
                    {text}
                </Space>
            }
        },
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"25%",
            ellipsis:true,
        },
        {
            title:"手机号",
            dataIndex:"phone",
            key:"phone",
            width:"25%",
            ellipsis:true,
        },
        {
            title:"邮箱",
            dataIndex:"email",
            key:"email",
            width:"25%",
            ellipsis:true,
        },
    ]

    const onSelectRow = record => {
        // 如果已经选中 -- 取消选中
        if (selectedRowKeys.indexOf(record.id) >= 0) {
            setAddUser(addUser.filter(item=>item.user.id!==record.id))
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1)
        }
        // 如果没有选中 -- 选中
        else {
            selectedRowKeys.push(record.id)
            addUser.push({
                type:1,
                user:record
            })
        }
        setSelectedRowKeys([...selectedRowKeys])
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            let newArr = []
            selectedRows && selectedRows.map(item=>{
                newArr.push({
                    type:1,
                    user:item
                })
            })
            setAddUser([...newArr])
            setSelectedRowKeys(selectedRowKeys)
        },
        selectedRowKeys:selectedRowKeys
    }

    return (
        <Modal
            visible={userAddVisible}
            onCancel={()=>setUserAddVisible(false)}
            closable={false}
            destroyOnClose={true}
            footer={modalFooter}
            width={800}
            style={{height:height,top:60}}
            bodyStyle={{minHeight:317}}
            className="mf"
        >
            <ModalTitle
                setVisible={setUserAddVisible}
                title={"添加成员"}
            />
            <Table
                rowKey={(record) => record.id}
                rowSelection={rowSelection}
                onRow={record => ({
                        onClick: () => onSelectRow(record)
                })}
                columns={columns}
                dataSource={userList}
                pagination={false}
                locale={{emptyText: <EmptyText/>}}
            />
        </Modal>
    )
}

export default PostposeUserAdd
