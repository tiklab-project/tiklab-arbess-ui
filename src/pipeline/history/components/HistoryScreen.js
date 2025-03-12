/**
 * @Description: 流水线历史筛选
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useEffect,useState} from "react";
import {Select,Space} from "antd";
import {observer} from "mobx-react";
import SearchInput from "../../../common/component/search/SearchInput";
import SearchSelect from "../../../common/component/search/SearchSelect";
import pipelineStore from "../../pipeline/store/PipelineStore";

const HistoryScreen = props =>{

    const {match,screen,route} = props

    const {findUserPipeline,findDmUserPage,pipelineList} = pipelineStore

    //流水线成员
    const [userList,setUserList] = useState([]);
    //当前页
    const [currentPage,setCurrentPage] = useState(1)
    //分页
    const [page,setPage] = useState({})

    useEffect(()=>{
        if(route.path==='/history'){
            findUserPipeline()
        }
        if(route.path==='/pipeline/:id/history'){
            findDmUser()
        }
    },[currentPage])

    /**
     * 获取流水线成员
     */
    const findDmUser = () =>{
        findDmUserPage({
            pageParam:{
                pageSize: 9,
                currentPage: currentPage,
            },
            domainId:match.params.id
        }).then(res=>{
            if(res.code===0){
                setPage({
                    totalRecord: res.data.totalRecord,
                    totalPage: res.data.totalPage,
                })
                if(currentPage===1){
                    setUserList(res.data.dataList)
                } else {
                    setUserList([...userList,...res.data.dataList])
                }
            }
        })
    }

    /**
     * 下拉滚动加载用户
     * @param e
     */
    const scrollEnd = (e) => {
        e.persist();
        const { target } = e;
        if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
            if (currentPage < page.totalPage) {
                setCurrentPage(currentPage+1)
            }
        }
    }

    /**
     * 切换选择框value
     */
    const changValue = (value,field) => {
        screen({
            [field]:value,
            pageParam:{
                pageSize: 13,
                currentPage: 1,
            }
        })
    }

    return(
        <Space className="history-screens" size={'middle'}>
            <SearchInput
                placeholder="搜索名称"
                onPressEnter={e=>changValue(e.target.value,"number")}
                style={{ width: 180 }}
            />
            {
                route.path==='/history' ?
                    <SearchSelect
                        showSearch
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={value=>changValue(value,"pipelineId")}
                        placeholder={'流水线'}
                        style={{ width: 150 }}
                    >
                        <Select.Option key={"全部"} value={null}>全部</Select.Option>
                        {
                            pipelineList && pipelineList.map(item=>(
                                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            ))
                        }
                    </SearchSelect>
                    :
                    <SearchSelect
                        showSearch
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onPopupScroll={scrollEnd}
                        onChange={value=>changValue(value,"userId")}
                        placeholder={'执行人'}
                        style={{ width: 150 }}
                    >
                        <Select.Option key={"全部"} value={null}>全部</Select.Option>
                        {
                            userList && userList.map(item=>(
                                <Select.Option key={item.id} value={item.user && item.user.id}>{item.user && item.user.nickname}</Select.Option>
                            ))
                        }
                    </SearchSelect>
            }

            <SearchSelect
                onChange={value=>changValue(value,"state")}
                placeholder={'状态'}
                style={{ width: 150 }}
            >
                <Select.Option value={null}>全部</Select.Option>
                <Select.Option value={"error"}>失败</Select.Option>
                <Select.Option value={"success"}>成功</Select.Option>
                <Select.Option value={"halt"}>终止</Select.Option>
                <Select.Option value={"run"}>运行中</Select.Option>
            </SearchSelect>
            <SearchSelect
                onChange={value=>changValue(value,"type")}
                placeholder={'执行方式'}
                style={{ width: 150 }}
            >
                <Select.Option value={0}>全部</Select.Option>
                <Select.Option value={1}>手动</Select.Option>
                <Select.Option value={2}>自动</Select.Option>
                <Select.Option value={3}>回滚</Select.Option>
            </SearchSelect>
        </Space>
    )
}

export default observer(HistoryScreen)
