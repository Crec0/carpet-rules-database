export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","favicon-16x16.png","favicon-32x32.png","favicon.ico","favicon.png","site.webmanifest"]),
	mimeTypes: {".png":"image/png",".webmanifest":"application/manifest+json"},
	_: {
		client: {"start":"_app/immutable/entry/start.CYv-3lPh.js","app":"_app/immutable/entry/app.CWXYmEDA.js","imports":["_app/immutable/entry/start.CYv-3lPh.js","_app/immutable/chunks/entry.CRhBeK-v.js","_app/immutable/chunks/index-client.CqRgCc2z.js","_app/immutable/chunks/index.C6vkuTvW.js","_app/immutable/entry/app.CWXYmEDA.js","_app/immutable/chunks/index-client.CqRgCc2z.js","_app/immutable/chunks/disclose-version.Bf_1FjqS.js","_app/immutable/chunks/props.PIfNAdlj.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
