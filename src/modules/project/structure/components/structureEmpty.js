import React from "react";
import {Button,Empty,Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const StructureEmpty = props =>{
    const {runImmediately,runImState,isData} = props
    return(
        <div className="structure-content-empty">
            {
                isData ?
                    <div className="empty-group">
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            description="没有查询到数据"
                        />
                    </div>
                    :
                    <div className="home-limited">
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
                    </div>

            }
        </div>
    )
}

export default StructureEmpty