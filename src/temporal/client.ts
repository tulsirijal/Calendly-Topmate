import { TEMPORAL_ENABLED, TEMPORAL_TASK_QUEUE } from "../config/env.js";
import { getTemporalClient } from "../config/temporal.js";
import  type { RegenerateSlotsInput } from "../services/slot.service.js";

async function startWorkflow(workflowName: string, workflowId: string, args: unknown[]) {
    if (!TEMPORAL_ENABLED) {
        console.warn('[temporal error] temporal is not enabled');
        return null;
    }

    try {
        const client = await Promise.race([
            getTemporalClient(),
            new Promise<never>((_, reject) => 
                setTimeout(() => reject(new Error('Temporal client connection timeout')), 5000))
        ]);
        const handle = await client.workflow.start(workflowName, {
            taskQueue: TEMPORAL_TASK_QUEUE,
            workflowId,
            args
        });

        return handle.workflowId
    } catch (error) {
        console.error('[temporal error]: ' + error)
        return null;
    }
}

export async function startRegenrateSlotsWorkflows(input: RegenerateSlotsInput){
    return startWorkflow(
        'regenrateSlotsWorkflows',
        `regenerate-slots-${input.hostId}-${Date.now()}`,
        [input]
    )
}