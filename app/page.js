import DashboardClient from './components/DashboardClient';
import { getDashboardData } from './lib/data';

export default async function Home() {
  const data = await getDashboardData();
  return <DashboardClient data={data} />;
}
