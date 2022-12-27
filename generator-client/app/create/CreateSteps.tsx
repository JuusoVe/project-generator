'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import VpnKey from '@mui/icons-material/VpnKey';
import { useRouter } from 'next/router';
import {
    Link,
    Stack,
    Step,
    StepConnector,
    stepConnectorClasses,
    StepIconProps,
    StepLabel,
    Stepper,
} from '@mui/material';

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

interface CreateStep {
    label: string;
    icon: React.ReactElement;
    name: string;
    complete: () => boolean;
}

const stepsNew: CreateStep[] = [
    {
        label: 'Project preferences',
        icon: <SettingsIcon />,
        name: 'preferences',
        complete: () => true,
    },
    {
        label: 'Set API keys',
        icon: <VpnKey />,
        name: 'keys',
        complete: () => true,
    },
    {
        label: 'Create the project',
        icon: <VideoLabelIcon />,
        name: 'create',
        complete: () => false,
    },
];

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

const APP_PREFIX = '/app/';

const WorkflowStepper = () => {
    // const router = useRouter();

    const getActiveStep = () => {
        // const activeStep = stepsNew.findIndex(
        //     ({ name }) => APP_PREFIX + name === router.pathname
        // );
        // return activeStep >= 0 ? activeStep : 0;
        return 1;
    };

    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper
                alternativeLabel
                activeStep={getActiveStep()}
                connector={<ColorlibConnector />}
            >
                {stepsNew.map(({ label, name }, index) => (
                    <Step key={index} onClick={() => console.log('stuff')}>
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
