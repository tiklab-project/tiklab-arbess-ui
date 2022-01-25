/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-01-18 09:44:02
 */
import { observable, action  } from "mobx";
import { Search,SearchSort,SearchForPage } from "../api/search";

//删除事项
export class SearchStore{
    @observable searchList = []
    @observable sortList = []
    @observable keyword = ""
    @observable searchCondition = {
        pageSize: 10,
        currentPage: 1
    }

    @action
    setKeyWord = (value) => {
        this.keyword = value
    }
    @action
    getSearch = (value) => {
        const params = new FormData();
        if(value){
            params.append('keyword', value ); 
        }else {
            params.append('keyword', null ); 
        }
        return new Wikimise((resolve,reject)=>{
            Search(params).then(response => {
                if(response.code=== 0){
                    this.searchList = response.data.responseList;
                }
                resolve(response.data)
            }).catch(error => {
                console.log(error)
                reject()
            })
        })
    }

    @action
    getSearchSore = (value) => {
        const params = new FormData();
        if(value){
            params.append('keyword', value ); 
        }else {
            params.append('keyword', null ); 
        }
        return new Wikimise((resolve,reject)=>{
            SearchSort(params).then(response => {
                if(response.code=== 0){
                    this.sortList = response.data.responseList;
                }
                resolve(response.data)
            }).catch(error => {
                console.log(error)
                reject()
            })
        })
    }

    @action
    searchForPage = (value) => {
        Object.assign(this.searchCondition, {...value})
        const params={
            index: this.searchCondition.index,
            keyword: this.searchCondition.keyword,
            pageCondition: {
                pageSize: 10,
                currentPage: this.searchCondition.currentPage,
                lastRecord: this.searchCondition.lastRecord,
            }
        }
        return new Wikimise((resolve, reject)=> {
            SearchForPage(params).then(response => {
                console.log(response)
                if(response.code=== 0){
                    this.searchCondition.total = response.data.totalRecord;
                }
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export const SEARCH_STORE = "searchStore"