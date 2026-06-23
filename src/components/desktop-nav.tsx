import MenuItems from "./menu-items";

export default function DesktopMenu({ authed }: { authed?: boolean }) {
  return (
    <div className="hidden md:flex items-center">
      <MenuItems authed={authed} />
    </div>
  );
}
