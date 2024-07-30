import React from 'react';
import {Select} from "antd";
import {CaretDownOutlined} from "@ant-design/icons";
import './Search.scss';

const SearchSelect = (props) => {

    const {children,...res} = props;

    return (
        <div className='mf-search-select'>
            <Select
                {...res}
                bordered={false}
                suffixIcon={<CaretDownOutlined />}
                className={`${res.className}`}
            >
                {children}
            </Select>
        </div>
    )

}

export default SearchSelect
