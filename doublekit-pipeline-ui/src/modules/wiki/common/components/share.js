/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-13 13:29:10
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-01-06 10:58:08
 */
import React, { useState, useEffect, useRef } from "react";
import { Modal, Radio , Button, Input } from 'antd';
import "./share.scss"
const Share = (props) => {
    const { shareVisible, setShareVisible, docInfo,createShare,updateShare } = props;
    const documentId = localStorage.getItem("documentId");
    const [value, setValue] = React.useState("false");
    const [shareLink,setShareLink] = useState()
    const [authCode,setAuthCode] = useState()
    const link = useRef(null)
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        updateShare({shareLink: shareLink,whetherAuthCode: e.target.value}).then(data=> {
            console.log(data)
            if(data.code === 0) {
                if(e.target.value === true){
                    setAuthCode(data.data.authCode)
                }else {
                    setAuthCode(null)
                }
                setAuthCode(data.data.authCode)
                setShareLink(data.data.shareLink)
            }
        })
    };
    const onFinish = () => { }
    useEffect(()=> {
        if(shareVisible === true) {
            createShare({documentId: documentId,whetherAuthCode: value}).then(data=> {
                console.log(data)
                if(data.code === 0) {
                    setShareLink(data.data.shareLink)
                    setAuthCode(data.data.authCode)
                }
            })
        }
        
    },[shareVisible,documentId])
    // 分享qq空间
    const shareToQZon = (pic) => {
        console.log(window.location.href)
        var param = {
            url: window.location.href,
            /*分享地址(可选)*/
            desc: '文档',
            /*分享理由(可选)*/
            title: docInfo.name || "",
            /*分享标题(可选)*/
            summary: authCode ? `密码：${authCode}`: "",
            /*分享描述(可选)*/
            pics: pic || 'http://127.0.0.1:3001/images/logo.png',
            /*分享图片(可选)*/
        };
        var temp = [];
        for (var p in param) {
            temp.push(p + '=' + encodeURIComponent(param[p] || ''))
        }
        var targetUrl = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + temp.join('&');
        window.open(targetUrl, 'sinaweibo', 'height=800, width=800');
    }

    /**
     * 分享qq
     */

    const shareQQ = (url) => {
        var param = {
            url: window.location.href,
            desc: '文档',
            /*分享理由*/
            title: docInfo.name || '',
            /*分享标题(可选)*/
            summary: '分享',
            /*分享描述(可选)*/
            pics: 'http://127.0.0.1:3001/images/logo.png',
            /*分享图片(可选)*/
        };
        var s = [];
        for (var i in param) {
            s.push(i + '=' + encodeURIComponent(param[i] || ''));
        }
        var targetUrl = "https://connect.qq.com/widget/shareqq/index.html?" + s.join('&');
        window.open(targetUrl, '_blank', 'height=520, width=720');
    }

    // 新浪微博
    const shareToSinaWeiBo = () => {
        var param = {
            url: window.location.href,
            /*分享地址(可选)*/
            type: '3',
            count: '1',
            /** 是否显示分享数，1显示(可选)*/
            title: docInfo.name,
            /** 分享的文字内容(可选，默认为所在页面的title)*/
            pic: 'http://127.0.0.1:3001/images/logo.png',
            /**分享图片的路径(可选)*/
            rnd: new Date().valueOf()
        }
        var temp = [];
        for (var p in param) {
            temp.push(p + '=' + encodeURIComponent(param[p] || ''))
        }
        var targetUrl = 'http://service.weibo.com/share/share.php?' + temp.join('&');
        window.open(targetUrl, 'sinaweibo', 'height=800, width=800');
    }

    // 分享微信
    const shareWeixin = () => {
        let url = window.location.href;
        let encodePath = encodeURIComponent(url);
        let targetUrl = 'http://zixuephp.net/inc/qrcode_img.php?text=' + encodePath;
        window.open(targetUrl, 'weixin', 'height=320, width=320');
    }

    // 复制
    const copy = () => {
        
        const link = document.getElementById("link")
        if (document.body.createTextRange) {
            let range = document.body.createTextRange();
            range.moveToElementText(link);
            range.select();
        } else if (window.getSelection) {
            let selection = window.getSelection();
            let range = document.createRange();
            range.selectNodeContents(link);
            selection.removeAllRanges();
            selection.addRange(range);
        } 
        document.execCommand("Copy"); // 执行浏览器复制命令
    }
    return (
        <Modal
            title="分享"
            visible={shareVisible}
            onOk={() => onFinish()}
            onCancel={() => setShareVisible(false)}
            destroyOnClose={true}
        >   
            <Radio.Group onChange={onChange} value={value}>
                <Radio value="false">公开链接</Radio>
                <Radio value= "true">私密链接</Radio>
            </Radio.Group>
            {
                value === "public" ? <div className="share-link link-box" ref={link} id="link">
                    <div className="share-text">链接地址:</div><div className="share-content">http://192.168.2.3:3001/#/shareDocument/{documentId}/{shareLink}</div>
                </div> : <div ref={link} id="link" className = "link-box">
                    <div className="share-link" >
                        <div className="share-text">链接地址：</div>
                        <div className="share-content">http://192.168.2.3:3001/#/shareDocument/{documentId}/{shareLink}</div>
                    </div>
                    {
                        authCode && <div className="share-link"><div className="share-text">密码：</div><div className="share-content">{authCode}</div></div>
                    }
                </div>
            }
            <div style={{textAlign: "right"}}>
                <Button onClick={()=>copy()} >复制</Button>
            </div>
            <div className="share-title">
                分享到：
            </div>
            <div className="share-box">
                <div className="share-item" onClick={() => shareWeixin()}>
                    <svg className="share-icon" aria-hidden="true">
                        <use xlinkHref="#iconweixin"></use>
                    </svg>
                    <span className="share-name">微信好友</span>
                </div>
                <div className="share-item" >
                    <svg className="share-icon" aria-hidden="true">
                        <use xlinkHref="#iconpengyouquan"></use>
                    </svg>
                    <span className="share-name">朋友圈</span>
                </div>
                <div className="share-item" onClick={() => shareQQ()}>
                    <svg className="share-icon" aria-hidden="true">
                        <use xlinkHref="#iconQQ1"></use>
                    </svg>
                    <span className="share-name">QQ好友</span>
                </div>
                <div className="share-item" onClick={() => shareToQZon()}>
                    <svg className="share-icon" aria-hidden="true">
                        <use xlinkHref="#iconkongjian1"></use>
                    </svg>
                    <span className="share-name">空间</span>
                </div>
                <div className="share-item" onClick={() => shareToSinaWeiBo()}>
                    <svg className="share-icon" aria-hidden="true">
                        <use xlinkHref="#iconweibo1"></use>
                    </svg>
                    <span className="share-name">微博</span>
                </div>
            </div>
        </Modal>
    )
}
export default Share;