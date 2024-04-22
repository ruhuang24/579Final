// Background script for a Chrome Extension

let timer = null;
let timeSpent = 0;  // Time spent in seconds

// Function to start the timer
function startTimer() {
  if (timer === null) {
    timer = setInterval(() => {
      timeSpent++;
      console.log(`Time spent: ${timeSpent} seconds`);
      // Check for milestones every 60 seconds
      if (timeSpent % 60 === 0) {
        checkMilestones();
      }
    }, 1000);
  }
}

// Function to stop the timer
function stopTimer() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
    console.log("Timer stopped.");
    // Save the time spent to local storage or handle it as needed
    chrome.storage.local.set({ timeSpent });
  }
}

// Function to check milestones and possibly send notifications
function checkMilestones() {
  // Example milestone check (every 10 minutes)
  if (timeSpent % 600 === 0) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'images/icon48.png',
      title: 'Milestone Reached',
      message: 'You have worked for another 10 minutes!',
      priority: 2
    });
  }
}

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.command === "start") {
      startTimer();
      sendResponse({status: "Timer started"});
    } else if (request.command === "stop") {
      stopTimer();
      sendResponse({status: "Timer stopped"});
    }
  }
);

// Ensure to handle storage and loading properly
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ timeSpent: 0 }); // Initialize time spent
  console.log("Extension installed and storage initialized.");
});
