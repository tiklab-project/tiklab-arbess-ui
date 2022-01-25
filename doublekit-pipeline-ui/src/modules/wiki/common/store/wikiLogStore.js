/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-22 14:34:53
 */
import { observable, action} from "mobx";
import {FindWikiCatalogue,AddWikiCatalogue,DetailWikiLog,AddWikiCataDocument,
    UpdateWikiCatalogue,DeleteWikiLog,UpdateDocument,FindDocument,DeleteDocument,FindCategoryDocument,FindDmPrjRolePage} from "../api/wiliLog"
export class WikiCatalogueStore {
    // 知识库id
    @observable wikiCatalogue = [];
    // 目录树
    @observable wikiCatalogueList = [];
    @observable docDetail = [{
        title: "",
        type: "",
        content: ""
    }]
    /**
     * 
     * @param {*} id 
     * @returns 
     */
    @action
    setWikiCatalogueList = (value) => {
        this.wikiCatalogueList = value
    }
    /**
     * 设置知识库id
     * @param {*} id 
     */
    @action
    findWikiCatalogue= async(id)=> {
        const categoryQuery = {
            repositoryId: id
        }
        const data = await FindWikiCatalogue(categoryQuery);
        return data.data;
    }

    @action
    addWikiCatalogue= async(params)=> {
        const data = await AddWikiCatalogue(params);
        return data.data;
    }

    /**
     * 更新目录
     * @param {*} params 
     * @returns 
     */
    @action
    updateWikiCatalogue= async(params)=> {
        const data = await UpdateWikiCatalogue(params);
        return data;
    }

    // 删除目录
    @action
    deleteWikiLog= async(id)=> {
        const param = new FormData()
        param.append("id", id)
        const data = await DeleteWikiLog(param);
        return data;
    }

    @action
    detailWikiLog= async(params)=> {
        const data = new FormData()
        data.append("id", params.id)
        const detailWikiLog = await DetailWikiLog(data);
        // this.docDetail = detailWikiLog.data.list[0];
        return detailWikiLog.data;
    }

    @action
    setDocDetail = (data) => {
        this.docDetail = {...this.docDetail,...data}
    }

    // 创建文档
    @action
    addWikiCataDocument = async(params) => {
        const data = await AddWikiCataDocument(params);
        return data;
    }
    // 创建文档
    @action
    updateDocument = async(params) => {
        const data = await UpdateDocument(params);
        return data;
    }

    // 获取文档
    @action
    findDocument = async(id) => {
        const params = new FormData()
        params.append("id", id)
        const data = await FindDocument(params);
        return data;
    }

     // 删除文档
    @action
    deleteDocument= async(id)=> {
        const param = new FormData()
        param.append("id", id)
        const data = await DeleteDocument(param);
        return data;
    }

    @action
    findCategoryDocument= async(id)=> {
        const param = new FormData()
        param.append("id", id)
        const data = await FindCategoryDocument(param);
        return data;
    }

    // 查找项目成员
    @action
    findDmPrjRolePage= async(id)=> {
        const param ={
            domainId: id,
            pageParam: {pageSize: 10, currentPage: 1}
        }
        const data = await FindDmPrjRolePage(param);
        return data.data;
    }
}

export const WIKICATELOGUE_STORE = "WikiCatalogueStore"