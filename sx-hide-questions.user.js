// ==UserScript==
// @name         Hide closed and/or downvoted questions
// @namespace    http://oddbit.com/
// @version      0.1
// @description  Hide closed and/or downvoted questions on Stack Exchange sites
// @author       lars@oddbit.com
// @homepageURL  https://github.com/larsks/sx-question-filter
// @updateURL    https://raw.githubusercontent.com/larsks/sx-question-filter/master/sx-hide-questions.user.js
// @downloadURL  https://raw.githubusercontent.com/larsks/sx-question-filter/master/sx-hide-questions.user.js
// @supportURL   https://github.com/larsks/sx-question-filter/issues

// @match        *://serverfault.com/
// @match        *://stackoverflow.com/
// @match        *://superuser.com/
// @match        *://*.stackexchange.com/

// @icon         https://www.google.com/s2/favicons?domain=stackexchange.com
// @grant        none
// ==/UserScript==

// CONFIGURATION

// Set hide_closed_questions = false if you do want to hide closed questions
var hide_closed_questions = true;

// Set hide_downvoted_questions = false if you do not want to hide downvoted questions
var hide_downvoted_questions = true;

// Set hide_duplicate_questions = false if you do not want to hide duplicate questions
var hide_duplicate_questions = true;

// Set hide_downvoted_below to configure the threshold for hiding questions based on
// votes. This script will hide questions with a score less than hide_downvoted_below.
var hide_downvoted_below = 0;

// Set use_fadeout_effect = false if you don't want to use the fadeout effect
// (but why would you do a crazy thing like that?)
var use_fadeout_effect = true;

(function() {
    'use strict';

    function hideNodes(nodes) {
        var thisNode
        for (let i=0; thisNode = nodes.snapshotItem(i); i++) {
            if (use_fadeout_effect) {
                fadeOutEffect(thisNode)
            } else {
                thisNode.style.display = "none"
            }
        }

    }

    // https://stackoverflow.com/a/29017547/147356
    function fadeOutEffect(fadeTarget) {
        var fadeEffect = setInterval(function () {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1
            }
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.1
            } else {
                fadeTarget.style.display = "none"
                clearInterval(fadeEffect)
            }
        }, 200);
    }

    // hide all questions that contain "[closed]" in the question title
    if (hide_closed_questions) {
        let selected = document.evaluate (
            '//div[contains(@class, "question-summary") and contains(.//a/text(), "[closed]")]',
            document.documentElement,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null
        );

        hideNodes(selected)
    }

    // hide all questions that contain "[duplicate]" in the question title
    if (hide_duplicate_questions) {
        let selected = document.evaluate (
            '//div[contains(@class, "question-summary") and contains(.//a/text(), "[duplicate]")]',
            document.documentElement,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null
        );

        hideNodes(selected)
    }

    // hide all questions with a score below hide_downvoted_below
    if (hide_downvoted_questions) {
        let selected = document.evaluate (
            `//div[contains(@class, "question-summary") and .//div[@class="votes"]//span[text() < ${hide_downvoted_below}]]`,
            document.documentElement,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null
        );

        hideNodes(selected)
    }
})();
