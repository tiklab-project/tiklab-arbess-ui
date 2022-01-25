/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-22 14:40:41
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-29 10:33:32
 */
import React, { HtmlHTMLAttributes, memo } from 'react';
import { useSlate, useReadOnly, useSelected } from 'slate-react';
import { Button, Tooltip } from 'antd';
import { Editor, NodeEntry } from 'slate';
import { inject, observer } from "mobx-react";
import {
  InsertRowAboveOutlined, InsertRowBelowOutlined,
  DeleteColumnOutlined,DeleteOutlined
} from '@ant-design/icons';
import {
  insertBelow
} from './commands/insertBelow';
import {
  removeRow
} from './commands/removeRow';
import {
  insertAbove
} from './commands/insertAbove';
import { removeTable } from "./commands/removeTable"
const WorkTableTools = (props) => {
  // useEditor区别于useSlate, 此处不随editor的值改变而刷新工具栏
  const {setWorkModalVisible,setOperationType} = props
  // const { workModalVisible, setWorkModalVisible } = slatestore;
  const editor = useSlate();
  const readOnly = useReadOnly();
  const selected = useSelected();
  const [table] = Editor.nodes(editor, {
    match: (n) => n.childrenType === 'table-work',
  });

  const run = (action) => (type) => {
    action(table, editor,type)
  };
  console.log('tabletools');

  const insert = (table, editor,data) => {
    setOperationType(data)
    setWorkModalVisible(true)
  }
  const toolConfigs = [
    {
      title: '向上插入行',
      icon: <InsertRowAboveOutlined />,
      type: "insertAbove",
      onMouseDown: insert,
    },
    {
      title: '向下插入行',
      icon: <InsertRowBelowOutlined />,
      type: "insertBelow",
      onMouseDown: insert,
    },
    {
      title: '删除整行',
      icon: <DeleteColumnOutlined />,
      type: "removeRow",
      onMouseDown: removeRow,
    },
    {
      title: '删除列表',
      icon: <DeleteOutlined />,
      onMouseDown: removeTable,
    },
  ];

  const Tools = toolConfigs.map((i) => (
    <Tooltip key={i.title} title={i.title}>
      <Button
        onMouseDown={(e) => {
          e.preventDefault();
          run(i.onMouseDown)(i.type);
        }}
      >
        {i.icon}
      </Button>
    </Tooltip>
  ));

  return (
    /** 此处需要添加contentEditable为false，否则slate无法转换不可编辑div为node报错*/

    <div
      className={`table-tool ${selected ? "selected" : null} `}
      contentEditable={false}
      style={readOnly ? { display: 'none' } : undefined}
    >
      <Button.Group>{Tools}</Button.Group>
    </div>
  );
};

// export default inject('slatestore')(observer(memo(WorkTableTools)))
export default memo(WorkTableTools)
