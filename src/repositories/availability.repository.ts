import {prisma} from "../config/db.js";
import { CreateAvailabilityDTO, UpdateAvailabilityDTO } from "../dto/availability.dto.js";

export async function createAvailability(data: CreateAvailabilityDTO) {
  const availability = await prisma.availability.create({
    data
  });
  return availability;
}

export async function updateAvailability(id: number, data: UpdateAvailabilityDTO) {
  const availability = await prisma.availability.update({
    where: {
      id
    },
    data
  });
  return availability;
}

export async function deleteAvailability(id: number) {
  await prisma.availability.delete({
    where: {
      id
    }
  });
}

export async function getAvailabilityByUserId(userId: number) {
  const availabilities = await prisma.availability.findMany({
    where: {
      userId
    },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }]
  });
  return availabilities;
}

export async function getAvailabilityById(id: number) {
  const availability = await prisma.availability.findUnique({
    where: {
      id
    }
  });
  return availability;
}