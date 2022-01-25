/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-23 17:31:24
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-26 09:09:33
 */
import { Col, splitedTable } from '../selection';
import { Editor, NodeEntry, Transforms } from 'slate';

import { createCell } from '../withTables';

export function splitCell(table, editor) {
  const { selection } = editor;
  if (!selection || !table) return;

  const yIndex = table[1].length;
  const xIndex = table[1].length + 1;

  const { getCol } = splitedTable(editor, table);

  const [start, end] = Editor.edges(editor, selection);
  const [startNode] = Editor.nodes(editor, {
    match: (n) => n.childrenType === 'table-cell',
    at: start,
  });

  const [endNode] = Editor.nodes(editor, {
    match: (n) => n.childrenType === 'table-cell',
    at: end,
  });

  if (!startNode || !endNode) return;

  const [startCell] = getCol((n) => n.cell.key === startNode[0].key);
  const [endCell] = getCol((n) => n.cell.key === endNode[0].key);

  const [yStart, yEnd] = [startCell.path[yIndex], endCell.path[yIndex]];
  const [xStart, xEnd] = [startCell.path[xIndex], endCell.path[xIndex]];

  const sourceCells = [];
  const selectedCols = getCol((n) => {
    if (n.cell.selectedCell) {
      return true;
    }

    const [y, x] = n.path.slice(yIndex, xIndex + 1);
    if (y >= yStart && y <= yEnd && x >= xStart && x <= xEnd) {
      if (!n.isReal) {
        const [sourceCell] = getCol(
          (s) => s.isReal && s.cell.key === n.cell.key
        );
        sourceCells.push(sourceCell);
      }
      return true;
    }

    return false;
  });

  selectedCols.push(...sourceCells);

  const filterColsObject = selectedCols.reduce(
    (p, c) => {
      if (c.isReal) {
        p[c.cell.key] = c;
      }
      return p;
    },
    {}
  );

  Object.values(filterColsObject).forEach((col) => {
    const { cell, isReal, originPath } = col;
    const { rowspan = 1, colspan = 1, children } = cell;

    if (isReal && (rowspan !== 1 || colspan !== 1)) {
      Transforms.delete(editor, {
        at: originPath,
      });

      for (let i = 0; i < rowspan; i++) {
        for (let j = 0; j < colspan; j++) {
          const newPath = Array.from(originPath);
          newPath[yIndex] += i;

          const newCell = createCell({
            width: 0,
            height: 0,
            elements:
              i === 0 && j === colspan - 1
                ? Array.isArray(children[0].children)
                  ? children[0].children
                  : undefined
                : undefined,
          });

          Transforms.insertNodes(editor, newCell, {
            at: newPath,
          });
        }
      }
    }
  });
}
