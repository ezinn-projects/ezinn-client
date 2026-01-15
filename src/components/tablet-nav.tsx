import MenuItems from "./menu-items";

export default function TabletMenu({ authed }: { authed?: boolean }) {
  return (
    <div className="hidden sm:flex md:hidden">
      <MenuItems authed={authed} />
    </div>
  );
}
