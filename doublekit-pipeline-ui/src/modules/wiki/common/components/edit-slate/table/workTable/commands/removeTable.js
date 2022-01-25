/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-26 15:49:52
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-26 16:02:56
 */
import { Editor, NodeEntry, Transforms } from 'slate';

export const removeTable = (table, editor) => {
  if (table && editor) {
    Transforms.removeNodes(editor, {
      match: (n) => n.childrenType === 'table-work',
      at: table[1],
    });
  }
};
