import{a as d,S as p,i as c}from"./assets/vendor-CYtofwbP.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const m="https://pixabay.com/api/",y="53058493-523f27a86fb9ebd113797df12";async function h(s){const o={key:y,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40};return(await d.get(m,{params:o})).data}const l=document.querySelector(".gallery"),f=document.querySelector(".loader"),u=new p(".gallery a",{captionsData:"alt",captionDelay:250});function g(s){const o=s.map(t=>`
      <li class="gallery-item">
        <a href="${t.largeImageURL}">
          <img src="${t.webformatURL}" alt="${t.tags}" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${t.likes}</p>
          <p><b>Views:</b> ${t.views}</p>
          <p><b>Comments:</b> ${t.comments}</p>
          <p><b>Downloads:</b> ${t.downloads}</p>
        </div>
      </li>
    `).join("");l.insertAdjacentHTML("beforeend",o),u.refresh()}function b(){l.innerHTML="",u.refresh()}function L(){f.classList.add("is-active")}function v(){f.classList.remove("is-active")}const i=document.querySelector(".form"),w=i.elements["search-text"];i.addEventListener("submit",async s=>{s.preventDefault();const o=w.value.trim();if(o){b(),L();try{const t=await h(o);if(!t.hits.length){c.info({message:"Нічого не знайдено. Спробуй інший запит.",position:"topRight"});return}g(t.hits)}catch{c.error({message:"Сталася помилка під час запиту. Спробуй пізніше.",position:"topRight"})}finally{v()}i.reset()}});
//# sourceMappingURL=index.js.map
