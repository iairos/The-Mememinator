"use strict";
let gElCanvas;
let gCtx;
let gIsClicked = false;

function onInit() {
  renderTemplates();
}

function renderCanvas() {
  const strHtml = `
  <canvas id="my-canvas" width="500" height="500"></canvas>
`;
}
function downloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL("image/jpeg"); // image/jpeg the default format
  elLink.href = imgContent;
  gIsClicked = true;
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
function renderEditor() {
  const btns = getIconBtns();
  console.log(btns);
  const strHtmls = btns.map(
    (btn) => `
      <article class="btn-preview">

          <img onclick="on${btn.btnName}(event)"  onerror="this.src='img/default.png'" src="${btn.url}" alt="${btn.btnName}">
      </article>
      `
  );
  document.querySelector(".editor-container").innerHTML += strHtmls.join("");
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg);
}
function onSelectTemplate(url) {
  // renderMeme(url);

  console.log(url);
  drawImgFromGallery(url, renderImg);
}

function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader();
  // After we read the file
  reader.onload = function (event) {
    let img = new Image(); // Create a new html img element
    img.src = event.target.result; // Set the img src to the img file we read
    // Run the callBack func, To render the img on the canvas
    img.onload = onImageReady.bind(null, img);
    // Can also do it this way:
    // img.onload = () => onImageReady(img)
  };
  reader.readAsDataURL(ev.target.files[0]); // Read the file we picked
}

function drawImgFromGallery(url, onImageReady) {
  const img = new Image();
  img.src = url;
  img.onload = onImageReady.bind(null, img);
}

function onDisplayTxt() {
  gCtx.font = "36px Arial";
  gCtx.fillStyle = "black";
  gCtx.strokeStyle = "black";
  gCtx.lineWidth = 2;
  gCtx.textAlign = "center";
  const topText = document.querySelector(".meme-txt").value;
  const textX = gElCanvas.width / 2;
  const textY = 50;
  gCtx.strokeText(topText, textX, textY);
}
function renderMeme() {
  onDisplayTxt();
}
function hideAndShowSelectors() {
  const elGallery = document.querySelector(".img-container");
  const elFileInput = document.querySelector(".file-input-container");
  const elTxtInputHolder = document.querySelector(".txt-input-holder");
  const elUploadImgBox = document.querySelector(".upload-btn-container");
  const elDownloadImgBox = document.querySelector(".download-img-container");
  const elCanvas = document.querySelector("canvas");
  const elsearchBox = document.querySelector(".searchBox");

  elTxtInputHolder.hidden = false;

  elCanvas.classList.remove("hide");
  elUploadImgBox.classList.remove("hide");
  elDownloadImgBox.classList.remove("hide");
  elsearchBox.classList.add("hide");
  elFileInput.classList.add("hide");
  elGallery.classList.add("hide");
}

function renderImg(img) {
  gElCanvas = document.getElementById("my-canvas");
  gCtx = gElCanvas.getContext("2d");
  const elCanvasContainer = document.querySelector(".canvas-container");
  elCanvasContainer.style.width = 60 + "vw";
  elCanvasContainer.style.height = 85 + "vh";

  resizeCanvas();
  renderMeme();
  renderEditor();
  hideAndShowSelectors();

  // Draw the img on the canvas
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}
