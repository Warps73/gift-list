/**
 *
 * @param user
 * @param [permissionsNeeded]
 */
export default function hasPermission(user, permissionsNeeded) {
    const matchedPermissions = user.permissions.filter(permissionTheyHave =>
        permissionsNeeded.includes(permissionTheyHave)
    );
    return matchedPermissions.length;
}
