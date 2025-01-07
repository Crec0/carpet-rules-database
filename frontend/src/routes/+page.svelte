<script lang="ts">
    import rawRules from "$lib/assets/rules.json";
    import { parse as valibotParse } from "valibot";
    import type { Rules } from "$lib/types";
    import { RulesSchema } from "$lib/types.js";
    import {
        Pagination,
        PaginationContent,
        PaginationEllipsis,
        PaginationItem,
        PaginationLink,
        PaginationNextButton,
        PaginationPrevButton
    } from "$lib/components/ui/pagination";
    import Rule from "./(components)/Rule.svelte";
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
    import { SidebarTrigger, useSidebar } from "$lib/components/ui/sidebar";
    import { cn } from "$lib/utils";


    let currentPage = $state(1);

    const PER_PAGE = 50;
    const sidebar = useSidebar();
    const pageStart = $derived(( currentPage - 1 ) * PER_PAGE);
    const pageEnd = $derived(pageStart + PER_PAGE);
    const parsedRules: Rules = valibotParse(RulesSchema, rawRules).sort((a, b) => a.name.localeCompare(b.name));
</script>

<div class="sticky top-0 flex items-center border-b p-2 shadow-sm bg-background space-x-2">
    <SidebarTrigger />
    <ThemeSwitcher />
</div>

<div class="mb-14 grid grid-cols-2 gap-4 p-4">
    {#each parsedRules.slice(pageStart, pageEnd) as rule}
    <!--{#each parsedRules.filter(r => r.name === "accurateAzaleaLeafDistribution" || r.name === "hopperUpdateFix" || r.name === "reachDistance").slice(pageStart, pageEnd) as rule}-->
        <Rule {rule} />
    {/each}
</div>

<div
    class={cn("fixed bottom-0 w-full border-t p-2 shadow-sm duration-200 ease-linear bg-background contents-center transition-[width]", sidebar.open ? "w-[calc(100%-var(--sidebar-width))]" : "")}>
    <Pagination bind:page={currentPage} class="w-max" count={parsedRules.length} perPage={PER_PAGE}>
        {#snippet children({ pages, currentPage })}
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevButton />
                </PaginationItem>
                {#each pages as page (page.key)}
                    {#if page.type === "ellipsis"}
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    {:else}
                        <PaginationItem class={{visibility: currentPage === page.value}}>
                            <PaginationLink {page} isActive={currentPage === page.value}>
                                {page.value}
                            </PaginationLink>
                        </PaginationItem>
                    {/if}
                {/each}
                <PaginationItem>
                    <PaginationNextButton />
                </PaginationItem>
            </PaginationContent>
        {/snippet}
    </Pagination>
</div>
