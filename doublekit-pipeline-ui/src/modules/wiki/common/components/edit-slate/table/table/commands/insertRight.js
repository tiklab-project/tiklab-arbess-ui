/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-23 17:05:32
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-23 17:06:30
 */
import { Col, splitedTable } from '../selection';
import { Editor, NodeEntry, Path, Transforms } from 'slate';

import { createCell } from '../withTables';

export function insertRight(table, editor) {
  const { selection } = editor;
  if (!selection || !table) return;

  const xIndex = table[1].length + 1;

  const { gridTable, getCol } = splitedTable(editor, table);

  const [startCell] = Editor.nodes(editor, {
    match: (n) => n.childrenType === 'table-cell',
  });

  const [insertPositionCol] = getCol((c) => c.cell.key === startCell[0].key && c.isReal);

  const x = insertPositionCol.path[xIndex] + (insertPositionCol.cell.colspan || 1) - 1;

  const insertCols = new Map();
  let checkInsertable = true;

  gridTable.forEach((row) => {
    const col = row[x];

    const [originCol] = getCol((n) => n.cell.key === col.cell.key && n.isReal);

    const { cell, path } = originCol;

    if (!row[x + 1] || (col.isReal && (!col.cell.colspan || col.cell.colspan === 1))) {
      insertCols.set(cell.key, originCol);
    } else {
      if (path[xIndex] + (cell.colspan || 1) - 1 === x) {
        insertCols.set(cell.key, originCol);
      } else {
        checkInsertable = false;
        return;
      }
    }
  });

  if (!checkInsertable) {
    return;
  }

  insertCols.forEach((col) => {
    const newCell = createCell({
      rowspan: col.cell.rowspan || 1,
    });

    Transforms.insertNodes(editor, newCell, {
      at: Path.next(col.originPath),
    });
  });
}
