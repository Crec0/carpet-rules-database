<script lang="ts">
    import { Database } from "lucide-svelte";

    interface Props {
        background?: string;
    }

    let {
        background = ""
    }: Props = $props();
</script>

<div class="sticky top-0 flex items-center px-4 py-2 text-2xl space-x-2 {background}">
    <span>Carpet Rules</span>
    <Database class="h-6 w-6" />
</div>
