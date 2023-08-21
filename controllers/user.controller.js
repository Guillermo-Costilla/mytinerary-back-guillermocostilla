import User from "../models/User.js";

const controller = {
    getUsers: (req, res) => {
        res.json({
            user: 'Guille Costilla'
        })
    },
    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);

            return res.status(200).json({
                success: true,
                message: 'usuario creado con exito'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'error al crear usuario'
            })
        }
    },
    deleteUser: () => {}
}

export default controller;