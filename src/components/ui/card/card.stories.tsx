import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/ui/button/button';

import {
    Card,
    CardContent,
    CardDescription,
    CardAction,
    CardFooter,
    CardHeader,
    CardTitle,
} from './card';

const meta = {
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

import { MoreVertical } from "lucide-react";

const DemoCard = () => {
    return (
        <Card className="max-w-[400px]">
            <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>
                    This is a description that spans below the title. Notice how the button stays centered to the right.
                </CardDescription>
                <CardAction>
                    <Button variant="outline" size="icon">
                        <MoreVertical />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground">
                    The CardAction component uses grid-column: 2 and spans both rows of the header (Title and Description).
                </div>
            </CardContent>
            <CardFooter className="justify-between border-t">
                <Button variant="outline">View Details</Button>
                <Button>Edit Project</Button>
            </CardFooter>
        </Card>
    );
};

export const Demo: Story = {
    render: () => <DemoCard />,
};