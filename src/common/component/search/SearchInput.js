import React from "react";
import {SearchOutlined} from "@ant-design/icons";
import {Input} from "antd";
import './Search.scss';

/**
 * 文本搜索框
 * @param props
 * @returns {Element}
 * @constructor
 */
const SearchInput = props =>{

    const {...res} = props;

    return (
        <Input
            {...res}
            allowClear
            bordered={false}
            autoComplete={"off"}
            prefix={<SearchOutlined style={{fontSize: 16}}/>}
            className='arbess-search-input'
            onChange={e=>{
                if(e.type==='click'){
                    res.onPressEnter(e);
                }
            }}
        />
    )
}

export default SearchInput
