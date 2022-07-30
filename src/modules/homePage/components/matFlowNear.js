import React,{Fragment} from "react";
import {List} from "antd";

const MatFlowNear = props =>{

    const {matFlowNearList} = props

    const goMatFlow = item => {
        props.history.push(`/index/task/${item.matFlowName}/work`)
    }

    return(
        <div className="homePage-content-matFlowNear">
            <div className="matFlowNear-title">最近打开的流水线</div>
            <div className="matFlowNear-active">
                <List
                    size="small"
                    locale={{emptyText:
                            <Fragment>
                                <svg className="icon" aria-hidden="true" >
                                    <use xlinkHref="#icon-meiyouxiangguan"/>
                                </svg>
                                <div>没有数据</div>
                            </Fragment>
                    }}
                    dataSource={matFlowNearList}
                    renderItem={(item,index)=><List.Item>
                        <div key={item.matFlowId} className="matFlowNear-active-group">
                            <div className="matFlowNear-active-group-desc">
                                <span>{index+1}、</span>
                                <span onClick={()=>goMatFlow(item)} className="name">
                                    {item.matFlowName}
                                </span>
                            </div>
                        </div>
                    </List.Item>}
                />
            </div>
        </div>
    )
}

export default MatFlowNear