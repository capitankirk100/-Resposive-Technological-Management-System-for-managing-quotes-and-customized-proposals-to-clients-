"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, CheckCircle, Plus, Search, Users, ArrowRight, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProjectsDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const projects = [
    {
      id: 1,
      title: "E-commerce Fashion Store",
      client: "Fashion Store",
      status: "in corso",
      progress: 65,
      startDate: "2023-11-10",
      endDate: "2024-01-15",
      team: [
        { id: 1, name: "Marco Rossi", role: "Project Manager", avatar: "/placeholder.svg" },
        { id: 2, name: "Laura Bianchi", role: "Frontend Developer", avatar: "/placeholder.svg" },
        { id: 3, name: "Giovanni Verdi", role: "Backend Developer", avatar: "/placeholder.svg" },
      ],
      tasks: {
        total: 24,
        completed: 16,
      },
    },
    {
      id: 2,
      title: "App Mobile Ristorante",
      client: "Trattoria Bella Italia",
      status: "pianificato",
      progress: 10,
      startDate: "2024-01-20",
      endDate: "2024-03-15",
      team: [
        { id: 1, name: "Marco Rossi", role: "Project Manager", avatar: "/placeholder.svg" },
        { id: 4, name: "Giulia Neri", role: "UI/UX Designer", avatar: "/placeholder.svg" },
        { id: 5, name: "Paolo Gialli", role: "Mobile Developer", avatar: "/placeholder.svg" },
      ],
      tasks: {
        total: 18,
        completed: 2,
      },
    },
    {
      id: 3,
      title: "Sito Web Aziendale",
      client: "Studio Legale Rossi",
      status: "completato",
      progress: 100,
      startDate: "2023-09-05",
      endDate: "2023-10-30",
      team: [
        { id: 2, name: "Laura Bianchi", role: "Frontend Developer", avatar: "/placeholder.svg" },
        { id: 4, name: "Giulia Neri", role: "UI/UX Designer", avatar: "/placeholder.svg" },
      ],
      tasks: {
        total: 15,
        completed: 15,
      },
    },
    {
      id: 4,
      title: "Sistema Gestionale",
      client: "Farmacia Centrale",
      status: "in corso",
      progress: 40,
      startDate: "2023-12-01",
      endDate: "2024-02-28",
      team: [
        { id: 1, name: "Marco Rossi", role: "Project Manager", avatar: "/placeholder.svg" },
        { id: 3, name: "Giovanni Verdi", role: "Backend Developer", avatar: "/placeholder.svg" },
        { id: 5, name: "Paolo Gialli", role: "Mobile Developer", avatar: "/placeholder.svg" },
      ],
      tasks: {
        total: 32,
        completed: 13,
      },
    },
    {
      id: 5,
      title: "Ottimizzazione SEO",
      client: "Hotel Belvedere",
      status: "in pausa",
      progress: 75,
      startDate: "2023-10-15",
      endDate: "2024-01-31",
      team: [{ id: 6, name: "Chiara Blu", role: "SEO Specialist", avatar: "/placeholder.svg" }],
      tasks: {
        total: 12,
        completed: 9,
      },
    },
  ]

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in corso":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "pianificato":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "completato":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "in pausa":
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
      case "cancellato":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress < 25) return "bg-red-500"
    if (progress < 50) return "bg-orange-500"
    if (progress < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Progetti</h2>
        <div className="flex items-center space-x-2">
          <Link href="/progetti/nuovo">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuovo Progetto
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="all">Tutti</TabsTrigger>
            <TabsTrigger value="active">In Corso</TabsTrigger>
            <TabsTrigger value="planned">Pianificati</TabsTrigger>
            <TabsTrigger value="completed">Completati</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cerca progetti..."
                className="w-[200px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtra per" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i clienti</SelectItem>
                <SelectItem value="fashion">Fashion Store</SelectItem>
                <SelectItem value="trattoria">Trattoria Bella Italia</SelectItem>
                <SelectItem value="studio">Studio Legale Rossi</SelectItem>
                <SelectItem value="farmacia">Farmacia Centrale</SelectItem>
                <SelectItem value="hotel">Hotel Belvedere</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription className="mt-1">Cliente: {project.client}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progresso:</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className={getProgressColor(project.progress)} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">Inizio:</span>
                        </div>
                        <span>{new Date(project.startDate).toLocaleDateString("it-IT")}</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">Fine:</span>
                        </div>
                        <span>{new Date(project.endDate).toLocaleDateString("it-IT")}</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">Attività:</span>
                        </div>
                        <span>
                          {project.tasks.completed}/{project.tasks.total} completate
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">Team:</span>
                        </div>
                        <div className="flex -space-x-2">
                          {project.team.map((member) => (
                            <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Link href={`/progetti/${project.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Dettagli
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects
              .filter((project) => project.status === "in corso")
              .map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription className="mt-1">Cliente: {project.client}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progresso:</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className={getProgressColor(project.progress)} />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Inizio:</span>
                          </div>
                          <span>{new Date(project.startDate).toLocaleDateString("it-IT")}</span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Fine:</span>
                          </div>
                          <span>{new Date(project.endDate).toLocaleDateString("it-IT")}</span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Attività:</span>
                          </div>
                          <span>
                            {project.tasks.completed}/{project.tasks.total} completate
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Team:</span>
                          </div>
                          <div className="flex -space-x-2">
                            {project.team.map((member) => (
                              <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Link href={`/progetti/${project.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Dettagli
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="planned" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects
              .filter((project) => project.status === "pianificato")
              .map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription className="mt-1">Cliente: {project.client}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progresso:</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className={getProgressColor(project.progress)} />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Inizio:</span>
                          </div>
                          <span>{new Date(project.startDate).toLocaleDateString("it-IT")}</span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Fine:</span>
                          </div>
                          <span>{new Date(project.endDate).toLocaleDateString("it-IT")}</span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Attività:</span>
                          </div>
                          <span>
                            {project.tasks.completed}/{project.tasks.total} completate
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Team:</span>
                          </div>
                          <div className="flex -space-x-2">
                            {project.team.map((member) => (
                              <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Link href={`/progetti/${project.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Dettagli
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects
              .filter((project) => project.status === "completato")
              .map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription className="mt-1">Cliente: {project.client}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progresso:</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className={getProgressColor(project.progress)} />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Inizio:</span>
                          </div>
                          <span>{new Date(project.startDate).toLocaleDateString("it-IT")}</span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Fine:</span>
                          </div>
                          <span>{new Date(project.endDate).toLocaleDateString("it-IT")}</span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Attività:</span>
                          </div>
                          <span>
                            {project.tasks.completed}/{project.tasks.total} completate
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">Team:</span>
                          </div>
                          <div className="flex -space-x-2">
                            {project.team.map((member) => (
                              <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Link href={`/progetti/${project.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Dettagli
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

