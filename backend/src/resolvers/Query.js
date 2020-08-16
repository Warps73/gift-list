const {forwardTo} = require('prisma-binding');
const {hasPermission} = require('../utils');
const Query = {
    items: forwardTo('db'),
    item: forwardTo('db'),
    itemsConnection: forwardTo('db'),

    currentUser(parent, args, ctx, info) {
        // check if there is a current user ID
        if (!ctx.request.userId) {
            return null;
        }
        return ctx.db.query.user(
            {
                where: {id: ctx.request.userId},
            },
            info
        );
    },
    async users(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged');
        }

        if (!hasPermission(ctx.request.user, ['ADMIN', 'PERMISSION_UPDATE'])) {
            throw new Error('403 Forbidden')

        }

        return ctx.db.query.users({}, info)
    }
};

module.exports = Query;
