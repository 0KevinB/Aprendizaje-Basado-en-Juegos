import { EmpireNavbar } from '@/components/EmpireNavbar';

export default function IndiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EmpireNavbar empireId="india" />
      {children}
    </>
  );
}
