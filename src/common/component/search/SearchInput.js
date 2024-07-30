import React from "react";
import {SearchOutlined} from "@ant-design/icons";
import {Input} from "antd";
import './Search.scss';


const SearchInput = props =>{

    const {...res} = props;

    return (
        <Input
            {...res}
            allowClear
            bordered={true}
            autoComplete={"off"}
            prefix={<SearchOutlined style={{fontSize: 16}}/>}
            className='mf-search-input'
            onChange={e=>{
                if(e.type==='click'){
                    res.onPressEnter(e);
                }
            }}
        />
    )
}

export default SearchInput
