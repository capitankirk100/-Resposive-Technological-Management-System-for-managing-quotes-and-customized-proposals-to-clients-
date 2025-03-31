"use client"

import { useState } from "react"
import Link from "next/link"
import {
  PlusCircle,
  Search,
  ArrowUpDown,
  MoreHorizontal,
  PenToolIcon as Tool,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
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

// Dati di esempio
const tickets = [
  {
    id: "T-2023-001",
    client: "Azienda Agricola Rossi",
    date: "18/03/2023",
    issue: "Riparazione robot tagliaerba",
    model: "Husqvarna Automower 450X",
    status: "completed",
    priority: "medium",
    technician: "Marco Bianchi",
  },
  {
    id: "T-2023-002",
    client: "Fattoria Bianchi",
    date: "25/03/2023",
    issue: "Manutenzione trattore",
    model: "John Deere 6120M",
    status: "in-progress",
    priority: "high",
    technician: "Luca Rossi",
  },
  {
    id: "T-2023-003",
    client: "Cooperativa Agricola Valle Verde",
    date: "30/03/2023",
    issue: "Sostituzione componenti mietitrebbia",
    model: "New Holland CX8.90",
    status: "pending",
    priority: "high",
    technician: "Non assegnato",
  },
  {
    id: "T-2023-004",
    client: "Azienda Vinicola Montalto",
    date: "05/04/2023",
    issue: "Calibrazione sistema di irrigazione",
    model: "Netafim Irrigation System",
    status: "pending",
    priority: "low",
    technician: "Non assegnato",
  },
  {
    id: "T-2023-005",
    client: "Agriturismo La Collina",
    date: "12/04/2023",
    issue: "Riparazione motosega",
    model: "Stihl MS 261 C-M",
    status: "completed",
    priority: "medium",
    technician: "Marco Bianchi",
  },
  {
    id: "T-2023-006",
    client: "Società Agricola Verdi",
    date: "18/04/2023",
    issue: "Manutenzione robot tagliaerba",
    model: "Husqvarna Automower 430X",
    status: "in-progress",
    priority: "medium",
    technician: "Paolo Verdi",
  },
  {
    id: "T-2023-007",
    client: "Azienda Agricola Montanari",
    date: "25/04/2023",
    issue: "Riparazione impianto elettrico trattore",
    model: "Fendt 724 Vario",
    status: "pending",
    priority: "high",
    technician: "Non assegnato",
  },
  {
    id: "T-2023-008",
    client: "Fattoria Biologica Il Poggio",
    date: "02/05/2023",
    issue: "Sostituzione lame robot tagliaerba",
    model: "Husqvarna Automower 315X",
    status: "completed",
    priority: "low",
    technician: "Marco Bianchi",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-500">Completato</Badge>
    case "in-progress":
      return <Badge className="bg-blue-500">In corso</Badge>
    case "pending":
      return <Badge className="bg-yellow-500">In attesa</Badge>
    default:
      return <Badge className="bg-gray-500">Sconosciuto</Badge>
  }
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge className="bg-red-500">Alta</Badge>
    case "medium":
      return <Badge className="bg-yellow-500">Media</Badge>
    case "low":
      return <Badge className="bg-green-500">Bassa</Badge>
    default:
      return <Badge className="bg-gray-500">Sconosciuta</Badge>
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "in-progress":
      return <Clock className="h-5 w-5 text-blue-500" />
    case "pending":
      return <AlertCircle className="h-5 w-5 text-yellow-500" />
    default:
      return <AlertCircle className="h-5 w-5 text-gray-500" />
  }
}

export default function ServiceTicketsDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState("")

  // Filtra i ticket in base alla ricerca e ai filtri
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.model.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Calcola le statistiche
  const totalTickets = filteredTickets.length
  const completedTickets = filteredTickets.filter((t) => t.status === "completed").length
  const inProgressTickets = filteredTickets.filter((t) => t.status === "in-progress").length
  const pendingTickets = filteredTickets.filter((t) => t.status === "pending").length

  const handleUpdateStatus = () => {
    // In un'applicazione reale, qui si aggiornerebbe lo stato nel database
    console.log(`Aggiornamento stato del ticket ${selectedTicket} a ${newStatus}`)
    setIsUpdateStatusDialogOpen(false)
    setSelectedTicket(null)
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assistenza</h1>
          <p className="text-muted-foreground">Gestisci le richieste di assistenza e monitora il loro stato</p>
        </div>
        <Button asChild className="mt-4 md:mt-0">
          <Link href="/assistenza/nuova">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuova Assistenza
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Assistenze</CardTitle>
            <Tool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTickets}</div>
            <p className="text-xs text-muted-foreground">Richieste di assistenza</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTickets}</div>
            <p className="text-xs text-muted-foreground">Assistenze completate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Corso</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTickets}</div>
            <p className="text-xs text-muted-foreground">Assistenze in lavorazione</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Attesa</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTickets}</div>
            <p className="text-xs text-muted-foreground">Assistenze da iniziare</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca assistenze..."
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
            <SelectItem value="completed">Completati</SelectItem>
            <SelectItem value="in-progress">In corso</SelectItem>
            <SelectItem value="pending">In attesa</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Filtra per priorità" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le priorità</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="medium">Media</SelectItem>
            <SelectItem value="low">Bassa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Elenco Assistenze</CardTitle>
          <CardDescription>{filteredTickets.length} richieste di assistenza trovate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">ID</th>
                  <th className="text-left py-3 px-2">Cliente</th>
                  <th className="text-left py-3 px-2">Data</th>
                  <th className="text-left py-3 px-2">Problema</th>
                  <th className="text-left py-3 px-2">Modello</th>
                  <th className="text-center py-3 px-2">Priorità</th>
                  <th className="text-center py-3 px-2">Stato</th>
                  <th className="text-left py-3 px-2">Tecnico</th>
                  <th className="text-right py-3 px-2">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b">
                    <td className="py-3 px-2">{ticket.id}</td>
                    <td className="py-3 px-2">{ticket.client}</td>
                    <td className="py-3 px-2">{ticket.date}</td>
                    <td className="py-3 px-2">{ticket.issue}</td>
                    <td className="py-3 px-2">{ticket.model}</td>
                    <td className="py-3 px-2 text-center">{getPriorityBadge(ticket.priority)}</td>
                    <td className="py-3 px-2 text-center">{getStatusBadge(ticket.status)}</td>
                    <td className="py-3 px-2">{ticket.technician}</td>
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
                          <DropdownMenuItem>
                            <Tool className="mr-2 h-4 w-4" />
                            Visualizza
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Modifica
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedTicket(ticket.id)
                              setNewStatus(ticket.status)
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

      <Dialog open={isUpdateStatusDialogOpen} onOpenChange={setIsUpdateStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aggiorna Stato Assistenza</DialogTitle>
            <DialogDescription>Modifica lo stato dell'assistenza {selectedTicket}</DialogDescription>
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
                  <SelectItem value="in-progress">In corso</SelectItem>
                  <SelectItem value="completed">Completato</SelectItem>
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
    </div>
  )
}

