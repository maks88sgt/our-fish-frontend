import { createAction } from '@reduxjs/toolkit';

export const setUserData = createAction(
    `user/setUserData`,
    ({ username, accessToken, roles }) => ({
        payload: { username, accessToken, roles },
    }),
);
