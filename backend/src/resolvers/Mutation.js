const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {randomBytes} = require('crypto');
const {promisify} = require('util');

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
        // lower case their email
        args.email = args.email.toLowerCase();
        // hash the password
        const password = await bcrypt.hash(args.password, 10);
        // create user
        const user = await ctx.db.mutation.createUser({
            data: {
                email: args.email,
                name: args.name,
                password,
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

        generateToken(user, ctx);

        return user
    },
    signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return {message: 'Good bye'}
    },
    async requestReset(parent, args, ctx, info) {
        const user = await ctx.db.query.user({where: {email: args.email}});

        if (!user) {
            return {message: 'Un email de récupération à été envoyé.'}
        }

        const resetToken = (await promisify(randomBytes)(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // now + 1 hour
        const res = await ctx.db.mutation.updateUser(
            {
                where: {email: args.email},
                data: {resetToken, resetTokenExpiry}
            });

        return {message: 'Un email de récupération à été envoyé.'}

    },
    async resetPassword(parent, args, ctx, info) {
        if (args.password !== args.confirmPassword) {
            throw new Error('Mot passe non identique...');
        }
        const [user] = await ctx.db.query.users({
            where: {
                resetToken: args.resetToken,
                resetTokenExpiry_gte: Date.now() - 3600000
            }
        });

        if (!user) {
            throw new Error('Invalid or expire token');
        }
        // hash the password
        const password = await bcrypt.hash(args.password, 10);

        const updatedUser = await ctx.db.mutation.updateUser(
            {
                where: {email: user.email},
                data: {
                    password: password,
                    resetToken: null,
                    resetTokenExpiry: null
                }
            });

        generateToken(updatedUser, ctx);

        return updatedUser
    }

};

function generateToken(user, ctx) {
    const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 // on year cookie
    });
}

module.exports = Mutations;
