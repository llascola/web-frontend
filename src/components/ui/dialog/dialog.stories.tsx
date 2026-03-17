import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { useDisclosure } from '@/hooks/use-disclouser';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './dialog';

const meta = {
    title: 'Components/Dialog',
    component: Dialog,
    tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const ProfileDemo = () => {
    const { close, open, isOpen } = useDisclosure();

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(openState) => (openState ? open() : close())}
        >
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={close}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const DestructiveDemo = () => {
    const { close, open, isOpen } = useDisclosure();

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(openState) => (openState ? open() : close())}
        >
            <DialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={close}>Cancel</Button>
                    <Button variant="destructive" onClick={close}>Delete Account</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export const Profile: Story = {
    render: () => <ProfileDemo />,
};

export const Destructive: Story = {
    render: () => <DestructiveDemo />,
};