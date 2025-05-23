import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import branchRoutes from "./routes/branchRoutes.js";
import subjectsRoutes from "./routes/subjectsRoutes.js";
import userAdminRoutes from "./routes/userAdminRoutes.js";
import userTeacherRoutes from "./routes/userTeacherRoutes.js";
import userStudentRoutes from "./routes/userStudentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Configurar CORS para permitir solicitudes desde el frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Permite solicitudes desde este origen
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    credentials: true, // Si necesitas enviar cookies o encabezados de autenticación
  })
);

// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear cookies
app.use(cookieParser());

// Rutas de autenticación
app.use("/auth", authRoutes);

// Rutas de sucursales
app.use("/branch", branchRoutes);

// Rutas de materias
app.use("/subject", subjectsRoutes);

// Rutas de usuarios
app.use("/user/admin", userAdminRoutes);
app.use("/user/teacher", userTeacherRoutes);
app.use("/user/student", userStudentRoutes);

// Rutas de cursos
app.use("/course", courseRoutes);

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡El servidor está funcionando!");
});

export default app;
