import { Col, splitedTable } from '../selection';
import { Editor, NodeEntry, Transforms } from 'slate';

import { createCell } from '../withTables';

export function insertLeft(table, editor) {
  const { selection } = editor;
  if (!selection || !table) return;

  const xIndex = table[1].length + 1;

  const { gridTable, getCol } = splitedTable(editor, table);

  const [startCell] = Editor.nodes(editor, {
    match: (n) => n.childrenType === 'table-cell',
  });

  const [insertPositionCol] = getCol((c) => c.cell.key === startCell[0].key && c.isReal);

  const x = insertPositionCol.path[xIndex];

  const insertCols = new Map();
  let checkInsertable = true;

  gridTable.forEach((row) => {
    const col = row[x];

    if (col.isReal) {
      insertCols.set(col.cell.key, col);
    } else {
      const [originCol] = getCol((n) => n.cell.key === col.cell.key && n.isReal);
      const { cell, path } = originCol;

      if (path[xIndex] === x) {
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
      at: col.originPath,
    });
  });
}
