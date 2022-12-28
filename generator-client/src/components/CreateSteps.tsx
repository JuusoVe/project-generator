import * as React from 'react';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import VpnKey from '@mui/icons-material/VpnKey';
import {
    // Link as LinkWrapper,
    Stack,
    Step,
    StepConnector,
    stepConnectorClasses,
    StepIconProps,
    StepLabel,
    Stepper,
} from '@mui/material';
import {
    Navigate as RouterLink,
    useHref,
    useLocation,
    useMatch,
    useNavigate,
    useResolvedPath,
} from 'react-router-dom';
import { routes } from '../constants';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
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

const ColorlibStepIconRoot = styled('div')<{
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
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));

const ColorlibStepIcon = (props: StepIconProps) => {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <SettingsIcon />,
        2: <VpnKey />,
        3: <VideoLabelIcon />,
    };

    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        >
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
};

interface CreateStep {
    label: string;
    icon: React.ReactElement;
    route: string;
    complete: () => boolean;
}

const WorkflowStepper = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const steps: CreateStep[] = [
        {
            label: 'Project preferences',
            icon: <SettingsIcon />,
            route: routes.create.preferences,
            complete: () => true,
        },
        {
            label: 'Set API keys',
            icon: <VpnKey />,
            route: routes.create.keys,
            complete: () => true,
        },
        {
            label: 'Create the project',
            icon: <VideoLabelIcon />,
            route: routes.create.generate,
            complete: () => false,
        },
    ];

    const activeStep = steps.findIndex(({ route }) => {
        return pathname === route;
    });

    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
            >
                {steps.map(({ label, route }, index) => (
                    <Step key={index} onClick={() => navigate(route)}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
};

export default WorkflowStepper;
