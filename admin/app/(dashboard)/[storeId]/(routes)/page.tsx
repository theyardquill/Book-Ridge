import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { Overview } from "@/components/overview";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { notFound } from "next/navigation";

const DashboardPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const { storeId } = params;

  const store = await prismadb.store.findFirst({
    where: { id: storeId },
  });

  if (!store) {
    notFound();
  }

  const totalRevenue = await getTotalRevenue(storeId);
  const salesCount = await getSalesCount(storeId);
  const stockCount = await getStockCount(storeId);
  const graphRevenue = await getGraphRevenue(storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />

        {/* Cards Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <Card className="w-100">
            <CardHeader className="flex items-center gap-2 pb-2">
              <DollarSign className="text-muted-foreground w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-md text-center font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-2 pb-2">
              <CreditCard className="text-muted-foreground w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-center font-bold">+{salesCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-2 pb-2">
              <Package className="text-muted-foreground w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
              <CardTitle className="text-sm font-medium">Products in Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-center font-bold">{stockCount}</div>
            </CardContent>
          </Card>

        </div>

        {/* Overview Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default DashboardPage;