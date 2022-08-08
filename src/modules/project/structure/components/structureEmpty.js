import React from "react";
import {Button, Empty, Spin} from "antd";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import {LoadingOutlined} from "@ant-design/icons";

const StructureEmpty = props =>{
    const {runImmediately,runImState} = props
    return(
        <div className="structure-content-empty">
            {
                runImmediately ?
                    <>
                        <BreadcrumbContent firstItem={"流水线"} secondItem={"历史"}/>
                        <div className="empty-group">
                            <Empty
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                description="当前流水线尚未运行"
                            >
                                {
                                    runImState ?
                                        <Spin indicator={<LoadingOutlined style={{ fontSize: 25 }} spin />} />
                                        :
                                        <Button type="primary" onClick={()=>runImmediately()}>立即运行</Button>
                                }
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