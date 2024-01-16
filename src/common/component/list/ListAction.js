import React from "react";
import {Dropdown, Modal, Tooltip} from "antd";
import {EditOutlined,EllipsisOutlined} from "@ant-design/icons";

/**
 * 表格操作
 * @param edit：编辑
 * @param del：删除
 * @returns {JSX.Element}
 * @constructor
 */
const ListAction = ({edit,del}) =>{

    return (
        <span className="mf-listAction">
            {
                edit &&
                <Tooltip title="修改">
                    <span onClick={edit} className="edit" style={{cursor:"pointer",marginRight:15}}>
                        <EditOutlined style={{fontSize:16}}/>
                    </span>
                </Tooltip>
            }
            {
                del &&
                <Dropdown
                    overlay={
                        <div className="mf-dropdown-more">
                            <div className="dropdown-more-item" onClick={()=>{
                                Modal.confirm({
                                    title: '确定删除吗？',
                                    content: <span style={{color:"#f81111"}}>删除后无法恢复！</span>,
                                    okText: '确认',
                                    cancelText: '取消',
                                    onOk() {
                                        del()
                                    },
                                    onCancel() {
                                    },
                                })
                            }}>删除</div>
                        </div>
                    }
                    trigger={['click']}
                    placement={"bottomRight"}
                >
                    <Tooltip title="更多">
                        <span className="del" style={{cursor:"pointer"}}>
                            <EllipsisOutlined style={{fontSize:17}}/>
                       </span>
                    </Tooltip>
                </Dropdown>
            }
        </span>
    )
}

export default ListAction
