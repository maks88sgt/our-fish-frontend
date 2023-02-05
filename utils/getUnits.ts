import { Units } from '../types/types';

export const getUnits = (units: Units) => {
    switch (units) {
        case Units.kg:
            return 'кг';
        case Units.piece:
            return 'шт';
        case Units.pack:
            return 'уп';
        default:
            return 'кг';
    }
};
