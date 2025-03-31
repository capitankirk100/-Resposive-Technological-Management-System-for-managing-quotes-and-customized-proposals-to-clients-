"use client"

import { useState } from "react"
import Link from "next/link"
import {
  PlusCircle,
  Search,
  ArrowUpDown,
  MoreHorizontal,
  FileText,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
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
const quotes = [
  {
    id: "Q-2023-001",
    client: "Azienda Agricola Rossi",
    date: "15/03/2023",
    amount: 12500.0,
    status: "accepted",
    items: 8,
  },
  {
    id: "Q-2023-002",
    client: "Fattoria Bianchi",
    date: "22/03/2023",
    amount: 8750.5,
    status: "pending",
    items: 5,
  },
  {
    id: "Q-2023-003",
    client: "Cooperativa Agricola Valle Verde",
    date: "28/03/2023",
    amount: 21350.75,
    status: "rejected",
    items: 12,
  },
  {
    id: "Q-2023-004",
    client: "Azienda Vinicola Montalto",
    date: "02/04/2023",
    amount: 15200.0,
    status: "pending",
    items: 7,
  },
  {
    id: "Q-2023-005",
    client: "Agriturismo La Collina",
    date: "10/04/2023",
    amount: 9800.25,
    status: "accepted",
    items: 6,
  },
  {
    id: "Q-2023-006",
    client: "Società Agricola Verdi",
    date: "15/04/2023",
    amount: 18500.0,
    status: "pending",
    items: 10,
  },
  {
    id: "Q-2023-007",
    client: "Azienda Agricola Montanari",
    date: "22/04/2023",
    amount: 7250.5,
    status: "accepted",
    items: 4,
  },
  {
    id: "Q-2023-008",
    client: "Fattoria Biologica Il Poggio",
    date: "28/04/2023",
    amount: 11350.75,
    status: "rejected",
    items: 9,
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "accepted":
      return <Badge className="bg-green-500">Accettato</Badge>
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
    case "accepted":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "pending":
      return <Clock className="h-5 w-5 text-yellow-500" />
    case "rejected":
      return <XCircle className="h-5 w-5 text-red-500" />
    default:
      return <Clock className="h-5 w-5 text-gray-500" />
  }
}

export default function QuotesDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null)
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState("")

  // Filtra i preventivi in base alla ricerca e al filtro di stato
  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.client.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || quote.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Calcola il totale dei preventivi filtrati
  const totalAmount = filteredQuotes.reduce((sum, quote) => sum + quote.amount, 0)

  // Calcola il totale dei preventivi accettati
  const acceptedAmount = filteredQuotes
    .filter((quote) => quote.status === "accepted")
    .reduce((sum, quote) => sum + quote.amount, 0)

  const handleUpdateStatus = () => {
    // In un'applicazione reale, qui si aggiornerebbe lo stato nel database
    console.log(`Aggiornamento stato del preventivo ${selectedQuote} a ${newStatus}`)
    setIsUpdateStatusDialogOpen(false)
    setSelectedQuote(null)
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Preventivi</h1>
          <p className="text-muted-foreground">Gestisci i preventivi e monitora il loro stato</p>
        </div>
        <Button asChild className="mt-4 md:mt-0">
          <Link href="/preventivi/nuovo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuovo Preventivo
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Preventivi</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €{totalAmount.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">{filteredQuotes.length} preventivi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Preventivi Accettati</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €{acceptedAmount.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredQuotes.filter((q) => q.status === "accepted").length} preventivi accettati
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasso di Conversione</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredQuotes.length > 0
                ? Math.round(
                    (filteredQuotes.filter((q) => q.status === "accepted").length / filteredQuotes.length) * 100,
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Percentuale di preventivi accettati</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca preventivi..."
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
            <SelectItem value="accepted">Accettati</SelectItem>
            <SelectItem value="pending">In attesa</SelectItem>
            <SelectItem value="rejected">Rifiutati</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Elenco Preventivi</CardTitle>
          <CardDescription>{filteredQuotes.length} preventivi trovati</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">ID</th>
                  <th className="text-left py-3 px-2">Cliente</th>
                  <th className="text-left py-3 px-2">Data</th>
                  <th className="text-left py-3 px-2">Articoli</th>
                  <th className="text-right py-3 px-2">Importo</th>
                  <th className="text-center py-3 px-2">Stato</th>
                  <th className="text-right py-3 px-2">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map((quote) => (
                  <tr key={quote.id} className="border-b">
                    <td className="py-3 px-2">{quote.id}</td>
                    <td className="py-3 px-2">{quote.client}</td>
                    <td className="py-3 px-2">{quote.date}</td>
                    <td className="py-3 px-2">{quote.items}</td>
                    <td className="py-3 px-2 text-right">
                      €{quote.amount.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-2 text-center">{getStatusBadge(quote.status)}</td>
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
                            <FileText className="mr-2 h-4 w-4" />
                            Visualizza
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Modifica
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedQuote(quote.id)
                              setNewStatus(quote.status)
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
            <DialogTitle>Aggiorna Stato Preventivo</DialogTitle>
            <DialogDescription>Modifica lo stato del preventivo {selectedQuote}</DialogDescription>
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
                  <SelectItem value="accepted">Accettato</SelectItem>
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
    </div>
  )
}

