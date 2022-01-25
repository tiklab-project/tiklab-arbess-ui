/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-27 11:07:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-28 14:49:12
 */
import { observable, action} from "mobx";
import { FindWorkItemPage,FindAllWorkType,FindAllWorkStatus,
    FindAllUser,FindAllProject,FindWorkItem } from "../api/wikiWork"

export class WikiWork {
    @observable workList = [];
    @observable workTypeList = [];
    @observable workStatusList = [];
    @observable userList = [];
    @observable project = [];
    @observable searchCondition = {
        currentPage: 1
    };
    @action
    findWorkItemPage = (value) => {
        Object.assign(this.searchCondition, {...value})
        const params={
            projectId: this.searchCondition.project,
            workTypeId: this.searchCondition.workType,
            sprintId: this.searchCondition.sprint,
            workStatusId: this.searchCondition.workStatus,
            title: this.searchCondition.title,
            parentIdIsNull: true,
            sortParams: [{
                name: "title",
                orderType:"asc"
            }],
            pageParam: {
                pageSize: 10,
                currentPage: this.searchCondition.currentPage
            }
        }
        return new Promise((resolve,reject)=>{
            FindWorkItemPage(params).then(response => {
                this.workList = response.data.dataList;
                this.total = response.data.totalRecord;
                resolve(response.data)
            }).catch(error => {
                console.log(error)
                reject()
            })
        })
    }

    //查找所有项目
    @action
    getProlist = async() => {
        const data = await GetAllProList()
        this.projectList = data.data;
		// GetproList().then(response => {
        //     this.projectList = response.data;
            
        // }).catch(error => {
        //     console.log(error)
        // })
    }
    
    //获取事项类型
    @action
    findAllWorkType = () => {
        return new Promise((resolve,reject)=>{
            FindAllWorkType().then(response => {
                this.workTypeList = response.data;
                resolve(response.data)
            }).catch(error => {
                console.log(error)
                reject()
            })
        })
    }
    //获取事项状态
    @action
    findAllWorkStatus = () => {
        return new Promise((resolve,reject)=>{
            FindAllWorkStatus().then(response => {
                this.workStatusList = response.data;
                resolve(response.data)
            }).catch(error => {
                console.log(error)
                reject()
            })
        })
    }

    //获取事项负责人
    @action
    findAllUser = () => {
        return new Promise((resolve,reject)=>{
            FindAllUser().then(response => {
                this.userList = response.data;
                resolve(response.data)
            }).catch(error => {
                console.log(error)
                reject()
            })
        })
    }

    //获取事项负责人
    @action
    findAllProject = () => {
        return new Promise((resolve,reject)=>{
            FindAllProject().then(response => {
                this.project = response.data;
                resolve(response.data)
            }).catch(error => {
                console.log(error)
                reject()
            })
        })
    }

    @action
    findWorkItem = (id) => {
        const param = new FormData()
        param.append("id", id)

        return new Promise((resolve,reject)=>{
            FindWorkItem(param).then(response => {
                this.workInfo = response.data;
                resolve(response.data)
            }).catch(error => {
                console.log(error)
                reject()
            })
        })
    }
}

export const WIKIWORK_STORE = "wikiwork"