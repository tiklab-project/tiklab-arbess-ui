/**
 * @description abbr 菜单 panel tab 配置
 * @author wangfupeng
 */

import getRandom from './bind-event/util'
import isActive from './is-active'
import { insertHtml } from './util'

import E from 'wangeditor';
const { $ } = E
export default function (editor, text, abbr){
    // panel 中需要用到的id
    const inputLinkId = getRandom('input-abbr')
    const inputTextId = getRandom('input-text')
    const btnOkId = getRandom('btn-ok')
    const btnDelId = getRandom('btn-del')
    // ReactDOMServer.renderToString(<div/>)
    // 是否显示“取消备注”
    const delBtnDisplay = isActive(editor) ? 'inline-block' : 'none'

    let $selectedLink;

    /**
     * 选中整个备注元素
     */
    function selectLinkElem() {
        if (!isActive(editor)) return

        const $abbrElem = editor.selection.getSelectionContainerElem()
        if (!$abbrElem) return
        editor.selection.createRangeByElem($abbrElem)
        editor.selection.restoreSelection()

        $selectedLink = $abbrElem // 赋值给函数内全局变量
    }

    /**
     * 插入备注
     * @param text 文字
     * @param abbr 备注
     */
    function insertLink(text, abbr) {
        // fix: 修复列表下无法设置超备注的问题(替换选中文字中的标签)
        const subStr = new RegExp(/(<\/*ul>)|(<\/*li>)|(<\/*ol>)/g)
        text = text.replace(subStr, '')
        if (isActive(editor)) {
            // 选区处于备注中，则选中整个菜单，再执行 insertHTML
            selectLinkElem()
            editor.cmd.do('insertHTML', `<abbr title="${abbr}">${text}</abbr>`)
        } else {
            // 选区未处于备注中，直接插入即可
            editor.cmd.do('insertHTML', `<abbr title="${abbr}">${text}</abbr>`)
        }
    }

    /**
     * 取消备注
     */
    function delLink(){
        if (!isActive(editor)) {
            return
        }
        // 选中整个备注
        selectLinkElem()
        // 用文本替换备注
        const selectionText = $selectedLink.text()
        editor.cmd.do('insertHTML', '<span>' + selectionText + '</span>')
    }

    /**
     * 校验备注是否合法
     * @param abbr 备注
     */
    function checkLink(text, abbr){
        //查看开发者自定义配置的返回值
        const check = editor.config.linkCheck(text, abbr)
        if (check === undefined) {
            //用户未能通过开发者的校验，且开发者不希望编辑器提示用户
        } else if (check === true) {
            //用户通过了开发者的校验
            return true
        } else {
            //用户未能通过开发者的校验，开发者希望我们提示这一字符串
            editor.config.customAlert(check, 'warning')
        }
        return false
    }

    const conf = {
        width: 300,
        height: 0,

        // panel 中可包含多个 tab
        tabs: [
            {
                // tab 的标题
                title: editor.i18next.t('menus.panelMenus.abbr.备注'),
                // 模板
                tpl: `<div>
                        <input
                            id="${inputTextId}"
                            type="text"
                            class="block"
                            value="${text}"
                            placeholder="${editor.i18next.t('menus.panelMenus.abbr.备注文字')}"/>
                        </td>
                        <input
                            id="${inputLinkId}"
                            type="text"
                            class="block"
                            value="${abbr}"
                            placeholder="${editor.i18next.t('如')} 这是..."/>
                        </td>
                        <Button type="primary">Button</Button>
                        <div class="w-e-button-container">
                            <button type="button" id="${btnOkId}" class="right">
                                ${editor.i18next.t('插入')}
                            </button>
                            <button type="button" id="${btnDelId}" class="gray right" style="display:${delBtnDisplay}">
                                ${editor.i18next.t('menus.panelMenus.abbr.取消备注')}
                            </button>
                        </div>
                    </div>`,
                // 事件绑定
                events: [
                    // 插入备注
                    {
                        selector: '#' + btnOkId,
                        type: 'click',
                        fn: () => {
                            // 获取选取
                            editor.selection.restoreSelection()
                            const topNode = editor.selection
                                .getSelectionRangeTopNodes()[0]
                                .getNode()
                            const selection = window.getSelection()
                            // 执行插入备注
                            const $abbr = $('#' + inputLinkId)
                            const $text = $('#' + inputTextId)
                            let abbr = $abbr.val().trim()
                            let text = $text.val().trim()

                            let html = ''
                            if (selection && !selection?.isCollapsed)
                                html = insertHtml(selection, topNode)?.trim()

                            // 去除html的tag标签
                            let htmlText = html?.replace(/<.*?>/g, '')
                            let htmlTextLen = htmlText?.length ?? 0
                            // 当input中的text的长度大于等于选区的文字时
                            // 需要判断两者相同的长度的text内容是否相同
                            // 相同则只需把多余的部分添加上去即可，否则使用input中的内容
                            if (htmlTextLen <= text.length) {
                                let startText = text.substring(0, htmlTextLen)
                                let endText = text.substring(htmlTextLen)
                                if (htmlText === startText) {
                                    text = html + endText
                                }
                            }
                            // 备注为空，则不插入
                            if (!abbr) return
                            // 文本为空，则用备注代替
                            if (!text) text = abbr
                            // 校验备注是否满足用户的规则，若不满足则不插入
                            // if (!checkLink(text, abbr)) return
                            insertLink(text, abbr)

                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true
                        },
                        bindEnter: true,
                    },
                    // 取消备注
                    {
                        selector: '#' + btnDelId,
                        type: 'click',
                        fn: () => {
                            // 执行取消备注
                            delLink()

                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true
                        },
                    },
                ],
            }, // tab end
        ], // tabs end
    }

    return conf
}
