"use client"

import { useState } from "react"
import {
  PlusCircle,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  FileText,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Users,
  Building,
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

// Dati di esempio
const clients = [
  {
    id: "C-2023-001",
    name: "Belotti Macchine Agricole",
    contact: "Marco Belotti",
    email: "marco@belottimacchineagricole.it",
    phone: "+39 345 1234567",
    address: "Via Roma 123, Milano",
    projects: 3,
    concepts: 2,
    status: "active",
    type: "enterprise",
    notes: "Cliente importante, richiede attenzione particolare",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "C-2023-002",
    name: "Studio Legale Rossi",
    contact: "Luigi Rossi",
    email: "luigi@studiorossi.it",
    phone: "+39 348 7654321",
    address: "Via Verdi 45, Torino",
    projects: 1,
    concepts: 1,
    status: "active",
    type: "professional",
    notes: "Interessato a soluzioni per la gestione documentale",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "C-2023-003",
    name: "Farmacia San Marco",
    contact: "Anna Bianchi",
    email: "info@farmaciasanmarco.it",
    phone: "+39 342 9876543",
    address: "Via Montagna 78, Bergamo",
    projects: 2,
    concepts: 1,
    status: "active",
    type: "retail",
    notes: "Richiede supporto continuo per l'e-commerce",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "C-2023-004",
    name: "Ristorante Da Luigi",
    contact: "Paolo Verdi",
    email: "info@ristorantedaluigi.it",
    phone: "+39 347 1122334",
    address: "Via delle Vigne 12, Alba",
    projects: 1,
    concepts: 1,
    status: "inactive",
    type: "horeca",
    notes: "Progetto in pausa per ristrutturazione locale",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "C-2023-005",
    name: "Boutique Eleganza",
    contact: "Maria Rossi",
    email: "maria@boutiqueeleganza.it",
    phone: "+39 349 5566778",
    address: "Corso Italia 56, Milano",
    projects: 1,
    concepts: 1,
    status: "active",
    type: "retail",
    notes: "Interessata a soluzioni per e-commerce di lusso",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "C-2023-006",
    name: "Agenzia Immobiliare Casa Felice",
    contact: "Roberto Neri",
    email: "roberto@casafelice.it",
    phone: "+39 340 8877665",
    address: "Via dei Tigli 34, Bologna",
    projects: 1,
    concepts: 1,
    status: "active",
    type: "professional",
    notes: "Richiede CRM personalizzato per la gestione immobili",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "C-2023-007",
    name: "Centro Medico Salute",
    contact: "Dott.ssa Giulia Bianchi",
    email: "info@centrosalute.it",
    phone: "+39 346 2233445",
    address: "Via della Salute 67, Roma",
    projects: 1,
    concepts: 1,
    status: "active",
    type: "healthcare",
    notes: "Necessita di sistema per la gestione degli appuntamenti",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "C-2023-008",
    name: "Ferramenta Bricola",
    contact: "Giovanni Ferri",
    email: "info@bricola.it",
    phone: "+39 341 5544332",
    address: "Via dell'Industria 89, Brescia",
    projects: 1,
    concepts: 1,
    status: "inactive",
    type: "retail",
    notes: "Progetto in standby per revisione budget",
    logo: "/placeholder.svg?height=100&width=100",
  },
]

export default function ClientsDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  // Filtra i clienti in base alla ricerca e ai filtri
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.address.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    const matchesType = typeFilter === "all" || client.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Calcola le statistiche
  const totalClients = filteredClients.length
  const activeClients = filteredClients.filter((c) => c.status === "active").length
  const inactiveClients = filteredClients.filter((c) => c.status === "inactive").length
  const totalProjects = filteredClients.reduce((sum, client) => sum + client.projects, 0)
  const totalConcepts = filteredClients.reduce((sum, client) => sum + client.concepts, 0)

  // Trova il cliente selezionato per i dettagli
  const clientDetail = selectedClient ? clients.find((c) => c.id === selectedClient) : null

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clienti</h1>
          <p className="text-muted-foreground">Gestisci i clienti e le loro informazioni</p>
        </div>
        <Button onClick={() => setIsNewClientDialogOpen(true)} className="mt-4 md:mt-0">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuovo Cliente
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-5 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Clienti</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="text-green-500">{activeClients} attivi</span>
              <span>•</span>
              <span className="text-red-500">{inactiveClients} inattivi</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progetti</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">Progetti attivi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concept</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConcepts}</div>
            <p className="text-xs text-muted-foreground">Proof of concept</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasso di Attività</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalClients > 0 ? Math.round((activeClients / totalClients) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Clienti attivi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Media Progetti</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients > 0 ? (totalProjects / totalClients).toFixed(1) : 0}</div>
            <p className="text-xs text-muted-foreground">Progetti per cliente</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca clienti..."
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
          <option value="enterprise">Aziende</option>
          <option value="professional">Professionisti</option>
          <option value="retail">Retail</option>
          <option value="horeca">HoReCa</option>
          <option value="healthcare">Sanità</option>
        </select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Elenco Clienti</CardTitle>
          <CardDescription>{filteredClients.length} clienti trovati</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Cliente</th>
                  <th className="text-left py-3 px-2">Contatto</th>
                  <th className="text-left py-3 px-2">Email</th>
                  <th className="text-left py-3 px-2">Telefono</th>
                  <th className="text-center py-3 px-2">Progetti</th>
                  <th className="text-center py-3 px-2">Concept</th>
                  <th className="text-center py-3 px-2">Stato</th>
                  <th className="text-right py-3 px-2">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients
                  .filter((client) => {
                    if (activeTab === "all") return true
                    if (activeTab === "active") return client.status === "active"
                    if (activeTab === "inactive") return client.status === "inactive"
                    return true
                  })
                  .map((client) => (
                    <tr key={client.id} className="border-b">
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={client.logo} alt={client.name} />
                            <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-xs text-muted-foreground">{client.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2">{client.contact}</td>
                      <td className="py-3 px-2">{client.email}</td>
                      <td className="py-3 px-2">{client.phone}</td>
                      <td className="py-3 px-2 text-center">{client.projects}</td>
                      <td className="py-3 px-2 text-center">{client.concepts}</td>
                      <td className="py-3 px-2 text-center">
                        {client.status === "active" ? (
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
                            <DropdownMenuItem onClick={() => setSelectedClient(client.id)}>
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
                              Nuovo Progetto
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Nuovo Concept
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

      {/* Dialog per nuovo cliente */}
      <Dialog open={isNewClientDialogOpen} onOpenChange={setIsNewClientDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nuovo Cliente</DialogTitle>
            <DialogDescription>Aggiungi un nuovo cliente al sistema</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Azienda</Label>
              <Input id="name" placeholder="Nome azienda" />
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
                <option value="enterprise">Azienda</option>
                <option value="professional">Professionista</option>
                <option value="retail">Retail</option>
                <option value="horeca">HoReCa</option>
                <option value="healthcare">Sanità</option>
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
              <Label htmlFor="notes">Note</Label>
              <Input id="notes" placeholder="Note aggiuntive" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="logo">Logo</Label>
              <Input id="logo" type="file" accept="image/*" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewClientDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={() => setIsNewClientDialogOpen(false)}>Salva</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog per dettagli cliente */}
      <Dialog open={!!selectedClient} onOpenChange={(open) => !open && setSelectedClient(null)}>
        <DialogContent className="max-w-3xl">
          {clientDetail && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={clientDetail.logo} alt={clientDetail.name} />
                    <AvatarFallback>{clientDetail.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {clientDetail.name}
                  {clientDetail.status === "active" ? (
                    <Badge className="bg-green-500 ml-2">Attivo</Badge>
                  ) : (
                    <Badge className="bg-red-500 ml-2">Inattivo</Badge>
                  )}
                </DialogTitle>
                <DialogDescription>{clientDetail.id}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Informazioni di Contatto</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{clientDetail.contact}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{clientDetail.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{clientDetail.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{clientDetail.address}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Attività</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>Progetti</span>
                      </div>
                      <Badge variant="outline">{clientDetail.projects}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>Concept</span>
                      </div>
                      <Badge variant="outline">{clientDetail.concepts}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Building className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>Tipo</span>
                      </div>
                      <Badge variant="outline">
                        {clientDetail.type === "enterprise" && "Azienda"}
                        {clientDetail.type === "professional" && "Professionista"}
                        {clientDetail.type === "retail" && "Retail"}
                        {clientDetail.type === "horeca" && "HoReCa"}
                        {clientDetail.type === "healthcare" && "Sanità"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Note</h3>
                <p className="text-sm text-muted-foreground">{clientDetail.notes}</p>
              </div>
              <DialogFooter className="flex justify-between">
                <div>
                  <Button variant="outline" className="mr-2">
                    <Pencil className="mr-2 h-4 w-4" />
                    Modifica
                  </Button>
                  <Button variant="outline" className="mr-2">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button variant="outline">
                    <Phone className="mr-2 h-4 w-4" />
                    Chiama
                  </Button>
                </div>
                <Button onClick={() => setSelectedClient(null)}>Chiudi</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

