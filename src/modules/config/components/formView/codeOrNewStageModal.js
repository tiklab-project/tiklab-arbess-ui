import React from "react";
import {Modal} from "antd";
import ModalTitle from "../../../../common/modalTitle/modalTitle";
import "./codeOrNewStageModal.scss";

const CodeOrNewStageModal = props =>{

    const {lis,handleClick,setVisible,visible} = props

    const renderLis = lis =>{
        return lis && lis.map(group=>{
            return  <div className="group" key={group.id}>
                        <div className="group-title">
                            {/*<span>*/}
                            {/*    <svg className="icon" aria-hidden="true">*/}
                            {/*        <use xlinkHref={`#icon-${group.icon}`}/>*/}
                            {/*    </svg>*/}
                            {/*</span>*/}
                            <span>{group.title}</span>
                        </div>
                        <div className="group-content">
                            {
                                group.desc.map((item,index)=>{
                                    return <div onClick={()=>handleClick(group,item,index)}
                                                className="group-desc"
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
        <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            footer={[]}
            closable={false}
        >
            <ModalTitle
                setVisible={setVisible}
                title={"选择任务组"}
            />
            <div className="codeOrNewStage">
                {renderLis(lis)}
            </div>
        </Modal>
    )
}

export default CodeOrNewStageModal