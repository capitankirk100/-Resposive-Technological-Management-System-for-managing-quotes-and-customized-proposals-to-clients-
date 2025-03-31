"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle, Trash2, Save, ArrowRight, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export type ProjectData = {
  id: string
  title: string
  client: string
  startDate: string
  endDate: string
  amount: number
  status: string
  collaborator: string
  description: string
  tasks: {
    id: string
    name: string
    description: string
    assignee: string
    status: string
    dueDate: string
  }[]
  notes: string
  attachments: string[]
}

const initialProjectData: ProjectData = {
  id: `P-${new Date().getTime().toString().slice(-6)}`,
  title: "",
  client: "",
  startDate: new Date().toISOString().split("T")[0],
  endDate: "",
  amount: 0,
  status: "pending",
  collaborator: "",
  description: "",
  tasks: [
    {
      id: "1",
      name: "",
      description: "",
      assignee: "",
      status: "pending",
      dueDate: "",
    },
  ],
  notes: "",
  attachments: [],
}

export default function ProjectForm() {
  const [projectData, setProjectData] = useState<ProjectData>(initialProjectData)
  const [activeTab, setActiveTab] = useState("basic")
  const { toast } = useToast()

  const handleDataChange = (field: string, value: any) => {
    setProjectData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTaskChange = (id: string, field: string, value: any) => {
    setProjectData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, [field]: value }
        }
        return task
      }),
    }))
  }

  const handleAddTask = () => {
    const newTask = {
      id: Date.now().toString(),
      name: "",
      description: "",
      assignee: "",
      status: "pending",
      dueDate: "",
    }
    setProjectData((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }))
  }

  const handleRemoveTask = (id: string) => {
    setProjectData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== id),
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newAttachments = Array.from(files).map((file) => URL.createObjectURL(file))
      setProjectData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...newAttachments],
      }))
    }
  }

  const handleRemoveAttachment = (index: number) => {
    setProjectData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = () => {
    // In un'applicazione reale, qui si salverebbe il progetto nel database
    toast({
      title: "Progetto salvato",
      description: `Il progetto ${projectData.title} è stato creato con successo`,
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Informazioni Base</TabsTrigger>
            <TabsTrigger value="tasks">Attività</TabsTrigger>
            <TabsTrigger value="attachments">Allegati</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Informazioni Progetto</CardTitle>
                <CardDescription>Inserisci le informazioni principali del progetto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectId">ID Progetto</Label>
                    <Input id="projectId" value={projectData.id} readOnly />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Titolo Progetto</Label>
                    <Input
                      id="title"
                      value={projectData.title}
                      onChange={(e) => handleDataChange("title", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente</Label>
                    <Select value={projectData.client} onValueChange={(value) => handleDataChange("client", value)}>
                      <SelectTrigger id="client">
                        <SelectValue placeholder="Seleziona cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Belotti Macchine Agricole">Belotti Macchine Agricole</SelectItem>
                        <SelectItem value="Studio Legale Rossi">Studio Legale Rossi</SelectItem>
                        <SelectItem value="Farmacia San Marco">Farmacia San Marco</SelectItem>
                        <SelectItem value="Ristorante Da Luigi">Ristorante Da Luigi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="collaborator">Collaboratore</Label>
                    <Select
                      value={projectData.collaborator}
                      onValueChange={(value) => handleDataChange("collaborator", value)}
                    >
                      <SelectTrigger id="collaborator">
                        <SelectValue placeholder="Seleziona collaboratore" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nicode Solutions">Nicode Solutions</SelectItem>
                        <SelectItem value="Cosmin Dev">Cosmin Dev</SelectItem>
                        <SelectItem value="Georgian Team">Georgian Team</SelectItem>
                        <SelectItem value="ViaTecnologia">ViaTecnologia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data Inizio</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={projectData.startDate}
                      onChange={(e) => handleDataChange("startDate", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">Data Fine (prevista)</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={projectData.endDate}
                      onChange={(e) => handleDataChange("endDate", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Importo (€)</Label>
                    <Input
                      id="amount"
                      type="number"
                      min="0"
                      step="0.01"
                      value={projectData.amount}
                      onChange={(e) => handleDataChange("amount", Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Stato</Label>
                    <Select value={projectData.status} onValueChange={(value) => handleDataChange("status", value)}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Seleziona stato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">In attesa</SelectItem>
                        <SelectItem value="in-progress">In corso</SelectItem>
                        <SelectItem value="completed">Completato</SelectItem>
                        <SelectItem value="rejected">Rifiutato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrizione</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={projectData.description}
                    onChange={(e) => handleDataChange("description", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Note</Label>
                  <Textarea
                    id="notes"
                    rows={3}
                    value={projectData.notes}
                    onChange={(e) => handleDataChange("notes", e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setActiveTab("tasks")}>
                  Avanti
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Attività</CardTitle>
                <CardDescription>Gestisci le attività del progetto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-end">
                  <Button onClick={handleAddTask} variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Aggiungi Attività
                  </Button>
                </div>

                {projectData.tasks.map((task) => (
                  <div key={task.id} className="border p-4 rounded-md space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <Label htmlFor={`task-name-${task.id}`}>Nome Attività</Label>
                        <Input
                          id={`task-name-${task.id}`}
                          value={task.name}
                          onChange={(e) => handleTaskChange(task.id, "name", e.target.value)}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveTask(task.id)}
                        disabled={projectData.tasks.length <= 1}
                        className="ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`task-description-${task.id}`}>Descrizione</Label>
                      <Textarea
                        id={`task-description-${task.id}`}
                        rows={2}
                        value={task.description}
                        onChange={(e) => handleTaskChange(task.id, "description", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`task-assignee-${task.id}`}>Assegnato a</Label>
                        <Select
                          value={task.assignee}
                          onValueChange={(value) => handleTaskChange(task.id, "assignee", value)}
                        >
                          <SelectTrigger id={`task-assignee-${task.id}`}>
                            <SelectValue placeholder="Seleziona assegnatario" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Marco Bianchi">Marco Bianchi</SelectItem>
                            <SelectItem value="Luca Rossi">Luca Rossi</SelectItem>
                            <SelectItem value="Paolo Verdi">Paolo Verdi</SelectItem>
                            <SelectItem value="Anna Neri">Anna Neri</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`task-status-${task.id}`}>Stato</Label>
                        <Select
                          value={task.status}
                          onValueChange={(value) => handleTaskChange(task.id, "status", value)}
                        >
                          <SelectTrigger id={`task-status-${task.id}`}>
                            <SelectValue placeholder="Seleziona stato" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Da fare</SelectItem>
                            <SelectItem value="in-progress">In corso</SelectItem>
                            <SelectItem value="completed">Completata</SelectItem>
                            <SelectItem value="blocked">Bloccata</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`task-dueDate-${task.id}`}>Scadenza</Label>
                        <Input
                          id={`task-dueDate-${task.id}`}
                          type="date"
                          value={task.dueDate}
                          onChange={(e) => handleTaskChange(task.id, "dueDate", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("basic")}>
                  Indietro
                </Button>
                <Button onClick={() => setActiveTab("attachments")}>
                  Avanti
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="attachments">
            <Card>
              <CardHeader>
                <CardTitle>Allegati</CardTitle>
                <CardDescription>Aggiungi documenti e file al progetto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <PlusCircle className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Clicca per caricare</span> o trascina qui i file
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, XLS, JPG, PNG (MAX. 10MB)</p>
                    </div>
                    <Input id="file-upload" type="file" multiple className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>

                {projectData.attachments.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {projectData.attachments.map((attachment, index) => (
                      <div key={index} className="relative border rounded-md p-2">
                        <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
                          {attachment.endsWith(".jpg") ||
                          attachment.endsWith(".png") ||
                          attachment.includes("blob:") ? (
                            <img
                              src={attachment || "/placeholder.svg"}
                              alt={`Allegato ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <FileText className="h-10 w-10 text-gray-400" />
                          )}
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs truncate">Allegato {index + 1}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleRemoveAttachment(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 border border-dashed rounded-md">
                    <p className="text-muted-foreground">Nessun allegato aggiunto</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("tasks")}>
                  Indietro
                </Button>
                <Button onClick={handleSubmit}>
                  <Save className="mr-2 h-4 w-4" />
                  Salva Progetto
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Riepilogo Progetto</CardTitle>
            <CardDescription>Anteprima delle informazioni del progetto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">{projectData.title || "Titolo Progetto"}</h3>
              <div className="flex flex-wrap gap-2">
                {projectData.client && <Badge variant="outline">{projectData.client}</Badge>}
                {projectData.status && (
                  <Badge
                    className={
                      projectData.status === "completed"
                        ? "bg-green-500"
                        : projectData.status === "in-progress"
                          ? "bg-blue-500"
                          : projectData.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                    }
                  >
                    {projectData.status === "completed"
                      ? "Completato"
                      : projectData.status === "in-progress"
                        ? "In corso"
                        : projectData.status === "pending"
                          ? "In attesa"
                          : "Rifiutato"}
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Importo:</span>
                <span className="font-medium">
                  €{projectData.amount.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Collaboratore:</span>
                <span>{projectData.collaborator || "Non assegnato"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Data inizio:</span>
                <span>{projectData.startDate || "Non impostata"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Data fine:</span>
                <span>{projectData.endDate || "Non impostata"}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Descrizione</h4>
              <p className="text-sm text-muted-foreground">
                {projectData.description || "Nessuna descrizione disponibile"}
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Attività ({projectData.tasks.length})</h4>
              <div className="space-y-2">
                {projectData.tasks
                  .filter((task) => task.name)
                  .slice(0, 3)
                  .map((task) => (
                    <div key={task.id} className="flex justify-between items-center">
                      <span className="text-sm truncate max-w-[70%]">{task.name}</span>
                      <Badge
                        variant="outline"
                        className={
                          task.status === "completed"
                            ? "bg-green-100"
                            : task.status === "in-progress"
                              ? "bg-blue-100"
                              : task.status === "blocked"
                                ? "bg-red-100"
                                : "bg-yellow-100"
                        }
                      >
                        {task.status === "completed"
                          ? "Completata"
                          : task.status === "in-progress"
                            ? "In corso"
                            : task.status === "blocked"
                              ? "Bloccata"
                              : "Da fare"}
                      </Badge>
                    </div>
                  ))}
                {projectData.tasks.filter((task) => task.name).length > 3 && (
                  <div className="text-sm text-muted-foreground text-center">
                    + altre {projectData.tasks.filter((task) => task.name).length - 3} attività
                  </div>
                )}
                {!projectData.tasks.some((task) => task.name) && (
                  <div className="text-sm text-muted-foreground">Nessuna attività definita</div>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Allegati ({projectData.attachments.length})</h4>
              {projectData.attachments.length > 0 ? (
                <div className="flex gap-2">
                  {projectData.attachments.slice(0, 3).map((_, index) => (
                    <div key={index} className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <FileText className="h-5 w-5 text-gray-500" />
                    </div>
                  ))}
                  {projectData.attachments.length > 3 && (
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">+{projectData.attachments.length - 3}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">Nessun allegato aggiunto</div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubmit}>
              <Save className="mr-2 h-4 w-4" />
              Salva Progetto
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

