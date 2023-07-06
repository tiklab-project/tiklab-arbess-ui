import React,{useEffect, useState} from "react";
import {Table,Input} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import Btn from "../../../common/btn/Btn";
import EmptyText from "../../../common/emptyText/EmptyText";
import Page from "../../../common/page/Page";

/**
 * 流水线用户添加
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineUserAdd = props =>{

    const {visible,setVisible,allUserList,yUserList,setYUserList,pipelineStore} = props

    const {findUserPage,userPage} = pipelineStore

    // 选中的用户
    const [addUser,setAddUser] = useState([])

    // 用户列表
    const [userList,setUserList] = useState([])

    // 选中的用户id
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const [pageParam] = useState({
        pageSize:5,
        currentPage:1
    })

    const [findUserParam,setFindUserParam] = useState({
        pageParam
    })

    useEffect(()=>{
        if(visible){
            // 初始化用户添加列表
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
                selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1)
                addUser.splice(addUser.indexOf(record.id),1)
            }
            // 如果没有选中 -- 选中
            else {
                selectedRowKeys.push(record.id)
                addUser.push({
                    ...record,
                    adminRole: false
                })
            }
            // setSelectedRowKeys(selectedRowKeys)
            setSelectedRowKeys([...selectedRowKeys])
            setAddUser([...addUser])
        }
    }

    /**
     * 手动选择/取消选择某行的回调
     * @param record
     */
    const onSelect = record => {
        onSelectRow(record)
    }

    /**
     * 手动选择/取消选择所有行的回调
     * @param selected
     * @param selectedRows
     * @param changeRows
     */
    const onSelectAll = (selected,selectedRows,changeRows) => {
        const newArr = changeRows.map(item=>item && item.id).filter(item2 => item2 !== undefined)
        const newUser = changeRows.map(item=>({...item,adminRole: false})).filter(item2=>item2 !==undefined)
        let row,user
        if(selected){
            row = Array.from(new Set([...selectedRowKeys,...newArr]))
            user = Array.from(new Set([...addUser,...newUser]))
        }
        else {
            row = selectedRowKeys.filter(item=>!newArr.includes(item))
            user = addUser.filter(item=>!newArr.includes(item.id))
        }
        setSelectedRowKeys(row)
        setAddUser(user)
    }

    /**
     * 表格可选择配置
     * @type {{onChange: rowSelection.onChange, selectedRowKeys: *[], getCheckboxProps: (function(*): {disabled: *})}}
     */
    const rowSelection = {
        onSelectAll:onSelectAll,
        onSelect:onSelect,
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

    /**
     * 换页查询用户
     * @param page
     */
    const changUserPage = page =>{
        findUser({
            ...findUserParam,
            pageParam:{
                pageSize:5,
                currentPage:page
            }
        })
    }

    /**
     * 查询用户
     * @param value
     */
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
                        width:"100%",
                        ellipsis:true
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
