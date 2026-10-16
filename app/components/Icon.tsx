type IconName = "external" | "arrow-left" | "arrow-right";
const paths: Record<IconName, string> = {
  external: "M7 17 17 7M7 7h10v10",
  "arrow-left": "M19 12H5m7-7-7 7 7 7",
  "arrow-right": "M5 12h14m-7-7 7 7-7 7",
};
export function Icon({ name }: { name: IconName }) {
  return <svg className="ui-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[name]} /></svg>;
}
