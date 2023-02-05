import { Categories } from '../types/types';

export const getCategory = (category: Categories) => {
    switch (category) {
        case Categories.dried:
            return 'Вяленая';
        case Categories.frozen:
            return 'Замороженая';
        case Categories.cooled:
            return 'Охлажденная';
        case Categories.smoked:
            return 'Копченая';
        default:
            return 'Замороженая';
    }
};
