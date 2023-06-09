import React from "react";
import {Popconfirm,Tooltip} from "antd";
import {DeleteOutlined,EditOutlined} from "@ant-design/icons";

/**
 * 表格操作
 * @param edit：编辑
 * @param del：删除
 * @returns {JSX.Element}
 * @constructor
 */
const Listaction = ({edit,del}) =>{

    if(del) return <span className="mf-listAction">
                <Tooltip title="修改">
                    <span onClick={edit} className="edit" style={{cursor:"pointer",marginRight:15}}>
                        <EditOutlined />
                    </span>
                </Tooltip>
                <Tooltip title="删除">
                    <Popconfirm
                        placement="topRight"
                        title="你确定删除吗"
                        onConfirm={del}
                        okText="确定"
                        cancelText="取消"
                    >
                        <span className="del" style={{cursor:"pointer"}}>
                            <DeleteOutlined />
                        </span>
                    </Popconfirm>
                </Tooltip>
            </span>

    return <span className="mf-listAction">
                <Tooltip title="修改">
                    <span onClick={edit} className="edit" style={{cursor:"pointer",marginRight:15}}>
                        <EditOutlined />
                    </span>
                </Tooltip>
            </span>
}

export default Listaction
