import {action,observable} from "mobx";

import {
    CreateAuthCodeScan,
    DeleteAuthCodeScan,
    UpdateAuthCodeScan,
    FindAllAuthCodeScan,
} from "../api/scan";

export class ScanStore {

    @observable fresh = false
    @observable modalVisible = false
    @observable formValue = ""
    @observable authScanList = []

    @action
    setModalVisible = value =>{
        this.modalVisible = value
    }

    @action
    setFormValue = value =>{
        this.formValue = value
    }

    @action
    createAuthCodeScan = async value =>{
        const data = await CreateAuthCodeScan(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
    }

    @action
    findAllAuthCodeScan = async () =>{
        const data = await FindAllAuthCodeScan()
        if(data.code===0 && data.data){
            this.authScanList = data.data
        }
    }

    @action
    deleteAuthCodeScan =async value =>{
        const param = new FormData()
        param.append("codeScanId",value)
        const data = await DeleteAuthCodeScan(param)
        if(data.code===0){
            this.fresh=!this.fresh
        }
    }

    @action
    updateAuthCodeScan =async value =>{
        const data = await UpdateAuthCodeScan(value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
    }


}

export const SCAN_STORE = "scanStore"