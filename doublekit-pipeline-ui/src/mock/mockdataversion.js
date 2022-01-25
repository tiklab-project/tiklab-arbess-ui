import Mock from "mockjs";
// import versionstore from "../view/home/version/store/versionstore";
var versionList = [
    {
        "id": "32fbea4f5db213996a8b8b1d0f5606ee",
        "versionName": "项目管理1.0.0",
        "date": "2021-02-20 00:00:00",
        "workNum": "12",
        "wiki": "项目1"
    },
    {
        "id": "5c7ebef0a5338167226747ef2928b31e",
        "versionName": "项目管理1.0.1",
        "date": "2021-02-20 00:00:00",
        "workNum": "3",
        "wiki": "项目1"
    },
    {
        "id": "72cfe9ffc71e7435f398a610611d93d4",
        "versionName": "项目管理1.0.2",
        "date": "2021-02-20 00:00:00",
        "workNum": "2",
        "wiki": "项目1"
    }
];

Mock.mock("/versionList", { versionList });
let versionAdd = function (options){
    let body = JSON.parse(options.body);
    body = {...body,id: Mock.mock('@increment')}
    versionList = versionList.concat(body)
    return {
        versionList: versionList
    }
}
Mock.mock("/addVersionList", versionAdd);
//删除
let deleVersion = function (options){
    versionList=versionList.filter((item)=> {
        return !(item.id === options.body)
    })
    return {
        data: versionList
    }
}
Mock.mock("/deleVersionList", deleVersion);


let searchVersion = function (options){
    let versionItem = []
    if(options.body){
        versionItem = versionList.filter((item)=> {
            return (item.id === options.body || item.versionName.indexOf(options.body) !== -1)
        })
    }
    return {
        data: versionItem
    }
}
Mock.mock("/searchVersion", searchVersion);

// 编辑版本
let editVersion = function (options){
    const body = JSON.parse(options.body);
    let newitem = {
        versionName: body.versionName,
        wiki: body.wiki,
        date: body.date,
        id: body.id
    }
    let userindex = ""
    versionList.forEach(function(e,index){
        if(e.id === body.id){
            userindex = index
        }
    })
    versionList[userindex] = newitem
    return {
        data: versionList
    }
}
Mock.mock("/editVersion", editVersion);
