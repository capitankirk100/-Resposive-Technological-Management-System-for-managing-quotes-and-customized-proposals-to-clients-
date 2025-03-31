"use client"

import { useState } from "react"
import {
  PlusCircle,
  Search,
  MoreHorizontal,
  Users,
  Pencil,
  Trash2,
  FileText,
  PenToolIcon as Tool,
  Phone,
  Mail,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Dati di esempio
const clients = [
  {
    id: "C-2023-001",
    name: "Azienda Agricola Rossi",
    contact: "Mario Rossi",
    email: "mario.rossi@agricolarossi.it",
    phone: "+39 345 1234567",
    address: "Via Roma 123, Milano",
    quotes: 3,
    tickets: 2,
  },
  {
    id: "C-2023-002",
    name: "Fattoria Bianchi",
    contact: "Luigi Bianchi",
    email: "luigi.bianchi@fattoriabianchi.it",
    phone: "+39 348 7654321",
    address: "Via Verdi 45, Torino",
    quotes: 1,
    tickets: 1,
  },
  {
    id: "C-2023-003",
    name: "Cooperativa Agricola Valle Verde",
    contact: "Anna Verdi",
    email: "anna.verdi@valleverde.it",
    phone: "+39 342 9876543",
    address: "Via Montagna 78, Bergamo",
    quotes: 2,
    tickets: 1,
  },
  {
    id: "C-2023-004",
    name: "Azienda Vinicola Montalto",
    contact: "Paolo Montalto",
    email: "paolo@vinimontalto.it",
    phone: "+39 347 1122334",
    address: "Via delle Vigne 12, Alba",
    quotes: 1,
    tickets: 1,
  },
  {
    id: "C-2023-005",
    name: "Agriturismo La Collina",
    contact: "Francesca Colli",
    email: "info@agriturismolacollina.it",
    phone: "+39 349 5566778",
    address: "Strada Provinciale 56, Siena",
    quotes: 1,
    tickets: 1,
  },
  {
    id: "C-2023-006",
    name: "Società Agricola Verdi",
    contact: "Marco Verdi",
    email: "marco.verdi@agricolaverdi.it",
    phone: "+39 340 8877665",
    address: "Via dei Campi 34, Bologna",
    quotes: 1,
    tickets: 0,
  },
  {
    id: "C-2023-007",
    name: "Azienda Agricola Montanari",
    contact: "Roberto Montanari",
    email: "roberto@agricolamontanari.it",
    phone: "+39 346 2233445",
    address: "Via delle Alpi 67, Trento",
    quotes: 1,
    tickets: 1,
  },
  {
    id: "C-2023-008",
    name: "Fattoria Biologica Il Poggio",
    contact: "Giovanna Poggi",
    email: "info@fattoriailpoggio.it",
    phone: "+39 341 5544332",
    address: "Via del Sole 89, Firenze",
    quotes: 1,
    tickets: 1,
  },
]

export default function ClientsDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false)
  const [newClient, setNewClient] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
  })

  // Filtra i clienti in base alla ricerca
  const filteredClients = clients.filter((client) => {
    return (
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleNewClientSubmit = () => {
    // In un'applicazione reale, qui si aggiungerebbe il cliente al database
    console.log("Nuovo cliente:", newClient)
    setIsNewClientDialogOpen(false)
    setNewClient({
      name: "",
      contact: "",
      email: "",
      phone: "",
      address: "",
    })
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clienti</h1>
          <p className="text-muted-foreground">Gestisci i clienti e visualizza le loro informazioni</p>
        </div>
        <Button onClick={() => setIsNewClientDialogOpen(true)} className="mt-4 md:mt-0">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuovo Cliente
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Clienti</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredClients.length}</div>
            <p className="text-xs text-muted-foreground">Clienti registrati</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Preventivi Totali</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredClients.reduce((sum, client) => sum + client.quotes, 0)}</div>
            <p className="text-xs text-muted-foreground">Preventivi emessi per i clienti</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assistenze Totali</CardTitle>
            <Tool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredClients.reduce((sum, client) => sum + client.tickets, 0)}</div>
            <p className="text-xs text-muted-foreground">Assistenze effettuate per i clienti</p>
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
                  <th className="text-left py-3 px-2">Indirizzo</th>
                  <th className="text-center py-3 px-2">Preventivi</th>
                  <th className="text-center py-3 px-2">Assistenze</th>
                  <th className="text-right py-3 px-2">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="border-b">
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-3">
                        <Avatar>
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
                    <td className="py-3 px-2">{client.address}</td>
                    <td className="py-3 px-2 text-center">{client.quotes}</td>
                    <td className="py-3 px-2 text-center">{client.tickets}</td>
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
                            <Users className="mr-2 h-4 w-4" />
                            Visualizza
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Modifica
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Nuovo Preventivo
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Tool className="mr-2 h-4 w-4" />
                            Nuova Assistenza
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Chiama
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Invia Email
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

      <Dialog open={isNewClientDialogOpen} onOpenChange={setIsNewClientDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuovo Cliente</DialogTitle>
            <DialogDescription>Inserisci i dati del nuovo cliente</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome Azienda</Label>
              <Input
                id="name"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact">Persona di Contatto</Label>
              <Input
                id="contact"
                value={newClient.contact}
                onChange={(e) => setNewClient({ ...newClient, contact: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefono</Label>
              <Input
                id="phone"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Indirizzo</Label>
              <Input
                id="address"
                value={newClient.address}
                onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewClientDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleNewClientSubmit}>Salva</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

