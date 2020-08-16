/**
 *
 * @param user
 * @param [permissionsNeeded]
 */
function hasPermission(user, permissionsNeeded) {
    const matchedPermissions = user.permissions.filter(permissionTheyHave =>
        permissionsNeeded.includes(permissionTheyHave)
    );
    return matchedPermissions.length;
}

exports.hasPermission = hasPermission;
