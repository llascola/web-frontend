import type { Meta, StoryObj } from '@storybook/react-vite';
import {
    Section,
    SectionContainer,
    SectionHeader
} from './section';
import { TypographyH2, TypographyP } from '../typography/typography';

const meta = {
    title: 'Components/Section',
    component: Section,
    tags: ['autodocs'],
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Section {...args}>
            <SectionContainer>
                <TypographyH2 className="text-2xl font-bold text-primary mb-2">Default Section</TypographyH2>
                <TypographyP className="text-muted-foreground">This section uses an explicit Container for content alignment.</TypographyP>
            </SectionContainer>
        </Section>
    ),
};

export const WithHeader: Story = {
    render: (args) => (
        <Section {...args} className="bg-muted/30">
            <SectionHeader
                title="Section with Header"
                description="This demonstrates the modernized SectionHeader component without the decorative bar."
            />
            <SectionContainer>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-40 bg-background rounded-lg border shadow-sm flex items-center justify-center">
                            Content Card {i}
                        </div>
                    ))}
                </div>
            </SectionContainer>
        </Section>
    ),
};

export const FullWidth: Story = {
    render: (args) => (
        <Section {...args} className="bg-primary text-primary-foreground p-0">
            <div className="w-full py-12 px-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Full Width Section</h2>
                <p className="max-w-xl mx-auto opacity-90">
                    Content outside of a Container spans the entire width of the screen.
                </p>
            </div>
        </Section>
    ),
};
