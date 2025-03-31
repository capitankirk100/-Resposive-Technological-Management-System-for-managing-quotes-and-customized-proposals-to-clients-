"use client"

import { useState } from "react"
import Link from "next/link"
import {
  PlusCircle,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  FileCode,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpDown,
  Calendar,
  Eye,
  Code,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Dati di esempio
const concepts = [
  {
    id: "C-2023-001",
    title: "Dashboard Analytics",
    client: "Belotti Macchine Agricole",
    date: "18/03/2023",
    status: "approved",
    type: "frontend",
    creator: "ViaTecnologia",
    description: "Dashboard per l'analisi delle vendite e delle performance",
    previewUrl: "/placeholder.svg?height=300&width=500",
    codeUrl: "https://github.com/viatecnologia/dashboard-analytics",
  },
  {
    id: "C-2023-002",
    title: "App Mobile Catalogo",
    client: "Studio Legale Rossi",
    date: "25/03/2023",
    status: "in-review",
    type: "mobile",
    creator: "ViaTecnologia",
    description: "App mobile per la consultazione del catalogo prodotti",
    previewUrl: "/placeholder.svg?height=300&width=500",
    codeUrl: "https://github.com/viatecnologia/mobile-catalog",
  },
  {
    id: "C-2023-003",
    title: "Chatbot Assistenza",
    client: "Farmacia San Marco",
    date: "30/03/2023",
    status: "pending",
    type: "ai",
    creator: "ViaTecnologia",
    description: "Chatbot per l'assistenza clienti e la consultazione dei prodotti",
    previewUrl: "/placeholder.svg?height=300&width=500",
    codeUrl: "https://github.com/viatecnologia/support-chatbot",
  },
  {
    id: "C-2023-004",
    title: "Sistema Fidelity",
    client: "Ristorante Da Luigi",
    date: "05/04/2023",
    status: "approved",
    type: "fullstack",
    creator: "ViaTecnologia",
    description: "Sistema di fidelizzazione clienti con raccolta punti",
    previewUrl: "/placeholder.svg?height=300&width=500",
    codeUrl: "https://github.com/viatecnologia/fidelity-system",
  },
  {
    id: "C-2023-005",
    title: "E-commerce Responsive",
    client: "Boutique Eleganza",
    date: "12/04/2023",
    status: "rejected",
    type: "frontend",
    creator: "ViaTecnologia",
    description: "E-commerce responsive per la vendita di abbigliamento",
    previewUrl: "/placeholder.svg?height=300&width=500",
    codeUrl: "https://github.com/viatecnologia/responsive-ecommerce",
  },
  {
    id: "C-2023-006",
    title: "CRM Personalizzato",
    client: "Agenzia Immobiliare Casa Felice",
    date: "18/04/2023",
    status: "in-review",
    type: "fullstack",
    creator: "ViaTecnologia",
    description: "CRM personalizzato per la gestione dei clienti e degli immobili",
    previewUrl: "/placeholder.svg?height=300&width=500",
    codeUrl: "https://github.com/viatecnologia/custom-crm",
  },
  {
    id: "C-2023-007",
    title: "Portale Prenotazioni",
    client: "Centro Medico Salute",
    date: "25/04/2023",
    status: "pending",
    type: "frontend",
    creator: "ViaTecnologia",
    description: "Portale per la prenotazione di visite mediche",
    previewUrl: "/placeholder.svg?height=300&width=500",
    codeUrl: "https://github.com/viatecnologia/booking-portal",
  },
  {
    id: "C-2023-008",
    title: "Sistema Inventario",
    client: "Ferramenta Bricola",
    date: "02/05/2023",
    status: "approved",
    type: "backend",
    creator: "ViaTecnologia",
    description: "Sistema per la gestione dell'inventario e degli ordini",
    previewUrl: "/placeholder.svg?height=300&width=500",
    codeUrl: "https://github.com/viatecnologia/inventory-system",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return <Badge className="bg-green-500">Approvato</Badge>
    case "in-review":
      return <Badge className="bg-blue-500">In revisione</Badge>
    case "pending":
      return <Badge className="bg-yellow-500">In attesa</Badge>
    case "rejected":
      return <Badge className="bg-red-500">Rifiutato</Badge>
    default:
      return <Badge className="bg-gray-500">Sconosciuto</Badge>
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "in-review":
      return <AlertCircle className="h-5 w-5 text-blue-500" />
    case "pending":
      return <Clock className="h-5 w-5 text-yellow-500" />
    case "rejected":
      return <XCircle className="h-5 w-5 text-red-500" />
    default:
      return <AlertCircle className="h-5 w-5 text-gray-500" />
  }
}

const getTypeBadge = (type: string) => {
  switch (type) {
    case "frontend":
      return (
        <Badge variant="outline" className="bg-blue-100">
          Frontend
        </Badge>
      )
    case "backend":
      return (
        <Badge variant="outline" className="bg-green-100">
          Backend
        </Badge>
      )
    case "fullstack":
      return (
        <Badge variant="outline" className="bg-purple-100">
          Full Stack
        </Badge>
      )
    case "mobile":
      return (
        <Badge variant="outline" className="bg-orange-100">
          Mobile
        </Badge>
      )
    case "ai":
      return (
        <Badge variant="outline" className="bg-pink-100">
          AI
        </Badge>
      )
    default:
      return <Badge variant="outline">Altro</Badge>
  }
}

export default function ProofOfConceptDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState("")
  const [activeTab, setActiveTab] = useState("grid")

  // Filtra i concept in base alla ricerca e ai filtri
  const filteredConcepts = concepts.filter((concept) => {
    const matchesSearch =
      concept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concept.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concept.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concept.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || concept.status === statusFilter
    const matchesType = typeFilter === "all" || concept.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Calcola le statistiche
  const totalConcepts = filteredConcepts.length
  const approvedConcepts = filteredConcepts.filter((c) => c.status === "approved").length
  const inReviewConcepts = filteredConcepts.filter((c) => c.status === "in-review").length
  const pendingConcepts = filteredConcepts.filter((c) => c.status === "pending").length
  const rejectedConcepts = filteredConcepts.filter((c) => c.status === "rejected").length

  // Trova il concept selezionato per la preview
  const conceptToPreview = selectedConcept ? concepts.find((c) => c.id === selectedConcept) : null

  const handleUpdateStatus = () => {
    // In un'applicazione reale, qui si aggiornerebbe lo stato nel database
    console.log(`Aggiornamento stato del concept ${selectedConcept} a ${newStatus}`)
    setIsUpdateStatusDialogOpen(false)
    setSelectedConcept(null)
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Proof of Concept</h1>
          <p className="text-muted-foreground">Gestisci i proof of concept e i prototipi</p>
        </div>
        <Button asChild className="mt-4 md:mt-0">
          <Link href="/proof-of-concept/nuovo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuovo Concept
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Concept</CardTitle>
            <FileCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConcepts}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="text-green-500">{approvedConcepts} approvati</span>
              <span>•</span>
              <span className="text-blue-500">{inReviewConcepts} in revisione</span>
              <span>•</span>
              <span className="text-yellow-500">{pendingConcepts} in attesa</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasso di Approvazione</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalConcepts > 0 ? Math.round((approvedConcepts / totalConcepts) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Percentuale di concept approvati</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Revisione</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inReviewConcepts}</div>
            <p className="text-xs text-muted-foreground">Concept in fase di revisione</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasso di Rifiuto</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalConcepts > 0 ? Math.round((rejectedConcepts / totalConcepts) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Percentuale di concept rifiutati</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grid" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="grid">Griglia</TabsTrigger>
          <TabsTrigger value="list">Lista</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca concept..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Filtra per stato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti gli stati</SelectItem>
            <SelectItem value="approved">Approvati</SelectItem>
            <SelectItem value="in-review">In revisione</SelectItem>
            <SelectItem value="pending">In attesa</SelectItem>
            <SelectItem value="rejected">Rifiutati</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Filtra per tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti i tipi</SelectItem>
            <SelectItem value="frontend">Frontend</SelectItem>
            <SelectItem value="backend">Backend</SelectItem>
            <SelectItem value="fullstack">Full Stack</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="ai">AI</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TabsContent value="grid" className={activeTab === "grid" ? "block" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConcepts.map((concept) => (
            <Card key={concept.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden relative group">
                <img
                  src={concept.previewUrl || "/placeholder.svg"}
                  alt={concept.title}
                  className="h-full w-full object-cover transition-all hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mr-2"
                    onClick={() => {
                      setSelectedConcept(concept.id)
                      setIsPreviewDialogOpen(true)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => window.open(concept.codeUrl, "_blank")}>
                    <Code className="h-4 w-4 mr-1" />
                    Codice
                  </Button>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{concept.title}</CardTitle>
                    <CardDescription>{concept.client}</CardDescription>
                  </div>
                  {getStatusBadge(concept.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{concept.date}</span>
                  </div>
                  {getTypeBadge(concept.type)}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{concept.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarFallback>VT</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{concept.creator}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Azioni</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Azioni</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedConcept(concept.id)
                        setIsPreviewDialogOpen(true)
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(concept.codeUrl, "_blank")}>
                      <Code className="mr-2 h-4 w-4" />
                      Visualizza Codice
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Modifica
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedConcept(concept.id)
                        setNewStatus(concept.status)
                        setIsUpdateStatusDialogOpen(true)
                      }}
                    >
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      Aggiorna Stato
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Elimina
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="list" className={activeTab === "list" ? "block" : "hidden"}>
        <Card>
          <CardHeader>
            <CardTitle>Elenco Concept</CardTitle>
            <CardDescription>{filteredConcepts.length} concept trovati</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">ID</th>
                    <th className="text-left py-3 px-2">Titolo</th>
                    <th className="text-left py-3 px-2">Cliente</th>
                    <th className="text-left py-3 px-2">Data</th>
                    <th className="text-center py-3 px-2">Tipo</th>
                    <th className="text-center py-3 px-2">Stato</th>
                    <th className="text-right py-3 px-2">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConcepts.map((concept) => (
                    <tr key={concept.id} className="border-b">
                      <td className="py-3 px-2">{concept.id}</td>
                      <td className="py-3 px-2">{concept.title}</td>
                      <td className="py-3 px-2">{concept.client}</td>
                      <td className="py-3 px-2">{concept.date}</td>
                      <td className="py-3 px-2 text-center">{getTypeBadge(concept.type)}</td>
                      <td className="py-3 px-2 text-center">{getStatusBadge(concept.status)}</td>
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
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedConcept(concept.id)
                                setIsPreviewDialogOpen(true)
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.open(concept.codeUrl, "_blank")}>
                              <Code className="mr-2 h-4 w-4" />
                              Visualizza Codice
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" />
                              Modifica
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedConcept(concept.id)
                                setNewStatus(concept.status)
                                setIsUpdateStatusDialogOpen(true)
                              }}
                            >
                              <ArrowUpDown className="mr-2 h-4 w-4" />
                              Aggiorna Stato
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
      </TabsContent>

      <Dialog open={isUpdateStatusDialogOpen} onOpenChange={setIsUpdateStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aggiorna Stato Concept</DialogTitle>
            <DialogDescription>Modifica lo stato del concept {selectedConcept}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Stato</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Seleziona stato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">In attesa</SelectItem>
                  <SelectItem value="in-review">In revisione</SelectItem>
                  <SelectItem value="approved">Approvato</SelectItem>
                  <SelectItem value="rejected">Rifiutato</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateStatusDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleUpdateStatus}>Salva</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{conceptToPreview?.title}</DialogTitle>
            <DialogDescription>
              {conceptToPreview?.client} - {conceptToPreview?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="aspect-video w-full overflow-hidden rounded-md">
              <img
                src={conceptToPreview?.previewUrl || "/placeholder.svg"}
                alt={conceptToPreview?.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {getTypeBadge(conceptToPreview?.type || "")}
                {getStatusBadge(conceptToPreview?.status || "")}
              </div>
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarFallback>VT</AvatarFallback>
                </Avatar>
                <span className="text-sm">{conceptToPreview?.creator}</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Descrizione</h3>
              <p className="text-sm text-muted-foreground">{conceptToPreview?.description}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
              Chiudi
            </Button>
            <Button onClick={() => window.open(conceptToPreview?.codeUrl, "_blank")}>
              <Code className="mr-2 h-4 w-4" />
              Visualizza Codice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

