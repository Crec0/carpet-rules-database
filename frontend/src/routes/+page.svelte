<script lang="ts">

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
    import { gState } from "$lib/app-state.svelte";
    import SiteTitle from "./(components)/SiteTitle.svelte";
    import { Select, SelectContent, SelectItem, SelectTrigger } from "$lib/components/ui/select";


    const availablePerPage = [ "10", "25", "50", "75", "100" ];

    let currentPage = $state(1);
    let selectedPerPage = $state("50");

    const sidebar = useSidebar();

    const perPage = $derived(Number(selectedPerPage));
    const pageStart = $derived(( currentPage - 1 ) * perPage);
    const pageEnd = $derived(pageStart + perPage);
</script>

{#if !sidebar.open}
    <SiteTitle background="bg-background" />
{/if}

<div
    class={cn("sticky flex items-center border-b p-2 shadow-sm bg-background space-x-2", sidebar.open ? "top-0" : "top-12")}>
    <SidebarTrigger />
    <ThemeSwitcher />
</div>

<div class="mb-14 grid grid-cols-2 gap-4 p-4">
    {#each gState.filteredRules.slice(pageStart, pageEnd) as rule}
        <Rule {rule} />
    {/each}
</div>

<div
    class={cn("fixed bottom-0 flex w-full justify-center border-t p-2 shadow-sm duration-200 ease-linear space-x-4 bg-background contents-center transition-[width]", sidebar.open ? "w-[calc(100%-var(--sidebar-width))]" : "")}>
    <Pagination bind:page={currentPage} class="mx-0 w-max" count={gState.rulesCount} perPage={perPage}>
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
    <div class="w-max">
        <Select bind:value={selectedPerPage} type="single">
            <SelectTrigger class="space-x-2">
                <span class="text-sm">Per Page</span>
                <span class="text-sm">{selectedPerPage}</span>
            </SelectTrigger>
            <SelectContent>
                {#each availablePerPage as perPage}
                    <SelectItem value={perPage}>{perPage}</SelectItem>
                {/each}
            </SelectContent>
        </Select>
    </div>
</div>
