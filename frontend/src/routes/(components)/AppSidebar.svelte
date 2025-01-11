<script lang="ts">
    import {
        Sidebar,
        SidebarContent,
        SidebarFooter,
        SidebarGroup,
        SidebarGroupLabel,
        SidebarHeader
    } from "$lib/components/ui/sidebar";
    import SiteTitle from "./SiteTitle.svelte";
    import { SidebarGroupContent, SidebarInput } from "$lib/components/ui/sidebar/index.js";
    import { gState } from "$lib/app-state.svelte";
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import { Separator } from "$lib/components/ui/separator";
    import Check from "lucide-svelte/icons/check";
    import { cn } from "$lib/utils";
    import { Badge } from "$lib/components/ui/badge";


    function handleNameFilter(event: Event) {
        window.umami.track("filter/name", { value: gState.nameFilter });
    }

    function handleDescriptionFilter(event: Event) {
        window.umami.track("filter/description", { value: gState.descriptionFilter });
    }

    function toggleType(type: string) {
        if ( gState.typeFilter.includes(type) ) {
            gState.typeFilter.splice(gState.typeFilter.indexOf(type), 1);
        } else {
            gState.typeFilter.push(type);
        }
        window.umami.track("filter/type", { value: type });
    }

    function toggleRepo(repo: string) {
        if ( gState.repoFilter.includes(repo) ) {
            gState.repoFilter.splice(gState.repoFilter.indexOf(repo), 1);
        } else {
            gState.repoFilter.push(repo);
        }
        window.umami.track("filter/repo", { value: repo });
    }

    function toggleCategory(category: string) {
        if ( gState.categoryFilter.includes(category) ) {
            gState.categoryFilter.splice(gState.categoryFilter.indexOf(category), 1);
        } else {
            gState.categoryFilter.push(category);
        }
        window.umami.track("filter/category", { value: category });
    }
</script>

<Sidebar>
    <SidebarHeader>
        <SiteTitle />
    </SidebarHeader>
    <SidebarContent>
        <SidebarGroup>
            <SidebarGroupLabel class="text-base">Filters</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarGroup>
                    <SidebarGroupLabel class="flex justify-between text-sm space-x-4">
                        <span>Name</span>
                        <Badge class="cursor-pointer" onclick={() => gState.nameFilter = ""} variant="outline">Clear
                        </Badge>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarInput bind:value={gState.nameFilter} class="h-12"
                                      id="name-input" onchange={handleNameFilter}
                                      placeholder="Search with name..."
                        />
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel class="flex justify-between text-sm space-x-4">
                        <span>Description</span>
                        <Badge class="cursor-pointer" onclick={() => gState.descriptionFilter = ""} variant="outline">
                            Clear
                        </Badge>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarInput bind:value={gState.descriptionFilter} class="h-12"
                                      id="description-input" onchange={handleDescriptionFilter}
                                      placeholder="Search with description..."
                        />
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel class="flex justify-between text-sm space-x-4">
                        <span>Repository</span>
                        <span>
                            <Badge variant="outline">{gState.repoFilter.length}</Badge>
                            <Badge class="cursor-pointer"
                                   onclick={() => gState.repoFilter.splice(0, gState.repoFilter.length)}
                                   variant="outline">Clear</Badge>
                        </span>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <ScrollArea class="h-72 w-full rounded-md border bg-background">
                            <div class="p-4">
                                {#each gState.repositories as repo}
                                    <button class="flex w-full items-center text-sm space-x-2"
                                            aria-label="clickable repository" onclick={() => toggleRepo(repo)}>
                                        <Check
                                            class={cn("inline-block h-4 w-4", gState.repoFilter.includes(repo) ? "visible" : "invisible")} />
                                        <span title="{repo}" class="truncate max-w-44">{repo}</span>
                                    </button>
                                    <Separator class="my-2" />
                                {/each}
                            </div>
                        </ScrollArea>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel class="flex justify-between text-sm space-x-4">
                        <span>Category</span>
                        <span>
                            <Badge variant="outline">{gState.categoryFilter.length}</Badge>
                            <Badge class="cursor-pointer"
                                   onclick={() => gState.categoryFilter.splice(0, gState.categoryFilter.length)}
                                   variant="outline">Clear</Badge>
                        </span>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <ScrollArea class="h-72 w-full rounded-md border bg-background">
                            <div class="p-4">
                                {#each gState.categories as repo}
                                    <button class="flex w-full items-center text-sm space-x-2"
                                            aria-label="clickable repository" onclick={() => toggleCategory(repo)}>
                                        <Check
                                            class={cn("inline-block h-4 w-4", gState.categoryFilter.includes(repo) ? "visible" : "invisible")} />
                                        <span title="{repo}" class="truncate max-w-44">{repo}</span>
                                    </button>
                                    <Separator class="my-2" />
                                {/each}
                            </div>
                        </ScrollArea>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel class="flex justify-between text-sm space-x-4">
                        <span>Type</span>
                        <span>
                            <Badge variant="outline"> {gState.typeFilter.length} </Badge>
                            <Badge class="cursor-pointer"
                                   onclick={() => gState.typeFilter.splice(0, gState.typeFilter.length)}
                                   variant="outline">Clear</Badge>
                        </span>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <ScrollArea class="h-72 w-full rounded-md border bg-background">
                            <div class="p-4">
                                {#each gState.types as type}
                                    <button class="flex w-full items-center text-sm" aria-label="clickable type"
                                            onclick={() => toggleType(type)}>
                                        <Check
                                            class={cn("mr-2 inline-block h-4 w-4", gState.typeFilter.includes(type) ? "visible" : "invisible")} />
                                        <span title="{type}" class="truncate max-w-44">{type}</span>
                                    </button>
                                    <Separator class="my-2" />
                                {/each}
                            </div>
                        </ScrollArea>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarGroupContent>
        </SidebarGroup>
    </SidebarContent>
    <SidebarFooter />
</Sidebar>