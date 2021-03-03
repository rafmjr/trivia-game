class AuthController {
    static async login(req, res) {
        if (req.body.password !== process.env.PASSWORD) {
            return res.send({ success: false });
        }

        res.cookie('auth', process.env.PASSWORD, { signed: true });
        return res.send({ success: true });
    }

    static async check(req, res) {
        res.send({ auth: req.signedCookies.auth === process.env.PASSWORD });
    }
}

module.exports = AuthController;
