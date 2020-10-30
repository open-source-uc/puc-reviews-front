const middleware = {}

middleware['only_oauth'] = require('../middleware/only_oauth.js')
middleware['only_oauth'] = middleware['only_oauth'].default || middleware['only_oauth']

middleware['prevent_login'] = require('../middleware/prevent_login.js')
middleware['prevent_login'] = middleware['prevent_login'].default || middleware['prevent_login']

middleware['super_admin_or_helper'] = require('../middleware/super_admin_or_helper.js')
middleware['super_admin_or_helper'] = middleware['super_admin_or_helper'].default || middleware['super_admin_or_helper']

export default middleware
