import React from "react";
import {Popconfirm,Tooltip} from "antd";
import {DeleteOutlined,EditOutlined} from "@ant-design/icons";
import "./listaction.scss";

const Listaction = props =>{

    const {edit,del} = props

    return <span className="mf-listAction">
                    <Tooltip title="修改">
                        <span onClick={edit} className="edit">
                            <EditOutlined />
                        </span>
                    </Tooltip>
                    <Tooltip title="删除">
                        <Popconfirm
                            style={{marginTop:100}}
                            title="你确定删除吗"
                            onConfirm={del}
                            okText="确定"
                            cancelText="取消"
                        >
                            <span className="del">
                                <DeleteOutlined />
                            </span>
                        </Popconfirm>
                    </Tooltip>
            </span>
}

export default Listaction