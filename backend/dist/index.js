"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ormconfig_1 = require("./ormconfig");
//Rotas
const orgRegister_1 = __importDefault(require("./routes/orgRegister"));
const auth_1 = __importDefault(require("./routes/auth"));
const upload_1 = __importDefault(require("./routes/upload"));
const processes_1 = __importDefault(require("./routes/processes"));
const analyze_1 = __importDefault(require("./routes/analyze"));
const report_1 = __importDefault(require("./routes/report"));
const interact_1 = __importDefault(require("./routes/interact"));
const admin_1 = __importDefault(require("./routes/admin"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//Rotas públicas
app.use(orgRegister_1.default);
app.use(auth_1.default);
//Rotas protegidas
app.use(upload_1.default);
app.use(processes_1.default);
app.use(analyze_1.default);
app.use(report_1.default);
app.use(interact_1.default);
app.use(admin_1.default);
ormconfig_1.AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
//# sourceMappingURL=index.js.map