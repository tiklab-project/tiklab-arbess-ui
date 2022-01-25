/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-26 13:52:22
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-30 15:59:57
 */
import { Editor, NodeEntry, Path, Transforms } from 'slate';
import { createRow } from '../withTablesWork';

export const insertBelow = (table, editor,rowItem, path) => {
  const { selection } = editor;
  if (!selection) return;

  const newRow = createRow(rowItem);
  path[path.length-1] = path[path.length-1] +1
  Transforms.insertNodes(editor, newRow, {
    at: path,
  });
};
