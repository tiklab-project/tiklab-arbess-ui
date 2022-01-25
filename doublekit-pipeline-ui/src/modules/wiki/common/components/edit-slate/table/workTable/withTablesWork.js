import { Editor, Element, Node, Path, Point, Range, Transforms } from "slate";

import { ReactEditor } from "slate-react";
import { v4 as uuid } from "uuid";

const withWorkTables = (editor) => {
  const { addMark,removeMark,insertText, isVoid,deleteBackward, deleteFragment } = editor;
  // editor.isVoid = element => {
  //     return element.type === 'table-work' && element.childrenType === "table-row" ? true : isVoid(element)
  // }
//   editor.addMark = (key, value) => {
//     if (editor.selection) {
//       const lastSelection = editor.selection;

//       const selectedCells = Editor.nodes(editor, {
//         match: (n) => !!n.selectedCell,
//         at: [],
//       });

//       console.log(selectedCells);
//       let isTable = false;

//       for (let cell of selectedCells) {
//         if (!isTable) {
//           isTable = true;
//         }

//         const [content] = Editor.nodes(editor, {
//           match: (n) => n.childrenType === 'table-content',
//           at: cell[1],
//         });
//         console.log(content);

//         if (Editor.string(editor, content[1]) !== '') {
//           Transforms.setSelection(editor, Editor.range(editor, cell[1]));
//           addMark(key, value);
//         }
//       }

//       if (isTable) {
//         Transforms.select(editor, lastSelection);
//         return;
//       }
//     }

//     addMark(key, value);
//   };

//   editor.removeMark = (key) => {
//     if (editor.selection) {
//       const lastSelection = editor.selection;
//       const selectedCells = Editor.nodes(editor, {
//         match: (n) => !!n.selectedCell,
//         at: [],
//       });

//       let isTable = false;
//       for (let cell of selectedCells) {
//         if (!isTable) {
//           isTable = true;
//         }

//         const [content] = Editor.nodes(editor, {
//           match: (n) => n.childrenType === 'table-content',
//           at: cell[1],
//         });

//         if (Editor.string(editor, content[1]) !== '') {
//           Transforms.setSelection(editor, Editor.range(editor, cell[1]));
//           removeMark(key);
//         }
//       }

//       if (isTable) {
//         Transforms.select(editor, lastSelection);
//         return;
//       }
//     }
//     removeMark(key);
//   };

//   editor.insertText = (text) => {
//     const { selection } = editor;

//     if (!selection || !ReactEditor.isFocused(editor)) return;

//     const [table] = Editor.nodes(editor, {
//       at: selection,
//       match: (n) => n.childrenType === "table",
//     });
//     const isCollapsed = Range.isCollapsed(selection);

//     if (table && !isCollapsed) {
//       console.log("out");
//       return;
//     }

//     insertText(text);
//   };

//   editor.deleteBackward = (unit) => {
//     const { selection } = editor;

//     if (!selection) return;

//     if (selection && Range.isCollapsed(selection)) {
//       const isInTable = Editor.above(editor, {
//         match: (n) => n.childrenType === "table",
//       });

//       if (isInTable) {
//         const currCell = Editor.above(editor, {
//           match: (n) => n.childrenType === "table-cell",
//         });

//         const start = currCell && Editor.start(editor, currCell[1]);

//         const isStart = start && Point.equals(selection.anchor, start);

//         if (isStart) return;
//       }

//       deleteBackward(unit);
//     }
//   };

//   editor.deleteFragment = () => {
//     console.log("frag", isInSameTable(editor));
//     const { selection } = editor;

//     if (!selection) return;

//     if (isInSameTable(editor)) {
//       const selectedCells = Editor.nodes(editor, {
//         match: (n) => !!n.selectedCell,
//       });

//       for (let cell of selectedCells) {
//         Transforms.setSelection(editor, Editor.range(editor, cell[1]));
//         const [content] = Editor.nodes(editor, {
//           match: (n) => n.type === "table-content",
//         });

//         Transforms.insertNodes(editor, createContent(), { at: content[1] });
//         Transforms.removeNodes(editor, { at: Path.next(content[1]) });
//       }
//       return;
//     }
//     Transforms.removeNodes(editor, {
//       match: (n) => n.type === "table",
//     });

//     deleteFragment();
//   };

//   return editor;
// };

// export function isInSameTable(editor){
//   if (!editor.selection) return false;

//   const [start, end] = Editor.edges(editor, editor.selection);
//   const [startTable] = Editor.nodes(editor, {
//     at: start,
//     match: (n) => n.childrenType === "table",
//   });

//   const [endTable] = Editor.nodes(editor, {
//     at: end,
//     match: (n) => n.childrenType === "table",
//   });

//   if (startTable && endTable) {
//     const [, startPath] = startTable;
//     const [, endPath] = endTable;

//     if (Path.equals(startPath, endPath)) {
//       return true;
//     }
//   }

//   return false;
// }
  return editor
}

/*
table中row，cell，content的类型
*/
/* 新增table */
export function createTable(colData, rowData) {
  const rowNodes = rowData.map((rowDataItem) => createRow(rowDataItem,colData));
  const thNodes = [createThead(colData)];
  return {
    type: "table-work",
    childrenType: "table-work",
    children: [...thNodes,...rowNodes],
    data: {},
  };
}
/* 表头 */
export function createThead(colData){
  const thNodes = colData.map((colDataItem) => createTh(colDataItem));

  return {
    type: "table-work",
    childrenType: "table-thead",
    key: `row_${uuid()}`,
    data: {},
    children: thNodes,
  };
}
/* 新增一个th */
export function createTh(colDataItem) {
  const content = createThContent(colDataItem);

  return {
    type: "table-work",
    childrenType: "table-th",
    key: `cell_${uuid()}`,
    children: [content],
    width: "100px",
    height: "44px",
  };
}

export function createThContent(colDataItem) {
  return {
    type: "table-work",
    childrenType: "table-content",
    children: [{ type: "paragraph", children: [{ text: `${colDataItem.title}` }] }],
  };
}
/* 新增一行 */
export function createRow(rowDataItem){
  // const cellNodes = colData.map((colDataItem,index) => createCell(rowDataItem,index,colDataItem));
  console.log(rowDataItem)
  return {
    type: "table-work",
    childrenType: "table-row",
    id: rowDataItem.id,
    key: `row_${uuid()}`,
    data: {},
    deleteButton: "删除",
    children: [
        {type: "table-work",childrenType: "insertUp",text: "向上插入"},
        {type: "table-work",childrenType: "insertDown",text: "向下插入"},
        {type: "table-work",childrenType: "delete",text: "删除"}
      ],
  };
}

/* 新增一个单元格 */
export function createCell(rowDataItem,index,colDataItem) {
  const content = createContent(rowDataItem,index,colDataItem);

  return {
    type: "table-work",
    childrenType: "table-cell",
    key: `cell_${uuid()}`,
    children: [content],
    width: "100px",
    height: "44px",
  };
}


export function createContent(rowDataItem,index,colDataItem) {
  let key = rowDataItem
  if(typeof(colDataItem.dataIndex) === "object"){
    for(let i=0;i< colDataItem.dataIndex.length; i++) {
      key = key[colDataItem.dataIndex[i]]
    }
  }
  if(typeof(colDataItem.dataIndex) === "string"){
    key = rowDataItem[colDataItem.dataIndex]
  }
  return {
    type: "table-work",
    childrenType: "table-content",
    children: [{ type: "paragraph", children: [{ text: `${key}` }] }],
  };
}
export default withWorkTables;
