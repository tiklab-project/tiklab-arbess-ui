/**
 * @Description: 基础操作
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {Dropdown, Modal, Tooltip} from "antd";
import {EditOutlined} from "@ant-design/icons";
import pip_more from "../../../assets/images/svg/pie_more.svg";
import "./ListAction.scss";

const ListAction = props =>{

    const {edit,del,isMore = false} = props;

    return (
        <span className="arbess-listAction">
            {
                typeof edit === 'function' &&
                <Tooltip titsle="修改">
                    <span onClick={edit} className="arbess-listAction-edit">
                        <EditOutlined />
                    </span>
                </Tooltip>
            }
            {
                isMore &&
                <Dropdown
                    overlay={
                        <div className="arbess-dropdown-more">
                            {props.children}
                            {
                                typeof del === 'function' &&
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
                            }
                        </div>
                    }
                    trigger={['click']}
                    placement={"bottomRight"}
                >
                    <Tooltip title="更多">
                        <span className="arbess-listAction-more">
                            <img src={pip_more} width={18} alt={'更多'}/>
                        </span>
                    </Tooltip>
                </Dropdown>
            }
        </span>
    )
}

export default ListAction
