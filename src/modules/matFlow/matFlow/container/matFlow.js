import React,{useState} from "react";
import {Button,Input} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import "../components/matFlow.scss";
import MatFlowTable from "../components/matFlowTable";

const { Search } = Input

const MatFlow = props =>{

    const [type,setType] = useState(1)

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
                                            ${type===item.id ? "matFlow-tabs-type-active" : ""}`}
                                            onClick={()=>onclick(item)}
                                        >
                                    {item.title}
                                </div>
                            })
                        }
                    </div>
                </div>
                <MatFlowTable {...props} type={type}/>
            </div>
        </div>
    )
}

export default withRouter(MatFlow)