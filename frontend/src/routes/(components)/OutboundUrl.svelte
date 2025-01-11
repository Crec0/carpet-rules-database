<script lang="ts">

    import { ExternalLink } from "lucide-svelte";
    import { Badge } from "$lib/components/ui/badge";
    import { onMount } from "svelte";


    interface Props {
        href: string;
        name: string | undefined;
    }


    let { href, name }: Props = $props();

    onMount(() => {
        if (name == null) {
            name = URL.parse(href)?.host;
        }
    });

</script>

{#if name == null}
    <Badge
        class="inline break-words text-sm ring-1 space-x-2 ring-secondary-foreground/20 stroke-foreground"
        variant="secondary">
        <span>{href}</span>
    </Badge>
{:else}
    <Badge class="text-sm w-fit ring-1 space-x-2 ring-secondary-foreground/20 stroke-foreground" {href}
           variant="secondary">
        <span class="w-max max-w-[90%] truncate">{name}</span>
        <ExternalLink class="h-4 w-4" />
    </Badge>
{/if}
