import { observable, action } from "mobx";
import { GetWikiList,AddWikiList,DeleWikiList,SearchWiki,UpdateWikiList,GetWikiTypeList,GetUseList,GetAllWikiList } from "../api/wiki";

export class WikiStore {
    @observable wikilist = [];
    @observable wikiTypelist = [];
    @observable uselist = [];
    @observable wiki = [];
    @observable allWikilist = [];
    @observable name = "";
    @observable wikiPageParams = {
        current: 1,
        pageSize: 10
    };

    @action
	getWikilist = async(value) => {
        Object.assign(this.wikiPageParams, {...value})
        const params = {
            name: this.wikiPageParams.name,
            orderParams: [{
                name: "name",
                orderType: "asc"
            }],
            pageParam: {
                pageSize: 10,
                currentPage: this.wikiPageParams.current
            }
        }
		const data = await GetWikiList(params)
        this.wikilist = data.data.dataList;
        this.wikiPageParams.total = data.data.totalRecord;
        return data.data;
    }


    @action
	getAllWikilist = () => {
		GetAllWikiList(params).then(response => {
			this.allWikilist = response.data;
        }).catch(error => {
            console.log(error)
        })
    }


    @action
	addWikilist = (values) => {
        let param = {
            name: values.name,
            // typeId: {
            //     id: values.wikiType
            // },
            limits: values.limits,
            master:  {id: values.master},
            desc: values.desc
        }
		AddWikiList(param).then(response => {
            if(response.code=== 0){
                // this.wikilist=this.wikilist.concat({...values,id: response.data})
                this.getWikilist()
            }
            
        }).catch(error => {
            console.log(error)
        })
    }
    @action
	delewikiList = (values) => {
        const param = new FormData()
        param.append("id", values)

        const that = this;
		DeleWikiList(param).then(response => {
            if(response.code=== 0){
                // that.wikilist = that.wikilist.filter((item)=> {
                //     return !values.includes(item.id)
                // })
                that.getWikilist()
            }
        }).catch(error => {
            console.log(error)
        })
    }
    // 修改
    @action
	updateWiki = (values) => {
        let param = {
            id: values.id,
            name: values.name,
            // projectType: {
            //     id: values.wikiType
            // },
            master: {
                id: values.master
            },
            desc: values.desc,
        }
        const that = this;
        return new Promise((resolve, reject)=>{
            UpdateWikiList(param).then(response => {
                // this.wikilist = response.data;
                if(response.code=== 0){
                    that.getWikilist()
                }
                console.log("q",response)
                resolve(response.data)
                }).catch(error => {
                    console.log(error)
                    reject()
                })
            }
        )
		
    }
    @action
	searchwikiList = (values) => {
        const param = new FormData()
        param.append("id", values)
        const that = this;
        return new Promise((resolve, reject)=>{
            SearchWiki(params).then(response => {
                that.wikilist=[response.data];
                resolve(response.data)
                }).catch(error => {
                    console.log(error)
                    reject()
                })
            }
        )
		
    }
    @action
	searchwiki = (values) => {
        const params = new FormData()
        params.append("id", values)

        const that = this;
        return new Promise((resolve, reject)=>{
            SearchWiki(params).then(response => {
                that.wiki = response.data;
                that.name = response.data.name;
                
                resolve(response.data)
                }).catch(error => {
                    console.log(error)
                    reject()
                })
            }
        )
		
	}
    @action
    getWikiTypeList = () => {
		GetWikiTypeList().then(response => {
			this.wikiTypelist = response.data;
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    getUseList = () => {
		GetUseList().then(response => {
			this.uselist = response.data;
        }).catch(error => {
            console.log(error)
        })
    }
}

export const WIKI_STORE = "wikiStore"

// export default Promisestore;