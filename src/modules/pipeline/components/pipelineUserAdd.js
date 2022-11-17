import React,{useEffect, useState} from "react";
import {Modal,Space,Table} from "antd";
import {autoHeight} from "../../common/client/client";
import Btn from "../../common/btn/btn";
import {Profile} from "tiklab-eam-ui";
import ModalTitle from "../../common/modalTitle/modalTitle";


const PipelineUserAdd = props =>{

    const {visible,setVisible,yUserList,nUserList,setYUserList,setNUserList} = props

    const [height,setHeight] = useState(0)
    const [addUser,setAddUser] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    useEffect(()=>{
        setSelectedRowKeys([])
    },[visible])

    useEffect(()=>{
        setHeight(autoHeight())
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    const onOk = () => {
        const newArr = addUser.map(item=>item.id)

        // yUserList（已选择） 添加
        setYUserList(yUserList.concat(addUser))

        // nUserList（未选择） 减少
        setNUserList(nUserList.filter(item=>!newArr.includes(item.id)))
        setVisible(false)
    }
    
    const modalFooter = (
        <>
            <Btn
                onClick={()=>setVisible(false)}
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
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"200px",
            ellipsis:true,
            render:(text,record)=>{
                return <Space>
                    <Profile userInfo={record}/>
                    {text}
                </Space>
            }
        },
        {
            title:"昵称",
            dataIndex:"nickname",
            key:"nickname",
            width:"200px",
            ellipsis:true,
        },
        {
            title:"手机号",
            dataIndex:"phone",
            key:"phone",
        },
        {
            title:"邮箱",
            dataIndex:"email",
            key:"email",
        },
    ]

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setAddUser(selectedRows)
            setSelectedRowKeys(selectedRowKeys)
            console.log("数组::",selectedRows)
            console.log("id::",selectedRowKeys)
        },
        selectedRowKeys:selectedRowKeys
    }

    return (
        <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            closable={false}
            footer={modalFooter}
            width={900}
            style={{height:height,top:60}}
            className="mf"
        >
            <ModalTitle
                setVisible={setVisible}
                title={"选择用户"}
            />
            <Table
                rowKey={(record) => record.id}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={nUserList}
                pagination={false}
            />
        </Modal>
    )
}

export default PipelineUserAdd
