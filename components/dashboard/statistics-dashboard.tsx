"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, PieChart } from "@/components/charts"

// Dati di esempio per i grafici
const monthlyRevenueData = [
  { name: "Gen", value: 45000 },
  { name: "Feb", value: 52000 },
  { name: "Mar", value: 48000 },
  { name: "Apr", value: 61000 },
  { name: "Mag", value: 55000 },
  { name: "Giu", value: 67000 },
  { name: "Lug", value: 72000 },
  { name: "Ago", value: 59000 },
  { name: "Set", value: 68000 },
  { name: "Ott", value: 79000 },
  { name: "Nov", value: 83000 },
  { name: "Dic", value: 95000 },
]

const categoryRevenueData = [
  { name: "Robot Tagliaerba", value: 125000 },
  { name: "Trattori", value: 350000 },
  { name: "Mietitrebbie", value: 280000 },
  { name: "Motoseghe", value: 75000 },
  { name: "Sistemi di Irrigazione", value: 95000 },
]

const serviceTicketsData = [
  { name: "Gen", completed: 12, inProgress: 5, pending: 3 },
  { name: "Feb", completed: 15, inProgress: 7, pending: 4 },
  { name: "Mar", completed: 18, inProgress: 6, pending: 5 },
  { name: "Apr", completed: 22, inProgress: 8, pending: 3 },
  { name: "Mag", completed: 19, inProgress: 7, pending: 6 },
  { name: "Giu", completed: 25, inProgress: 9, pending: 4 },
  { name: "Lug", completed: 28, inProgress: 10, pending: 5 },
  { name: "Ago", completed: 20, inProgress: 8, pending: 3 },
  { name: "Set", completed: 24, inProgress: 9, pending: 4 },
  { name: "Ott", completed: 27, inProgress: 11, pending: 6 },
  { name: "Nov", completed: 30, inProgress: 12, pending: 5 },
  { name: "Dic", completed: 35, inProgress: 14, pending: 7 },
]

const quoteConversionData = [
  { name: "Accettati", value: 65, color: "#22c55e" },
  { name: "In attesa", value: 25, color: "#eab308" },
  { name: "Rifiutati", value: 10, color: "#ef4444" },
]

const topProductsData = [
  { name: "Husqvarna Automower 450X", value: 35 },
  { name: "John Deere 6120M", value: 28 },
  { name: "Stihl MS 261 C-M", value: 22 },
  { name: "Husqvarna Automower 430X", value: 18 },
  { name: "Fendt 724 Vario", value: 15 },
]

const technicianPerformanceData = [
  { name: "Marco Bianchi", completed: 45, inProgress: 12, pending: 5 },
  { name: "Luca Rossi", completed: 38, inProgress: 15, pending: 8 },
  { name: "Paolo Verdi", completed: 42, inProgress: 10, pending: 6 },
]

export default function StatisticsDashboard() {
  const [timeRange, setTimeRange] = useState("year")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistiche</h1>
          <p className="text-muted-foreground">Analisi delle performance e dei dati aziendali</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleziona periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Ultimo mese</SelectItem>
              <SelectItem value="quarter">Ultimo trimestre</SelectItem>
              <SelectItem value="year">Ultimo anno</SelectItem>
              <SelectItem value="all">Tutti i dati</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="sales">Vendite</TabsTrigger>
          <TabsTrigger value="service">Assistenza</TabsTrigger>
          <TabsTrigger value="products">Prodotti</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Fatturato Mensile</CardTitle>
                <CardDescription>Andamento del fatturato negli ultimi 12 mesi</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart
                  data={monthlyRevenueData}
                  xField="name"
                  yField="value"
                  color="#3b82f6"
                  yAxisLabel="Fatturato (€)"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fatturato per Categoria</CardTitle>
                <CardDescription>Distribuzione del fatturato per categoria di prodotto</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart data={categoryRevenueData} nameField="name" valueField="value" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversione Preventivi</CardTitle>
                <CardDescription>Percentuale di preventivi accettati, in attesa e rifiutati</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart
                  data={quoteConversionData}
                  nameField="name"
                  valueField="value"
                  colors={quoteConversionData.map((item) => item.color)}
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Assistenze Mensili</CardTitle>
                <CardDescription>Andamento delle assistenze negli ultimi 12 mesi</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart
                  data={serviceTicketsData}
                  xField="name"
                  yFields={["completed", "inProgress", "pending"]}
                  yFieldNames={["Completate", "In corso", "In attesa"]}
                  colors={["#22c55e", "#3b82f6", "#eab308"]}
                  yAxisLabel="Numero assistenze"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prodotti Più Venduti</CardTitle>
                <CardDescription>I 5 prodotti più venduti</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart
                  data={topProductsData}
                  xField="name"
                  yFields={["value"]}
                  yFieldNames={["Vendite"]}
                  colors={["#3b82f6"]}
                  yAxisLabel="Unità vendute"
                  horizontal
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fatturato Mensile</CardTitle>
                <CardDescription>Andamento del fatturato negli ultimi 12 mesi</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart
                  data={monthlyRevenueData}
                  xField="name"
                  yField="value"
                  color="#3b82f6"
                  yAxisLabel="Fatturato (€)"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fatturato per Categoria</CardTitle>
                <CardDescription>Distribuzione del fatturato per categoria di prodotto</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart data={categoryRevenueData} nameField="name" valueField="value" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Conversione Preventivi</CardTitle>
              <CardDescription>Percentuale di preventivi accettati, in attesa e rifiutati</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <PieChart
                data={quoteConversionData}
                nameField="name"
                valueField="value"
                colors={quoteConversionData.map((item) => item.color)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="service" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Assistenze Mensili</CardTitle>
                <CardDescription>Andamento delle assistenze negli ultimi 12 mesi</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart
                  data={serviceTicketsData}
                  xField="name"
                  yFields={["completed", "inProgress", "pending"]}
                  yFieldNames={["Completate", "In corso", "In attesa"]}
                  colors={["#22c55e", "#3b82f6", "#eab308"]}
                  yAxisLabel="Numero assistenze"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Tecnici</CardTitle>
                <CardDescription>Assistenze completate per tecnico</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart
                  data={technicianPerformanceData}
                  xField="name"
                  yFields={["completed", "inProgress", "pending"]}
                  yFieldNames={["Completate", "In corso", "In attesa"]}
                  colors={["#22c55e", "#3b82f6", "#eab308"]}
                  yAxisLabel="Numero assistenze"
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tempo Medio di Completamento</CardTitle>
              <CardDescription>Tempo medio di completamento delle assistenze per categoria</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <BarChart
                data={[
                  { name: "Robot Tagliaerba", value: 2.5 },
                  { name: "Trattori", value: 4.8 },
                  { name: "Mietitrebbie", value: 6.2 },
                  { name: "Motoseghe", value: 1.3 },
                  { name: "Sistemi di Irrigazione", value: 3.7 },
                ]}
                xField="name"
                yFields={["value"]}
                yFieldNames={["Giorni"]}
                colors={["#3b82f6"]}
                yAxisLabel="Giorni"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Prodotti Più Venduti</CardTitle>
                <CardDescription>I 5 prodotti più venduti</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart
                  data={topProductsData}
                  xField="name"
                  yFields={["value"]}
                  yFieldNames={["Vendite"]}
                  colors={["#3b82f6"]}
                  yAxisLabel="Unità vendute"
                  horizontal
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vendite per Categoria</CardTitle>
                <CardDescription>Distribuzione delle vendite per categoria di prodotto</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart
                  data={[
                    { name: "Robot Tagliaerba", value: 85 },
                    { name: "Trattori", value: 45 },
                    { name: "Mietitrebbie", value: 12 },
                    { name: "Motoseghe", value: 65 },
                    { name: "Sistemi di Irrigazione", value: 38 },
                  ]}
                  nameField="name"
                  valueField="value"
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Andamento Vendite per Prodotto</CardTitle>
              <CardDescription>Andamento delle vendite dei prodotti principali</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <LineChart
                data={[
                  { name: "Gen", robot: 8, trattori: 5, motoseghe: 7 },
                  { name: "Feb", robot: 10, trattori: 6, motoseghe: 8 },
                  { name: "Mar", robot: 12, trattori: 8, motoseghe: 10 },
                  { name: "Apr", robot: 15, trattori: 7, motoseghe: 12 },
                  { name: "Mag", robot: 18, trattori: 9, motoseghe: 15 },
                  { name: "Giu", robot: 20, trattori: 10, motoseghe: 18 },
                  { name: "Lug", robot: 22, trattori: 12, motoseghe: 20 },
                  { name: "Ago", robot: 19, trattori: 11, motoseghe: 17 },
                  { name: "Set", robot: 17, trattori: 10, motoseghe: 15 },
                  { name: "Ott", robot: 15, trattori: 8, motoseghe: 12 },
                  { name: "Nov", robot: 13, trattori: 7, motoseghe: 10 },
                  { name: "Dic", robot: 10, trattori: 6, motoseghe: 8 },
                ]}
                xField="name"
                yFields={["robot", "trattori", "motoseghe"]}
                yFieldNames={["Robot Tagliaerba", "Trattori", "Motoseghe"]}
                colors={["#3b82f6", "#22c55e", "#eab308"]}
                yAxisLabel="Unità vendute"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

