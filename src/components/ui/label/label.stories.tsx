import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from "@/components/ui/label/label";
import { Input } from "@/components/ui/input/input";

const LabelDemo = () => (
  <div
    style={{
      display: "flex",
      padding: "0 20px",
      flexWrap: "wrap",
      gap: 15,
      alignItems: "center",
    }}
  >
    <Label className="LabelRoot" htmlFor="firstName">
      First name
    </Label>
    <Input
      className="Input"
      type="text"
      id="firstName"
      defaultValue="Pedro Duarte"
    />
  </div>
);

const meta: Meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LabelDemo>;

export const Demo: Story = {
  render: () => <LabelDemo />,
};