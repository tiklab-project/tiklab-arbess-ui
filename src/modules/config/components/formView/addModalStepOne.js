import React from "react";
import {Col, Row} from "antd";

const AddModalStepOne = props =>{

    const {lis,type,setType,initType,setInitType,add} = props

    const handleClick = item =>{
        add(item.type)
        setInitType(item.type)
    }

    const renderLeftLis = item =>{
        return  <div
                    key={item.id}
                    className={`item ${item.id===type? "item-select":""}`}
                    onClick={()=>setType(item.id)}
                >
                    <div className="item-title">{item.title}</div>
                </div>
    }

    const renderLis = lis =>{
        return lis && lis.map(group=>{
            return  <div className="group" key={group.title}>
                <div className="group-title">
                    <span>{group.title}</span>
                </div>
                <div className="group-content">
                    {
                        group.desc.map(item=>{
                            return <div onClick={()=>handleClick(item)}
                                        className={`group-desc ${item.type===initType?"group-select":""}`}
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
        })
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
                <div className="modalRight">
                    {renderLis(lis)}
                </div>
            </Col>
        </Row>
    )
}

export default AddModalStepOne