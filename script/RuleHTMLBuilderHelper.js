class RuleHTMLBuilder {
    constructor() {
        this.__element = "<div class='rule'>";
    }

    withName(name) {
        this.__element += `<div class="ruleName break-words scrollbar-none">${name}</div>`;
        return this;
    }

    withDesc(description) {
        this.__element += `<div class="ruleDesc">${replace_bugs_with_links(description)}</div>`;
        return this;
    }

    withType(type) {
        this.addAttribute(`Type:&nbsp;${type}`);
        return this;
    }

    withDefaultValue(value) {
        this.addAttribute(
            `Default value:&nbsp;${value}`,
            "break-words whitespace-nowrap"
        );
        return this;
    }

    withOptions(options, strict = true) {
        if (options !== "") {
            this.addWrappingAttribute(
                `${strict ? "Required" : "Suggested"} options:&nbsp;`,
                options,
                "break-words"
            );
        }
        return this;
    }

    withCategory(categories) {
        this.addWrappingAttribute("Categories:&nbsp;", categories);
        return this;
    }

    withAdditionalInfo(info) {
        if (info !== "") {
            this.addAttribute(
                `Additional Notes:&nbsp;<div class="font-normal indent-8">${info}</div>`
            );
        }
        return this;
    }

    withRepo(repo) {
        this.addAttribute(
            `Repo:&nbsp;${repo}`,
            "break-words"
        );
        return this;
    }

    withBranches(branches) {
        this.addAttribute(`Branches:&nbsp;${branches}`, "break-words");
        return this;
    }

    build() {
        this.__element += `</div>`;
        return this.__element;
    }

    addAttribute(value, extraClass = "") {
        this.__element += `<div class="font-bold ${extraClass}">${value}</div>`;
    }

    addWrappingAttribute(name, value, extraClass = "") {
        this.__element += `
            <div class="font-bold flex ${extraClass}">
                <span class="mt-0.5 whitespace-nowrap">${name}</span>
                <div class="inline-block max-w-4xl">${value}</div>
            </div>
        `;
    }
}

const MOJANG_BUG = new RegExp(/((?:MC|MCAPI|MCCE|MCD|MCL|MCPE|REALMS|BDS|WEB)-\d+)/g)

const replace_bugs_with_links = function (text) {
    return text.replaceAll(MOJANG_BUG, '<a href="https://bugs.mojang.com/browse/$1" class="link" target="_blank">$1</a>')
}
