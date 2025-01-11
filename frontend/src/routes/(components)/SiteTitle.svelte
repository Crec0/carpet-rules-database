<script lang="ts">
    import { Database } from "lucide-svelte";
    import { sha } from "$lib/assets/sha.json";

    interface Props {
        background?: string;
    }

    let {
        background = ""
    }: Props = $props();
</script>

<div class="sticky top-0 {background} flex flex-col px-4 py-2 pr-0">
    <span class="flex items-center text-2xl space-x-2">
        <span>Carpet Rules</span>
        <Database class="h-6 w-6" />
    </span>
    <span class="text-xs text-muted-foreground">@{sha}</span>
</div>
