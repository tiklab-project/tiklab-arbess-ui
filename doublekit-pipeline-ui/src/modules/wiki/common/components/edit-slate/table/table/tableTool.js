/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-22 14:40:41
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-30 10:37:44
 */
import React, { HtmlHTMLAttributes, memo } from 'react';
import { useSlate, useReadOnly, useSelected } from 'slate-react';
import { Button, Tooltip } from 'antd';
import { Editor, NodeEntry } from 'slate';
// import {
//   InsertColLeftIcon,
//   InsertColRightIcon,
//   InsertRowAboveIcon,
//   InsertRowBelowIcon,
//   RemoveColIcon,
//   RemoveRowIcon,
//   RemoveTableIcon,
// } from '../../../../../../../assets/icons/TableIcon';
import {
  InsertRowAboveOutlined, InsertRowBelowOutlined, InsertRowLeftOutlined,
  InsertRowRightOutlined, DeleteColumnOutlined, DeleteRowOutlined,DeleteOutlined
} from '@ant-design/icons';
import {
  insertBelow
} from './commands/insertBelow';
import {
  removeRow
} from './commands/removeRow';
import {
  removeCol
} from './commands/removeCol';
import {
  insertAbove
} from './commands/insertAbove';
import {
  insertLeft
} from './commands/insertLeft';
import {
  insertRight
} from './commands/insertRight';
import { removeTable } from "./commands/removeTable"
const TableTools = (props) => {
  // useEditor区别于useSlate, 此处不随editor的值改变而刷新工具栏
  const editor = useSlate();
  const readOnly = useReadOnly();
  const selected = useSelected();
  const [table] = Editor.nodes(editor, {
    match: (n) => n.childrenType === 'table',
  });

  const run = (action) => () => {
    action(table, editor)
  };
  console.log('tabletools');

  const toolConfigs = [
    {
      title: '向上插入行',
      icon: <InsertRowAboveOutlined />,
      onMouseDown: insertAbove,
    },
    {
      title: '向下插入行',
      icon: <InsertRowBelowOutlined />,
      onMouseDown: insertBelow,
    },
    {
      title: '向左插入列',
      icon: <InsertRowLeftOutlined />,
      onMouseDown: insertLeft,
    },
    {
      title: '向右插入列',
      icon: <InsertRowRightOutlined />,
      onMouseDown: insertRight,
    },
    {
      title: '删除整行',
      icon: <DeleteColumnOutlined />,
      onMouseDown: removeRow,
    },
    {
      title: '删除整列',
      icon: <DeleteRowOutlined />,
      onMouseDown: removeCol,
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
          run(i.onMouseDown)();
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

export default memo(TableTools);
