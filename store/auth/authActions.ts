import { createAction } from '@reduxjs/toolkit';

export const setUserData = createAction(
    `user/setUserData`,
    ({ username, accessToken, roles, seller }) => ({
        payload: { username, accessToken, roles, seller },
    }),
);
