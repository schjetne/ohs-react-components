declare module "*.css" {
  const content: { [className: string]: string } | string;
  export default content;
}

declare module "*.scss" {
  const content: { [className: string]: string } | string;
  export default content;
}

// Allow consumers to import the package styles subpath directly:
declare module "@ohshitman/ohs-react-components/styles" {
  const css: string;
  export default css;
}

declare module "@ohshitman/ohs-react-components/styles.css" {
  const css: string;
  export default css;
}
