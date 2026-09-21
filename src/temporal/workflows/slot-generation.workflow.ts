import type { RegenerateSlotsInput } from "../../services/slot.service.js";
import { proxyActivities } from "@temporalio/workflow";
import type * as activities from "../activities/index.js"

const {regenrateSlotsActivity} = proxyActivities<typeof activities>({
    retry: {maximumAttempts: 2},
    startToCloseTimeout: '10 minutes'
})

export async function regenrateSlotsWorkflows(input: RegenerateSlotsInput){
    await regenrateSlotsActivity(input);
}