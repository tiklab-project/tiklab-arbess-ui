/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-03 10:37:35
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-03 10:55:33
 */
import React,{useState} from 'react';
import "../../../../assets/font-icon/iconfont.css";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Modal, Button, Form, Input } from 'antd';

const ChangeWikiModal = (props) => {
    const {searchwiki,wikilist,changeWikiVisible,setChangeWikiVisible} = props;
    // 切换知识库窗口弹窗，鼠标移入与移出效果
    const [selectWiki,setSelectWiki] = useState(false)
    /**
     * 隐藏切换知识库弹窗
     */
    const handleCancel = () => {
        setChangeWikiVisible(false)
    };

    /**
     * 切换知识库
     * @param {id} id 
     */
    const selectWikiId = (id) => {
        // 切换选中知识库，获取知识库详情
        searchwiki(id);
        // 讲当前知识库id存入localStorage
        localStorage.setItem("wikiId", id);
        // 重置事项id
        // 关闭切换弹窗
        setChangeWikiVisible(false)
        // 切换路由
        // props.history.push(selectKey)
        // 强制刷新
        location.reload();
    }

    /**
     * 切换知识库弹窗，鼠标移入
     * @param {*} id 
     */
    const handleMouseOver = (id) => {
        setSelectWiki(id)
    }

    /**
     * 切换知识库弹窗，鼠标移出
     */
    const handleMouseOut = () => {
        setSelectWiki("")
    }
    return (
        <div >
            <Modal
                className="wiki-modal"
                title="选择知识库"
                visible={changeWikiVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>取消</Button>]}
            >
                {
                    wikilist && wikilist.map((item) => {
                        return <div className={`wiki-name ${item.id === selectWiki ? "wiki-selectName" : ""}`}
                            onClick={() => selectWikiId(item.id)}
                            key={item.id}
                            onMouseOver={() => handleMouseOver(item.id)}
                            onMouseOut={handleMouseOut}
                        >{item.name}</div>
                    })
                }
            </Modal>
        </div>
    )
}
export default inject("wikiDetailStore")(observer(ChangeWikiModal));