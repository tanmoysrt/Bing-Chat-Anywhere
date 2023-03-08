const allowed_hosts = [
    'bing.com',
    'www.bing.com'
];

const block_urls = [
    "https://www.bing.com/fd/ls/lsp.aspx",
    "https://o.clarity.ms/collect"
]

chrome.runtime.onInstalled.addListener(() => {
    const RULE = {
        id: 1,
        priority: 3,
        condition: {
            requestDomains: allowed_hosts,
            resourceTypes: [
                'main_frame',
                'xmlhttprequest',
                'csp_report',
                'websocket',
                'webtransport'
            ],
        },
        action: {
            type: 'modifyHeaders',
            requestHeaders: [
                { header: 'user-agent', operation: 'set', value: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.63'},
                { header: 'sec-ch-ua-full-version', operation: 'set', value: "110.0.1587.63" },
                { header: 'sec-ch-ua-full-version-list', operation: 'set', value: '"Chromium";v="110.0.5481.178", "Not A(Brand";v="24.0.0.0", "Microsoft Edge";v="110.0.1587.63"' },
                { header: 'sec-ch-ua', operation: 'set', value: '"Chromium";v="110", "Not A(Brand";v="24", "Microsoft Edge";v="110"' },
            ]
        },
    };

    const BLOCK_RULE_1 = {
        id: 2,
        priority: 1,
        condition: {
            urlFilter: block_urls[0],
            resourceTypes: [
                'main_frame',
                'xmlhttprequest',
                'csp_report'
            ]
        },
        action: {
            type: 'block'
        }
    }

    const BLOCK_RULE_2 = {
        id: 3,
        priority: 1,
        condition: {
            urlFilter: block_urls[1],
            resourceTypes: [
                'main_frame',
                'xmlhttprequest',
                'csp_report'
            ]
        },
        action: {
            type: 'block'
        }
    }

    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [RULE.id, BLOCK_RULE_1.id, BLOCK_RULE_2.id],
        addRules: [RULE, BLOCK_RULE_1, BLOCK_RULE_2],
    });
});
