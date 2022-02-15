const ALL_RULES = [];
const RULES_PER_PAGE = 25;
const RULES_DIV = $("#rules");
const LOADING_WHEEL = $("#loadingWheel");

let FILTERED_RULES = [];
let currentPage = 0;

$(function () {
    $.ajax({
        url: "data/parsed_data.json",
        dataType: "json",
        success: function (rules) {
            ALL_RULES.push(
                ...rules.sort((r1, r2) => r1.name.localeCompare(r2.name))
            );
            FILTERED_RULES = ALL_RULES.slice();
            // const regex = new RegExp(`\w*preset\w*`);
            // FILTERED_RULES = ALL_RULES.filter((rule) =>
            //     regex.test(rule.name?.toLowerCase())
            // );
            renderRules();
        },
    });

    const placeholder = "what are you looking for ?";

    $("#searchBar")
        .attr("placeholder", placeholder)
        .on("focusin", function () {
            $(this).attr("placeholder", "");
        })
        .on("focusout", function () {
            $(this).attr("placeholder", placeholder);
        })
        .on("keyup change", function (event) {
            if (isInvalid(event)) return;
            const v = $(this).val();
            const regex = new RegExp(`\w*${v.toLowerCase()}\w*`);
            FILTERED_RULES = ALL_RULES.filter((rule) =>
                regex.test(rule.name?.toLowerCase())
            );
            if ((currentPage + 1) * RULES_PER_PAGE >= FILTERED_RULES.length) {
                LOADING_WHEEL.hide();
            }
            RULES_DIV.empty();
            currentPage = 0;
            renderRules();
        });

    window.addEventListener(
        "scroll",
        () => {
            const { scrollTop, scrollHeight, clientHeight } =
                document.documentElement;
            if (
                scrollTop + clientHeight >= scrollHeight - 100 &&
                currentPage * RULES_PER_PAGE < FILTERED_RULES.length
            ) {
                // If we have rules remaining to render and
                renderRules();
                LOADING_WHEEL.hide();
            } else {
                LOADING_WHEEL.show();
            }
            // If all rules are loaded. hide the wheel.
            if ((currentPage + 1) * RULES_PER_PAGE >= FILTERED_RULES.length) {
                LOADING_WHEEL.hide();
            }
        },
        { passive: true }
    );

    $("#topButton").on("click", function () {
        document.documentElement.scrollTo({ top: 0 });
    });
});

function isInvalid(event) {
    // shift, ctrl, alt, pageup, pagedown
    return [16, 17, 18, 33, 34].includes(event.keyCode);
}

function wrapWithSpan(list, convertToUpperCase = false) {
    return list
        .sort()
        .map((val) =>
            convertToUpperCase ? val.toUpperCase() : val.toLowerCase()
        )
        .map((val) => `<span class="codeSpan">${val}</span>`)
        .join(",&nbsp;");
}

function wrapRepo(repo) {
    return `<a href="https://github.com/${repo}" class="link">${repo}</a>`;
}

function wrapBranches(repo, branches) {
    return branches
        .sort()
        .map((branch) => {
            return `
                <a href="https://github.com/${repo}/tree/${branch}" class="link">
                    ${branch}
                </a>
            `;
        })
        .join(",&nbsp;");
}

function objToHTML(rule) {
    let description = rule["description"];
    if (rule["extras"] !== null) {
        description += rule["extras"].map((e) => `<div>${e}</div>`).join("");
    }

    let options = "";
    if (rule["options"] !== null) {
        options = wrapWithSpan(rule["options"].map((v) => v.toLowerCase()));
    }

    let additionalNotes = "";
    if (rule["validators"]?.length > 0) {
        additionalNotes = rule["validators"].sort();
    }

    return new RuleHTMLBuilder()
        .withName(rule.name)
        .withDesc(description)
        .withType(wrapWithSpan([rule.type]))
        .withDefaultValue(wrapWithSpan([rule.value]))
        .withCategory(wrapWithSpan(rule.categories, true))
        .withOptions(options, rule.strict)
        .withAdditionalInfo(additionalNotes)
        .withRepo(wrapRepo(rule["repo"]))
        .withBranches(wrapBranches(rule["repo"], rule["branches"]))
        .build();
}

function renderRules() {
    const prev = RULES_PER_PAGE * currentPage;
    currentPage++;
    const next = RULES_PER_PAGE * currentPage;
    const newRules = FILTERED_RULES.slice(prev, next);
    newRules.forEach((rule) => RULES_DIV.append(objToHTML(rule)));
}
