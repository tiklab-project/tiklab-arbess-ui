/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-30 16:12:08
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-30 16:12:08
 */
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-23 17:37:04
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-26 14:06:32
 */
import { Col, splitedTable } from '../selection';
import { Editor, NodeEntry, Transforms } from 'slate';

import { splitCell } from './splitCell';

export function removeRow(table, editor,path) {
  const { selection } = editor;
  if (!selection) return;
  Transforms.removeNodes(editor,{at: path})
}
