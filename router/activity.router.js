import express from 'express';
import ActivityController from '../controllers/activity.controller.js';

const router = express.Router();

const {getActivities, createActivities, updateActivity, deleteActivity} = ActivityController;

router.get('/', getActivities);

router.post('/', createActivities);

router.put('/:id', updateActivity);

router.delete('/:id', deleteActivity);

export default router;