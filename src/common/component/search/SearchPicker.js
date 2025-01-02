import React from "react";
import {DatePicker} from "antd";
import "./Search.scss";

/**
 * 时间搜索
 * @param props
 * @returns {Element}
 * @constructor
 */
const SearchPicker = (props) => {


    return (
        <div className='arbess-search-picker'>
            <DatePicker.RangePicker
                {...props}
                bordered={false}
            />
        </div>
    )
}

export default SearchPicker
