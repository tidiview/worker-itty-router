import { Router } from 'itty-router';

// now let's create a router (note the lack of "new")
const router = Router();

// GET collection index
router.get('/api/todos', () => new Response('Todos Index!'));

// GET item
router.get('/api/todos/:id', ({ params }) => new Response(`Todo #${params.id}`));

// GET form
router.get('/api/form', () => new Response(`<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf8">
		<title>Cloudflare Pages | Form Demo</title>
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsSAAALEgHS3X78AAADW0lEQVRYw+2WS0hUURjHZ+aGkQTRJuih18kCIXBZLdRx1JYtQpNIggijFlFgSFmZd0ynTO2xDYraRKTmo7KoqE27aFOLSKJ3tMmNd0bn3nl8/b9zz505jo8yhTZz4Md359zH//993zn3jseTG7mxwBFt93sioSJxzFGFx3jzWk+kvWjphVUReewzDV0DXrNN9yD6MKcB70Q3TBqZ65dE3MyIs7B33usNYSR9L3X6Fylu6O6xpswHQBcYBKPgBjgIVvN5NqmaWJQBVRxRZ0HrXBFR10ai834HPr7gJ5z7CfbztRNnCz0LMuH0Vlf7zKVcxsi5EhZgMWSYjBi6jd9xkOCIubjV4RjD7za1EhFZxfnFjUyfZzm/HLzlbBEtkBIYesp0j0NFfC7B5mQ16sW94WLN7qtIP8seCMw0oPTZK+NKsA8cB5s50kWRuS2EIKyIUiTLRLxTGBiLhjfl8fNit7ZpENZccas/MNOImzmiH7zjLGQmnLEZbXeETM7amCZO2UZwTSIBE9iiO7OThbDQifWVT1tkYi/L44fULbK1uK9RPNgVV0RoTgNudQydor0lx+yh4G2rv+IOhBtBvlOBCl/2PncX2gowEXUellRKuxDiKawVs7XglXW3/Cg9qyEarSJ6VEUw8AGUiUqwCRYPa2kjq8BuMBWdXs7kXyKunUS1qKeYzJZ19fZw8Co9qSZkHAExGgmyiTjYnt3/ZvBrUukzRzbCvXThxRXHVmNsCW89fi/EJLgvhu/BSZnlARquJBoBD4KUuBcQEQbexLEoXfEO7jnfLIWFCWnGBNfAZdADwiAEzoAToAkcAYfkm7ABvV+TtejKQBNoAS+EifvCxC4WL1UyTmT1kuSL5gf4Lvmm8FXyBXwGn8B70CgW2s2teRAJgddgDHwE49wCelzNBnrZQAtvNRiI4S2YlAtP9FTGVEwprzUXHc55sW0NnauWD4EBelrjlH/YgbPHvMWLEvE6G7hCl4ppCuWOd86C0us/IQzw9m0teGn1lR+m5zucng9lDDDJQczhHFfHfb/vRaa1iHX/Cu7nyM9oME+tL8Xe34JV3wBqQR3E6iwgovN7Dyj8/3+x+N3PXz3+dyO/fovGPL3BZw9WepGpxshvQBplzpv7k5sbuZEbvwGDMvjj7QjeVAAAAABJRU5ErkJggg==">
		<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=_turnstileCb" defer></script>
	</head>
	<body>
		<main>
			<form name="prout" method="POST" action="/api/success">
				<label>Name</label>
				<input type="name" name="name" />
				<label>Email</label>
				<input name="email" />
				<div class="cf-turnstile" id="turnstile-widget"></div>
				<button type="Submit">Submit</button>
			</form>
			</main>
		<script>
		// This function is called when the Turnstile script is loaded and ready to be used.
		// The function name matches the "onload=..." parameter.
		function _turnstileCb() {
			console.debug('_turnstileCb called');
	
			turnstile.render('#turnstile-widget', {
			  sitekey: '0x4AAAAAAAXCw38_OwMP7tgZ',
			  theme: 'light',
			});
		}
		</script>
	</body>
</html>`,
{ headers: { 'Content-Type': 'text/html; charset=UTF-8' }, status: 200, statusText: "Sent!" }
));

// POST to the collection (we'll use async here)
router.post('/api/todos', async (request, env) => {
	const content = await env.turnstile_itty.put("name", "email");

	return new Response('Creating Todo: ' + JSON.stringify(content));
});

// POST to the collection (we'll use async here)
router.post('/api/success', async (request, env) => {
	const input: Array<string> = await request.formData();
  
      // Convert FormData to JSON
    const formDataObj = Object.fromEntries(input.entries());console.log(formDataObj);

	return new Response(`<!doctype html>
	<html lang="en">
		<head>
			<meta charset="utf8">
			<title>Cloudflare Pages | Form Demo</title>
			<meta name="viewport" content="width=device-width,initial-scale=1">
			<link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsSAAALEgHS3X78AAADW0lEQVRYw+2WS0hUURjHZ+aGkQTRJuih18kCIXBZLdRx1JYtQpNIggijFlFgSFmZd0ynTO2xDYraRKTmo7KoqE27aFOLSKJ3tMmNd0bn3nl8/b9zz505jo8yhTZz4Md359zH//993zn3jseTG7mxwBFt93sioSJxzFGFx3jzWk+kvWjphVUReewzDV0DXrNN9yD6MKcB70Q3TBqZ65dE3MyIs7B33usNYSR9L3X6Fylu6O6xpswHQBcYBKPgBjgIVvN5NqmaWJQBVRxRZ0HrXBFR10ai834HPr7gJ5z7CfbztRNnCz0LMuH0Vlf7zKVcxsi5EhZgMWSYjBi6jd9xkOCIubjV4RjD7za1EhFZxfnFjUyfZzm/HLzlbBEtkBIYesp0j0NFfC7B5mQ16sW94WLN7qtIP8seCMw0oPTZK+NKsA8cB5s50kWRuS2EIKyIUiTLRLxTGBiLhjfl8fNit7ZpENZccas/MNOImzmiH7zjLGQmnLEZbXeETM7amCZO2UZwTSIBE9iiO7OThbDQifWVT1tkYi/L44fULbK1uK9RPNgVV0RoTgNudQydor0lx+yh4G2rv+IOhBtBvlOBCl/2PncX2gowEXUellRKuxDiKawVs7XglXW3/Cg9qyEarSJ6VEUw8AGUiUqwCRYPa2kjq8BuMBWdXs7kXyKunUS1qKeYzJZ19fZw8Co9qSZkHAExGgmyiTjYnt3/ZvBrUukzRzbCvXThxRXHVmNsCW89fi/EJLgvhu/BSZnlARquJBoBD4KUuBcQEQbexLEoXfEO7jnfLIWFCWnGBNfAZdADwiAEzoAToAkcAYfkm7ABvV+TtejKQBNoAS+EifvCxC4WL1UyTmT1kuSL5gf4Lvmm8FXyBXwGn8B70CgW2s2teRAJgddgDHwE49wCelzNBnrZQAtvNRiI4S2YlAtP9FTGVEwprzUXHc55sW0NnauWD4EBelrjlH/YgbPHvMWLEvE6G7hCl4ppCuWOd86C0us/IQzw9m0teGn1lR+m5zucng9lDDDJQczhHFfHfb/vRaa1iHX/Cu7nyM9oME+tL8Xe34JV3wBqQR3E6iwgovN7Dyj8/3+x+N3PXz3+dyO/fovGPL3BZw9WepGpxshvQBplzpv7k5sbuZEbvwGDMvjj7QjeVAAAAABJRU5ErkJggg==">
		</head>
		<body>
			<main>
				<p>SUCCESS!</p>
				<p>your name is: <code>${formDataObj["name"]}</code>,</p>
				<p>and your email address is: <code>${formDataObj["email"]}</code></p>
				
			</main>
		</body>
	</html>`,
	{ headers: { 'Content-Type': 'text/html; charset=UTF-8' }, status: 200, statusText: "Success!" }
	);
});

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
