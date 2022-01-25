/**
 * @description tooltip 事件
 * @author wangfupeng
 */

import E from 'wangeditor';
const { $,Tooltip } = E
/**
 * 生成 Tooltip 的显示隐藏函数
 */
function createShowHideFn(editor) {
    let tooltip;

    /**
     * 显示 tooltip
     * @param $abbr 备注元素
     */
    function showLinkTooltip($abbr) {
        const conf = [
            // {
            //     $elem: $(`<span>${editor.i18next.t('menus.panelMenus.abbr.查看备注')}</span>`),
            //     onClick: (editor: Editor, $abbr: DomElement) => {
            //         const abbr = $abbr.attr('href')
            //         window.open(abbr, '_target')

            //         // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
            //         return true
            //     },
            // },
            {
                $elem: $(`<span>${editor.i18next.t('menus.panelMenus.abbr.取消备注')}</span>`),
                onClick: (editor, $abbr) => {
                    // 选中备注元素
                    editor.selection.createRangeByElem($abbr)
                    editor.selection.restoreSelection()

                    const $childNodes = $abbr.childNodes()
                    // 如果备注是图片
                    if ($childNodes?.getNodeName() === 'IMG') {
                        // 获取选中的图片
                        const $selectIMG = editor.selection.getSelectionContainerElem()?.children()
                            ?.elems[0].children[0]
                        // 插入图片
                        editor.cmd.do(
                            'insertHTML',
                            `<img 
                                src=${$selectIMG?.getAttribute('src')} 
                                style=${$selectIMG?.getAttribute('style')}>`
                        )
                    } else {
                        // 用文字，替换备注
                        const selectionText = $abbr.text()
                        editor.cmd.do('insertHTML', '<span>' + selectionText + '</span>')
                    }

                    // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
                    return true
                },
            },
        ]

        // 创建 tooltip
        tooltip = new Tooltip(editor, $abbr, conf)
        tooltip.create()
    }

    /**
     * 隐藏 tooltip
     */
    function hideLinkTooltip() {
        // 移除 tooltip
        if (tooltip) {
            tooltip.remove()
            tooltip = null
        }
    }

    return {
        showLinkTooltip,
        hideLinkTooltip,
    }
}

/**
 * 绑定 tooltip 事件
 * @param editor 编辑器实例
 */
function bindTooltipEvent(editor) {
    const { showLinkTooltip, hideLinkTooltip } = createShowHideFn(editor)
    Object.assign(editor.txt.eventHooks, {attachmentEditor: []});
    // 点击备注元素是，显示 tooltip
    editor.txt.eventHooks.attachmentEditor.push(showLinkTooltip)

    // 点击其他地方，或者滚动时，隐藏 tooltip
    editor.txt.eventHooks.clickEvents.push(hideLinkTooltip)
    editor.txt.eventHooks.keyupEvents.push(hideLinkTooltip)
    editor.txt.eventHooks.toolbarClickEvents.push(hideLinkTooltip)
    editor.txt.eventHooks.menuClickEvents.push(hideLinkTooltip)
    editor.txt.eventHooks.textScrollEvents.push(hideLinkTooltip)
}

export default bindTooltipEvent
