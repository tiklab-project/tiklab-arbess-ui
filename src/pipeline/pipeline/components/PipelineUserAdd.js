import React,{useEffect, useState} from "react";
import {Table,Input} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import Btn from "../../../common/btn/Btn";
import EmptyText from "../../../common/emptyText/EmptyText";


/**
 * 流水线用户添加
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineUserAdd = props =>{

    const {visible,setVisible,yUserList,nUserList,setYUserList,setNUserList,findUserPage} = props

    const [addUser,setAddUser] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    useEffect(()=>{
        setSelectedRowKeys([])
        setAddUser([])
    },[visible])

    /**
     * 添加用户
     */
    const onOk = () => {
        // 所有id组成数组
        const newArr = addUser.map(item=>item.id)

        // yUserList（已选择） 添加
        setYUserList(yUserList.concat(addUser))

        // nUserList（未选择） 减少
        setNUserList(nUserList.filter(item=>!newArr.includes(item.id)))
        setVisible(false)
    }

    /**
     * 模糊查询是否可以选中
     * @param record：表格行信息
     * @returns {*}
     */
    const disabledOpt = record =>{
        return yUserList && yUserList.some(item=>item.id===record.id)
    }

    /**
     * 点击行选中或取消
     * @param record：表格行信息
     */
    const onSelectRow = record => {
        if(!disabledOpt(record)){
            // 如果已经选中 -- 取消选中
            if (selectedRowKeys.indexOf(record.id) >= 0) {
                addUser.splice(addUser.indexOf(record.id),1)
                selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1)
            }
            // 如果没有选中 -- 选中
            else {
                selectedRowKeys.push(record.id)
                addUser.push(record)
            }
            setSelectedRowKeys([...selectedRowKeys])
            setAddUser([...addUser])
        }
    }

    /**
     * 表格可选择配置
     * @type {{onChange: rowSelection.onChange, selectedRowKeys: *[], getCheckboxProps: (function(*): {disabled: *})}}
     */
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setAddUser(selectedRows)
            setSelectedRowKeys(selectedRowKeys)
        },
        // 禁止选择
        getCheckboxProps: (record) => ({
            disabled: disabledOpt(record),
        }),
        selectedRowKeys:selectedRowKeys,
    }

    /**
     * 模糊查询用户
     * @param e：文本框value
     */
    const findUser = e =>{
        findUserPage({
            nickname:e.target.value
        }).then(res=>{
            if(res.code===0){
                setNUserList(res.data && res.data.dataList)
            }
        })
    }

    return (
        <div className='pipeline-user-add mf'>
            <Input
                placeholder={"名称"}
                prefix={<SearchOutlined/>}
                onChange={findUser}
            />
            <div className='pipeline-user-add-table'>
                <Table
                    rowKey={record=> record.id}
                    rowSelection={rowSelection}
                    onRow={record => ({
                        onClick: () => onSelectRow(record)
                    })}
                    columns={[{
                        title:"昵称",
                        dataIndex:"nickname",
                        key:"nickname",
                    }]}
                    dataSource={nUserList}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
            </div>
            <div className='pipeline-user-add-btn'>
                <Btn onClick={()=>setVisible(false)} title={"取消"} isMar={true}/>
                <Btn onClick={onOk} title={"确定"} type={"primary"}/>
            </div>
        </div>
    )
}

export default PipelineUserAdd