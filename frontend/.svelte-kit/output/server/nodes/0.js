import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.wDw5iTN_.js","_app/immutable/chunks/disclose-version.Bf_1FjqS.js","_app/immutable/chunks/index-client.CqRgCc2z.js","_app/immutable/chunks/mode.VuplQOEE.js","_app/immutable/chunks/props.PIfNAdlj.js","_app/immutable/chunks/legacy.vZ-vKcB_.js","_app/immutable/chunks/index.C6vkuTvW.js"];
export const stylesheets = ["_app/immutable/assets/0.hxB6IMnT.css"];
export const fonts = [];
