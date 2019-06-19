/**
 * The uid of the entity making the api call.
 *
 * This should be passed in from the previous service call and originates in the frontend/bff service.
 *
 * It can be overridden at the api interface level.
 * @typedef  {String} ownerId
 *
*/

module.exports = {
    /**
     * @typedef response
     * @property {Number} status - The response code as to HTTP schema.
     * @property {String} ownerId - The uid of the entity which made the api call;
     * @property {any} payload - The api response payload.
     */
    response: (status, payload, ownerId) => ({
        status,
        payload,
        ownerId
    }),

    /**
     * @typedef user
     * @property {String} userName -A unique user name.
     * @property {String} [realName] -The user's real name.
     * @property {String} [about] -About text for the user.
     * @property {String} created -The ISO date string of when the user was created.
     * @property {String} uid -The unique id for the user.
     */
    user: (userName, realName = '', about = '', created, uid) => ({
        userName,
        realName,
        about,
        created,
        uid
    }),

    /**
     * @typedef activity
     * @property {String} title - The activity title.
     * @property {String} about - The text about the activity.
     * @property {String} date - The date that is pproposed for the activity in 'Year-Month-Day'.
     * @property {String} ownerId -The uid of the person entity who created the activity.
     * @property {String} created -The ISO date string of when the activity was created.
     * @property {String} uid -The unique id for the activity.
     */
    activity: (title, about, date, ownerId, created, uid) => ({
        title,
        about,
        date,
        ownerId,
        created,
        uid
    })
};
