"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/charts"
import { Button } from "@/components/ui/button"
import { CalendarDays, Code, FileText, Users, Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"

// Dati di esempio per i grafici
const projectData = [
  { month: "Gen", progetti: 5, proposte: 8 },
  { month: "Feb", progetti: 7, proposte: 10 },
  { month: "Mar", progetti: 10, proposte: 12 },
  { month: "Apr", progetti: 8, proposte: 9 },
  { month: "Mag", progetti: 12, proposte: 15 },
  { month: "Giu", progetti: 9, proposte: 11 },
]

const clientData = [
  { name: "Sviluppo Web", value: 40 },
  { name: "App Mobile", value: 25 },
  { name: "E-commerce", value: 20 },
  { name: "Consulenza", value: 15 },
]

const activityData = [
  { date: "Lun", value: 10 },
  { date: "Mar", value: 15 },
  { date: "Mer", value: 8 },
  { date: "Gio", value: 12 },
  { date: "Ven", value: 20 },
  { date: "Sab", value: 5 },
  { date: "Dom", value: 2 },
]

export default function DashboardHomepage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <CalendarDays className="h-4 w-4" />
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("it-IT", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="analytics">Attività</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progetti Attivi</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 rispetto al mese scorso</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Proposte Attive</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+3 rispetto al mese scorso</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clienti</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+4 rispetto al mese scorso</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Analisi Codice</CardTitle>
                <Code className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+12 rispetto al mese scorso</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Panoramica Progetti</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <BarChart
                    data={projectData}
                    xField="month"
                    yFields={["progetti", "proposte"]}
                    yFieldNames={["Progetti", "Proposte"]}
                    colors={["#3b82f6", "#22c55e"]}
                    yAxisLabel="Numero"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Distribuzione Clienti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <PieChart
                    data={clientData}
                    nameField="name"
                    valueField="value"
                    colors={["#3b82f6", "#22c55e", "#eab308", "#ef4444"]}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Progetti Recenti</CardTitle>
                <CardDescription>Ultimi 5 progetti creati o aggiornati</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Progetto {i}</p>
                        <p className="text-xs text-muted-foreground">
                          Cliente {i} • Aggiornato {i} giorni fa
                        </p>
                      </div>
                      <Link href={`/progetti/${i}`}>
                        <Button variant="ghost" size="icon">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Proposte Recenti</CardTitle>
                <CardDescription>Ultime 5 proposte generate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Proposta {i}</p>
                        <p className="text-xs text-muted-foreground">Per Nicode Solutions • Creata {i} giorni fa</p>
                      </div>
                      <Link href={`/proposte/${i}`}>
                        <Button variant="ghost" size="icon">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Analisi Codice Recenti</CardTitle>
                <CardDescription>Ultime 5 analisi effettuate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Code className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Analisi {i}</p>
                        <p className="text-xs text-muted-foreground">
                          Progetto {i} • {i} giorni fa
                        </p>
                      </div>
                      <Link href={`/code-manager/${i}`}>
                        <Button variant="ghost" size="icon">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Attività Recenti</CardTitle>
                <CardDescription>Andamento delle attività negli ultimi 7 giorni</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <LineChart data={activityData} xField="date" yField="value" color="#3b82f6" yAxisLabel="Attività" />
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Attività da Completare</CardTitle>
                <CardDescription>Prossime scadenze</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center">
                      <div
                        className={`mr-4 h-2 w-2 rounded-full ${i % 3 === 0 ? "bg-red-500" : i % 3 === 1 ? "bg-yellow-500" : "bg-green-500"}`}
                      />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Attività {i}</p>
                        <p className="text-xs text-muted-foreground">
                          Scadenza: {new Date(Date.now() + i * 86400000).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Completa
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

