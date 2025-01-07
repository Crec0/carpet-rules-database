<script lang="ts">

    import { ExternalLink } from "lucide-svelte";
    import { Badge } from "$lib/components/ui/badge";


    interface Props {
        href: string;
        name: string | undefined;
    }


    const {
        href,
        name = URL.parse(href)?.host
    }: Props = $props();

</script>

{#if name == null}
    <Badge class="text-sm ring-1 space-x-2 ring-secondary-foreground/20 stroke-foreground" variant="secondary">
        <span>{href}</span>
    </Badge>
{:else}
    <Badge class="text-sm ring-1 space-x-2 ring-secondary-foreground/20 stroke-foreground" {href} variant="secondary">
        <span>{name}</span>
        <ExternalLink class="h-4 w-4" />
    </Badge>
{/if}
