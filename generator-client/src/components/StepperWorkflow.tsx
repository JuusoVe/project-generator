import * as React from 'react';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import VpnKey from '@mui/icons-material/VpnKey';
import {
    Stack,
    Step,
    StepConnector,
    stepConnectorClasses,
    StepIconProps,
    StepLabel,
    Stepper,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

const Connector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 136deg, rgb(52, 177, 235) 0%, rgb(21, 139, 194) 50%, rgb(21, 139, 194) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 136deg, rgb(52, 177, 235) 0%, rgb(21, 139, 194) 50%, rgb(21, 139, 194) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const StepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(52, 177, 235) 0%, rgb(21, 139, 194) 50%, rgb(21, 139, 194) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(52, 177, 235) 0%, rgb(21, 139, 194) 50%, rgb(21, 139, 194) 100%)',
    }),
    cursor: 'pointer',
}));

const StepIcon = (props: StepIconProps) => {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <SettingsIcon />,
        2: <VpnKey />,
        3: <VideoLabelIcon />,
    };

    return (
        <StepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </StepIconRoot>
    );
};

interface CreateStep {
    label: string;
    icon: React.ReactElement;
    route: string;
}

const steps: CreateStep[] = [
    {
        label: 'Project preferences',
        icon: <SettingsIcon />,
        route: ROUTES.CREATE.PREFERENCES,
    },
    {
        label: 'API keys',
        icon: <VpnKey />,
        route: ROUTES.CREATE.KEYS,
    },
    {
        label: 'Create',
        icon: <VideoLabelIcon />,
        route: ROUTES.CREATE.GENERATE,
    },
];

const WorkflowStepper = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const activeStep = steps.findIndex(({ route }) => {
        return pathname === route;
    });

    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<Connector />}
            >
                {steps.map(({ label, route }, index) => (
                    <Step key={index} onClick={() => navigate(route)}>
                        <StepLabel StepIconComponent={StepIcon}>
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
};

export default WorkflowStepper;
