/*chrome.runtime.onInstalled.addListener(function() {
    let promt = prompt(
        "What's your access token (required for some operations)?"
    );
    userToken = promt;
    console.log(userToken);
});
*/

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
            "*://gitlab.loc/*/boards*/issues/*",
            "https://git.iu7.bmstu.ru/-/boards*/issues/*",
            "*://gitlab.com/*/boards*/issues/*",
        ],
    }
);
