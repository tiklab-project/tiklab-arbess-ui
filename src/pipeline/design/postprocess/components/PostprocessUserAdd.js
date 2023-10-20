import React,{useEffect,useState} from "react";
import {Table, Input, Dropdown} from "antd";
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';
import Btn from "../../../../common/component/btn/Btn";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import Page from "../../../../common/component/page/Page";
import "./PostprocessUserAdd.scss";

const PostprocessUserAdd = props =>{

    const {pipelineStore,yUserList,setYUserList,type} = props

    const {pipeline,findDmUserPage} = pipelineStore

    // 消息通知人员下拉框
    const [userAddVisible,setUserAddVisible] = useState(false)

    // 选中的用户
    const [addUser,setAddUser] = useState([])

    // 用户列表
    const [userList,setUserList] = useState([])

    // 选中的用户id
    const [selectedRowKeys,setSelectedRowKeys] = useState([])

    const pageParam = {
        pageSize:5,
        currentPage:1
    }

    // 用户请求数据
    const [findUserParam,setFindUserParam] = useState({
        pageParam
    })

    // 用户分页
    const [userPage,setUserPage] = useState({})

    useEffect(()=>{
        findDmUser()
    },[findUserParam])

    const findDmUser = () => {
        findDmUserPage({
            ...findUserParam,
            domainId:pipeline.id
        }).then(res=>{
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
        if(type){
            setYUserList({
                ...yUserList,
                userList:yUserList.userList.concat(addUser)
            })
        }else {
            setYUserList(yUserList.concat(addUser))
        }
        setUserAddVisible(false)
    }

    /**
     * 已选中的用户不可添加
     * @param record
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
        const newUser = changeRows.map(item=>({...item,receiveType: 1})).filter(Boolean)
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
     * 表格行是否可选择配置
     * @type {{onChange: rowSelection.onChange, selectedRowKeys: *[]}}
     */
    const rowSelection = {
        onSelectAll:onSelectAll,
        onSelect:onSelect,
        // 禁止选择
        getCheckboxProps: (record) => ({
            disabled: disabledOpt(record),
        }),
        selectedRowKeys:selectedRowKeys
    }

    /**
     * 换页切换
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

    const userAddMnue = (
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
                        dataIndex:["user","nickname"],
                        key:["user","nickname"],
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
            getPopupContainer={e => e.parentElement}
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
