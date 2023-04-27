"use strict";
let gElCanvas;
let gCtx;

function onInit() {
  renderTemplates();
  gElCanvas = document.getElementById("my-canvas");
  gCtx = gElCanvas.getContext("2d");
  resizeCanvas();
}

function downloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL("image/jpeg"); // image/jpeg the default format
  elLink.href = imgContent;
}

function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container");
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
}

function renderTemplates() {
  const imgCards = getImgCards();
  const strHtmls = imgCards.map(
    (imgCard) => `
        <article class="img-preview">

            <img onclick="onSelectTemplate('${imgCard.url}')" title="Photo of ${imgCard.alt}" onerror="this.src='img/default.jpg'" src="${imgCard.url}" alt="${imgCard.alt}">
        </article>
        `
  );
  document.querySelector(".img-container").innerHTML = strHtmls.join("");
}

function renderMeme() {
  // set the text style
  const topText = prompt("somthing");
  gCtx.font = "36px Arial";
  gCtx.fillStyle = "white";
  gCtx.strokeStyle = "black";
  gCtx.lineWidth = 2;
  gCtx.textAlign = "center";

  // draw the top text on the canvas
  const textX = gElCanvas.width / 2;
  const textY = 50;
  gCtx.strokeText(topText, textX, textY);
  gCtx.fillText(topText, textX, textY);
}
