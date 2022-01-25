/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-22 14:40:41
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-28 13:27:00
 */
import { Editor, Range, Transforms } from 'slate';

import { createTable } from '../withTablesWork';


export const insertTable = (editor, rowData, colData) => {
  const { selection } = editor;
  if (!selection) {
    return;
  }

  const node = Editor.above(editor, {
    match: (n) => n.childrenType === 'table',
  });

  const isCollapsed = Range.isCollapsed(selection);

  if (!node && isCollapsed) {
    const table = [createTable(rowData, colData)];

    Transforms.insertNodes(editor, table);

    const nextNode = Editor.next(editor, { at: selection });
    if (nextNode) {
      Transforms.select(editor, nextNode[1]);
    }
  }
};
