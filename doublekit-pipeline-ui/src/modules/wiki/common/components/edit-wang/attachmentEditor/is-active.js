/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-11 11:44:20
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-11 14:29:09
 */
/**
 * @description 检查选区是否在链接中，即菜单是否应该 active
 * @author wangfupeng
 */


function isActive(editor){
    const $selectionELem = editor.selection.getSelectionContainerElem()
    if (!$selectionELem?.length) {
        return false
    }
    if ($selectionELem.getNodeName() === 'ABBR') {
        return true
    } else {
        return false
    }
}

export default isActive
