import {prisma} from "../config/db.js";
import { CreateAvailabilityExceptionDTO, UpdateAvailabilityExceptionDTO } from "../dto/availability_exceptions.dto.js";

export async function createAvailabilityException(data: CreateAvailabilityExceptionDTO & {userId: number}) {
  const {date, ...rest} = data;
  const availabilityException = await prisma.availabilityException.create({
    data:{
        ...rest,
        date: new Date(`${date}T00:00:00.000Z`)
    }
  });
  return availabilityException;
}

export async function updateAvailabilityException(id: number, data: UpdateAvailabilityExceptionDTO) {
  const {date, ...rest} = data;
  const availabilityException = await prisma.availabilityException.update({
    where: {
      id
    },
    data:{
        date: new Date(`${date}T00:00:00.000Z`),
        ...rest
    }
  });
  return availabilityException;
}

export async function deleteAvailabilityException(id: number) {
  await prisma.availabilityException.delete({
    where: {
      id
    }
  });
}

export async function getAvailabilityExceptionsByUserId(userId: number) {
  const availabilityExceptions = await prisma.availabilityException.findMany({
    where: {
      userId
    },
    orderBy: {
      date: "asc"
    }
  });
  return availabilityExceptions;
}

export async function getAvailabilityExceptionById(id: number) {
  const availabilityException = await prisma.availabilityException.findUnique({
    where: {
      id
    }
  });
  return availabilityException;
}

export async function getAvailabilityExceptionByUserRange(userId: number, startDate: Date, endDate: Date) {
  const availabilityExceptions = await prisma.availabilityException.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate
      }
    },
    orderBy: {
      date: "asc"
    }
  });
  return availabilityExceptions;
}