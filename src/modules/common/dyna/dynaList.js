import React from "react";
import {Profile} from "tiklab-eam-ui";
import {Space} from "antd";
import {LoadingOutlined,AimOutlined} from "@ant-design/icons";
import "./dynaList.scss";
import Guide from "../guide/guide";
import EmptyText from "../emptyText/emptyText";

const Dyna = props =>{

    const {dynamicList,moreDynamic,isDyna,dynaPageTotal,dynaPagination,guideTitle,pipelineId} = props

    const renderLis = (item,index) => {
        return <div className="dynamic-item" key={index}>
            <div className="dynamic-item-left">
                <Space>
                    <Profile userInfo={item.user}/>
                    <div className="dynamic-item-message">
                        <div
                            dangerouslySetInnerHTML={{__html: item.opLogTemplate.content}}
                        />
                    </div>
                </Space>
            </div>
            <div>{item.timestamp}</div>
        </div>
    }

    return (
        <div className={"dynamic"}>
            <Guide 
                title={guideTitle}
                icon={<AimOutlined/>}
                type={"dynamic"}
                pipelineId={pipelineId}
            />
            <div className="dynamic-center">
                {
                    dynamicList && dynamicList.map((item,index)=>{
                        return renderLis(item,index)
                    })
                }
            </div>
            {
                dynamicList && dynamicList.length === dynaPageTotal && dynaPagination > 1 &&
                <div className="dynamic-bottom"> 没有更多了 🤐</div>
            }
            {
                dynamicList && dynamicList.length === 0 && dynaPagination === 1 &&
                <div className="dynamic-bottom"> 
                    <EmptyText
                        title={"暂无最近动态"}
                    />
                </div>
            }
            {
                dynamicList && dynamicList.length < dynaPageTotal && isDyna===false &&
                <div
                    className="dynamic-bottom dynamic-bottom-more"
                    onClick={()=>moreDynamic()}
                >
                    更多动态...
                </div>
            }
            {
                isDyna &&
                <div className="dynamic-bottom dynamic-bottom-more">
                    <LoadingOutlined/>
                </div>
            }

        </div>
    )

}

export default Dyna