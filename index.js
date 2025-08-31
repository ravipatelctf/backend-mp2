const {initializeDatabase} = require("./db/db.connect");
const express = require("express");
const salesAgentRoutes = require("./routes/salesAgent.routes");
const leadRoutes = require("./routes/lead.routes");
const homeRoutes = require("./routes/home.routes");

const app = express();
app.use(express.json());

const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessRate: 200,
};
app.use(cors(corsOptions));

initializeDatabase();

// b. Get All Sales Agents | 2. Sales Agents API | anvaya.api.spec
app.use("/agents", salesAgentRoutes);


// 1. Leads API | anvaya.api.spec
app.use("/leads", leadRoutes);


// home route
app.use("/", homeRoutes);


// initializing express server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
})