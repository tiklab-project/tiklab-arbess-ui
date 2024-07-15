import React,{useEffect,useState} from "react";
import {Select,Input,Space} from "antd";
import {CaretDownOutlined, SearchOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";

/**
 * 流水线历史筛选
 */
const HistoryScreen = props =>{

    const {match,screen,pipelineStore,route} = props

    const {findUserPipeline,findDmUserPage,pipelineList} = pipelineStore

    // 流水线成员
    const [userList,setUserList] = useState([]);
    // 当前页
    const [currentPage,setCurrentPage] = useState(1)
    // 分页
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
     * 获取项目成员
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
                if(currentPage===1){setUserList(res.data.dataList)}
                else {setUserList([...userList,...res.data.dataList])}
            }
        })
    }

    /**
     * 下拉滚动查看用户
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
            <Input
                placeholder="名称"
                prefix={<SearchOutlined />}
                onPressEnter={e=>changValue(e.target.value,"number")}
            />
            {
                route.path==='/history' ?
                    <Select
                        showSearch
                        suffixIcon={<CaretDownOutlined />}
                        onChange={value=>changValue(value,"pipelineId")}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        placeholder={'流水线'}
                    >
                        <Select.Option key={"全部"} value={null}>全部</Select.Option>
                        {
                            pipelineList && pipelineList.map(item=>(
                                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            ))
                        }
                    </Select>
                    :
                    <Select
                        showSearch
                        suffixIcon={<CaretDownOutlined />}
                        onPopupScroll={scrollEnd}
                        onChange={value=>changValue(value,"userId")}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        placeholder={'执行人'}
                    >
                        <Select.Option key={"全部"} value={null}>全部</Select.Option>
                        {
                            userList && userList.map(item=>(
                                <Select.Option key={item.id} value={item.user && item.user.id}>{item.user && item.user.nickname}</Select.Option>
                            ))
                        }
                    </Select>
            }

            <Select
                suffixIcon={<CaretDownOutlined />}
                onChange={value=>changValue(value,"state")}
                placeholder={'状态'}
            >
                <Select.Option value={null}>全部</Select.Option>
                <Select.Option value={"error"}>失败</Select.Option>
                <Select.Option value={"success"}>成功</Select.Option>
                <Select.Option value={"halt"}>终止</Select.Option>
                <Select.Option value={"run"}>运行中</Select.Option>
            </Select>
            <Select
                suffixIcon={<CaretDownOutlined />}
                onChange={value=>changValue(value,"type")}
                placeholder={'执行方式'}
            >
                <Select.Option value={0}>全部</Select.Option>
                <Select.Option value={1}>手动</Select.Option>
                <Select.Option value={2}>自动</Select.Option>
            </Select>
        </Space>
    )
}

export default observer(HistoryScreen)
