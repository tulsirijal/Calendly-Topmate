# Calendly / Topmate Backend API

A scheduling and booking backend engine currently in active development, built with Node.js, Express, TypeScript, Prisma, and PostgreSQL. Designed to handle user availability, slot calculation, appointment bookings, and 1:1 sessions.

---

### Tech Stack

* **Runtime & Language:** Node.js, TypeScript
* **Framework:** Express.js
* **ORM & Database:** Prisma, PostgreSQL
* **Validation:** Zod schemas & DTOs
* **Architecture:** Layered Pattern (Router → Controller → Service → Repository)

---

### Project Structure

```text
src/
├── routers/        # API route declarations
├── controllers/    # Request/Response handling
├── services/       # Core business & scheduling logic
├── repositories/   # Prisma database operations
├── dto/            # Zod schemas & type definitions
├── middleware/     # Auth, error handling, request validation
├── config/         # Environment variables & constants
└── utils/          # Shared helper functions