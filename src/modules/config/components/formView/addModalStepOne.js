import React from "react";
import {Col,Row} from "antd";

const AddModalStepOne = props =>{

    const {lis,type,setType,initType,setInitType} = props

    const handleClick = item =>{
        setInitType(item.type)
    }

    // 锚点
    const changeAnchor = anchorName =>{
        const scrollTop=document.getElementById("modalRight-list")
        if (anchorName) {
            const anchorElement = document.getElementById(anchorName)
            if (anchorElement) {
                scrollTop.scrollTop = anchorElement.offsetTop
                setType(anchorName)
            }
        }
    }

    // 滚动
    const onScroll = () =>{
        const scrollTop=document.getElementById("modalRight-list").scrollTop
        const rightIndex = lis.map((item,index)=>index+1)
        for(let x = 1;x <= rightIndex.length;x++){
            const iId = document.getElementById(x) //当前id
            const lastId = document.getElementById(x).previousSibling //上一个id
            const iTop =iId &&  iId.offsetTop
            const lastTop =lastId && lastId.offsetTop
            if(scrollTop > lastTop && scrollTop < iTop ){
                setType(x)
            }
        }
    }

    const renderLeftLis = item =>{
        return  <div
                    key={item.id}
                    className={`item ${type===item.id? "item-select":null}`}
                    onClick={()=>changeAnchor(item.id)}
                >
                    <div className="item-title">{item.title}</div>
                </div>
    }

    const renderRightLis = group =>{
        return  <div className="group"
                     key={group.title}
                     id={group.id}
                >
            <div className="group-title">
                <span>{group.title}</span>
            </div>
            <div className="group-content">
                {
                    group.desc && group.desc.map(item=>{
                        return <div onClick={()=>handleClick(item)}
                                    className={`group-desc ${item.type===initType?"group-select":null}`}
                                    key={item.type}
                                >
                                    <div className="group-desc-tpl">
                                        <div className="group-tpl">
                                            <span>
                                                <svg className="icon" aria-hidden="true">
                                                    <use xlinkHref={`#icon-${item.icon}`}/>
                                                </svg>
                                            </span>
                                            <span>
                                               {item.tel}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                    })
                }
            </div>
        </div>
    }

    return(
        <Row className="codeOrNewStage-stepOne">
            <Col span={4} className="codeOrNewStage-stepOne-left">
                <div className="modalLeft">
                    {
                        lis && lis.map(item=>{
                            return renderLeftLis(item)}
                        )}
                </div>
            </Col>
            <Col span={20} className="codeOrNewStage-stepOne-right">
                <div
                    className="modalRight"
                    id="modalRight-list"
                    onScroll={onScroll}
                >
                    {
                        lis && lis.map(group=>{
                            return renderRightLis(group)
                        })
                    }
                </div>
            </Col>
        </Row>
    )
}

export default AddModalStepOne