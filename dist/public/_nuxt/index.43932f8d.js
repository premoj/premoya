import{d as u,f as p,o as _,c as v,a as t,t as o,e,w as n,n as r,u as f,g as i,h as y,r as h}from"./entry.8dc18463.js";import{l as g}from"./switch.472b4fef.js";const x={class:"overflow-hidden bg-white py-16 px-4 sm:px-6 lg:px-8 lg:py-24"},b={class:"relative mx-auto lg:mx-0 max-w-xl"},w={class:"text-center lg:text-left"},C={class:"text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"},k=t("p",{class:"mt-4 text-lg leading-6 text-gray-500"}," Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus arcu. ",-1),q={class:"mt-12"},V={action:"#",class:"grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"},B={class:"mt-1"},E={class:"mt-1"},F={class:"sm:col-span-2"},N={class:"mt-1"},P={class:"sm:col-span-2"},S={class:"mt-1"},U={class:"mt-1"},j={class:"sm:col-span-2"},A={class:"relative mt-1 rounded-md shadow-sm"},K=t("div",{class:"absolute inset-y-0 left-0 flex items-center"},[t("label",{for:"country",class:"sr-only"},"Country"),t("select",{id:"country",name:"country",class:"h-full rounded-md border-transparent bg-transparent py-0 pl-4 pr-8 text-gray-500 focus:border-teal-500 focus:ring-teal-500"},[t("option",null,"US"),t("option",null,"EU"),t("option",null,"CZE")])],-1),$={class:"sm:col-span-2"},z={class:"mt-1"},D={class:"sm:col-span-2"},L={class:"flex items-start"},M={class:"flex-shrink-0"},Q=t("span",{class:"sr-only"},"Agree to policies",-1),T=t("div",{class:"ml-3"},[t("p",{class:"text-sm text-gray-500"},[i(" By selecting this, you agree to the "+o(" ")+" "),t("a",{href:"#",class:"font-medium text-gray-700 underline"},"Privacy Policy"),i(" "+o(" ")+" and "+o(" ")+" "),t("a",{href:"#",class:"font-medium text-gray-700 underline"},"Cookie Policy"),i(". ")])],-1),Z={class:"sm:col-span-2"},J=u({__name:"index",setup(G){const a=p(!1);return(d,l)=>{const s=h("FormKit"),c=y;return _(),v("div",x,[t("div",b,[t("div",w,[t("h2",C,o(d.$t("Contact us.")),1),k]),t("div",q,[t("form",V,[t("div",null,[t("div",B,[e(s,{type:"text",autocomplete:"given-name",label:"First name",validation:"required","validation-visibility":"dirty"})])]),t("div",null,[t("div",E,[e(s,{type:"text",autocomplete:"family-name",label:"Family name",validation:"required","validation-visibility":"dirty"})])]),t("div",F,[t("div",N,[e(s,{type:"text",autocomplete:"company",label:"Company",validation:"required","validation-visibility":"dirty"})])]),t("div",P,[t("div",S,[t("div",U,[e(s,{type:"email",autocomplete:"email",label:"Email address",validation:"required|email","validation-visibility":"dirty"})])])]),t("div",j,[t("div",A,[K,e(s,{type:"text",autocomplete:"phone",label:"Phone number",validation:"required","validation-visibility":"dirty"})])]),t("div",$,[t("div",z,[e(s,{type:"textarea",rows:"4",autocomplete:"given-name",label:"Message",validation:"required","validation-visibility":"dirty"})])]),t("div",D,[t("div",L,[t("div",M,[e(f(g),{modelValue:a.value,"onUpdate:modelValue":l[0]||(l[0]=m=>a.value=m),class:r([a.value?"bg-gradient-to-r from-teal-700 to-teal-900":"bg-gray-200","relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"])},{default:n(()=>[Q,t("span",{"aria-hidden":"true",class:r([a.value?"translate-x-5":"translate-x-0","inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"])},null,2)]),_:1},8,["modelValue","class"])]),T])]),t("div",Z,[e(c,{type:"submit",class:"inline-flex w-full items-center justify-center rounded-md border border-transparent bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"},{default:n(()=>[i(" Let's talk ")]),_:1})])])])])])}}});export{J as default};