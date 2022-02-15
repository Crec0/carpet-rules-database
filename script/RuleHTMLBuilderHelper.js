class RuleHTMLBuilder {
    constructor() {
        this.__element = "<div class='rule'>";
    }

    withName(name) {
        this.__element += `<div class="ruleName">${name}</div>`;
        return this;
    }

    withDesc(description) {
        this.__element += `<div class="ruleDesc">${description}</div>`;
        return this;
    }

    withType(type) {
        this.addAttribute(`Type:&nbsp;${type}`);
        return this;
    }

    withDefaultValue(value) {
        this.addAttribute(`Default value:&nbsp;${value}`);
        return this;
    }

    withOptions(options, strict = true) {
        if (options !== "") {
            this.addWrappingAttribute(
                `${strict ? "Required" : "Suggested"} options:&nbsp;`,
                options
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
        this.addAttribute(`Repo:&nbsp;${repo}`);
        return this;
    }

    withBranches(branches) {
        this.addAttribute(`Branches:&nbsp;${branches}`);
        return this;
    }

    build() {
        this.__element += `</div>`;
        return this.__element;
    }

    addAttribute(value) {
        this.__element += `<div class="font-bold">${value}</div>`;
    }

    addWrappingAttribute(name, value) {
        this.__element += `
            <div class="font-bold flex">
                <span class="mt-0.5 whitespace-nowrap">${name}</span>
                <div class="inline-block max-w-4xl">${value}</div>
            </div>
        `;
    }
}
