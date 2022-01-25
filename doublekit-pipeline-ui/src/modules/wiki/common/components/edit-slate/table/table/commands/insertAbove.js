/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-02 16:50:10
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-22 17:53:35
 */
import { Col, splitedTable } from '../selection';
import { Editor, NodeEntry, Transforms } from 'slate';

import { createRow } from '../withTables';

export const insertAbove = (table, editor) => {
  console.log(table)
  const { selection } = editor;
  if (!selection || !table) return;

  // 表格的深度
  const yIndex = table[1].length;

  const { gridTable, getCol } = splitedTable(editor, table);

  const [startCell] = Editor.nodes(editor, {
    match: (n) => n.childrenType === 'table-cell',
  });

  const [insertPositionCol] = getCol((c) => c.cell.key === startCell[0].key && c.isReal);

  let checkInsertEnable = true;
  const insertYIndex = insertPositionCol.path[yIndex];
  const insertCols = new Map();

  gridTable[insertYIndex].forEach((col) => {
    if (!col.isReal) {
      const [originCol] = getCol((c) => c.isReal && c.cell.key === col.cell.key);

      if (originCol.path[yIndex] === insertYIndex) {
        insertCols.set(originCol.cell.key, originCol);
      } else {
        checkInsertEnable = false;
        return;
      }
    } else {
      insertCols.set(col.cell.key, col);
    }
  });

  if (!checkInsertEnable) {
    return;
  }

  const newRow = createRow(insertCols.size);

  [...insertCols.values()].forEach((col, index) => {
    newRow.children[index].colspan = col.cell.colspan || 1;
  });

  const [[, path]] = Editor.nodes(editor, {
    match: (n) => n.childrenType === 'table-row',
  });

  Transforms.insertNodes(editor, newRow, {
    at: path,
  });
};
