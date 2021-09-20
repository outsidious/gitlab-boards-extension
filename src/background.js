chrome.webRequest.onCompleted.addListener(
    function(details) {
        const url = details.url;
        const issueId = url.slice(url.lastIndexOf("/") + 1);
        chrome.tabs.query({ active: true, currentWindow: true }, function(
            tabs
        ) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { action: "move-card", issue: issueId },
                function() {}
            );
        });
    },
    {
        urls: [
            "*://*/*/boards*",
        ],
    }
);
