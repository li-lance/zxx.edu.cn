// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  let currentIndex = 0; // Start from the first video

  function playNextVideo() {
    let currentEle = document.getElementsByClassName("resource-item resource-item-train");
    if (currentIndex < currentEle.length) {
      currentEle[currentIndex].click(); // Click the current video
      currentIndex++; // Move to the next video
    } else {
      console.log("All videos have been played.");
    }
  }

  let video = document.querySelector('video');
  if (video) {
    video.autoplay = true;
    video.play();
    video.playbackRate = 2;

    video.addEventListener("ended", () => {
      setTimeout(() => {
        playNextVideo();
      }, 1000);
    });
  } else {
    console.error("No video element found on the page.");
  }
}