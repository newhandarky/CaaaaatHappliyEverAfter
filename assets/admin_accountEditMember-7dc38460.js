import"./bootstrap.min-47e23b13.js";import"./admin_header-568a311b.js";import{a as t,_ as a}from"./config-4096d6dc.js";import"./sweetalert2.all-9c5228de.js";const m=location.href.split("=")[1],y=document.querySelector(".memberId"),c=document.querySelector(".memberName"),n=document.querySelector(".memberNickname"),o=document.querySelector(".memberTel"),S=document.querySelector(".memberArrivedDate"),r=document.querySelector(".memberEmergencyContact"),u=document.querySelector(".memberEmergencyContactTel"),l=document.querySelector(".memberEmergencyContactRel"),g=document.querySelector(".memberAccount"),d=document.querySelector(".memberPassword"),s=document.querySelector(".memberAddress"),i=document.querySelector(".memberStatus"),q=document.querySelector(".accountEditSaveBtn");t.get(`${a}/users/${m}`).then(function(e){y.value=e.data.id,c.value=e.data.name,n.value=e.data.nickname,o.value=e.data.phone,S.value=e.data.joinDate,r.value=e.data.emergencyContactPerson,u.value=e.data.emergencyContactPhone,l.value=e.data.emergencyContactRelation,g.value=e.data.email,d.value=e.data.email.slice(0,11),s.value=e.data.address,i.value=e.data.memberStatus}).catch(function(e){console.log(e)});q.addEventListener("click",function(e){let b={password:d.value,name:c.value,phone:o.value,address:s.value,nickname:n.value,emergencyContactPerson:r.value,emergencyContactPhone:u.value,emergencyContactRelation:l.value,memberStatus:i.value};t.patch(`${a}/users/${m}`,b).catch(function(v){console.log(v)})});
