import { RegenerateSlotsInput, regenrateSlots } from "../../services/slot.service.js";

export async function regenrateSlotsActivity(input: RegenerateSlotsInput){
    await regenrateSlots(input)
}