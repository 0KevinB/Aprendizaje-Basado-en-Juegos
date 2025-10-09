import { EmpireNavbar } from '@/components/EmpireNavbar';

export default function MesopotamiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EmpireNavbar empireId="mesopotamia" />
      {children}
    </>
  );
}
