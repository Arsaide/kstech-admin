import { MainColorsEnum } from '../../../utils/enums/colors-enum';

export const ProductListStyles = {
    circularProgress: {
        box: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100vh - 136px)',
            gap: 2,
        },
        typography: {
            color: MainColorsEnum.BLACK,
            textAlign: 'center',
        },
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        mt: 1,
    },
};
