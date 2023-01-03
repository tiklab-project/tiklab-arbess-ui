import React,{useEffect,useState} from "react";
import {Modal,Space,Table} from "antd";
import {Profile} from "tiklab-eam-ui";
import {autoHeight} from "../../../../common/client/client";
import ModalTitle from "../../../../common/modalTitle/modalTitle";
import EmptyText from "../../../../common/emptyText/emptyText";
import Btn from "../../../../common/btn/btn";

const PostposeUserAdd = props =>{

    const {userAddVisible,setUserAddVisible,allUserList,yUserList,
        postposeData,setPostposeData
    } = props

    const [height,setHeight] = useState(0)
    const [addUser,setAddUser] = useState([])
    const [userList,setUserList] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    useEffect(()=>{
        const newArr = yUserList && yUserList.userList.map(item=>item.user.id)
        userAddVisible && setUserList(allUserList.filter(item=>!newArr.includes(item.user.id)))
        return ()=>{
            setSelectedRowKeys([])
            setAddUser([])
        }
    },[userAddVisible])

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    const onOk = () => {
        postposeData && postposeData.map(item=>{
            if(item.configId===yUserList.configId){
                item.userList = item.userList.concat(addUser)
            }
        })
        setPostposeData([...postposeData])
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
            dataIndex: ["user","nickname"],
            key: ["user","nickname"],
            width:"25%",
            ellipsis:true,
            render:(text,record)=>{
                return <Space>
                    <Profile userInfo={record.user}/>
                    {text}
                </Space>
            }
        },
        {
            title:"名称",
            dataIndex:["user","name"],
            key:["user","name"],
            width:"25%",
            ellipsis:true,
        },
        {
            title:"手机号",
            dataIndex:["user","phone"],
            key:["user","phone"],
            width:"25%",
            ellipsis:true,
        },
        {
            title:"邮箱",
            dataIndex:["user","email"],
            key:["user","email"],
            width:"25%",
            ellipsis:true,
        },
    ]

    const onSelectRow = record => {
        // 如果已经选中 -- 取消选中
        if (selectedRowKeys.indexOf(record.id) >= 0) {
            setAddUser(addUser.filter(item=>item.id!==record.id))
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1)
        }
        // 如果没有选中 -- 选中
        else {
            selectedRowKeys.push(record.id)
            addUser.push({
                ...record,
                messageType:1,
            })
        }
        setSelectedRowKeys([...selectedRowKeys])
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            let newArr = []
            selectedRows && selectedRows.map(item=>{
                newArr.push({
                    ...item,
                    messageType:1,
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
