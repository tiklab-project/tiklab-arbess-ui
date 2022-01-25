import Mock from "mockjs";

const wikiLog = [
    {
        title: "目录1",
        key: "122333",
        type: "log",
        children:[
            {
                title: "目录1-1",
                key: "1-1",
                type: "log",
                children:[
                    {
                        title: "目录1-1-1",
                        key: "1-1-1",
                        type: "log",
                        children:[
                            { 
                                title: "文档1",
                                type: "doc",
                                key: "1-1-1-1"
                            }
                        ]
                    }
                ]
            },
            {
                title: "目录1-2",
                key: "1-2",
                type: "log",
                children:[
                    {
                        title: "文档1-2-1",
                        key: "1-2-1",
                        type: "doc",
                    }
                ]
            },
            {
                title: "文档1-3",
                key: "1-3",
                type: "doc",
            }
        ]
    }
];
Mock.mock("/wikiLog", { wikiLog });
let wikiLogAdd = function (options,key){
    let body = JSON.parse(options.body);
    const bodyNew = {...body,key: Mock.mock('@increment')}
    const addList = (wikiLog)=> {
        wikiLog.map((item,index)=> {
            console.log(item.key,body.key)
            if(item.key === body.key){
                wikiLog[index].children.push(bodyNew)
            }else if(item.children && item.children.length>0) {
                addList(item.children)
            }else {
                wikiLog.push(bodyNew)
            }
            return;
        })
        return wikiLog;
    }
    addList(wikiLog)
    return {
        wikiLog: wikiLog
    }
}
Mock.mock("/addVersionList", wikiLogAdd);

let wikiLogDetail = function (options,key){
    let body = JSON.parse(options.body);
    let list = []
    const addList = (wikiLog)=> {
        wikiLog.map((item,index)=> {
            if(item.key === body.key){
                list.push(item)
            }else if(item.children && item.children.length>0) {
                addList(item.children)
            }else {
                console.log("id错误")
            }
            return;
        })
        return wikiLog;
    }
    addList(wikiLog)
    return {
        list: list
    }
}
Mock.mock("/wikiLogDetail", wikiLogDetail);