const sections = $(".section");
const content = $(".page-content");

const scrollTimeoutMS = 400;

let currentPage = 0;
let nextPageScroll = Date.now();
let canScroll = true;

// For some reason, the browser saves the scroll and resume
// it when the page reloads, breaking the OPS, so we need to reset it
window.addEventListener("load", function () {
  this.scrollTo(0, 0);
});

window.addEventListener("wheel", function (e) {
  if (e.deltaY > 0) {
    nextPage();
  } else {
    prevPage();
  }
});

function nextPage() {
  if (!canScroll) return;
  if (currentPage > sections.length - 1) return;
  if (nextPageScroll > Date.now()) return;

  currentPage++;
  scrollToPage(currentPage);
  nextPageScroll = Date.now() + scrollTimeoutMS;
}

function prevPage() {
  if (!canScroll) return;
  if (currentPage > sections.length - 1) return;
  if (nextPageScroll > Date.now()) return;

  currentPage--;
  scrollToPage(currentPage);
  nextPageScroll = Date.now() + scrollTimeoutMS;
}

function scrollToPage(idx) {
  if (idx >= 0 && idx <= sections.length - 1) {
    const offset = idx * 100;
    content.css("transform", `translateY(${-offset}%)`);
    currentPage = idx;

    updateFixedMenu();
  }
}

function getSectionIndexByName(name) {
  const arr = sections.toArray();

  return arr.findIndex((elem) => $(elem).attr("data-section") === name);
}

function getCurrentPage() {
  return currentPage;
}

function lockScroll() {
  canScroll = false;
}

function unlockScroll() {
  canScroll = true;
}

// Mobile

let startY = 0;
let endY = 0;
let minDist = 40;
let touchMoved = false;

$("body").on("touchstart", function (e) {
  startY = e.touches[0].screenY;
});

$("body").on("touchmove", function (e) {
  endY = e.touches[0].screenY;

  touchMoved = true;
});

$("body").on("touchend", function (e) {
  if (!touchMoved) return;

  touchMoved = false;

  let d = startY - endY;
  let delta = Math.sign(d);

  if (Math.abs(d) >= minDist) {
    if (delta > 0) {
      nextPage();
    } else if (delta < 0) {
      prevPage();
    }
  }
});
