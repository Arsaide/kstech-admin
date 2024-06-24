import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        fontSize: '0.85em',
    },
});
