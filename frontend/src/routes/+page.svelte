<script lang="ts">
    import rawRules from '$lib/assets/rules.json';
    import { parse as valibotParse } from 'valibot'; // 1.24 kB
    import type { Rules } from '$lib/types';
    import { RulesSchema } from '$lib/types.js';
    import {
        Pagination,
        PaginationContent,
        PaginationEllipsis,
        PaginationItem,
        PaginationLink,
        PaginationNextButton,
        PaginationPrevButton,
    } from '$lib/components/ui/pagination';
    import Rule from './(components)/Rule.svelte';
    import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
    import { SidebarTrigger } from '$lib/components/ui/sidebar';


    const parsedRules: Rules = valibotParse(RulesSchema, rawRules).sort((a, b) => a.name.localeCompare(b.name));
    const PER_PAGE = 50;

    let currentPage = $state(1);
    const pageStart = $derived((currentPage - 1) * PER_PAGE);
    const pageEnd = $derived(pageStart + PER_PAGE);
</script>

<div class="sticky top-0 flex items-center border-b p-2 shadow-sm bg-background space-x-2">
    <SidebarTrigger/>
    <ThemeSwitcher/>
</div>

<div class="flex flex-col p-4 space-y-4 mb-14">
    {#each parsedRules.slice(pageStart, pageEnd) as rule}
        <Rule {rule}/>
    {/each}
</div>

<div class="fixed bottom-0 border-t p-2 shadow-sm bg-background w-full contents-center">
    <Pagination bind:page={currentPage} count={parsedRules.length} perPage={PER_PAGE} class="w-max">
        {#snippet children({ pages, currentPage })}
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevButton/>
                </PaginationItem>
                {#each pages as page (page.key)}
                    {#if page.type === "ellipsis"}
                        <PaginationItem>
                            <PaginationEllipsis/>
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
                    <PaginationNextButton/>
                </PaginationItem>
            </PaginationContent>
        {/snippet}
    </Pagination>
</div>
