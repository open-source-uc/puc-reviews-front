export default async function ({ $auth, redirect, store }) {
  let user = $auth.state.user
  if (user && (user.role == 'super_admin')) {
    // let in
  }
  else {
    return redirect('/')
  }
}
