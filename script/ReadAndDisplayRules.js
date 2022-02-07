const RULES = [];

$(function () {
    $.ajax({
        url: '../data/rules.json', dataType: 'json', success: function (rules) {
            RULES.push(...rules);
            renderRules((_) => true);
        }
    })

    const placeholder = 'what are you looking for ?...';

    $('#searchKeyword')
        .attr('placeholder', placeholder)
        .on('focusin', function () {
            $(this).attr('placeholder', '');
        })
        .on('focusout', function () {
            $(this).attr('placeholder', placeholder)
        })
        .on('keyup change', function () {
            const v = $(this).val();
            const regex = new RegExp(`\w*${v}\w*`);
            renderRules(rule => regex.test(rule['Name'].toLowerCase()));
        })
})

function objToHTML(rule) {
    let description = rule["Description"];
    if (rule["Extra"] != null) {
        description += rule["Extra"].join('<br>')
    }
    let options = "";
    if (rule["Options"] != null) {
        const joinedOptions = "Required options: " + rule["Options"].map(o => `<span class="codeSpan">${o}</span>`).join(', ');
        options += `<li class="ruleListItem"> ${joinedOptions} </li>`
    }
    const categories = rule["Categories"].map(category => `<span class="codeSpan">${category}</span>`).join(', ');

    return `
    <div class="rule">
        <span class="ruleName">${rule['Name']}</span>
        <span class="ruleDesc">${description}</span>
        <ul class="ruleOptions">
            <li class="ruleListItem">Type: <span class="codeSpan">${rule['Type']}</span></li>
            <li class="ruleListItem">Default value: <span class="codeSpan">${rule['Value']}</span></li>
            ${options}
            <li class="ruleListItem">Categories: ${categories}</li>
        </ul>
    </div>
    `
}

function renderRules(predicate) {
    const rulesDiv = $('#rules');
    rulesDiv.empty()
    RULES.filter(predicate).forEach(rule => rulesDiv.append(objToHTML(rule)));
}