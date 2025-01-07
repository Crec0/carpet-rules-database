import rawRules from "$lib/assets/rules.json";
import { parse as valibotParse } from "valibot";
import { type Rules, RulesSchema } from "$lib/types";


function dedupe(categories: string[] | null): string[] {
    if (!categories || categories.length === 0) {
        return [];
    }
    return [ ...new Set(categories.flatMap(t => t.split(",")).map(t => t.trim())) ];
}

class AppState {

    nameFilter: string = $state("");
    descriptionFilter: string = $state("");
    typeFilter: string[] = $state([]);
    repoFilter: string[] = $state([]);
    categoryFilter: string[] = $state([]);


    private _rules: Rules = valibotParse(RulesSchema, rawRules)
        .map(rule => {
            rule.categories = dedupe(rule.categories)
            return rule;
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    private _types: string[] = [ ...new Set(this._rules
        .filter(r => r.type)
        .map((r) => r.type)) ]
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    private _repositories: string[] = [ ...new Set(this._rules
        .filter(r => r.repo)
        .map((r) => r.repo)) ]
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    private _categories: string[] = [ ...new Set(
        this._rules
            .filter(r => r.categories)
            .flatMap(r => r.categories!.flat())
            .flatMap(a => a.split(",").map(b => b.trim()))
    ) ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    private _filteredRules = $derived.by(() =>
        this._rules.filter((rule) => {
            const name = rule.name.toLowerCase();
            const description = rule.description?.toLowerCase() ?? "";
            const type = rule.type ?? "";
            const repo = rule.repo ?? "";
            const categories = rule.categories ?? [];

            return (
                this.nameFilter.toLowerCase().split("|").some(s => name.includes(s)) &&
                this.descriptionFilter.toLowerCase().split("|").some(s => description.includes(s)) &&
                ( this.typeFilter.length === 0 || this.typeFilter.includes(type!) ) &&
                ( this.repoFilter.length === 0 || this.repoFilter.includes(repo!) ) &&
                ( this.categoryFilter.length === 0 || this.categoryFilter.some((c) => categories.includes(c)) )
            );
        }));

    private _filteredRulesCount = $derived.by(() => this.filteredRules.length);

    get allRules(): Rules {
        return this._rules;
    }

    get types(): string[] {
        return this._types;
    }

    get repositories(): string[] {
        return this._repositories;
    }

    get categories(): string[] {
        return this._categories;
    }

    get filteredRules(): Rules {
        return this._filteredRules;
    }

    get rulesCount(): number {
        return this._filteredRulesCount;
    }
}

export const gState = new AppState();