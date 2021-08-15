// ==UserScript==
// @name         Reorder questions
// @namespace    http://oddbit.com/
// @version      0.1
// @description  Reorder questions such that questions with 0 answers are on top
// @author       lars@oddbit.com
// @homepageURL  https://github.com/larsks/sx-question-filter
// @updateURL    https://raw.githubusercontent.com/larsks/sx-question-filter/master/sx-reorder-questions.user.js
// @downloadURL  https://raw.githubusercontent.com/larsks/sx-question-filter/master/sx-reorder-questions.user.js
// @supportURL   https://github.com/larsks/sx-question-filter/issues

// @match        *://serverfault.com/
// @match        *://stackoverflow.com/
// @match        *://superuser.com/
// @match        *://*.stackexchange.com/

// @icon         https://www.google.com/s2/favicons?domain=stackexchange.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var qres = document.evaluate(
        `//div[@id = "question-mini-list"]/div`,
        document.documentElement,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    );

    var selected = document.evaluate (
        `//div[contains(@class, "question-summary") and .//div[contains(@class, "unanswered")]]`,
        document.documentElement,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    var questions = qres.singleNodeValue
    var thisNode
    for (let i=0; thisNode = selected.snapshotItem(i); i++) {
        questions.insertAdjacentElement('afterbegin', thisNode)
    }
})();
