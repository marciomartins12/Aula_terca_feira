const Model = require('../models/Model');

module.exports = class pageController {
    static async pageHan(req, res) {
        res.render("pageHan");
    }

    static async pageLogin(req, res) {
        res.render("login");
    }
    static async tryLogin(req, res) {
        const { email, password } = req.body;

        try {
            const userLogado = await Model.findOne({ where: { email, password } });

            if (userLogado) {
                const lastLogin = userLogado.last_login;


                await userLogado.update({ last_login: new Date() });


                req.session.user = {
                    id: userLogado.id_model,
                    userName: userLogado.user_name,
                    email: userLogado.email,
                    senha: userLogado.password,
                    lastLogin
                };

                return res.redirect("/pageHome");
            }


            res.render('login', { dontFoundUser: 1 });

        } catch (err) {
            console.log(err);
            res.status(500).send("Erro interno no servidor");
        }
    }
    static async pageRegister(req, res) {
        res.render("pageRegister");
    }
    static async registerNewUser(req, res) {
        const { userName, email, password } = req.body;
        try {
            const novoUsuario = await Model.create({
                email: email,
                password: password,
                user_name: userName,
                last_login: new Date()
            });

            req.session.user = {
                id: novoUsuario.id_model,
                userName: novoUsuario.user_name,
                email: novoUsuario.email,
                lastLogin: novoUsuario.last_login
            };

            res.status(200).json({ redirect: '/pageHome' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao registrar' });
        }
    }

    static async pageHome(req, res) {
        const user = req.session.user;

        if (!user) {
            return res.redirect("/login");
        }
        res.render("pageHome", { user });
    }
    static async logout(req, res) {
        req.session.destroy();
        res.redirect("/login");
    }
};


