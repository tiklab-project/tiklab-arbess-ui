import { Editor, NodeEntry, Path, Transforms } from 'slate';

export const splitedTable = (editor, table, startKey) => {
  const tableDepth = table[1].length;

  const cells = [];

  const nodes = Editor.nodes(editor, {
    at: table[1],
    match: (n) => n.childrenType === 'table-cell',
  });

  for (const node of nodes) {
    const [cell, path] = node;
    cells.push({
      cell,
      path,
      realPath: [...path],
    });
  }

  const gridTable = [];
  let insertPosition = null;

  for (let i = 0; i < cells.length; i++) {
    const { cell, path, realPath } = cells[i];
    const { rowspan = 1, colspan = 1 } = cell;
    let y = path[tableDepth];
    let x = path[tableDepth + 1];

    if (!gridTable[y]) {
      gridTable[y] = [];
    }

    while (gridTable[y][x]) {
      x++;
    }

    for (let j = 0; j < rowspan; j++) {
      for (let k = 0; k < colspan; k++) {
        let _y = y + j;
        let _x = x + k;

        if (!gridTable[_y]) {
          gridTable[_y] = [];
        }

        gridTable[_y][_x] = {
          cell,
          path: [...realPath.slice(0, tableDepth), _y, _x],
          isReal: (rowspan === 1 && colspan === 1) || (_y === y && _x === x),
          originPath: path,
        };

        if (!insertPosition && cell.key === startKey) {
          insertPosition = gridTable[_y][_x];
          gridTable[_y][_x].isInsertPosition = true;
        }
      }
    }
  }

  const getCol = (match) => {
    const result = [];

    gridTable.forEach((row) => {
      row.forEach((col) => {
        if (match && match(col)) {
          result.push(col);
        }
      });
    });

    return result;
  };

  return {
    gridTable,
    tableDepth,
    getCol,
  };
};

export function addSelection() {
  removeSelection(editor);

  if (!table) return [];

  const { gridTable, getCol } = splitedTable(editor, table);

  if (!getCol || !gridTable) return [];

  let [head] = getCol(
    (n) => Path.equals(Editor.path(editor, n.originPath), startPath) && n.isReal
  );
  let [tail] = getCol(
    (n) => Path.equals(Editor.path(editor, n.originPath), endPath) && n.isReal
  );

  if (!tail || !head) return [];

  const { path: tailPath } = tail;
  const { path: headPath } = head;

  headPath.forEach((item, index) => {
    headPath[index] = Math.min(item, tailPath[index]);
    tailPath[index] = Math.max(item, tailPath[index]);
  });

  const coverCols = [];

  gridTable.forEach((row) => {
    row.forEach((col) => {
      const { path } = col;

      const isOver = path.findIndex((item, index) => {
        if (item < headPath[index] || item > tailPath[index]) {
          return true;
        }
        return false;
      });

      if (isOver < 0) {
        coverCols.push(col);
      }
    });
  });

  coverCols.forEach(({ originPath }) => {
    Transforms.setNodes(
      editor,
      {
        selectedCell: true,
      },
      {
        at: originPath,
        match: (n) => n.childrenType === 'table-cell',
      }
    );
  });

  return coverCols;
}

export function removeSelection(editor) {
  Transforms.unsetNodes(editor, 'selectedCell', {
    at: [],
    match: (n) => !!n.selectedCell,
  });
}
