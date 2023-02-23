export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.5c78dd38.mjs","imports":["_app/immutable/entry/start.5c78dd38.mjs","_app/immutable/chunks/index.c4a859e5.mjs","_app/immutable/chunks/singletons.e49d20cc.mjs","_app/immutable/chunks/index.c4520143.mjs"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.25a1ab36.mjs","imports":["_app/immutable/entry/app.25a1ab36.mjs","_app/immutable/chunks/index.c4a859e5.mjs"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/jailbreaks",
				pattern: /^\/jailbreaks\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/tweaks",
				pattern: /^\/tweaks\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
