import React from "react";
import {Dropdown, Modal, Tooltip} from "antd";
import {EditOutlined} from "@ant-design/icons";
import pip_more from "../../../assets/images/svg/pie_more.svg";

/**
 * 表格操作
 * @param edit：编辑
 * @param del：删除
 * @returns {JSX.Element}
 * @constructor
 */
const ListAction = ({edit,del}) =>{

    return (
        <span className="arbess-listAction">
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
                        <div className="arbess-dropdown-more">
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
                            <img src={pip_more} width={18} alt={'更多'}/>
                       </span>
                    </Tooltip>
                </Dropdown>
            }
        </span>
    )
}

export default ListAction
