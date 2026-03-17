import type { Meta, StoryObj } from '@storybook/react-vite';
import { 
    TypographyH1, 
    TypographyH2, 
    TypographyH3, 
    TypographyP, 
    TypographyLead, 
    TypographyLarge, 
    TypographySmall, 
    TypographyMuted 
} from './typography';

const meta = {
    title: 'Components/Typography',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const AllVariants: StoryObj = {
    render: () => (
        <div className="max-w-2xl space-y-8 py-8 px-4">
            <section className="space-y-4">
                <TypographyLarge className="text-muted-foreground font-normal border-b pb-2 uppercase tracking-wider">Headings</TypographyLarge>
                <div className="space-y-6">
                    <div>
                        <TypographySmall className="text-muted-foreground mb-1 block uppercase">H1 - Hero Title</TypographySmall>
                        <TypographyH1>Taxing Laughter: The Joke Tax Chronicles</TypographyH1>
                    </div>
                    <div>
                        <TypographySmall className="text-muted-foreground mb-1 block uppercase">H2 - Section Title</TypographySmall>
                        <TypographyH2>The King's Plan</TypographyH2>
                    </div>
                    <div>
                        <TypographySmall className="text-muted-foreground mb-1 block uppercase">H3 - Subtitle</TypographySmall>
                        <TypographyH3>The Joke Tax</TypographyH3>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <TypographyLarge className="text-muted-foreground font-normal border-b pb-2 uppercase tracking-wider">Body Text</TypographyLarge>
                <div className="space-y-6">
                    <div>
                        <TypographySmall className="text-muted-foreground mb-1 block uppercase">Lead</TypographySmall>
                        <TypographyLead>
                            A long time ago, in a kingdom far, far away, a king instituted a tax on jokes. 
                            Any comedian who told a bad joke had to pay the king in gold coins.
                        </TypographyLead>
                    </div>
                    <div>
                        <TypographySmall className="text-muted-foreground mb-1 block uppercase">Paragraph</TypographySmall>
                        <TypographyP>
                            The royal court was silent. Not a laugh was heard. Not a chuckle, not a snort. 
                            The comedians were too afraid to speak, and the citizens were too poor to pay. 
                            The kingdom was a very serious place, until one day, a young jester named Bob 
                            showed up with a bag of coins and a wicked grin.
                        </TypographyP>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <TypographyLarge className="text-muted-foreground font-normal border-b pb-2 uppercase tracking-wider">Labels & Details</TypographyLarge>
                <div className="space-y-6">
                    <div>
                        <TypographyLarge>This is Large Typography</TypographyLarge>
                    </div>
                    <div>
                        <TypographySmall>This is smalltypography component (TypographySmall)</TypographySmall>
                    </div>
                    <div>
                        <TypographyMuted>This is muted text (TypographyMuted) for secondary information.</TypographyMuted>
                    </div>
                </div>
            </section>
        </div>
    ),
};

export const H1: StoryObj<typeof TypographyH1> = {
    render: (args) => <TypographyH1 {...args} />,
    args: {
        children: 'Taxing Laughter: The Joke Tax Chronicles',
    },
};

export const H2: StoryObj<typeof TypographyH2> = {
    render: (args) => <TypographyH2 {...args} />,
    args: {
        children: 'The King\'s Plan',
    },
};

export const H3: StoryObj<typeof TypographyH3> = {
    render: (args) => <TypographyH3 {...args} />,
    args: {
        children: 'The Joke Tax',
    },
};

export const Paragraph: StoryObj<typeof TypographyP> = {
    render: (args) => <TypographyP {...args} />,
    args: {
        children: 'The royal court was silent. Not a laugh was heard. Not a chuckle, not a snort.',
    },
};

export const Lead: StoryObj<typeof TypographyLead> = {
    render: (args) => <TypographyLead {...args} />,
    args: {
        children: 'A long time ago, in a kingdom far, far away, a king instituted a tax on jokes.',
    },
};

export const Large: StoryObj<typeof TypographyLarge> = {
    render: (args) => <TypographyLarge {...args} />,
    args: {
        children: 'This is Large Typography',
    },
};

export const Small: StoryObj<typeof TypographySmall> = {
    render: (args) => <TypographySmall {...args} />,
    args: {
        children: 'This is small typography',
    },
};

export const Muted: StoryObj<typeof TypographyMuted> = {
    render: (args) => <TypographyMuted {...args} />,
    args: {
        children: 'This is muted text.',
    },
};
