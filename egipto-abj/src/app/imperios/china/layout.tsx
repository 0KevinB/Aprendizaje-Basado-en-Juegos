import { EmpireNavbar } from '@/components/EmpireNavbar';

export default function ChinaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EmpireNavbar empireId="china" />
      {children}
    </>
  );
}
