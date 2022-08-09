import React,{useState,useEffect} from "react";
import {Button,Input} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import "../components/matFlow.scss";
import {getUser} from "tiklab-core-ui";
import MatFlowTable from "../components/matFlowTable";

const { Search } = Input

const MatFlow = props =>{

    const {matFlowStore}=props

    const {findAllMatFlowStatus,matFlowList,findAllFollow,followList}=matFlowStore

    const [fresh,setFresh] = useState(false)
    const [type,setType] = useState(1)
    const userId = getUser().userId

    useEffect(()=>{
        if(type===1){
            findAllMatFlowStatus(userId)
        }else{
            findAllFollow(userId)
        }
    },[fresh,type])

    const onSearch = value =>{
        props.history.push(`/index/searchresult/${value}`)
    }

    const lis = [
        {id:1, title:"所有"},
        {id:2, title:"收藏"}
    ]

    const onclick = item => {
        setType(item.id)
    }

    return(
        <div className="matFlow">
            <div className="matFlow-top">
                <div className="matFlow-top-r">
                    <Search placeholder="请输入流水线"  onSearch={onSearch} style={{ width: 240,marginRight:10 }} />
                    <Button type="primary" onClick={()=>props.history.push("/index/new")}>
                        <PlusOutlined/> 新建流水线
                    </Button>
                </div>
            </div>
            <div className="matFlow-tabs">
                <div className="matFlow-tabs-type">
                    <div className="matFlow-tabs-type-group">
                        {
                            lis.map(item=>{
                                return <div key={item.id}
                                            className={`matFlow-tabs-type-link 
                                        ${type===item.id ? "matFlow-tabs-type-active" : null}`}
                                            onClick={()=>onclick(item)}
                                >
                                    {item.title}
                                </div>
                            })
                        }
                    </div>
                </div>
                <MatFlowTable
                    list={type === 1 ? matFlowList : followList}
                    fresh={fresh}
                    setFresh={setFresh}
                />
            </div>
        </div>
    )
}

export default withRouter(inject("matFlowStore")(observer(MatFlow)))