/**
 * @Description: 暂无数据
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import {Empty} from "antd";

const ListEmpty = props =>{

    const {title} = props

    return (
        <Empty
            className='arbess-list-empty'
            description={title ? title : "没有查询到数据"}
        />
    )

}

export default ListEmpty
