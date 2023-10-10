import React,{useEffect,useState} from "react";
import {Select,Input} from "antd";
import {CaretDownOutlined} from "@ant-design/icons";
import "./HistoryScreen.scss";
import {observer} from "mobx-react";

const {Option} = Select;

/**
 * 流水线历史筛选
 */
const HistoryScreen = props =>{

    const {historyType,params,screen,pipelineStore} = props

    const {pipeline,pipelineList,findDmUserPage} = pipelineStore

    const [userList,setUserList] = useState([])

    const [currentPage,setCurrentPage] = useState(1)

    const [page,setPage] = useState({})

    useEffect(()=>{
        if(historyType==='historyPipeline'){findDmUser()}
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
            domainId:pipeline.id
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
        <div className="str-screens">
            <Input
                placeholder="名称"
                onPressEnter={e=>changValue(e.target.value,"number")}
                defaultValue={params?.number}
            />
            {
                historyType==="history" ?
                    <Select
                        showSearch
                        suffixIcon={<CaretDownOutlined />}
                        onChange={value=>changValue(value,"pipelineId")}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        defaultValue={params.pipelineId}
                    >
                        <Option key={"全部"} value={null}>流水线</Option>
                        {
                            pipelineList && pipelineList.map(item=>(
                                <Option key={item.id} value={item.id}>{item.name}</Option>
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
                        defaultValue={params.userId}
                    >
                        <Option key={"全部"} value={null}>执行人</Option>
                        {
                            userList && userList.map(item=>(
                                <Option key={item.id} value={item.user && item.user.id}>{item.user && item.user.nickname}</Option>
                            ))
                        }
                    </Select>
            }

            <Select
                suffixIcon={<CaretDownOutlined />}
                onChange={value=>changValue(value,"state")}
                defaultValue={params.state}
            >
                <Option key={"0"} value={null}>状态</Option>
                <Option key={"1"} value={"error"}>失败</Option>
                <Option key={"10"} value={"success"}>成功</Option>
                <Option key={"20"} value={"halt"}>终止</Option>
                <Option key={"30"} value={"run"}>运行中</Option>
            </Select>
            <Select
                suffixIcon={<CaretDownOutlined />}
                onChange={value=>changValue(value,"type")}
                defaultValue={params.type}
            >
                <Option key={"0"} value={0}>执行方式</Option>
                <Option key={"1"} value={1}>手动</Option>
                <Option key={"2"} value={2}>自动</Option>
            </Select>
        </div>
    )
}

export default observer(HistoryScreen)
