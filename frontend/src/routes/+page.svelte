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
    import { page } from "$app/state";
    import { onMount, untrack } from "svelte";
    import { goto } from "$app/navigation";
    import { StepBack, StepForward } from "lucide-svelte";


    const availablePerPage = [ "10", "25", "50", "75", "100" ];

    let currentPage = $state(1);
    let selectedPerPage = $state("50");

    const sidebar = useSidebar();

    const perPage = $derived(Number(selectedPerPage));
    const pageStart = $derived(( currentPage - 1 ) * perPage);
    const pageEnd = $derived(pageStart + perPage);

    onMount(() => {
        const params = page.url.searchParams;
        const name = params.getAll("name");
        const description = params.getAll("category");
        const type = params.getAll("type");
        const repo = params.getAll("repo");
        const category = params.getAll("category");

        gState.nameFilter = name.join("|");
        gState.descriptionFilter = description.join("|");
        gState.typeFilter = type;
        gState.repoFilter = repo;
        gState.categoryFilter = category;

        window.umami.track("visit-params", { params: page.url.search });

        $effect(() => {
            const params = new URLSearchParams();
            gState.nameFilter.split("|").filter(d => d).forEach(v => params.append("name", v));
            gState.descriptionFilter.split("|").filter(d => d).forEach(v => params.append("description", v));
            gState.typeFilter.forEach(v => params.append("type", v));
            gState.repoFilter.forEach(v => params.append("repo", v));
            gState.categoryFilter.forEach(v => params.append("category", v));

            untrack(() => {
                page.url.search = params.toString();
                goto(page.url, { replaceState: true, keepFocus: true, noScroll: true });
            });
        });
    });
</script>


<div class="sticky flex items-center justify-between border-b p-2 shadow-sm bg-background space-x-2">
    {#if sidebar.isMobile || !sidebar.open}
        <SiteTitle background="bg-background" />
    {/if}
    <div class="invisible px-2 pt-2 md:visible">
        <SidebarTrigger class="[&_svg]:size-6" />
    </div>
    <div class="px-2 pt-2">
        <ThemeSwitcher />
    </div>
</div>

<div class="mb-14 grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 2xl:grid-cols-3">
    {#each gState.filteredRules.slice(pageStart, pageEnd) as rule}
        <Rule {rule} />
    {/each}
</div>

<div
    class={cn("fixed bottom-0 flex w-full flex-col items-center justify-center gap-1 border-t p-2 shadow-sm duration-200 ease-linear space-x-4 bg-background contents-center transition-[width] md:flex-row", !sidebar.isMobile && sidebar.open ? "w-[calc(100%-var(--sidebar-width))]" : "")}>
    <Pagination bind:page={currentPage} class="mx-0 gap-0 md:gap-1" count={gState.rulesCount} perPage={perPage}
                siblingCount={1}>
        {#snippet children({ pages, currentPage })}
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevButton>
                        <StepBack />
                    </PaginationPrevButton>
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
                    <PaginationNextButton>
                        <StepForward />
                    </PaginationNextButton>
                </PaginationItem>
            </PaginationContent>
        {/snippet}
    </Pagination>
    <div class="flex w-full md:w-max items-center justify-between gap-x-4">
        <div class="visible md:hidden">
            <SidebarTrigger class="[&_svg]:size-6" />
        </div>
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
        <div class="invisible md:hidden">
            <SidebarTrigger />
        </div>
    </div>
</div>
