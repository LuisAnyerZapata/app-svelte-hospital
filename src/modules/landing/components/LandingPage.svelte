<script>
    import { router } from '../../../core/router/router.svelte.js';
    import { landingStore } from '../stores/landing-store.svelte.js';
    import LandingLayout from '../layouts/LandingLayout.svelte';
    
    // Solo importamos los componentes de CONTENIDO
    import Hero from './Hero.svelte';
    import AreasSection from './AreasSection.svelte';
    import SocialSection from './SocialSection.svelte';
    import CtaSection from './CtaSection.svelte';

    // Inicializamos la carga de datos del dominio
    $effect(() => {
        landingStore.initialize();
    });

    // Lógica de UI: Navegación
    function handleNavigateToAuth() {
        router.goto('/login');
    }

</script>

<LandingLayout>
    
    <Hero 
        title={landingStore.hero.title}
        subtitle={landingStore.hero.subtitle}
        description={landingStore.hero.description}
        backgroundImage={landingStore.hero.backgroundImage}
        stats={landingStore.stats}
        ongetstarted={handleNavigateToAuth} 
    />
    
    <AreasSection areas={landingStore.areas} />
    <SocialSection social={landingStore.social} />
    <CtaSection ongetstarted={handleNavigateToAuth} />

</LandingLayout>