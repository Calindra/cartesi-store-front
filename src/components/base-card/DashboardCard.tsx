import { Typography, Card, CardHeader, CardContent } from '@mui/material';
import { ReactElement } from 'react';

interface DashboardCardProps {
    custompadding?: string,
    customheaderpadding?: string,
    customdisplay?: string,
    custommargin?: string,
    title?: string,
    subtitle?: string,
    action?: any,
    children: ReactElement,
}
const DashboardCard = ({
    custompadding,
    customheaderpadding,
    customdisplay,
    custommargin,
    title,
    subtitle,
    action,
    children,
}: DashboardCardProps) => (
    <Card
        sx={{
            p: custompadding,
            '& .MuiCardContent-root:last-child': {
                pb: custompadding,
            },
        }}
    >
        <CardHeader
            sx={{
                p: customheaderpadding,
                display: {
                    xs: customdisplay,
                    lg: 'flex',
                    sm: 'flex',
                },
            }}
            title={
                <Typography
                    variant="h3"
                    sx={{
                        mb: {
                            xs: custommargin,
                        },
                    }}
                >
                    {title}
                </Typography>
            }
            subtitle={subtitle}
            action={action || ''}
        />
        {/* content area */}
        <CardContent
            sx={{
                p: custompadding,
            }}
        >
            {children}
        </CardContent>
    </Card>
);


export default DashboardCard;
