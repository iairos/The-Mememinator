"use strict";
let gMeme;
const gImg = [];
const IMG_CARD_KEY = "imgDB";
const MEME_KEY = "memeDB";
const gIconBtns = [];
const ICON_ALT = [
  "Add",
  "AlignToLeft",
  "AlignToRight",
  "CenterTextAlignment",
  "DecreaseFontIcon",
  "FacebookLogo",
  "GithubLogo",
  "IncreaseFontIcon",
  "LinkedinLogo",
  "PaintBoardAndBrush",
  "TextStroke",
  "Trash",
  "UpAndDownOppositeDoubleArrowsSideBySide",
];
const IMG_ALT = [
  "trump",
  "lab pupys",
  "baby and dog sleeping",
  "sleeping cat",
  "cute baby boy",
  "hands describing",
  "surprised kid",
  "thinking",
  "kid planning something",
  "barak obama",
  "gay something",
  "yatzata tzadik",
  "the great gatsby Dicaprio",
  "some dude with eye glass",
  "a random dude doing something",
  "star trak",
  "vladimir puttin",
  "toystory",
];

creatImgCards();
createIconBtns();

function createMeme(selectedImgId, selectedLineIdx) {
  gMeme = {
    selectedImgId,
    selectedLineIdx,
    lines: [
      {
        txt: "I sometimes eat Falafel",
        size: 20,
        align: "left",
        color: "red",
      },
    ],
  };
  _saveMemeToStorage();
}

function _saveMemeToStorage() {
  saveToStorage(MEME_KEY, gMeme);
}

function getMeme() {
  const meme = loadFromStorage(MEME_KEY);
  return meme;
}
function creatImgCard(id, alt) {
  const img = {
    id,
    alt,
    keywords: alt.replaceAll(" ", ",").split(),
    url: `img/${id}.jpg`,
  };
  return img;
}
function createIconBtn(btnName) {
  const icon = {
    btnName,
    url: `ICONS/${btnName}.png`,
  };
  return icon;
}
function createIconBtns() {
  ICON_ALT.forEach((alt) => {
    gIconBtns.push(createIconBtn(alt));
  });
}
function getIconBtns() {
  return gIconBtns;
}

function creatImgCards() {
  IMG_ALT.forEach((alt, i) => {
    gImg.push(creatImgCard(i + 1, alt));
  });
  console.log(gImg);
  _saveImgCardsToStorage();
}
function _saveImgCardsToStorage() {
  saveToStorage(IMG_CARD_KEY, gImg);
}
function getImgCards() {
  const imgCards = loadFromStorage(IMG_CARD_KEY);
  return imgCards;
}

function searchImages(letters, images) {
  return images.filter((image) => {
    const keywords = image.keywords.join("").toLowerCase();
    return keywords.includes(letters.toLowerCase());
  });
}

function setTxt(value) {
  gMeme.lines[gMeme.selectedLineIdx].txt = value;
  _saveMemeToStorage();
}
function setColor(value) {
  gMeme.lines[gMeme.selectedLineIdx].color = value;
  _saveMemeToStorage();
}

function decreaseSize(value) {
  gMeme.lines[gMeme.selectedLineIdx].size -= 1;
  _saveMemeToStorage();
}
function increaseSize(value) {
  gMeme.lines[gMeme.selectedLineIdx].size += 1;
  _saveMemeToStorage();
}

function changeLine() {
  gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % 2;
  _saveMemeToStorage();
}

function addRow() {
  gMeme.lines.push({ ...gMeme.lines[gMeme.selectedLineIdx] });
  _saveMemeToStorage();
}

function deleteRow() {
  gMeme.lines = [gMeme.lines[(gMeme.selectedLineIdx + 1) % 2]];
  gMeme.selectedLineIdx = 0;
  _saveMemeToStorage();
}
