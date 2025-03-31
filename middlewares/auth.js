import jwt from "jsonwebtoken";
import User from "../models/User.js";
import mongoose from "mongoose";

const verifyToken = async (req, res, next) => {
    try {
        // Verificar que exista el header Authorization
        if (!req.header("Authorization")) {
            return res.status(401).json({ success: false, message: "Authorization header missing" });
        }
        
        // Extraer el token, con manejo más defensivo
        let token = "";
        if (req.header("Authorization").startsWith("Bearer ")) {
            token = req.header("Authorization").replace("Bearer ", "");
        } else {
            token = req.header("Authorization"); // Intentar usar el token directamente
        }
        
        if (!token) {
            return res.status(401).json({ success: false, message: "Access Denied - No token provided" });
        }

        console.log("Token a verificar:", token.substring(0, 20) + "..."); // Solo mostrar parte del token por seguridad
        
        const verified = jwt.verify(token, process.env.SECRET);
        console.log("Token verificado, payload:", JSON.stringify(verified));

        // Verificar si el ID es válido para MongoDB
        if (!mongoose.Types.ObjectId.isValid(verified._id)) {
            console.log("ID inválido para MongoDB:", verified._id);
            return res.status(400).json({ success: false, message: "Invalid user ID format" });
        }

        const user = await User.findById(verified._id).select("-password");
        console.log("¿Usuario encontrado?", user ? "Sí" : "No");
        console.log("ID buscado:", verified._id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error al verificar token:", error);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Invalid Token" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token has expired" });
        } else {
            res.status(400).json({ success: false, message: "Authentication error", error: error.message });
        }
    }
};

export default verifyToken;