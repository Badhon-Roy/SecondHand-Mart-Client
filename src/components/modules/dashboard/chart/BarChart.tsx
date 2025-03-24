"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
    history: {
        label: "History",
    },
    listing: {
        label: "Listing",
        color: "#2662d9",
    },
    favorite: {
        label: "Favorite",
        color: "#2eb88a",
    },
    purchases: {
        label: "Purchases",
        color: "#e88c30",
    },
    sales: {
        label: "Sales",
        color: "#af57db",
    },
    blogs: {
        label: "Blogs",
        color: "#e23670",
    },
} satisfies ChartConfig

const currentMonthYear = new Date().toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
});

export function BarChartLayout({ chartData }: { chartData: any }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Bar Chart - Active</CardTitle>
                <CardDescription>{currentMonthYear}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} >
                    <BarChart accessibilityLayer data={chartData} >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="browser"
                            tickLine={true}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                        />
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="history"
                            strokeWidth={2}
                            radius={8}
                            activeIndex={2}
                            activeBar={({ ...props }) => {
                                return (
                                    <Rectangle
                                        {...props}
                                        fillOpacity={0.8}
                                        stroke={props.payload.fill}
                                        strokeDasharray={4}
                                        strokeDashoffset={4}
                                    />
                                )
                            }}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total history from joining to now
                </div>
            </CardFooter>
        </Card>
    )
}
