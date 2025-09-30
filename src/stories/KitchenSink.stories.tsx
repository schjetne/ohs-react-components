import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/Button/Button";
import { Link } from "../components/Link/Link";
import { Icon } from "../components/Icon/Icon";
import type { IconName } from "../components/Icon/iconData";
import { Heading } from "../components/Heading/Heading";
import { ImageTile } from "../components/ImageTile/ImageTile";

const Row: React.FC<{
  gap?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ gap = 12, children, style }) => (
  <div style={{ display: "flex", gap, alignItems: "center", ...style }}>
    {children}
  </div>
);

const Column: React.FC<{
  gap?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ gap = 12, children, style }) => (
  <div style={{ display: "flex", flexDirection: "column", gap, ...style }}>
    {children}
  </div>
);

const KitchenSink: React.FC<{
  showDisabled: boolean;
  bg?: string;
}> = ({ showDisabled, bg }) => {
  const wrapper: React.CSSProperties = {
    padding: 24,
    background: bg || "transparent",
    minHeight: 200,
  };
  const [iconNames, setIconNames] = React.useState<string[]>([]);

  React.useEffect(() => {
    let mounted = true;
    import("../components/Icon/iconData").then((mod) => {
      if (!mounted) return;
      const names = Object.keys(mod.solidIconData || {});
      setIconNames(names);
    });
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div style={wrapper}>
      <Column gap={20}>
        <Row>
          <Button>Primary action</Button>
          <Button className="ohs-btn" disabled={showDisabled}>
            {showDisabled ? "Disabled" : "Enabled"}
          </Button>
          <Button>Secondary</Button>
        </Row>

        <Row>
          <Link href="#">Example link</Link>
          <Link href="#">Secondary link</Link>
        </Row>

        <div>
          <h4 style={{ marginTop: 0 }}>Headings</h4>
          <Column gap={8}>
            <Heading title="Page title (h2)" headingLevel="h2" />
            <Heading title="Section title (h3)" headingLevel="h3" prefix="01" />
            <Heading
              title="Inline heading with icon"
              headingLevel="h4"
              icon={"warning" as IconName}
            />
            <div style={{ marginTop: 8 }}>
              <Button asChild noPadding>
                <a href="#">
                  <Heading
                    title="Clickable heading as link"
                    headingLevel="h4"
                  />
                </a>
              </Button>
            </div>
          </Column>
        </div>

        <div>
          <h4>Composed scenario</h4>
          <div style={{ display: "flex", gap: 12 }}>
            <Button>Save</Button>
            <Link href="#">Cancel</Link>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name={"warning" as IconName} color="#ffcc00" />
              <span style={{ fontSize: 13 }}>Inline icon example</span>
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ marginTop: 20 }}>Icon gallery</h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 8,
              fontSize: 16,
            }}
          >
            {iconNames.slice(0, 24).map((n) => (
              <div key={n} style={{ width: 80, textAlign: "center" }}>
                <Icon name={n as IconName} />
                <div style={{ marginTop: 6 }}>{n}</div>
              </div>
            ))}
          </div>
        </div>
      </Column>
    </div>
  );
};

const meta: Meta<typeof KitchenSink> = {
  title: "KitchenSink",
  component: KitchenSink,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    showDisabled: { control: "boolean" },
    bg: { control: "color" },
  },
};

export default meta;

type Story = StoryObj<typeof KitchenSink>;

export const Playground: Story = {
  args: {
    showDisabled: false,
    bg: "#ffffff",
  },
};

export const DarkBackground: Story = {
  args: {
    showDisabled: false,
    bg: "#0b0f14",
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ padding: 24 }}>
      <h3>Buttons</h3>
      <Row>
        <Button>Primary</Button>
        <Button>Secondary</Button>
        <Button disabled>Disabled</Button>
      </Row>

      <h3 style={{ marginTop: 24 }}>Links</h3>
      <Row>
        <Link href="#">Primary link</Link>
      </Row>

      <h3 style={{ marginTop: 24 }}>Combined</h3>
      <Column gap={12}>
        <Row>
          <Button>Save</Button>
          <Link href="#">Cancel</Link>
        </Row>
        <Row>
          <Button>Back</Button>
          <Link href="#">Help</Link>
        </Row>
      </Column>

      <div style={{ marginTop: 24 }}>
        <h3>Image tiles</h3>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <ImageTile
            imageUrl={
              "https://media.hitmaps.com/img/hitman3/unlockables/outfit_1fdc259e-b96a-47f2-bbd8-e86e78d6df70_0.jpg"
            }
            aspect="landscape"
            style={{ width: 250, height: 140 }}
          />

          <ImageTile
            imageUrl={
              "https://media.hitmaps.com/img/hitman3/contracts/novikov_and_magolis/tile.jpg"
            }
            aspect="portrait"
            style={{ width: 120, height: 180 }}
          />

          <ImageTile
            imageUrl={
              "https://media.hitmaps.com/img/hitman3/unlockables/outfit_1fdc259e-b96a-47f2-bbd8-e86e78d6df70_0.jpg"
            }
            aspect="square"
            style={{ width: 140, height: 140 }}
          >
            <div style={{ color: "white", padding: 8 }}>Overlay</div>
          </ImageTile>
        </div>
      </div>
    </div>
  ),
};
