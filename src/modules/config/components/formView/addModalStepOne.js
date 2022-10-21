import React from "react";
import {Col, Row} from "antd";
import CodeOrNewStageModalLeft from "./codeOrNewStageModalLeft";

const AddModalStepOne = props =>{

    const {lis,type,setType,initType,setInitType,add} = props

    const handleClick = item =>{
        add(item.type)
        setInitType(item.type)
    }

    const renderLis = lis =>{
        return lis && lis.map(group=>{
            return  <div className="group" key={group.title}>
                <div className="group-title">
                    <span>{group.title}</span>
                </div>
                <div className="group-content">
                    {
                        group.desc.map((item,index)=>{
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
                <CodeOrNewStageModalLeft
                    lis={lis}
                    type={type}
                    setType={setType}
                />
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