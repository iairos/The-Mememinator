"use strict";
let gElCanvas;
let gCtx;
let gIsClicked = false;
let gImgFile;

function onInit() {
  renderTemplates();
}
function onSearchBox(ev) {}

function downloadImg(elLink) {
  //TODO:
  const imgContent = gElCanvas.toDataURL("image/jpeg"); // image/jpeg the default format
  elLink.href = imgContent;
  gIsClicked = true;
}

//TODO: not called
function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container");
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
}

function renderTemplates() {
  const imgCards = getImgCards();
  const elSearchBox = document.querySelector("#site-search").value;
  const images = searchImages(elSearchBox, imgCards);
  // const images = searchImages(gElSearchBox, imgCards);
  const strHtmls = images.map(
    (imgCard) => `
        <article class="img-preview">

            <img onclick="onSelectTemplate('${imgCard.url}','${imgCard.id}')" title="Photo of ${imgCard.alt}" onerror="this.src='img/default.jpg'" src="${imgCard.url}" alt="${imgCard.alt}">
        </article>
        `
  );

  document.querySelector(".img-container").innerHTML = strHtmls.join("");
}
function renderEditor() {
  const btns = getIconBtns();
  const strHtmls = btns.map((btn) => {
    if (btn.btnName == "PaintBoardAndBrush") {
      return `      <article class="btn-preview">
      <input type='color' onchange="on${btn.btnName}(event)">
          <img   onerror="this.src='img/default.png'" src="${btn.url}" alt="${btn.btnName}">
          </input>
          </article>`;
    }
    return `
      <article class="btn-preview">
      <button onclick="on${btn.btnName}(event)">
          <img   onerror="this.src='img/default.png'" src="${btn.url}" alt="${btn.btnName}">
          </button>
          </article>
      `;
  });
  document.querySelector(".editor-container").innerHTML += strHtmls.join("");
}

function onImgInput(ev) {
  loadImageFromInput(ev, toEditorView);
}
function onSelectTemplate(url, id) {
  createMeme(id, 0);
  drawImgFromGallery(url, toEditorView);
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

function onDisplayTxt(ev) {
  const topText = ev.target.value;
  self.setTxt(topText);
  self.renderMeme();
}

function renderMeme() {
  gCtx.clearRect(0, 0, gElCanvas.height, gElCanvas.width);
  gCtx.drawImage(gImgFile, 0, 0, gElCanvas.width, gElCanvas.height);
  const meme = getMeme();
  const numOfLines = meme.lines.length;
  for (let i = 0; i < numOfLines; i++) {
    const line = meme.lines[i];
    gCtx.font = line.size + "px Arial";
    gCtx.lineWidth = 8;
    gCtx.textAlign = "center";
    gCtx.strokeStyle = "black";
    gCtx.fillStyle = line.color;
    const textX = gElCanvas.width / 2;
    const textY = i % 2 == 0 ? 50 : 450;
    gCtx.strokeText(line.txt, textX, textY);
    gCtx.fillText(line.txt, textX, textY);
    // if (meme.selectedLineIdx == i) {
    //   shadowRect(
    //     gCtx,
    //     textX / 2,
    //     textY,
    //     line.txt.length * line.size,
    //     line.size + 5,
    //     5,
    //     "gray"
    //   );
    // }
  }
}

function hideAndShowSelectors() {
  const elGalleryWrapper = document.querySelector(".gallery-wrapper");
  const elEditorWrapper = document.querySelector(".editor-wrapper");
  elGalleryWrapper.classList.add("hide");
  elEditorWrapper.style.display = "flex";
}

function toEditorView(img) {
  gImgFile = img;
  gElCanvas = document.getElementById("canvas");
  gCtx = gElCanvas.getContext("2d");
  const elCanvasContainer = document.querySelector(".canvas-container");
  elCanvasContainer.style.width = 60 + "vw";
  elCanvasContainer.style.height = 75 + "vh";

  renderEditor();
  hideAndShowSelectors();
  renderMeme();
}
function onPaintBoardAndBrush(ev) {
  setColor(ev.target.value);
  renderMeme();
}

function onIncreaseFontIcon() {
  increaseSize();
  renderMeme();
}

function onDecreaseFontIcon() {
  decreaseSize();
  renderMeme();
}

function onUpAndDownOppositeDoubleArrowsSideBySide(event) {
  if (getMeme().lines.length == 2) {
    changeLine();
    renderMeme();
  }
}

function onAdd(event) {
  if (getMeme().lines.length == 2) {
    alert("Only two rows allowed");
    return;
  }
  addRow();
  renderMeme();
}

function onTrash() {
  if (getMeme().lines.length == 1) {
    alert("You cant delete the only row");
    return;
  }
  deleteRow();
  renderMeme();
}
function shadowRect(ctx, x, y, w, h, repeats, color) {
  // set stroke & shadow to the same color
  ctx.strokeStyle = color;
  ctx.shadowColor = color;
  // set initial blur of 3px
  ctx.shadowBlur = 3;
  // repeatedly overdraw the blur to make it prominent
  for (var i = 0; i < repeats; i++) {
    // increase the size of blur
    ctx.shadowBlur += 0.25;
    // stroke the rect (which also draws its shadow)
    ctx.strokeRect(x, y, w, h);
  }
  // cancel shadowing by making the shadowColor transparent
  ctx.shadowColor = "rgba(0,0,0,0)";
  // restroke the interior of the rect for a more solid colored center
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
}
