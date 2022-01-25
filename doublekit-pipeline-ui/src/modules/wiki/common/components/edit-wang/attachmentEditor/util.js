/**
 * 获取除了包裹在整行区域的顶级Node
 * @param node 最外层node下的某个childNode
 * @param topText 最外层node中文本内容
 */
function getTopNode(node,topText){
    let pointerNode = node
    let topNode = node
    do {
        if (pointerNode.textContent === topText) break
        topNode = pointerNode
        if (pointerNode.parentNode) {
            pointerNode = pointerNode?.parentNode
        }
    } while (pointerNode?.nodeName !== 'P')

    return topNode
}

/**
 * 生成html的string形式
 * @param tagName 标签名
 * @param content 需要包裹的内容
 */
function makeHtmlString(node, content) {
    let tagName = node.nodeName
    let attr = ''
    if (node.nodeType === 3 || /^(h|H)[1-6]$/.test(tagName)) {
        return content
    }
    if (node.nodeType === 1) {
        const style = node.getAttribute('style')
        const face = node .getAttribute('face')
        const color = node .getAttribute('color')
        if (style) attr = attr + ` style="${style}"`
        if (face) attr = attr + ` face="${face}"`
        if (color) attr = attr + ` color="${color}"`
    }
    tagName = tagName.toLowerCase()
    return `<${tagName}${attr}>${content}</${tagName}>`
}

/**
 * 生成开始或者结束位置的html字符片段
 * @param topText 选区所在的行的文本内容
 * @param node 选区给出的node节点
 * @param startPos node文本内容选取的开始位置
 * @param endPos node文本内容选取的结束位置
 */
function createPartHtml(topText, node, startPos, endPost){
    let selectionContent = node.textContent?.substring(startPos, endPost)
    let pointerNode= node
    let content = ''
    do {
        content = makeHtmlString(pointerNode, selectionContent ?? '')
        selectionContent = content
        pointerNode = pointerNode?.parentElement
    } while (pointerNode && pointerNode.textContent !== topText)

    return content
}

/**
 * 生成需要插入的html内容的字符串形式
 * @param selection 选区对象
 * @param topNode 选区所在行的顶级node节点
 */
function insertHtml(selection, topNode) {
    const { anchorNode, focusNode, anchorOffset: anchorPos, focusOffset: focusPos } = selection
    const topText = topNode.textContent ?? ''
    const TagArr = getContainerTag(topNode)

    let content = ''
    let startContent = ''
    let middleContent = ''
    let endContent = ''

    let startNode = anchorNode
    let endNode = focusNode
    // 用来保存 anchorNode的非p最外层节点
    let pointerNode = anchorNode
    console.log(33)

    // 节点是同一个的处理
    if (anchorNode?.isEqualNode(focusNode ?? null)) {
        
        let innerContent = createPartHtml(topText, anchorNode, anchorPos, focusPos)
        innerContent = addContainer(TagArr, innerContent)
        return innerContent
    }

    // 选中开始位置节点的处理
    if (anchorNode) startContent = createPartHtml(topText, anchorNode, anchorPos ?? 0)
    

    // 结束位置节点的处理
    if (focusNode) endContent = createPartHtml(topText, focusNode, 0, focusPos)

    // 将指针节点位置放置到开始的节点
    if (anchorNode) {
        // 获取start的非p顶级node
        startNode = getTopNode(anchorNode, topText)
    }
    if (focusNode) {
        // 获取end的非p顶级node
        endNode = getTopNode(focusNode, topText)
    }

    // 处于开始和结束节点位置之间的节点的处理
    pointerNode = startNode?.nextSibling ?? anchorNode
    while (!pointerNode?.isEqualNode(endNode ?? null)) {
        const pointerNodeName = pointerNode?.nodeName
        if (pointerNodeName === '#text') {
            middleContent = middleContent + pointerNode?.textContent
        } else {
            let htmlString = pointerNode?.firstChild?.parentElement?.innerHTML
            if (pointerNode)
                middleContent = middleContent + makeHtmlString(pointerNode, htmlString ?? '')
        }
        pointerNode = pointerNode?.nextSibling ?? pointerNode
    }

    content = `${startContent}${middleContent}${endContent}`

    // 增加最外层包裹标签
    content = addContainer(TagArr, content)

    return content
}
/**
 * 获取包裹在最外层的非p Node tagName 数组
 * @param node 选区所在行的node节点
 */
function getContainerTag(node){
    const topText = node.textContent ?? ''
    let tagArr = []
    while (node?.textContent === topText) {
        if (node.nodeName !== 'P') {
            tagArr.push(node)
        }
        node = node.childNodes[0]
    }
    return tagArr
}

/**
 * 为内容增加包裹标签
 * @param tagArr 最外层包裹的tag数组，索引越小tag越在外面
 * @param content tag要包裹的内容
 */
function addContainer(tagArr, content){
    tagArr.forEach(v => {
        content = makeHtmlString(v, content)
    })
    return content
}

export { getTopNode, makeHtmlString, createPartHtml, insertHtml }
