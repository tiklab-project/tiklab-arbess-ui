import React from 'react';
import {Select} from "antd";
import {CaretDownOutlined} from "@ant-design/icons";
import './Search.scss';

/**
 * 下拉搜索
 * @param props
 * @returns {Element}
 * @constructor
 */
const SearchSelect = (props) => {

    const {children,...res} = props;

    return (
        <div className='arbess-search-select'>
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
