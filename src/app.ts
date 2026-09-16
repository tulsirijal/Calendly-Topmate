import express, {Express} from "express";
import { userRouter } from "./ routers/user.router.js";
import { errorHandler } from "./middleware/error-handler.js";
import { eventTypePublicRouter } from "./ routers/event_type_public.router.js";
import { eventTypePrivateRouter } from "./ routers/event_type_private.router.js";
import { availabilityRouter } from "./ routers/availability.router.js";
import { availabilityExceptionRouter } from "./ routers/availability_exception.router.js";

const app: Express = express();

app.get('/health', (_req, res) => {
    res.json(
        { status: 'ok', 
          timestamp: new Date().toISOString() 
        }
    );
});
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/event-types", eventTypePublicRouter);
app.use("/api/event-types/private", eventTypePrivateRouter);
app.use("/api/availabilities", availabilityRouter);
app.use("/api/availability-exceptions",availabilityExceptionRouter)
app.use(errorHandler);
export default app;