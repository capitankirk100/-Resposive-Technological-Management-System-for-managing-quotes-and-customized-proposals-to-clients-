"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Download,
  FileText,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
  Users,
} from "lucide-react"

export default function ProjectDetail({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Dati di esempio per il progetto
  const project = {
    id: Number.parseInt(id),
    title: "E-commerce Fashion Store",
    client: "Fashion Store",
    status: "in corso",
    progress: 65,
    startDate: "2023-11-10",
    endDate: "2024-01-15",
    description:
      "Sviluppo di un e-commerce completo per Fashion Store, con gestione prodotti, carrello, pagamenti e area clienti. Il progetto include anche l'integrazione con i sistemi di gestione magazzino esistenti.",
    team: [
      { id: 1, name: "Marco Rossi", role: "Project Manager", avatar: "/placeholder.svg" },
      { id: 2, name: "Laura Bianchi", role: "Frontend Developer", avatar: "/placeholder.svg" },
      { id: 3, name: "Giovanni Verdi", role: "Backend Developer", avatar: "/placeholder.svg" },
    ],
    tasks: [
      { id: 1, title: "Setup progetto", status: "completata", assignee: "Marco Rossi", dueDate: "2023-11-15" },
      { id: 2, title: "Design UI/UX", status: "completata", assignee: "Laura Bianchi", dueDate: "2023-11-30" },
      {
        id: 3,
        title: "Implementazione frontend",
        status: "in corso",
        assignee: "Laura Bianchi",
        dueDate: "2023-12-20",
      },
      { id: 4, title: "Sviluppo backend", status: "in corso", assignee: "Giovanni Verdi", dueDate: "2023-12-25" },
      { id: 5, title: "Integrazione pagamenti", status: "da fare", assignee: "Giovanni Verdi", dueDate: "2024-01-05" },
      { id: 6, title: "Testing", status: "da fare", assignee: "Marco Rossi", dueDate: "2024-01-10" },
      { id: 7, title: "Deployment", status: "da fare", assignee: "Marco Rossi", dueDate: "2024-01-15" },
    ],
    attachments: [
      { id: 1, name: "Specifiche_Progetto.pdf", size: "2.4 MB", date: "2023-11-10" },
      { id: 2, name: "Mockup_Design.fig", size: "8.7 MB", date: "2023-11-20" },
      { id: 3, name: "Database_Schema.sql", size: "1.2 MB", date: "2023-11-25" },
    ],
    notes:
      "Il cliente ha richiesto particolare attenzione all'esperienza mobile e alla velocità di caricamento delle pagine. Sarà necessario implementare lazy loading per le immagini e ottimizzare le performance.",
  }

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

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "completata":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "in corso":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "da fare":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "in ritardo":
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
        <div className="flex items-center">
          <Link href="/progetti">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">{project.title}</h2>
          <Badge className={`ml-4 ${getStatusColor(project.status)}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Modifica
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Cliente: <span className="font-medium text-foreground">{project.client}</span>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="tasks">Attività</TabsTrigger>
          <TabsTrigger value="attachments">Allegati</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progresso</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{project.progress}%</div>
                <Progress value={project.progress} className={`mt-2 ${getProgressColor(project.progress)}`} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Inizio</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{new Date(project.startDate).toLocaleDateString("it-IT")}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Fine</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{new Date(project.endDate).toLocaleDateString("it-IT")}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{project.team.length}</div>
                <div className="flex mt-2 -space-x-2">
                  {project.team.map((member) => (
                    <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Descrizione</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Note</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Aggiungi note al progetto..."
                  className="min-h-[150px]"
                  defaultValue={project.notes}
                />
                <Button className="mt-4">
                  <Save className="mr-2 h-4 w-4" />
                  Salva Note
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team di Progetto</CardTitle>
              <CardDescription>Membri del team assegnati a questo progetto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.team.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Contatta
                      </Button>
                      <Button variant="outline" size="sm">
                        Visualizza
                      </Button>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full mt-2">
                  <Plus className="mr-2 h-4 w-4" />
                  Aggiungi Membro
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Attività</CardTitle>
                <CardDescription>Gestisci le attività del progetto</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuova Attività
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <Checkbox id={`task-${task.id}`} className="mr-4" defaultChecked={task.status === "completata"} />
                      <div>
                        <Label htmlFor={`task-${task.id}`} className="font-medium">
                          {task.title}
                        </Label>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Users className="h-3 w-3 mr-1" />
                          <span>{task.assignee}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{new Date(task.dueDate).toLocaleDateString("it-IT")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getTaskStatusColor(task.status)}>
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </Badge>
                      <Select defaultValue={task.status}>
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Stato" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="da fare">Da fare</SelectItem>
                          <SelectItem value="in corso">In corso</SelectItem>
                          <SelectItem value="completata">Completata</SelectItem>
                          <SelectItem value="in ritardo">In ritardo</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aggiungi Attività</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="task-title">Titolo</Label>
                  <Input id="task-title" placeholder="Titolo attività" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="task-assignee">Assegna a</Label>
                  <Select>
                    <SelectTrigger id="task-assignee">
                      <SelectValue placeholder="Seleziona membro" />
                    </SelectTrigger>
                    <SelectContent>
                      {project.team.map((member) => (
                        <SelectItem key={member.id} value={member.name}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="task-status">Stato</Label>
                  <Select defaultValue="da fare">
                    <SelectTrigger id="task-status">
                      <SelectValue placeholder="Seleziona stato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="da fare">Da fare</SelectItem>
                      <SelectItem value="in corso">In corso</SelectItem>
                      <SelectItem value="completata">Completata</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="task-due-date">Scadenza</Label>
                  <Input id="task-due-date" type="date" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="task-description">Descrizione</Label>
                  <Textarea id="task-description" placeholder="Descrizione dell'attività..." />
                </div>
              </div>

              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Aggiungi
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attachments" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Allegati</CardTitle>
                <CardDescription>Documenti e file relativi al progetto</CardDescription>
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Carica File
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.attachments.map((file) => (
                  <div key={file.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 mr-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {file.size} • Caricato il {new Date(file.date).toLocaleDateString("it-IT")}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Scarica
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Carica Nuovo File</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="file-name">Nome File</Label>
                  <Input id="file-name" placeholder="Nome del file" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-upload">File</Label>
                  <Input id="file-upload" type="file" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-description">Descrizione</Label>
                  <Textarea id="file-description" placeholder="Descrizione del file..." />
                </div>
              </div>

              <Button className="mt-4">
                <Upload className="mr-2 h-4 w-4" />
                Carica
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

