import React,{useEffect,useState} from "react";
import {Table, Input, Dropdown} from "antd";
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';
import Btn from "../../../../common/btn/Btn";
import EmptyText from "../../../../common/emptyText/EmptyText";
import "./PostprocessUserAdd.scss";

const PostprocessUserAdd = props =>{

    const {allUserList,yUserList,setYUserList,postprocessData,setPostprocessData,type} = props

    // 消息通知人员下拉框
    const [userAddVisible,setUserAddVisible] = useState(false)

    // 选中的用户
    const [addUser,setAddUser] = useState([])

    // 用户列表
    const [userList,setUserList] = useState([])

    // 选中的用户id
    const [selectedRowKeys,setSelectedRowKeys] = useState([])

    useEffect(()=>{
        if(userAddVisible){
            setUserList(allUserList)
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
                if(item.task.taskId===yUserList.taskId){
                    item.task.values.userList = item.task.values.userList.concat(addUser)
                }
            })
            setPostprocessData([...postprocessData])
        }else {
            setYUserList(yUserList.concat(addUser))
        }

        setUserAddVisible(false)
    }

    /**
     * 已选中的用户不可添加
     * @param record：表格行信息
     * @returns {*}
     */
    const disabledOpt = record =>{
        let newArr = []
        if(type){
            newArr = yUserList && yUserList.userList
        }else {
            newArr = yUserList
        }
        return newArr && newArr.some(item=>item.user.id===record.user.id)
    }


    /**
     * 表格行
     * @param record
     */
    const onSelectRow = record => {
        if(!disabledOpt(record)){
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

    }

    /**
     * 表格行是否可选择配置
     * @type {{onChange: rowSelection.onChange, selectedRowKeys: *[]}}
     */
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            const newArr =selectedRows && selectedRows.map(item=>({...item,receiver:1}))
            setAddUser(newArr)
            setSelectedRowKeys(selectedRowKeys)
        },
        // 禁止选择
        getCheckboxProps: (record) => ({
            disabled: disabledOpt(record),
        }),
        selectedRowKeys:selectedRowKeys
    }

    const userAddMnue = (
        <div className='post-pose-user-add mf'>
            {/*<Input*/}
            {/*    placeholder={'名称'}*/}
            {/*    prefix={<SearchOutlined/>}*/}
            {/*    // onChange={findUser}*/}
            {/*/>*/}
            <div className='user-add-table'>
                <Table
                    rowKey={(record) => record.id}
                    rowSelection={rowSelection}
                    onRow={record => ({
                        onClick: () => onSelectRow(record)
                    })}
                    columns={[{
                        title:"名称",
                        dataIndex:["user","nickname"],
                        key:["user","nickname"],
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

    return (
        <Dropdown
            overlay={userAddMnue}
            placement={"bottomRight"}
            visible={userAddVisible}
            trigger={['click']}
            onVisibleChange={visible => setUserAddVisible(visible)}
        >
            <Btn
                type={"link-nopadding"}
                icon={<PlusOutlined/>}
                title={"添加成员"}
            />
        </Dropdown>
    )
}

export default PostprocessUserAdd
