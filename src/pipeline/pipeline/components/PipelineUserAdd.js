import React,{useEffect, useState} from "react";
import {Table} from "antd";
import Btn from "../../../common/component/btn/Btn";
import ListEmpty from "../../../common/component/list/ListEmpty";
import Page from "../../../common/component/page/Page";
import SearchInput from "../../../common/component/search/SearchInput";

/**
 * 流水线用户添加
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineUserAdd = props =>{

    const {setVisible,yUserList,setYUserList,pipelineStore} = props

    const {findUserPage} = pipelineStore

    //选中的用户
    const [addUser,setAddUser] = useState([])
    //用户列表
    const [userList,setUserList] = useState([])
    //选中的用户id
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [pageParam] = useState({
        pageSize:5,
        currentPage:1
    })
    //用户请求数据
    const [findUserParam,setFindUserParam] = useState({
        pageParam
    })
    //用户分页
    const [userPage,setUserPage] = useState({})

    useEffect(()=>{
        findUser()
    },[findUserParam])

    /**
     * 获取所有用户
     */
    const findUser = () => {
        findUserPage(findUserParam).then(res=>{
            if(res.code===0){
                setUserList(res.data?.dataList || [])
                setUserPage({
                    currentPage: res.data.currentPage,
                    totalPage: res.data.totalPage,
                    totalRecord: res.data.totalRecord
                })
            }
        })
    }

    /**
     * 添加用户
     */
    const onOk = () => {
        // yUserList（已选择） 添加
        const mergedArray = Array.from(new Set([...yUserList,...addUser]))
        setYUserList(mergedArray)
        setVisible(false)
    }

    /**
     * 已选中的用户不可添加
     * @param record
     * @returns {*}
     */
    const disabledOpt = record =>{
        return yUserList && yUserList.some(item=>item.id===record.id)
    }

    /**
     * 点击行选中或取消
     * @param record
     */
    const onSelectRow = record => {
        if(!disabledOpt(record)){
            // 如果已经选中 -- 取消选中
            if (selectedRowKeys.indexOf(record.id) >= 0) {
                selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1)
                addUser.splice(addUser.indexOf(record.id),1)
            } else {
                // 如果没有选中 -- 选中
                selectedRowKeys.push(record.id)
                addUser.push({...record, roleType: 0})
            }
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
        const newArr = changeRows.map(item=>item && item.id).filter(Boolean)
        const newUser = changeRows.map(item=>({...item,roleType: 0})).filter(Boolean)
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
     * @param {String} e - value
     */
    const changFindUser = e =>{
        setFindUserParam({
            pageParam,
            nickname:e.target.value
        })
    }

    /**
     * 换页查询用户
     * @param page
     */
    const changUserPage = page =>{
        setFindUserParam({
            ...findUserParam,
            pageParam:{
                pageSize:5,
                currentPage:page
            }
        })
    }

    return (
        <div className='pipeline-user-add'>
            <SearchInput
                placeholder={"搜索姓名"}
                onPressEnter={changFindUser}
            />
            <div className='pipeline-user-add-table'>
                <Table
                    rowKey={record=> record.id}
                    rowSelection={rowSelection}
                    onRow={record => ({
                        onClick: () => onSelectRow(record)
                    })}
                    columns={[{
                        title:"姓名",
                        dataIndex:"nickname",
                        key:"nickname",
                        width:"100%",
                        ellipsis:true
                    }]}
                    dataSource={userList}
                    pagination={false}
                    locale={{emptyText: <ListEmpty/>}}
                />

                <Page
                    currentPage={findUserParam.pageParam.currentPage}
                    changPage={changUserPage}
                    page={userPage}
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
