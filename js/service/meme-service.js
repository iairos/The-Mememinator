"use strict";
const gImg = [];
const IMG_CARD_KEY = "imgDB";
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

function creatImgCard(id, alt) {
  const img = {
    id,
    alt,
    keywords: alt.replaceAll(" ", ",").split(),
    url: `img/${id}.jpg`,
  };
  return img;
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
