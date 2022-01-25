import React,{Fragment,useEffect,useState} from "react";
import { Breadcrumb,Input,Table, Space,Button,Divider } from 'antd';
import WikiAddmodal from "./wikiAdd";
import { observer,inject } from "mobx-react";
import {Link,withRouter} from "react-router-dom";
const { Search } = Input;
const Wikicontent = (props)=>{
    const {wikiStore,wikiDetailStore,wikilist,wikiTypelist,getWikiTypeList,getUseList,uselist} = props;
    const {getWikilist,addWikilist,searchwiki,
        wikiPageParams,delewikiList,updateWiki} = wikiStore;

    // const [wikilist,getWikiList] = useState([])
    useEffect(() => {
        getWikilist()
        // .then((data)=> {
        //     getWikiList([...data.dataList])
        // })
    }, [])

    const columns = [
        {
            title: "知识库名称",
            dataIndex: "name",
            key: "wikiName",
            align: "center",
            render: (text,record) => <span onClick={()=> goWikidetail(record.id)} className = "span-botton">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref= "#icon1_cheese"></use>
                        </svg>
                        {text}
                    </span>,
        },
        {
            title: "知识库编码",
            dataIndex: "id",
            key: "id",
            align: "center",
            
        },
        {
            title: "负责人",
            dataIndex: ["master","name"],
            key: "master",
            align: "center",
        }, 
        // {
        //     title: "知识库状态",
        //     dataIndex: "wikiState",
        //     key: "wikiState",
        //     align: "center",
        //     render: (text) =>(()=>{
        //                 switch(text){
        //                     case "1": 
        //                         return <span>未开始</span>
        //                     case "2": 
        //                         return <span>已开始</span>
        //                     case "3": 
        //                         return <span>已结束</span>
        //                     }
        //             })()
        // },
        {
            title: "描述",
            dataIndex: "desc",
            key: "desc",
            align: "center"
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (text, record) => (
            <Space size="middle">    
                <WikiAddmodal 
                    type="edit" 
                    id={record.id} 
                    name="编辑" 
                    searchwiki={searchwiki} 
                    updateWiki={updateWiki}
                    getWikiTypeList={getWikiTypeList}
                    wikiTypelist={wikiTypelist}
                    getUseList={getUseList}
                    uselist = {uselist}
                />
                <span className = "span-botton  delete" onClick={()=>delewikiList(record.id)}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref= "#iconshanchu2-copy"></use>
                    </svg>
                    删除
                </span>
            </Space>
            ),
        },
    ]
    const goWikidetail = (id)=> {
        localStorage.setItem("wikiId", id);
        // wikiDetailStore.setWikiId(id)
        props.history.push({pathname: `/index/wikidetail`})
    }
    const onSearch = value => {
        getWikilist({name: value})
    };
    const handleTableChange = (pagination)=> {
        getWikilist({current: pagination.current})
    }
    return (
        <Fragment>
            <Breadcrumb>
                <Breadcrumb.Item>知识库管理</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="/">知识库列表</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Divider />
            <div className="search-add">
                <Search
                    placeholder="请输入关键字"
                    allowClear
                    onSearch={onSearch}
                    style={{ width:300}}
                />
                <WikiAddmodal 
                    name="添加知识库" 
                    type="add" 
                    addWikilist={addWikilist} 
                    searchwiki={searchwiki}
                    wikiTypelist={wikiTypelist}
                    getWikiTypeList={getWikiTypeList}
                    getUseList={getUseList}
                    uselist = {uselist}
                />
            </div>
            <div className="table-box">
                <Table
                    columns={columns}
                    dataSource={wikilist} 
                    rowKey={record => record.id}
                    onChange={handleTableChange} 
                    pagination = {{...wikiPageParams}}
                />
            </div>
        </Fragment>
    )
}
export default inject('wikiDetailStore','wikiStore')(observer(withRouter(Wikicontent)));