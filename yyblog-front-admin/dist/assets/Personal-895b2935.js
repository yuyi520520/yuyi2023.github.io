import{a as v,r as h,b as D,e,w as l,j as A,p as E,f as r,o as F,d as B,i as _,H}from"./index-accd95a7.js";const z={__name:"Personal",setup(j){const{proxy:n}=A(),w=E(),m={getUserInfo:"getUserInfo",saveMyInfo:"saveMyInfo",saveAvatar:"saveAvatar",updateMyPassword:"updateMyPassword"},a=v({}),U=(s,o,f)=>{o!==d.value.password?f(new Error(s.message)):f()},g={nickName:[{required:!0,message:"昵称不能为空"}],editorType:[{required:!0,message:"请选择默认编辑器"}],password:[{required:!0,message:"请输入密码"},{validator:n.Verify.password,message:"密码最少8位，只能数字字母和特殊字符"}],rePassword:[{required:!0,message:"请再次输入密码"},{validator:U,message:"两次输入的密码不一致"}],phone:[{required:!0,message:"请输入手机号"},{validator:n.Verify.phone,trigger:"blur",message:"请输入正确的手机号"}]};(async()=>{let s=await n.Request({url:m.getUserInfo});s&&(a.value=s.data)})();const V=v(null),N=async()=>{V.value.validate(async s=>{!s||!await n.Request({url:m.saveMyInfo,params:{avatar:a.value.avatar,nickName:a.value.nickName,phone:a.value.phone,editoType:a.value.editoType,profession:a.value.profession,introduction:a.value.introduction}})||(n.Message.success("保存成功"),w.commit("updateUserInfo",{nickName:a.value.nickName,avatar:a.value.avatar}))})},I=async s=>{await n.Request({url:m.saveAvatar,params:{avatar:s}})||reutrn,n.Message.success("头像修改成功"),w.commit("updateUserInfo",{nickName:a.value.nickName,avatar:s})},d=v({}),c=v(null),p=h({show:!1,title:"修改密码",buttons:[{type:"danger",text:"确定",click:s=>{P()}}]}),M=()=>{p.show=!0,H(()=>{c.value.resetFields(),d.value={}})},P=()=>{c.value.validate(async s=>{if(!s)return;await n.Request({url:m.updateMyPassword,params:{password:d.value.password}})||reutrn,p.show=!1,n.Message.success("密码修改成功")})};return(s,o)=>{const f=r("CoverUpload"),u=r("el-form-item"),i=r("el-input"),y=r("el-radio"),x=r("el-radio-group"),C=r("el-button"),b=r("el-col"),q=r("EditorHtml"),R=r("el-row"),k=r("el-form"),T=r("Dialog");return F(),D("div",null,[e(k,{model:a.value,rules:g,ref_key:"formDataRef",ref:V,"label-width":"100px"},{default:l(()=>[e(R,{gutter:10},{default:l(()=>[e(b,{span:8},{default:l(()=>[e(u,{label:"头像",prop:"avatar"},{default:l(()=>[e(f,{modelValue:a.value.avatar,"onUpdate:modelValue":o[0]||(o[0]=t=>a.value.avatar=t),onCallback:I},null,8,["modelValue"])]),_:1}),e(u,{label:"昵称",prop:"nickName"},{default:l(()=>[e(i,{modelValue:a.value.nickName,"onUpdate:modelValue":o[1]||(o[1]=t=>a.value.nickName=t),placeholder:"请输入昵称"},null,8,["modelValue"])]),_:1}),e(u,{label:"手机号",prop:"phone"},{default:l(()=>[e(i,{modelValue:a.value.phone,"onUpdate:modelValue":o[2]||(o[2]=t=>a.value.phone=t),placeholder:"请输入手机号"},null,8,["modelValue"])]),_:1}),e(u,{label:"密码"},{default:l(()=>[B("a",{href:"javascript:void(0)",class:"a-link",onClick:M},"修改密码")]),_:1}),e(u,{label:"默认编辑器",prop:"editorType"},{default:l(()=>[e(x,{modelValue:a.value.editorType,"onUpdate:modelValue":o[3]||(o[3]=t=>a.value.editorType=t)},{default:l(()=>[e(y,{label:0},{default:l(()=>[_("富文本编辑器")]),_:1}),e(y,{label:1},{default:l(()=>[_("MarkDown编辑器")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(u,{label:"职业",prop:"profession"},{default:l(()=>[e(i,{modelValue:a.value.profession,"onUpdate:modelValue":o[4]||(o[4]=t=>a.value.profession=t),placeholder:"请输入职业"},null,8,["modelValue"])]),_:1}),e(u,{label:"",prop:"editorType"},{default:l(()=>[e(C,{type:"danger",onClick:N},{default:l(()=>[_("保存")]),_:1})]),_:1})]),_:1}),e(b,{span:16},{default:l(()=>[e(u,{label:"简介",prop:"introduction"},{default:l(()=>[e(q,{modelValue:a.value.introduction,"onUpdate:modelValue":o[5]||(o[5]=t=>a.value.introduction=t)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model"]),e(T,{show:p.show,title:p.title,buttons:p.buttons,width:"400px",onClose:o[8]||(o[8]=t=>p.show=!1)},{default:l(()=>[e(k,{model:d.value,rules:g,ref_key:"passwordFormRef",ref:c,"label-width":"80px"},{default:l(()=>[e(u,{label:"密码",prop:"password"},{default:l(()=>[e(i,{placeholder:"请输入密码",type:"password",modelValue:d.value.password,"onUpdate:modelValue":o[6]||(o[6]=t=>d.value.password=t)},null,8,["modelValue"])]),_:1}),e(u,{label:"重复密码",prop:"rePassword"},{default:l(()=>[e(i,{placeholder:"请再次输入密码",type:"password",modelValue:d.value.rePassword,"onUpdate:modelValue":o[7]||(o[7]=t=>d.value.rePassword=t)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["show","title","buttons"])])}}};export{z as default};
