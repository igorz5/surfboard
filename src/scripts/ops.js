const sections = $(".section");
const content = $(".page-content");

const scrollTimeoutMS = 400;

let currentPage = 0;
let nextPageScroll = Date.now();
let canScroll = true;

window.addEventListener("wheel", function (e) {
  if (e.deltaY > 0) {
    nextPage();
  } else {
    prevPage();
  }
});

function nextPage() {
  if (!canScroll) return;
  if (currentPage >= sections.length - 1) return;
  if (nextPageScroll > Date.now()) return;

  currentPage++;
  scrollToPage(currentPage);
  nextPageScroll = Date.now() + scrollTimeoutMS;
}

function prevPage() {
  if (!canScroll) return;
  if (currentPage <= 0) return;
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
let lastTime = 0;
let startTimeReset = 60;
let minDist = 40;

$("body").on("touchstart", function (e) {
  if (e.touches.length > 1) return;

  startY = e.touches[0].screenY;
  endY = startY;
});

$("body").on("touchmove", function (e) {
  if (e.touches.length > 1) return;

  if (e.timeStamp > lastTime + startTimeReset) {
    startY = e.touches[0].screenY;
  }

  endY = e.touches[0].screenY;
  lastTime = e.timeStamp;
});

$("body").on("touchend", function (e) {
  let d = startY - endY;
  let delta = Math.sign(d);

  if (Math.abs(d) >= minDist) {
    if (delta > 0) {
      nextPage();
    } else {
      prevPage();
    }
  }
});
