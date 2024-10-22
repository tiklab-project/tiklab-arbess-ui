import React from "react";
import {DatePicker} from "antd";
import "./Search.scss";

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
