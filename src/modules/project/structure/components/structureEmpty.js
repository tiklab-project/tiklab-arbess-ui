import React from "react";
import ProjectBreadcrumb from "../../breadcrumb/projectBreadcrumb";
import empty from "../../../../assets/images/empty.jpg";
import {Button} from "antd";

const StructureEmpty = props =>{
    const {runImmediately} = props
    return(
        <div className="structure-content-empty">
            { runImmediately ? <ProjectBreadcrumb /> : null }
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