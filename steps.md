### Test Fetches
+ custom csrfFetch
```
window.csrfFetch('/erudite/test', {
  method: 'POST',
  body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));
```
