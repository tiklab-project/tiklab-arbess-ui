import React, {useEffect, useState} from "react";
import {getUser} from "tiklab-core-ui";
import {Button,Input} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import "../components/matFlow.scss";
import MatFlowTable from "../components/matFlowTable";
import MatFlowAddModal from "../components/matFlowAddModal";
import {inject,observer} from "mobx-react";

const { Search } = Input

const MatFlow = props =>{

    const {matFlowStore} = props

    const {matFlowList,followList,fresh,findAllMatFlowStatus,findAllFollow,createMatFlow} = matFlowStore

    const [type,setType] = useState(1)
    const [addMatFlowVisible,setAddMatFlowVisible] = useState(false)
    const userId = getUser().userId

    const onSearch = value =>{
        props.history.push(`/index/searchresult/${value}`)
    }

    useEffect(()=>{
        if(type===1){
            // 所有流水线
            findAllMatFlowStatus(userId)
        }else {
            findAllFollow(userId)
        }
    },[fresh,type])

    const lis = [
        {
            id:1,
            title:"所有",
            list:matFlowList,
        },
        {
            id:2,
            title:"收藏",
            list: followList,
        }
    ]

    const onclick = item => {
        setType(item.id)
    }

    return(
        <div className="matflow home-limited">
            <div className="matFlow-top matflow-flex">
                <div className="matflow-top-title">流水线</div>
                <div className="matflow-top-r">
                    <Button type="primary" onClick={()=>setAddMatFlowVisible(true)}>
                        <PlusOutlined/> 新建流水线
                    </Button>
                </div>
            </div>
            <div className="matflow-type matflow-flex">
                <div className="matflow-type-group ">
                    {
                        lis.map(item=>{
                            return <div key={item.id}
                                        className={`matFlow-type-link ${type===item.id ? "matflow-type-active" : ""}`}
                                        onClick={()=>onclick(item)}
                                    >
                                        <span>{item.title}</span>
                                        {/*<span className="matflow-length">*/}
                                        {/*     {*/}
                                        {/*         item.list && item.list.length > 0 ? item.list.length :0*/}
                                        {/*     }*/}
                                        {/*</span>*/}
                                    </div>
                        })
                    }
                </div>
                <div className="matflow-type-input">
                    <Search placeholder="请输入流水线"  onSearch={onSearch} style={{ width: 280 }} />
                </div>
            </div>
            <MatFlowTable
                {...props}
                type={type}
                matFlowStore={matFlowStore}
            />

            <MatFlowAddModal
                {...props}
                userId={userId}
                createMatFlow={createMatFlow}
                matFlowList={matFlowList}
                addMatFlowVisible={addMatFlowVisible}
                setAddMatFlowVisible={setAddMatFlowVisible}
            />
        </div>
    )
}

export default withRouter(inject("matFlowStore")(observer(MatFlow)))