import app from "./app.js";
import { connectToDatabase } from "./config/db.js";
import { PORT } from "./config/env.js";

async function startServer() {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);

    });
}

startServer();