import React,{Fragment} from "react";
import {Table} from "antd";

const Tables = props =>{
    const {columns,dataSource,rowKey} = props
    return <Table
        // bordered
        rowKey={rowKey}
        columns={columns}
        dataSource={dataSource}
        pagination={{hideOnSinglePage:true,pageSize:10}}
        locale={{emptyText:
                <Fragment>
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-meiyouxiangguan"/>
                    </svg>
                    <div>没有数据</div>
                </Fragment>
        }}
    />
}

export default Tables