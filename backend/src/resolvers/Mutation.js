const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Mutations = {

    async createItem(parent, args, ctx, info) {
        // TODO check if they are logged in
        return await ctx.db.mutation.createItem({
            data: {
                ...args
            }
        }, info);
    },

    updateItem(parent, args, ctx, info) {
        // first take a copy of the updates
        const updates = {...args};
        // remove the ID from the updates
        delete updates.id;
        // run the update method
        return ctx.db.mutation.updateItem(
            {
                data: updates,
                where: {
                    id: args.id,
                },
            },
            info
        );
    },

    async deleteItem(parent, args, ctx, info) {
        const where = {id: args.id};
        // 1. find the item
        const item = await ctx.db.query.item({where}, `{ id title}`);
        // 2. Check if they own that item, or have the permissions
        // TODO
        // 3. Delete it!
        return ctx.db.mutation.deleteItem({where}, info);
    },

    async signup(parent, args, ctx, info) {
        if (args.secretKey !== process.env.SIGNUP_SECRET) {
            throw new Error('Invalid secret app key');
        }
        const secretKey = await bcrypt.hash(args.secretKey, 10);
        // lower case their email
        args.email = args.email.toLowerCase();
        // hash the password
        const password = await bcrypt.hash(args.password, 10);
        // create user
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                secretKey,
                permissions: {set: ['USER']}
            }
        }, info);
        // create token
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        // set jwt as cookie to response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365 // on year cookie
        });

        return user
    },
    async signin(parent, args, ctx, info) {

        // lower case their email
        args.email = args.email.toLowerCase();
        const user = await ctx.db.query.user({where: {email: args.email}});
        if (!user) {
            throw new Error('Make sure your email / password is valid')
        }
        const valid = await bcrypt.compare(args.password, user.password);
        if (!valid) {
            throw new Error('Make sure your email / password is valid')
        }
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        // set jwt as cookie to response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365 // on year cookie
        });

        return user
    },
    signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return {message: 'Good bye'}
    }

};

module.exports = Mutations;
