import React from "react";
import {Button} from "antd";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import empty from "../../../../assets/images/empty.jpg";

const StructureEmpty = props =>{
    const {runImmediately} = props
    return(
        <div className="structure-content-empty">
            { runImmediately ? <BreadcrumbContent type={"project"}/> : null }
            <div className="empty null">
                <img src={empty} alt="logo" />
                {
                    runImmediately ?
                        <div className="empty-group">
                            <div className="empty-group_title">当前流水线尚未运行</div>
                            <div className="empty-group_extra">
                                <Button type="primary" onClick={()=>runImmediately()}>
                                    立即运行
                                </Button>
                            </div>
                        </div>
                        :
                        <div className="empty-group">
                            <div className="empty-group_title">
                                没有查询到数据
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default StructureEmpty