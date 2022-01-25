/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-22 14:40:41
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-26 13:39:33
 */
import { Editor, Range, Transforms } from 'slate';

import { createTable } from '../withTables';

export const insertTable = (editor, row, col) => {
  const { selection } = editor;

  if (!selection) {
    return;
  }

  const node = Editor.above(editor, {
    match: (n) => n.childrenType === 'table',
  });

  const isCollapsed = Range.isCollapsed(selection);

  if (!node && isCollapsed) {
    const table = createTable(parseInt(col), parseInt(row));

    Transforms.insertNodes(editor, table);

    const nextNode = Editor.next(editor, { at: selection });
    if (nextNode) {
      Transforms.select(editor, nextNode[1]);
    }
  }
};
