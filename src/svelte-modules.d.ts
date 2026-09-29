// Le decimos a TS que cualquier import de .svelte es válido, 
// pero le quitamos la presión de verificar su interior (evita el error ComponentInternals)
declare module '*.svelte' {
    const component: any;
    export default component;
}