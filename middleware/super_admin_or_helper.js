export default async function ({ $auth, redirect, store }) {
  let user = $auth.state.user
  if (user && !(user.role == 'student')) {
    // let in
  }
  else {
    return redirect('/')
  }
}
