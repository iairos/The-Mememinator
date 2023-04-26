"use strict";

function onInit() {
  renderTemplates();
}

function renderTemplates() {
  const imgCards = getImgCards();
  const strHtmls = imgCards.map(
    (imgCard) => `
        <article class="img-preview">

            <img onclick="onSelectTemplate('${imgCard.id}')" title="Photo of ${imgCard.alt}" onerror="this.src='img/default.jpg'" src="img/${imgCard.id}.jpg" alt="${imgCard.alt}">
        </article>
        `
  );
  document.querySelector(".img-container").innerHTML = strHtmls.join("");
}
