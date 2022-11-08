import React from "react";
import {Empty,Spin} from "antd";
import {CaretRightOutlined,LoadingOutlined} from "@ant-design/icons";
import Btn from "../../../../common/btn/btn";

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
                    <div className="empty-group">
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            description="当前流水线尚未运行"
                        >
                            {
                                runImState ?
                                    <Spin indicator={<LoadingOutlined style={{ fontSize: 25 }} spin />} />
                                    :
                                    <Btn
                                        icon={<CaretRightOutlined />}
                                        title={"立即运行"}
                                        type={"primary"}
                                        onClick={()=>runImmediately()}
                                    />

                            }
                        </Empty>
                    </div>

            }
        </div>
    )
}

export default StructureEmpty