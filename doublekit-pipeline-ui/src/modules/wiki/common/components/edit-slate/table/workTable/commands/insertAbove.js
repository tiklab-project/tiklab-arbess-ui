/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-02 16:50:10
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-26 15:29:47
 */
import { Col, splitedTable } from '../selection';
import { Editor, NodeEntry, Transforms } from 'slate';

import { createRow } from '../withTablesWork';


export const insertAbove = (table, editor,rowItem, path) => {
  const { selection } = editor;
  if (!selection) return;

  const newRow = createRow(rowItem);

  Transforms.insertNodes(editor, newRow, {
    at: path,
  });
};
