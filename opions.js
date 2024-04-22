document.addEventListener('DOMContentLoaded', function() {
    // Load the current settings from storage
    chrome.storage.sync.get(['notificationInterval', 'themeColor'], function(items) {
        document.getElementById('notificationInterval').value = items.notificationInterval || 30;
        document.getElementById('themeColor').value = items.themeColor || 'light';
    });

    // Save the settings when the form is submitted
    document.getElementById('settingsForm').addEventListener('submit', function(e) {
        e.preventDefault();  // Prevent the default form submission

        const notificationInterval = document.getElementById('notificationInterval').value;
        const themeColor = document.getElementById('themeColor').value;

        chrome.storage.sync.set({
            notificationInterval: notificationInterval,
            themeColor: themeColor
        }, function() {
            // Update status to let user know options were saved
            alert('Settings saved!');
        });
    });
});