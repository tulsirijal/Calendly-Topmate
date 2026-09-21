import { regenrateSlots } from "../../services/slot.service.js";
import type {RegenerateSlotsInput} from "../../services/slot.service.js";

export async function regenrateSlotsActivity(input: RegenerateSlotsInput){
    await regenrateSlots(input)
}