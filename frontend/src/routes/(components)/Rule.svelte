<script lang="ts">
    import type { Rule } from '$lib/types';
    import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';


    interface Props {
        rule: Rule;
    }


    let { rule }: Props = $props();

    export function replaceMdLinksWithHtml(texts: (string | null)[]) {
        return texts.filter(t => t != null).map(t => t.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>'));
    }
</script>

<Card>
    <CardHeader>
        <CardTitle>
            {rule.name}
        </CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col space-y-2">
        <div>
            {replaceMdLinksWithHtml([rule.description])}
            {#if rule.extras} <br/> {@html replaceMdLinksWithHtml(rule.extras)} {/if}
            {#if rule.validators} <br/> {rule.validators} {/if}
        </div>
        <div>Type: {rule.type}</div>
        <div>Value: {rule.value}</div>
        <div>Repo: {rule.repo}</div>
        <div>Strict: {rule.strict}</div>
        <div>Options: {rule.options}</div>
        <div>Branches: {rule.branches}</div>
        <div>Categories: {rule.categories}</div>
    </CardContent>
</Card>