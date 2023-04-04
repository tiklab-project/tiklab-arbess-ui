import React,{useEffect, useState} from "react";
import {Table,Input} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import {Btn,EmptyText,Page,UserName} from "../../../common";

/**
 * 流水线用户添加
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineUserAdd = props =>{

    const {visible,setVisible,allUserList,yUserList,setYUserList,pipelineStore} = props

    const {findUserPage,userPage} = pipelineStore

    const [addUser,setAddUser] = useState([])

    const [userList,setUserList] = useState([])

    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const [findUserParam,setFindUserParam] = useState({
        pageParam:{
            pageSize:6,
            currentPage:1
        }
    })

    useEffect(()=>{
        if(visible){
            setUserList(allUserList)
        }
        return ()=>{
            setSelectedRowKeys([])
            setAddUser([])
        }
    },[visible])

    /**
     * 添加用户
     */
    const onOk = () => {
        // yUserList（已选择） 添加
        setYUserList(yUserList.concat(addUser))
        setVisible(false)
    }

    /**
     * 已选中的用户不可添加
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
                addUser.push({
                    ...record,
                    adminRole: false
                })
            }
            setSelectedRowKeys([...selectedRowKeys])
        }
    }

    /**
     * 表格可选择配置
     * @type {{onChange: rowSelection.onChange, selectedRowKeys: *[], getCheckboxProps: (function(*): {disabled: *})}}
     */
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            const newArr =selectedRows && selectedRows.map(item=>({...item,adminRole: false}))
            setAddUser(newArr)
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
    const changFindUser = e =>{
        findUser({
            ...findUserParam,
            nickname:e.target.value
        })
    }

    const changUserPage = page =>{
        findUser({
            ...findUserParam,
            pageParam:{
                pageSize:6,
                currentPage:page
            }
        })
    }

    const findUser = value =>{
        setFindUserParam(value)
        findUserPage(value).then(res=>{
            if(res.code===0){
                setUserList(res.data && res.data.dataList)
            }
        })
    }

    return (
        <div className='pipeline-user-add mf'>
            <Input
                placeholder={"名称"}
                prefix={<SearchOutlined/>}
                onChange={changFindUser}
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
                        render:(text,record)=><UserName name={text} id={record.id}/>
                    }]}
                    dataSource={userList}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
                {
                    userPage && userPage.total>1 &&
                    <Page pageCurrent={findUserParam.pageParam.currentPage} changPage={changUserPage} page={userPage}/>
                }
            </div>
            <div className='pipeline-user-add-btn'>
                <Btn onClick={()=>setVisible(false)} title={"取消"} isMar={true}/>
                <Btn onClick={onOk} title={"确定"} type={"primary"}/>
            </div>
        </div>
    )
}

export default PipelineUserAdd
