// ==UserScript==
// @name         Reorder questions
// @namespace    http://oddbit.com/
// @version      0.5
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

    // questions are contained in <div id="question-mini-list"></div>
    var qres = document.evaluate(
        `//div[@id = "question-mini-list"]/div`,
        document.documentElement,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    );

    // get a list of unanswered questions
    var selected = document.evaluate (
        `//div[contains(@class, "s-post-summary") and ./div/div[contains(@title, "0 answers")]]`,
        document.documentElement,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    var questions = qres.singleNodeValue
    for (let i=selected.snapshotLength; i > 0; i--) {
        let thisNode = selected.snapshotItem(i-1)
        questions.insertAdjacentElement('afterbegin', thisNode)
    }
})();
