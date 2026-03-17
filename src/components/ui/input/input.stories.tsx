import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';

const meta = {
    title: 'Components/Input',
    component: Input,
    tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        type: 'text',
        placeholder: 'Enter your name',
    },
};