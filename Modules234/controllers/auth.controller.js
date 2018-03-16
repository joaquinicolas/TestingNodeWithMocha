function AuthController() {

    var roles;
    var user;
    function setRoles(role) {
        roles = role;
        user.roles = role;
    }
    function setUser(inUser) {
        user = inUser;
    }

    function isAuthorized(neededRole) {
        if (user) {
            return user.isAuthorized(neededRole);
        }
    }

    function isAuthorizedAsync(neededRole, cb) {
        setTimeout(() => cb(roles.indexOf(neededRole) >= 0), 2100);
    }
    function isAuthorizedPromise(neededRole) {
        return new Promise(resolve => {
            setTimeout(() => resolve(roles.indexOf(neededRole) >= 0), 1);
        });
    }

    function getIndex(req, res) {
        if (user.isAuthorized(neededRole)){
            return res.render('index');
        }
        res.render('error');
}

    return { isAuthorized, isAuthorizedAsync, setRoles, isAuthorizedPromise, getIndex, setUser };
}

module.exports = AuthController();