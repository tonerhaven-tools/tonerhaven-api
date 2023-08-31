const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');
const Config   = require('../configs/application')
const Database = require('../configs/knexfile');

class UsersModel {
    request  = null;
    response = null;

    constructor(request, response) {
        this.request  = request;
        this.response = response;
    }

    async login() {
        const username = this.request.body.username;
        const password = this.request.body.password;
        const user = await Database('users').where({email: username}).first();

        if (user && await bcrypt.compare(password, user.password)) {
            const profile = {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
            }
            const token = jwt.sign(profile, Config.SECRET_KEY, { expiresIn: '1h' });

            // Set the token as an HTTP-only cookie
            this.response.cookie('token', token, {
                httpOnly: true,
                secure:   true, // Enable this if using HTTPS
                sameSite: 'strict',
                maxAge:   3600000 // 1hr expiration
            });

            return this.response.send({
                message: "You're logged in!",
                result:  true,
                token,
                profile
            });
        }
        else {
            return this.response.send({
                message: 'Invalid username or password',
                result:  false,
                token:   null,
                profile: null,
            });
        }
    }

    async register() {
        const firstname  = this.request.body.firstname;
        const lastname   = this.request.body.lastname;
        const email      = this.request.body.email;
        const password   = await bcrypt.hash(this.request.body.password, 10);
        const userExists = await Database('users').where({email:email}).first();

        const role_id = 1;
        const created_at = Date.now();
        const updated_at = Date.now();


        if (!userExists) {
            const result = await Database('users').insert({
                firstname,
                lastname,
                role_id,
                email,
                password: password,
                created_at,
                updated_at
            });
            return this.response.send({
                result: result,
                message: result ? "You're now registered." : "An error occurred."
            });
        } else {
            return this.response.send({
                result: false,
                message: "Email is not available.",
            });
        }
    }

    async logout() {
        await this.response.cookie('token', '', {
            httpOnly: true,
            secure:   true,
            sameSite: 'strict',
            expires:  new Date(0),
        });
        return this.response.send("Server: You've been logged out");
    }
}

module.exports = UsersModel;