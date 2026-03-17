import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
            description: 'The visual style of the button',
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
            description: 'The size of the button',
        },
        children: {
            control: 'text',
            description: 'The text or content inside the button',
        },
        asChild: {
            table: {
                disable: true, // Hides this prop from the controls to reduce clutter
            }
        }
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// 👇 Your primary button story
export const Primary: Story = {
    args: {
        variant: 'default',
        size: "sm",
        children: 'Click me',
    },
};

// 👇 It's often helpful to export a few pre-set stories for quick reference!
export const Destructive: Story = {
    args: {
        variant: 'destructive',
        size: 'default',
        children: 'Delete Account',
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        size: 'default',
        children: 'Cancel',
    },
};