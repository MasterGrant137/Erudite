### Test Fetches
+ custom csrfFetch
```
window.csrfFetch('/erudite/test', {
  method: 'POST',
  body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));
```
+ Navigate to http://localhost:3000 and in the browser's dev tools console, try dispatching the login thunk action with the demo user login credentials.
```
window.store.dispatch(window.sessionActions.login({
  credential: 'Demo-lition',
  password: 'password'
}));
```
+ Test the restoreUser thunk action
`window.store.dispatch(window.sessionActions.restoreUser());`

+ Test signup
```
window.store.dispatch(window.sessionActions.signup({
  username: 'NewUser',
  email: 'new@user.io',
  password: 'password'
}));
```