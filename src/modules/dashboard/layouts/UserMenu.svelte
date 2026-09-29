<script>
    let { user, onlogout } = $props();
</script>

<div class="user-info-header">
    <div class="user-avatar">
        {user?.name?.charAt(0) || 'U'}
    </div>
    <div class="user-details">
        <span class="user-name">{user?.name || 'Usuario'}</span>
        <span class="user-role">{user?.role || ''}</span>
    </div>
</div>

<style>
    .user-info-header { 
        display: flex; 
        align-items: center; 
        gap: 0.75rem; 
    }

    .user-avatar { 
        width: 36px; 
        height: 36px; 
        background: var(--themeSecondary, #0f4c7b); 
        color: white; 
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-weight: bold; 
        font-size: 0.9rem;
        flex-shrink: 0; 
    }

    .user-details { 
        display: flex; 
        flex-direction: column; 
    }

    .user-name { 
        font-weight: 600; 
        font-size: 0.9rem; 
        color: var(--themeDarker, #00213b); 
    }

    .user-role { 
        font-size: 0.7rem; 
        color: var(--muted, #94a89c); 
        font-weight: 600; 
        text-transform: uppercase; 
    }

    @media (max-width: 768px) {
        .user-details { 
            display: none; 
        }
    }
</style>