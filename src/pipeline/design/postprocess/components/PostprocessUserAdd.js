import React,{useEffect,useState} from "react";
import {Table,Input} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import EmptyText from "../../../../common/emptyText/EmptyText";
import Btn from "../../../../common/btn/Btn";
import "./PostprocessUserAdd.scss";

const PostprocessUserAdd = props =>{

    const {userAddVisible,setUserAddVisible,allUserList,yUserList,setYUserList,
        postprocessData,setPostprocessData,type
    } = props

    // 选中的用户
    const [addUser,setAddUser] = useState([])

    // 用户列表
    const [userList,setUserList] = useState([])

    // 选中的用户id
    const [selectedRowKeys,setSelectedRowKeys] = useState([])

    useEffect(()=>{
        if(userAddVisible){
            // 初始化用户列表
            let newArr = []
            if(type){
                newArr = yUserList && yUserList.userList.map(item=>item.user && item.user.id)
            }else {
                newArr = yUserList && yUserList.map(item=>item.user.id)
            }
            setUserList(allUserList.filter(item=>!newArr.includes(item.user && item.user.id)))
        }
        return ()=>{
            setSelectedRowKeys([])
            setAddUser([])
        }
    },[userAddVisible])

    /**
     * 添加用户
     */
    const onOk = () => {
        if(type){
            postprocessData && postprocessData.map(item=>{
                if(item.taskId===yUserList.taskId){
                    item.values.userList = item.values.userList.concat(addUser)
                }
            })
            setPostprocessData([...postprocessData])
        }else {
            setYUserList(yUserList.concat(addUser))
        }

        setUserAddVisible(false)
    }

    /**
     * 表格行
     * @param record
     */
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
                receiveType:1,
            })
        }
        setSelectedRowKeys([...selectedRowKeys])
    }

    /**
     * 表格行是否可选择配置
     * @type {{onChange: rowSelection.onChange, selectedRowKeys: *[]}}
     */
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            let newArr = []
            selectedRows && selectedRows.map(item=>{
                newArr.push({
                    ...item,
                    receiveType:1,
                })
            })
            setAddUser([...newArr])
            setSelectedRowKeys(selectedRowKeys)
        },
        selectedRowKeys:selectedRowKeys
    }

    return (
        <div className='post-pose-user-add mf'>
            <Input
                placeholder={'名称'}
                prefix={<SearchOutlined/>}
                // onChange={findUser}
            />
            <div className='user-add-table'>
                <Table
                    rowKey={(record) => record.id}
                    rowSelection={rowSelection}
                    onRow={record => ({
                        onClick: () => onSelectRow(record)
                    })}
                    columns={[{
                        title:"名称",
                        dataIndex:["user","name"],
                        key:["user","name"],
                    }]}
                    dataSource={userList}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
            </div>
            <div className='user-add-btn'>
                <Btn onClick={()=>setUserAddVisible(false)} title={"取消"} isMar={true}/>
                <Btn onClick={onOk} title={"确定"} type={"primary"}/>
            </div>
        </div>
    )
}

export default PostprocessUserAdd