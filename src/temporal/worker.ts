import { NativeConnection, Worker } from "@temporalio/worker";
import { TEMPORAL_ACCESS, TEMPORAL_NAMESPACE, TEMPORAL_TASK_QUEUE } from "../config/env.js";
import * as activities from './activities/index.js'
import { fileURLToPath } from "node:url";
async function run(){
    const connection = await NativeConnection.connect({
        address: TEMPORAL_ACCESS
    });

    const worker = await Worker.create({
        connection,
        namespace: TEMPORAL_NAMESPACE,
        taskQueue: TEMPORAL_TASK_QUEUE,
        activities,
        workflowsPath:fileURLToPath(new URL('./workflows/index.ts', import.meta.url))
    });

    await worker.run();
}

run().catch(error=>{
    console.log(`Error while running the worker ${error}`);
    process.exit(1);
})