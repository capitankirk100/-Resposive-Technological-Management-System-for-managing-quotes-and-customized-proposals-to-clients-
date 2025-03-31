"use client"

import { useState } from "react"
import {
  PlusCircle,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Users,
  Building,
  Star,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Dati di esempio
const collaborators = [
  {
    id: "COL-2023-001",
    name: "Nicode Solutions",
    contact: "Nicola Bianchi",
    email: "nicola@nicodesolutions.com",
    phone: "+39 345 1234567",
    address: "Via Roma 123, Milano",
    projects: 5,
    completedProjects: 3,
    skills: ["Backend", "Database", "API"],
    rating: 4.8,
    status: "active",
    type: "company",
    notes: "Collaboratore principale per sviluppo backend",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "COL-2023-002",
    name: "Cosmin Dev",
    contact: "Cosmin Popescu",
    email: "cosmin@cosmindev.com",
    phone: "+40 721 234567",
    address: "Strada Victoriei 45, Bucarest",
    projects: 3,
    completedProjects: 2,
    skills: ["Frontend", "React", "UI/UX"],
    rating: 4.5,
    status: "active",
    type: "freelancer",
    notes: "Specializzato in frontend React e UI/UX",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "COL-2023-003",
    name: "Georgian Team",
    contact: "Giorgi Kharadze",
    email: "giorgi@georgianteam.com",
    phone: "+995 599 123456",
    address: "Rustaveli Avenue 10, Tbilisi",
    projects: 2,
    completedProjects: 1,
    skills: ["Full Stack", "Mobile", "DevOps"],
    rating: 4.2,
    status: "active",
    type: "company",
    notes: "Team completo per progetti full stack e mobile",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "COL-2023-004",
    name: "WebDev Pro",
    contact: "Marco Verdi",
    email: "marco@webdevpro.it",
    phone: "+39 348 7654321",
    address: "Via Garibaldi 78, Roma",
    projects: 1,
    completedProjects: 1,
    skills: ["WordPress", "E-commerce", "SEO"],
    rating: 4.0,
    status: "inactive",
    type: "company",
    notes: "Specializzati in WordPress e e-commerce",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "COL-2023-005",
    name: "AI Solutions",
    contact: "Elena Rossi",
    email: "elena@aisolutions.it",
    phone: "+39 347 1122334",
    address: "Via dell'Innovazione 56, Milano",
    projects: 2,
    completedProjects: 1,
    skills: ["AI", "Machine Learning", "Data Science"],
    rating: 4.7,
    status: "active",
    type: "company",
    notes: "Specializzati in soluzioni di intelligenza artificiale",
    logo: "/placeholder.svg?height=100&width=100",
  },
]

export default function CollaboratorsDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isNewCollaboratorDialogOpen, setIsNewCollaboratorDialogOpen] = useState(false)
  const [selectedCollaborator, setSelectedCollaborator] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  // Filtra i collaboratori in base alla ricerca e ai filtri
  const filteredCollaborators = collaborators.filter((collaborator) => {
    const matchesSearch =
      collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collaborator.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collaborator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collaborator.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || collaborator.status === statusFilter
    const matchesType = typeFilter === "all" || collaborator.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Calcola le statistiche
  const totalCollaborators = filteredCollaborators.length
  const activeCollaborators = filteredCollaborators.filter((c) => c.status === "active").length
  const inactiveCollaborators = filteredCollaborators.filter((c) => c.status === "inactive").length
  const totalProjects = filteredCollaborators.reduce((sum, collaborator) => sum + collaborator.projects, 0)
  const completedProjects = filteredCollaborators.reduce((sum, collaborator) => sum + collaborator.completedProjects, 0)
  const averageRating =
    filteredCollaborators.length > 0
      ? filteredCollaborators.reduce((sum, collaborator) => sum + collaborator.rating, 0) / filteredCollaborators.length
      : 0

  // Trova il collaboratore selezionato per i dettagli
  const collaboratorDetail = selectedCollaborator ? collaborators.find((c) => c.id === selectedCollaborator) : null

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Collaboratori</h1>
          <p className="text-muted-foreground">Gestisci i collaboratori e le loro informazioni</p>
        </div>
        <Button onClick={() => setIsNewCollaboratorDialogOpen(true)} className="mt-4 md:mt-0">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuovo Collaboratore
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-5 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Collaboratori</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCollaborators}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="text-green-500">{activeCollaborators} attivi</span>
              <span>•</span>
              <span className="text-red-500">{inactiveCollaborators} inattivi</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progetti Assegnati</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">Progetti totali</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progetti Completati</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedProjects}</div>
            <p className="text-xs text-muted-foreground">
              {totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0}% completati
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valutazione Media</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}/5.0</div>
            <p className="text-xs text-muted-foreground">Valutazione collaboratori</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasso di Attività</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCollaborators > 0 ? Math.round((activeCollaborators / totalCollaborators) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Collaboratori attivi</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca collaboratori..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">Tutti</TabsTrigger>
            <TabsTrigger value="active">Attivi</TabsTrigger>
            <TabsTrigger value="inactive">Inattivi</TabsTrigger>
          </TabsList>
        </Tabs>

        <select
          className="w-full md:w-48 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">Tutti i tipi</option>
          <option value="company">Aziende</option>
          <option value="freelancer">Freelancer</option>
        </select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Elenco Collaboratori</CardTitle>
          <CardDescription>{filteredCollaborators.length} collaboratori trovati</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Collaboratore</th>
                  <th className="text-left py-3 px-2">Contatto</th>
                  <th className="text-left py-3 px-2">Email</th>
                  <th className="text-left py-3 px-2">Competenze</th>
                  <th className="text-center py-3 px-2">Progetti</th>
                  <th className="text-center py-3 px-2">Valutazione</th>
                  <th className="text-center py-3 px-2">Stato</th>
                  <th className="text-right py-3 px-2">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filteredCollaborators
                  .filter((collaborator) => {
                    if (activeTab === "all") return true
                    if (activeTab === "active") return collaborator.status === "active"
                    if (activeTab === "inactive") return collaborator.status === "inactive"
                    return true
                  })
                  .map((collaborator) => (
                    <tr key={collaborator.id} className="border-b">
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={collaborator.logo} alt={collaborator.name} />
                            <AvatarFallback>{collaborator.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{collaborator.name}</p>
                            <p className="text-xs text-muted-foreground">{collaborator.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2">{collaborator.contact}</td>
                      <td className="py-3 px-2">{collaborator.email}</td>
                      <td className="py-3 px-2">
                        <div className="flex flex-wrap gap-1">
                          {collaborator.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        {collaborator.completedProjects}/{collaborator.projects}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="flex items-center justify-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{collaborator.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        {collaborator.status === "active" ? (
                          <Badge className="bg-green-500">Attivo</Badge>
                        ) : (
                          <Badge className="bg-red-500">Inattivo</Badge>
                        )}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Azioni</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Azioni</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setSelectedCollaborator(collaborator.id)}>
                              <Users className="mr-2 h-4 w-4" />
                              Visualizza
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" />
                              Modifica
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Briefcase className="mr-2 h-4 w-4" />
                              Assegna Progetto
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Star className="mr-2 h-4 w-4" />
                              Valuta
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Invia Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="mr-2 h-4 w-4" />
                              Chiama
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Elimina
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Precedente</Button>
          <Button variant="outline">Successivo</Button>
        </CardFooter>
      </Card>

      {/* Dialog per nuovo collaboratore */}
      <Dialog open={isNewCollaboratorDialogOpen} onOpenChange={setIsNewCollaboratorDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nuovo Collaboratore</DialogTitle>
            <DialogDescription>Aggiungi un nuovo collaboratore al sistema</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Nome azienda o collaboratore" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Persona di Contatto</Label>
              <Input id="contact" placeholder="Nome e cognome" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@esempio.it" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefono</Label>
              <Input id="phone" placeholder="+39 123 4567890" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Indirizzo</Label>
              <Input id="address" placeholder="Via, numero civico, città, CAP" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <select
                id="type"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="company">Azienda</option>
                <option value="freelancer">Freelancer</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Stato</Label>
              <select
                id="status"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="active">Attivo</option>
                <option value="inactive">Inattivo</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="skills">Competenze (separate da virgola)</Label>
              <Input id="skills" placeholder="es. Frontend, React, UI/UX" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Note</Label>
              <Input id="notes" placeholder="Note aggiuntive" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="logo">Logo</Label>
              <Input id="logo" type="file" accept="image/*" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewCollaboratorDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={() => setIsNewCollaboratorDialogOpen(false)}>Salva</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog per dettagli collaboratore */}
      <Dialog open={!!selectedCollaborator} onOpenChange={(open) => !open && setSelectedCollaborator(null)}>
        <DialogContent className="max-w-3xl">
          {collaboratorDetail && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={collaboratorDetail.logo} alt={collaboratorDetail.name} />
                    <AvatarFallback>{collaboratorDetail.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {collaboratorDetail.name}
                  {collaboratorDetail.status === "active" ? (
                    <Badge className="bg-green-500 ml-2">Attivo</Badge>
                  ) : (
                    <Badge className="bg-red-500 ml-2">Inattivo</Badge>
                  )}
                </DialogTitle>
                <DialogDescription>{collaboratorDetail.id}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Informazioni di Contatto</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{collaboratorDetail.contact}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{collaboratorDetail.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{collaboratorDetail.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{collaboratorDetail.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Building className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{collaboratorDetail.type === "company" ? "Azienda" : "Freelancer"}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Performance</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Progetti completati</span>
                        <span className="text-sm font-medium">
                          {collaboratorDetail.completedProjects}/{collaboratorDetail.projects}
                        </span>
                      </div>
                      <Progress
                        value={
                          collaboratorDetail.projects > 0
                            ? (collaboratorDetail.completedProjects / collaboratorDetail.projects) * 100
                            : 0
                        }
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Valutazione</span>
                        <span className="text-sm font-medium flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          {collaboratorDetail.rating.toFixed(1)}/5.0
                        </span>
                      </div>
                      <Progress value={(collaboratorDetail.rating / 5) * 100} className="h-2" />
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Competenze</h4>
                      <div className="flex flex-wrap gap-2">
                        {collaboratorDetail.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Note</h3>
                <p className="text-sm text-muted-foreground">{collaboratorDetail.notes}</p>
              </div>
              <DialogFooter className="flex justify-between">
                <div>
                  <Button variant="outline" className="mr-2">
                    <Pencil className="mr-2 h-4 w-4" />
                    Modifica
                  </Button>
                  <Button variant="outline" className="mr-2">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Assegna Progetto
                  </Button>
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Contatta
                  </Button>
                </div>
                <Button onClick={() => setSelectedCollaborator(null)}>Chiudi</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

