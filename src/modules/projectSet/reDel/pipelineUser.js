import React,{useState,useEffect} from "react";
import {Transfer,Table} from "antd";
import difference from "lodash/difference";
import EmptyText from "../../common/emptyText/emptyText";

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer
        {...restProps}
        showSelectAll={false}
    >
        {({
              direction,
              filteredItems,
              onItemSelectAll,
              onItemSelect,
              selectedKeys: listSelectedKeys,
              disabled: listDisabled,
          }) => {
            const columns = direction === "left" ? leftColumns : rightColumns;

            const rowSelection = {
                getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows
                        .filter(item => !item.disabled)
                        .map(({ key }) => key);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                    onItemSelectAll(diffKeys, selected);
                },
                onSelect({ key }, selected) {
                    onItemSelect(key, selected);
                },
                selectedRowKeys: listSelectedKeys,
            };

            return (
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredItems}
                    size="small"
                    style={{ pointerEvents: listDisabled ? "none" : null }}
                    onRow={({ key, disabled: itemDisabled }) => ({
                        onClick: () => {
                            if (itemDisabled || listDisabled) return;
                            onItemSelect(key, !listSelectedKeys.includes(key));
                        },
                    })}
                    locale={{emptyText: <EmptyText/>}}
                    pagination={false}
                />
            );
        }}
    </Transfer>
);

const PipelineUser = props =>{

    const {userList,targetKeys,setTargetKeys} = props

    const leftTableColumns = [
        {
            key:"name",
            dataIndex: "name",
            title: "名称",
        },
        {
            key:"nickname",
            dataIndex: "nickname",
            title: "昵称",
        },
    ]

    const onChange = nextTargetKeys => {
        setTargetKeys(nextTargetKeys)
    }

    return  <div className="pipelineinfo-user">
        <TableTransfer
            titles={["全部", "已选"]}
            rowKey={(record) => record.id}
            dataSource={userList}  // 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外
            targetKeys={targetKeys}     // 显示在右侧框数据的 key 集合
            showSearch
            onChange={onChange}
            filterOption={(inputValue, item) =>
                item.name.indexOf(inputValue) !== -1 || item.nickname.indexOf(inputValue) !== -1
            }       // 接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false
            leftColumns={leftTableColumns}
            rightColumns={leftTableColumns}
            locale={
                { itemUnit: "项", itemsUnit: "项", searchPlaceholder: "名称，昵称" }
            }
        />
    </div>
}

export default PipelineUser
