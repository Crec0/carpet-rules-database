<script lang="ts">
    import '../app.css';
    import { SidebarProvider } from '$lib/components/ui/sidebar';
    import AppSidebar from './(components)/AppSidebar.svelte';
    import { ModeWatcher } from 'mode-watcher';


    let { children } = $props();
</script>

<ModeWatcher/>

<SidebarProvider>
    <AppSidebar/>
    <main class="w-full h-full">
        {@render children?.()}
    </main>
</SidebarProvider>
