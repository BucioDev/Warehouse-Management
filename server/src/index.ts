import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"

/* Route imports */
import dashboardRoutes from "./routes/dashboardRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import entrysRoutes from "./routes/entrysRoutes.js"
import exitsRoutes from "./routes/exitsRoutes.js"
import expensesRoutes from "./routes/expensesRoute.js"
import salesRoutes from "./routes/salesRoutes.js"
import creditRoutes from "./routes/creditsRoutes.js"
import installmentsRoutes from "./routes/intsallamentsRoutes.js"
/* Configurations */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


/** Routes  */

app.use("/dashboard", dashboardRoutes)
app.use("/products", productRoutes)
app.use("/entrys", entrysRoutes);
app.use("/exits", exitsRoutes);
app.use("/expenses", expensesRoutes);
app.use("/sales", salesRoutes);
app.use("/credits", creditRoutes);
app.use("/installments", installmentsRoutes);


/** Server */
const port = Number(process.env.PORT) || 3001;

app.listen(port, "0.0.0.0", () => {
    console.log(`Server Running on port: ${port}`);
})