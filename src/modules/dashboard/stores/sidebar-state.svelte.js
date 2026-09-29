function createSidebarState() {
    let menuOpen = $state(false);
    
    /** @type {Record<string, boolean>} */
    let openDropdowns = $state({});

    /** @param {string} name */
    function toggleDropdown(name) {
        openDropdowns = { ...openDropdowns, [name]: !openDropdowns[name] };
    }

    function toggleMenu() {
        menuOpen = !menuOpen;
    }

    function closeMenu() {
        menuOpen = false;
    }

    return {
        get menuOpen() { return menuOpen; },
        set menuOpen(v) { menuOpen = v; },
        get openDropdowns() { return openDropdowns; },
        toggleDropdown,
        toggleMenu,
        closeMenu
    };
}

export const sidebarState = createSidebarState();