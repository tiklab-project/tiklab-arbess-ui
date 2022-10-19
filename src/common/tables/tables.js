import React from "react";
import {Table} from "antd";
import EmptyText from "../emptyText/emptyText";

const Tables = props =>{
    const {columns,dataSource,rowKey} = props
    return <Table
        // bordered
        rowKey={rowKey}
        columns={columns}
        dataSource={dataSource}
        pagination={{hideOnSinglePage:true,pageSize:10}}
        locale={{emptyText: <EmptyText/>}}
    />
}

export default Tables