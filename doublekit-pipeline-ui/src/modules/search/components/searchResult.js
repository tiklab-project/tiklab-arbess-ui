import React,{Fragment, useEffect, useRef, useState} from "react";
import { Pagination } from 'antd';
import "../components/search.scss";
import { Row, Col,Tabs } from 'antd';
import wiki from "../../../assets/images/wiki.png";
import { observer, inject } from "mobx-react";
const { TabPane } = Tabs;

const SearchResult = (props) => {
    const {searchStore,wikiDetailStore} = props
    const {getSearchSore,sortList,searchForPage,keyword,searchCondition,setKeyWord,searchList,getSearch} = searchStore;
    const {setWikiId} = wikiDetailStore
    const [lastRecord,setLastRecord] = useState()
    const table = (data) => {
        switch(data){
            case "wiki": 
                return "知识库";
            case "WorkItem": 
                return "事项";
        }
    }
    const [itemList,setItem] = useState([])
    const [tabs,setTabs] = useState()
    useEffect(() => {
        if(sortList.length !== 0){
            setTabs(sortList[0].index)
            searchForPage({currentPage: 1,index: sortList[0].index,keyword: keyword}).then((res)=> {
                if(res.code === 0){
                    setItem(res.data.dataList)
                    setLastRecord(res.data.lastRecord)
                }
            })
        }
        return 
    }, [sortList,keyword])

    // 输入中
    const [showRes,setShow] = useState("hidden")
    const changeValue = (value) =>{
        console.log(searchList,showRes)
        setShow("show")
        getSearch(value.target.value)
        
    }

    const changeTab = (activeKey) => {
        searchForPage({currentPage: 1,index: activeKey,}).then((res)=> {
            if(res.code === 0){
                setItem(res.data.dataList)
                setLastRecord(res.data.lastRecord)
            }
        })
    }

    const toWiki = async(id) => {
        setWikiId(id)
        localStorage.setItem("wikiId",id)
        await props.history.push("/index/wikidetail/survey")
        setShow("hidden")
        // location.reload();

    }

    const toWorkItem = async(id) => {
        // setWorkId(id)
        await props.history.push("/index/wikidetail/work")
        setShow("hidden")
        // location.reload();

    }
    const changePage = (page) => {
        searchForPage({currentPage: page,lastRecord:lastRecord}).then((res)=> {
            if(res.code === 0){
                setItem(res.data.dataList)
                setLastRecord(res.data.lastRecord)
            }
        })
    }
    const searchInput = useRef()
    const submit = (value) => {
        if(value.keyCode === 13) {
            getSearchSore(value.target.value)
            setKeyWord(value.target.value)
        }else {
            setKeyWord(searchInput.current.value)
            getSearchSore(searchInput.current.value)
        }
        setShow("hidden")
        
    }

    const hiddenBox = ()=> {
        setShow("hidden")
    }
    const showBox = ()=> {
        setShow("show")
    }
    return (
        <Row>
            <Col span={12} offset={6}>
                <div className="search-resule" 
                >
                    <div tabIndex="-1"
                        onFocus={showBox}
                        onBlur={hiddenBox}
                    >
                        <div className="search-box">
                            <input className="search-input" ref={searchInput} onChange={changeValue} onKeyDown={submit}/>
                            <div className="search-botton" onClick={submit}>搜索</div>
                        </div>
                        <div 
                        className={`show-box ${(searchList.length !== 0 && showRes === "show") ?   null : "hidden-box"}`} 
                    >
                            {
                                searchList && searchList.map((item,index)=> {
                                    return (
                                        <div className="sort-box" key={index}>
                                            
                                            {
                                                (()=> {
                                                    switch(item.index) {
                                                        case "wiki": 
                                                            return <div className="sort-title">知识库</div>;
                                                        case "WorkItem":
                                                            return <div className="sort-title">事项</div>;
                                                    }
                                                })()
                                            }
                                            {
                                                item.dataList && item.dataList.map((toItem)=> {
                                                    return <div className="item-box" key={toItem.id}>
                                                                {
                                                                    (()=> {
                                                                        switch(item.index) {
                                                                            case "wiki": 
                                                                                return <div className="item-one" onClick={()=>toWiki(toItem.id)}>
                                                                                            <img src={wiki} alt=""/>
                                                                                            <span>{toItem.wikiName}</span>
                                                                                        </div>;
                                                                            case "WorkItem":
                                                                                return <div className="item-one" onClick={()=>toWorkItem(toItem.id, toItem.wiki.id)}>
                                                                                            <img src={wiki} alt=""/>
                                                                                            <span>{toItem.title}</span>
                                                                                        </div>;
                                                                        }
                                                                    })()
                                                                }    
                                                            </div>
                                                })
                                            }
                                        </div>)
                                })
                            }
                    </div>
                    
                    </div>
                    <Tabs defaultActiveKey={tabs} type="card" size={'default'} onChange={changeTab}>
                        {
                            sortList && sortList.map((item)=> {
                                return <TabPane tab={`${table(item.index)}(${item.totalRecord})`} key={item.index} >
                                {
                                    itemList && itemList.map((itemWork)=> {
                                        return <div className="wiki-box" key={itemWork.id}>
                                                <div className="wiki-item">
                                                {
                                                    (()=> {
                                                        switch(item.index) {
                                                            case "wiki": 
                                                                return <div className="wiki-contant" onClick={()=>toWiki(itemWork.id)}>
                                                                    <div className="wiki-title">{itemWork.wikiName}</div>
                                                                    <div >
                                                                        <span className="wiki-item-name">知识库ID:</span>{itemWork.id}
                                                                    </div>
                                                                    <div>
                                                                        <span className="wiki-item-name">知识库详情:  </span>
                                                                        协同办公知识库协同办公知识库协同办公知识库协同办公知识库协同办公知识库
                                                                    </div>
                                                                </div>
                                                            case "WorkItem":
                                                                return <div className="wiki-contant" onClick={()=>toWorkItem(itemWork.id)}>
                                                                    <div className="wiki-title">{itemWork.title}</div>
                                                                    <div >
                                                                        <span className="wiki-item-name">事项ID:</span>{itemWork.id}
                                                                    </div>
                                                                    <div>
                                                                        <span className="wiki-item-name">事项详情:  </span>
                                                                        协同办公知识库协同办公知识库协同办公知识库协同办公知识库协同办公知识库
                                                                    </div>
                                                                </div>
                                                        }
                                                    })()
                                                } 
                                                </div>
                                            </div>
                                    })
                                }
                                </TabPane>
                            })
                        }
                    </Tabs>
                    <Pagination defaultCurrent={1} {...searchCondition} onChange={changePage} />
                </div>
            </Col>
        </Row>
        
    )
}
export default inject("searchStore","wikiDetailStore")(observer(SearchResult));