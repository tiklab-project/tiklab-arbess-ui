import React,{useState} from "react";
import {Select, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import EmptyText from "../../../../common/emptyText/EmptyText";

/**
 * 下拉框
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const FormsSelect = props => {

    const {border,label,isSpin,children,...res} = props

    // 是否显示下拉图标
    const [showArrow,setShoeArrow] = useState(false)

    const notFoundContent = isSpin ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : <EmptyText/>

    return (
        <Select
            showSearch={border}
            placeholder={border ? label:"未选择"}
            className={border?'':'input-hover'}
            showArrow={showArrow}
            onMouseEnter={()=>setShoeArrow(true)}
            onMouseLeave={()=>setShoeArrow(false)}
            notFoundContent={notFoundContent}
            filterOption = {(input, option) =>
                (Array.isArray(option.children) ? option.children.join('') : option.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            {...res}
        >
            {children}
        </Select>
    )
}

export default FormsSelect
