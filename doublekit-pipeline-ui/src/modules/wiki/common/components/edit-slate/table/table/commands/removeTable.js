/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-26 15:49:52
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-26 15:50:20
 */
import { Editor, NodeEntry, Transforms } from 'slate';

export const removeTable = (table, editor) => {
  if (table && editor) {
    Transforms.removeNodes(editor, {
      match: (n) => n.childrenType === 'table',
      at: table[1],
    });
  }
};
