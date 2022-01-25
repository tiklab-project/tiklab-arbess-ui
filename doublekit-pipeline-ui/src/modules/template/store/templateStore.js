/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-08 14:58:51
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-08 16:34:04
 */
import { observable, action } from "mobx";
import { GreateDocumentTemplate,FindDocumentTemplatePage,FindDocumentTemplate,UpdateDocumentTemplate,
    DeleteDocumentTemplate
} from "../api/templateApi";

export class TemplateStore {
    @observable templatelist = [];
    @observable templatePageParams = {
        current: 1,
        pageSize: 10,
        total: 1
    };

    @action
	greateDocumentTemplate = async(value) => {
        const data = await GreateDocumentTemplate(value)
        return data;
    }

    @action
	findDocumentTemplatePage = async(value) => {
        Object.assign(this.templatePageParams, {...value})
        const params = {
            name: this.templatePageParams.name,
            orderParams: [{
                name: "name",
                orderType: "asc"
            }],
            pageParam: {
                pageSize: 10,
                currentPage: this.templatePageParams.current
            }
        }
        const data = await FindDocumentTemplatePage(params)
        return data;
    }

    @action
	findDocumentTemplate = (values) => {
        const param = new FormData()
        param.append("id", values)

		const data = FindDocumentTemplate(param)
        return data
    }

    @action
	updateDocumentTemplate = async(value) => {
        const data = await UpdateDocumentTemplate(value)
        return data;
    }

    @action
	deleteDocumentTemplate = (values) => {
        const param = new FormData()
        param.append("id", values)

		const data = DeleteDocumentTemplate(param)
        return data
    }
}
export const TEMPLATE_STORE = "templateStore"
