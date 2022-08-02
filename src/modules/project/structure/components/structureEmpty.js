import React from "react";
import {Button,Empty} from "antd";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";

const StructureEmpty = props =>{
    const {runImmediately} = props
    return(
        <div className="structure-content-empty">
            {
                runImmediately ?
                    <>
                        <BreadcrumbContent type={"project"}/>
                        <div className="empty-group">
                            <Empty
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                description="当前流水线尚未运行"
                            >
                                <Button type="primary" onClick={()=>runImmediately()}>立即运行</Button>
                            </Empty>
                        </div>
                    </>
                    :
                    <div className="empty-group">
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            description="没有查询到数据"
                        />
                    </div>
            }
        </div>
    )
}

export default StructureEmpty