import{i as y,r as m,a as c,o,c as r,b as l,F as C,f as h,h as i,j as L}from"./index-1ca88f23.js";const S={class:"s_main"},f={class:"category_list"},k={class:"pagination"},z={__name:"Special",setup(x){const{proxy:p}=y(),g={LoadSpecial:"/view/loadSpecial"},e=m([]),s=async t=>{let n=await p.Request({url:g.LoadSpecial,params:{pageNo:t,pageSize:16}});n&&(e.value=n.data)};s(1);const u=t=>{s(t)};return(t,n)=>{const _=c("CategoryList"),d=c("el-pagination");return o(),r("div",S,[l("div",f,[(o(!0),r(C,null,h(e.value.list,(a,v)=>(o(),i(_,{key:v,cover:a.cover,name:a.categoryName,desc:a.categoryDesc,count:a.blogCount,categoryId:a.categoryId,type:1},null,8,["cover","name","desc","count","categoryId"]))),128))]),l("div",k,[e.value.totalCount?(o(),i(d,{key:0,background:"",total:e.value.totalCount,"page-sizes":[15,30,50,100],"page-size":e.value.pageSize,"current-page":e.value.pageNo,layout:"total, prev, pager, next",onCurrentChange:u,style:{"text-align":"right"},"hide-on-single-page":""},null,8,["total","page-size","current-page"])):L("",!0)])])}}};export{z as default};