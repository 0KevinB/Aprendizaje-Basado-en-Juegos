import { EmpireNavbar } from '@/components/EmpireNavbar';

export default function EgiptoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EmpireNavbar empireId="egipto" />
      {children}
    </>
  );
}
