chrome.webRequest.onCompleted.addListener(
    function(details) {
        let url = details.url;
        let issueId = url.slice(url.lastIndexOf("/") + 1);
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
