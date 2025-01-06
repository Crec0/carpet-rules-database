<script lang="ts">
    import {Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter } from '$lib/components/ui/sidebar';
    import SiteTitle from './SiteTitle.svelte';
</script>

<Sidebar>
    <SidebarHeader>
        <SiteTitle />
    </SidebarHeader>
    <SidebarContent>
        <SidebarGroup/>
        <SidebarGroup/>
    </SidebarContent>
    <SidebarFooter/>
</Sidebar>