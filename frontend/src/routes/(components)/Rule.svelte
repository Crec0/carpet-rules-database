<script lang="ts">
    import type { Rule } from "$lib/types";
    import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
    import OutboundUrl from "./OutboundUrl.svelte";
    import { Badge } from "$lib/components/ui/badge";


    interface ParsedText {
        type: string;
        name?: string;
        content: string;
    }

    interface Props {
        rule: Rule;
    }

    let { rule }: Props = $props();

    const URL_REGEX = /(?:\[(?<name>[^\]]+)])?\(?(?<href>[(htps)?:\/w.a-zA-Z0-9@%_+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&\/=]*)\)?/g;

    export function replaceLinksWithHtml(texts: ( string | null )[]): ParsedText[] {
        const inputText = texts.filter(t => t != null && t.trim()).join("\n");
        if ( !inputText ) return [ { type: "text", content: "" } ];

        const uriMatches = inputText.matchAll(URL_REGEX);
        const separated: ParsedText[] = [];

        let consumableInput = inputText;
        let charsEaten = 0;

        for ( const match of uriMatches ) {
            const { name, href } = match.groups as { name: string | undefined, href: string };

            const split = consumableInput.slice(0, match.index - charsEaten);
            consumableInput = consumableInput.slice(match.index - charsEaten + match[0].length);
            charsEaten += match.index + match[0].length;

            separated.push({ type: "text", content: split });
            separated.push({ type: "link", name, content: href });
        }

        if ( consumableInput.length > 0 ) {
            separated.push({ type: "text", content: consumableInput });
        }

        return separated;
    }

    function dedupe(categories: string[]): string[] {
        return [ ...new Set(categories.flatMap(t => t.split(",")).map(t => t.trim())) ];
    }
</script>

<Card>
    <CardHeader>
        <CardTitle class="text-lg">
            {rule.name}
        </CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col">
        <div class="text-base">
            {#each replaceLinksWithHtml([ rule.description ]) as { type, name, content }}
                {#if type === "text"}
                    {content}
                {:else}
                    <OutboundUrl {name} href={content} />
                {/if}
            {/each}
            {#if rule.extras}
                <br />
                {#each replaceLinksWithHtml(rule.extras) as { type, name, content }}
                    {#if type === "text"}
                        {content}
                    {:else}
                        <OutboundUrl {name} href={content} />
                    {/if}
                {/each}
            {/if}
            {#if rule.validators}
                <br />
                {#each replaceLinksWithHtml(rule.validators) as { type, name, content }}
                    {#if type === "text"}
                        {content}
                    {:else}
                        <OutboundUrl {name} href={content} />
                    {/if}
                {/each}
            {/if}
        </div>
        <div class="grid grid-cols-[max-content_1fr] text-sm gap-x-4 gap-y-2 mt-8">
            <span class="font-bold"> Type </span>
            <Badge class="select-text" variant="secondary">{rule.type}</Badge>

            <span class="font-bold"> Default Value </span>
            <Badge class="select-text" variant="secondary">{rule.value}</Badge>

            <span class="font-bold"> Repo </span>
            <OutboundUrl href={`https://github.com/${rule.repo}`} name={rule.repo} />

            {#if rule.options}
                <span class="font-bold">
                    {rule.strict ? "Required" : "Suggested"} options
                </span>
                <span class="flex flex-wrap gap-1">
                    {#each rule.options as option}
                        <Badge variant="secondary" class="select-text">{option}</Badge>
                    {/each}
                </span>
            {/if}
            {#if rule.branches}
                <span class="font-bold"> Branches </span>
                <span class="flex flex-wrap gap-1">
                    {#each rule.branches as branch}
                        <OutboundUrl href={`https://github.com/${rule.repo}/tree/${branch}`} name={branch} />
                    {/each}
                </span>
            {/if}
            {#if rule.categories}
                <span class="font-bold"> Categories </span>
                <span class="flex flex-wrap gap-1">
                    {#each dedupe(rule.categories) as category}
                        <Badge variant="secondary" class="select-text">{category}</Badge>
                    {/each}
                </span>
            {/if}
        </div>
    </CardContent>
</Card>