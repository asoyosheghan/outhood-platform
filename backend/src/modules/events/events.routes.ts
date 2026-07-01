import { Router } from "express";
import { validate } from "@/middleware/validate.middleware";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import * as eventsController from "./events.controller";
import {
  createEventSchema,
  updateEventSchema,
  listEventsQuerySchema,
  slugParamSchema,
  idParamSchema,
} from "./events.validation";

const router = Router();

// Public
router.get("/", validate({ query: listEventsQuerySchema }), eventsController.listEvents);
router.get("/:slug", validate({ params: slugParamSchema }), eventsController.getEvent);

// Member
router.get("/me/registrations", authenticate, eventsController.listMyRegistrations);
router.post("/:id/register", authenticate, validate({ params: idParamSchema }), eventsController.registerForEvent);
router.delete(
  "/:id/register",
  authenticate,
  validate({ params: idParamSchema }),
  eventsController.cancelRegistration
);

// Organizer / Admin
router.post(
  "/",
  authenticate,
  authorize("ORGANIZER", "ADMIN", "SUPER_ADMIN"),
  validate({ body: createEventSchema }),
  eventsController.createEvent
);
router.patch(
  "/:id",
  authenticate,
  authorize("ORGANIZER", "ADMIN", "SUPER_ADMIN"),
  validate({ params: idParamSchema, body: updateEventSchema }),
  eventsController.updateEvent
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  validate({ params: idParamSchema }),
  eventsController.deleteEvent
);

export default router;
