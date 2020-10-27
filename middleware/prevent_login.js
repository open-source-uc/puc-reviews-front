export default async function ({ $auth, redirect, store }) {
  if (!$auth.loggedIn) {
    // let in
  }
  else {
    return redirect('/')
  }
}
