import "reflect-metadata";
import  express from "express";
import cors from "cors";
import  dotenv from "dotenv";
import { AppDataSource} from "../ormconfig";

//Rotas
import orgRegisterRoutes from "./routes/orgRegister";
import authRoutes from "./routes/auth";
import uploadRoutes from "./routes/upload";
import processRoutes from "./routes/processes";
import analyzeRoutes from "./routes/analyze";
import reportRoutes from "./routes/report";
import interactRoutes from "./routes/interact";
import adminRoutes from "./routes/admin";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//Rotas públicas
app.use(orgRegisterRoutes);
app.use(authRoutes);

//Rotas protegidas
app.use(uploadRoutes);
app.use(processRoutes);
app.use(analyzeRoutes);
app.use(reportRoutes);
app.use(interactRoutes);
app.use(adminRoutes);

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Error during Data Source initialization:", err);
});


