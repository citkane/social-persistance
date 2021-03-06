/* eslint-disable no-unused-vars */

const Api = require('../templates/Api');

let api;

/** @memberof module:persistance */
class ApiPersistActivities extends Api {
    /**
     * @classdesc methods to persist and retrieve activitites
     * @param {Sockets} sockets -The zmq socket class instance.
     */
    constructor(sockets, baseApi) {
        super(sockets, 'activities');
        api = baseApi;
    }

    async saveActivity(activity, ownerId = null) {
        const { activities } = this.cache;
        const update = { ...activities };
        try {
            if (!activity.uid) return api.reject(400, 'Activity uid is required');
            update[activity.uid] = activity;
            await this.save(update);
            this.cache.activities = update;
            return api.resolve(201, this.cache.activities[activity.uid]);
        } catch (err) {
            console.log(err);
            return api.reject(500, err.message);
        }
    }

    getAllActivities(ownerId = null) {
        const { activities } = this.cache;
        return api.resolve(200, activities);
    }

    getActivityById(uid, ownerId = null) {
        const { activities } = this.cache;
        if (activities[uid]) return api.resolve(200, activities[uid]);
        return api.reject(404, 'Could not find activity');
    }

    async updateActivity(activity, ownerId = null) {
        const { uid } = activity;
        if (!uid) return api.reject(400, 'Activity uid is required');
        const { activities } = this.cache;
        const update = { ...activities };
        if (!activities[uid]) return api.reject(404, 'Could not find activity');
        try {
            Object.keys(activity).forEach((key) => {
                if (key !== 'uid') update[uid][key] = activity[key];
            });
            await this.save(update);
            this.cache.activities = update;
            return api.resolve(200, this.cache.activities[uid]);
        } catch (err) {
            console.log(err);
            return api.reject(500, err.message);
        }
    }

    async deleteActivity(activity, ownerId = null) {
        const { uid } = activity;
        if (!uid) return api.reject(400, 'Activity uid is required');
        const { activities } = this.cache;
        const update = { ...activities };
        delete update[uid];
        try {
            await this.save(update);
            this.cache.activities = update;
            return api.resolve(205, activity);
        } catch (err) {
            console.log(err);
            return api.reject(500, err.message);
        }
    }
}

module.exports = ApiPersistActivities;
