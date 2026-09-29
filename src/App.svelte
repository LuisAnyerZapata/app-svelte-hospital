<script>
    import { router } from "./core/router/router.svelte.js";
    import { appRoutes } from "./core/router/routes.js";

    let CurrentView = $derived(router.resolve(appRoutes).component);
</script>

<main>
     {#if CurrentView}
        <CurrentView />
    {/if}
</main>

<style>
    :global(*) {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    :global(html, body) {
        height: 100%;
        font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        overflow-x: hidden;
        width: 100%;
        max-width: 100vw;
    }

    :global(body) {
        background: #c2d7e7;
        font-size: 14px;
        line-height: 1.5;
    }
</style>