<script>
    import { router } from '../../../core/router/router.svelte.js';
    import Navbar from '../components/Navbar.svelte';
    import Footer from '../components/Footer.svelte';

    let { children } = $props();

    function handleNavigateToAuth() {
        router.goto('/login');
    }

    /** @param {MouseEvent} e */
    function handleNavClick(e) {
        const target = /** @type {HTMLElement} */ (e.currentTarget);
        const href = target?.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const section = document.querySelector(href);
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        }
    }

</script>

<div class="landing-container">
    <Navbar ongetstarted={handleNavigateToAuth} onnavclick={handleNavClick} />
    
    <main>
        {@render children()}
    </main>

    <Footer />
</div>

<style>
    .landing-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #f0f7f4 0%, #d1e2d9 100%);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
    }
    
    main {
        flex: 1;
    }
</style>