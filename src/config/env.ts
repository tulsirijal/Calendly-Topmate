import 'dotenv/config';

export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL;

export const TEMPORAL_ACCESS = process.env.TEMPORAL_ADDRESS || 'localhost:7233';
export const TEMPORAL_NAMESPACE = process.env.TEMPORAL_NAMESPACE || 'default';
export const TEMPORAL_TASK_QUEUE = process.env.TEMPORAL_TASK_QUEUE || 'calendly-tasks';
export const TEMPORAL_ENABLED = process.env.TEMPORAL_ENABLED === 'true';
