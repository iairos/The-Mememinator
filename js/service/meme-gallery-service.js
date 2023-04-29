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
