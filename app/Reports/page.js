import { getDashboardData } from '../lib/data';
import ReportsClient from '../components/ReportsClient';

export default async function Home() {
  const data = await getDashboardData();
  return <ReportsClient data={data} />;
}