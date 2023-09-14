import crypto from 'crypto'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import verify  from '../helpers/google-verify.js';

const controller = {
    signup: async (req, res, next) => {
        try {
            req.body.verified_code = crypto.randomBytes(10).toString('hex');
            req.body.password = bcryptjs.hashSync(req.body.password, 10);

            const user = await User.create(req.body)

            return res.status(201).json({
                success: true,
                message: 'User created!'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error registering user'
            })
        }
    },
    signin: async (req, res, next) => {
        try {
            let user = await User.findOneAndUpdate(
                { email: req.user.email },
                { online: true },
                { new: true }
            )

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    image: user.image
                },
                process.env.SECRET ,
                { expiresIn: '10h' }
            )

            user.password = null;

            return res.status(200).json({
                success: true,
                message: 'Usuario logueado correctamente',
                response: {
                    token,
                    user: {
                        name: user.name,
                        email: user.email,
                        image: user.image
                    },
                }
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Error al autenticar el usuario'
            })
        }
    },
    googleSignin: async (req, res, next) => {
        const { token_id } = req.body;

        try {
            const { name, email, image } = await verify(token_id);

            let user = await User.findOne({ email }); 

           
            if (!user) {
               
                const data = {
                    name,
                    email,
                    image,
                    password: bcryptjs.hashSync(process.env.STANDARD_PASS, 10),
                    google: true,
                    verified_code: crypto.randomBytes(10).toString('hex')
                }

                user = await User.create(data)
            }

            
            user.online = true;
            await user.save()

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    image: user.image
                },
                process.env.SECRET,
                { expiresIn: '10h' }
            )

            res.status(200).json({
                success: true,
                message: 'User correctly logged in with Google',
                response: {
                    token,
                    user: {
                        name: user.name,
                        email: user.email,
                        image: user.image
                    },
                }
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error authenticating user'
            })
        }
    },
    signout: async (req, res, next) => {
        try {
            const user = await User.findOneAndUpdate(
                { email: req.user.email },
                { online: false },
                { new: true }
            )

            return res.status(200).json({
                success: true,
                message: 'Logged out user'
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Error authenticating user'
            })
        }
    },
    token: async (req, res, next) => {
        const { user } = req
        try {
            return res.status(200).json({
                user: {
                    name: user.name,
                    email: user.email,
                    image: user.image
                },
            })
        } catch (error) {
            next(error)
        }
    }

}

export default controller;