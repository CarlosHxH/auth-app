import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Navigation } from '@toolpad/core/AppProvider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/provider/SessionProvider";

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
];

const BRANDING = {
  title: '5sTransportes',
};

export default async function DashboardPagesLayout(props: { children: React.ReactNode })
{
  const session = await getServerSession(authOptions);
  return (
    <SessionProvider session={session}>
      <DashboardLayout branding={BRANDING} navigation={NAVIGATION}>
        <PageContainer>{props.children}</PageContainer>
      </DashboardLayout>
    </SessionProvider>
  );
}
