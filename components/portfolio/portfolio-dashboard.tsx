"use client"

import type React from "react"

import { useState } from "react"
import {
  PlusCircle,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Code,
  ExternalLink,
  Copy,
  Share2,
  Calendar,
  Tag,
  User,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// Dati di esempio
const portfolioItems = [
  {
    id: "P-2023-001",
    title: "Dashboard Analytics",
    description: "Dashboard interattiva per l'analisi delle vendite e delle performance",
    client: "Belotti Macchine Agricole",
    date: "18/03/2023",
    tags: ["React", "Next.js", "Chart.js", "Tailwind CSS"],
    category: "dashboard",
    previewUrl: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://dashboard-analytics.example.com",
    codeUrl: "https://github.com/viatecnologia/dashboard-analytics",
    v0Prompt: "Crea una dashboard per l'analisi delle vendite con grafici interattivi",
    notes: "Creato con v0 in 30 minuti, poi personalizzato manualmente",
  },
  {
    id: "P-2023-002",
    title: "E-commerce Responsive",
    description: "Interfaccia e-commerce completamente responsive con carrello e checkout",
    client: "Boutique Eleganza",
    date: "12/04/2023",
    tags: ["React", "Next.js", "Tailwind CSS", "Stripe"],
    category: "e-commerce",
    previewUrl: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://ecommerce-responsive.example.com",
    codeUrl: "https://github.com/viatecnologia/ecommerce-responsive",
    v0Prompt: "Crea un e-commerce responsive con carrello e checkout",
    notes: "Integrazione con Stripe aggiunta successivamente",
  },
  {
    id: "P-2023-003",
    title: "CRM Personalizzato",
    description: "CRM per la gestione dei clienti e degli immobili",
    client: "Agenzia Immobiliare Casa Felice",
    date: "18/04/2023",
    tags: ["React", "Next.js", "Prisma", "PostgreSQL"],
    category: "crm",
    previewUrl: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://crm-immobiliare.example.com",
    codeUrl: "https://github.com/viatecnologia/custom-crm",
    v0Prompt: "Crea un CRM per un'agenzia immobiliare con gestione clienti e immobili",
    notes: "Backend implementato con Prisma e PostgreSQL",
  },
  {
    id: "P-2023-004",
    title: "Portale Prenotazioni",
    description: "Sistema di prenotazione online per visite mediche",
    client: "Centro Medico Salute",
    date: "25/04/2023",
    tags: ["React", "Next.js", "Tailwind CSS", "Calendar"],
    category: "booking",
    previewUrl: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://prenotazioni-mediche.example.com",
    codeUrl: "https://github.com/viatecnologia/booking-portal",
    v0Prompt: "Crea un sistema di prenotazione per un centro medico",
    notes: "Integrazione con Google Calendar",
  },
  {
    id: "P-2023-005",
    title: "Sistema Inventario",
    description: "Gestione dell'inventario e degli ordini per ferramenta",
    client: "Ferramenta Bricola",
    date: "02/05/2023",
    tags: ["React", "Next.js", "Prisma", "MySQL"],
    category: "inventory",
    previewUrl: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://inventario-ferramenta.example.com",
    codeUrl: "https://github.com/viatecnologia/inventory-system",
    v0Prompt: "Crea un sistema di gestione inventario per una ferramenta",
    notes: "Sistema di notifiche per scorte basse implementato",
  },
  {
    id: "P-2023-006",
    title: "App Delivery",
    description: "Interfaccia per app di consegna a domicilio",
    client: "Pizzeria Napoli",
    date: "10/05/2023",
    tags: ["React Native", "Expo", "Firebase"],
    category: "mobile",
    previewUrl: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://expo.dev/@viatecnologia/delivery-app",
    codeUrl: "https://github.com/viatecnologia/delivery-app",
    v0Prompt: "Crea un'interfaccia per un'app di consegna a domicilio per una pizzeria",
    notes: "Prototipo iniziale, poi sviluppato come app nativa",
  },
  {
    id: "P-2023-007",
    title: "Landing Page Prodotto",
    description: "Landing page per il lancio di un nuovo prodotto",
    client: "Tech Innovations",
    date: "15/05/2023",
    tags: ["HTML", "CSS", "JavaScript", "GSAP"],
    category: "landing",
    previewUrl: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://product-launch.example.com",
    codeUrl: "https://github.com/viatecnologia/product-landing",
    v0Prompt: "Crea una landing page moderna per il lancio di un prodotto tech",
    notes: "Animazioni implementate con GSAP",
  },
  {
    id: "P-2023-008",
    title: "Dashboard Admin",
    description: "Pannello di amministrazione completo",
    client: "Software Solutions Inc.",
    date: "20/05/2023",
    tags: ["React", "Next.js", "Tailwind CSS", "Redux"],
    category: "dashboard",
    previewUrl: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://admin-dashboard.example.com",
    codeUrl: "https://github.com/viatecnologia/admin-dashboard",
    v0Prompt: "Crea un pannello di amministrazione completo con gestione utenti e analytics",
    notes: "Implementato sistema di ruoli e permessi avanzato",
  },
]

// Categorie per il filtro
const categories = [
  { value: "all", label: "Tutte le categorie" },
  { value: "dashboard", label: "Dashboard" },
  { value: "e-commerce", label: "E-commerce" },
  { value: "crm", label: "CRM" },
  { value: "booking", label: "Prenotazioni" },
  { value: "inventory", label: "Inventario" },
  { value: "mobile", label: "Mobile" },
  { value: "landing", label: "Landing Page" },
]

export default function PortfolioDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false)
  const [isViewItemDialogOpen, setIsViewItemDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("grid")
  const { toast } = useToast()

  // Nuovo item form state
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    client: "",
    tags: "",
    category: "dashboard",
    previewUrl: "",
    liveUrl: "",
    codeUrl: "",
    v0Prompt: "",
    notes: "",
  })

  // Filtra gli elementi in base alla ricerca e ai filtri
  const filteredItems = portfolioItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Trova l'elemento selezionato per la visualizzazione
  const itemToView = selectedItem ? portfolioItems.find((item) => item.id === selectedItem) : null

  const handleAddItem = () => {
    // In un'applicazione reale, qui si salverebbe l'elemento nel database
    toast({
      title: "Elemento aggiunto",
      description: "L'elemento è stato aggiunto al portfolio",
    })
    setIsAddItemDialogOpen(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In un'applicazione reale, qui si caricherebbe il file su un server
      setNewItem({
        ...newItem,
        previewUrl: URL.createObjectURL(file),
      })
    }
  }

  const handleCopyPrompt = () => {
    if (itemToView?.v0Prompt) {
      navigator.clipboard.writeText(itemToView.v0Prompt)
      toast({
        title: "Prompt copiato",
        description: "Il prompt è stato copiato negli appunti",
      })
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio v0</h1>
          <p className="text-muted-foreground">Vetrina dei lavori creati con v0</p>
        </div>
        <Button onClick={() => setIsAddItemDialogOpen(true)} className="mt-4 md:mt-0">
          <PlusCircle className="mr-2 h-4 w-4" />
          Aggiungi Elemento
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca nel portfolio..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="w-full md:w-48 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>

        <Tabs defaultValue="grid" value={activeTab} onValueChange={setActiveTab} className="ml-auto">
          <TabsList>
            <TabsTrigger value="grid">Griglia</TabsTrigger>
            <TabsTrigger value="list">Lista</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <TabsContent value="grid" className={activeTab === "grid" ? "block" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden relative group">
                <img
                  src={item.previewUrl || "/placeholder.svg"}
                  alt={item.title}
                  className="h-full w-full object-cover transition-all hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mr-2"
                    onClick={() => {
                      setSelectedItem(item.id)
                      setIsViewItemDialogOpen(true)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Dettagli
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => window.open(item.liveUrl, "_blank")}>
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Anteprima
                  </Button>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.client}</CardDescription>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {item.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {item.date}
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
                        setSelectedItem(item.id)
                        setIsViewItemDialogOpen(true)
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Visualizza Dettagli
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(item.liveUrl, "_blank")}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Apri Anteprima
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(item.codeUrl, "_blank")}>
                      <Code className="mr-2 h-4 w-4" />
                      Visualizza Codice
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Modifica
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="mr-2 h-4 w-4" />
                      Condividi
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
            <CardTitle>Elenco Portfolio</CardTitle>
            <CardDescription>{filteredItems.length} elementi trovati</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Titolo</th>
                    <th className="text-left py-3 px-2">Cliente</th>
                    <th className="text-left py-3 px-2">Data</th>
                    <th className="text-center py-3 px-2">Categoria</th>
                    <th className="text-center py-3 px-2">Tag</th>
                    <th className="text-right py-3 px-2">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.previewUrl || "/placeholder.svg"}
                            alt={item.title}
                            className="h-10 w-10 rounded object-cover"
                          />
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2">{item.client}</td>
                      <td className="py-3 px-2">{item.date}</td>
                      <td className="py-3 px-2 text-center">
                        <Badge variant="outline" className="capitalize">
                          {item.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex flex-wrap justify-center gap-1">
                          {item.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {item.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{item.tags.length - 2}
                            </Badge>
                          )}
                        </div>
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
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedItem(item.id)
                                setIsViewItemDialogOpen(true)
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizza Dettagli
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.open(item.liveUrl, "_blank")}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Apri Anteprima
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.open(item.codeUrl, "_blank")}>
                              <Code className="mr-2 h-4 w-4" />
                              Visualizza Codice
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" />
                              Modifica
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="mr-2 h-4 w-4" />
                              Condividi
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

      {/* Dialog per aggiungere un nuovo elemento */}
      <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Aggiungi al Portfolio</DialogTitle>
            <DialogDescription>Aggiungi un nuovo lavoro creato con v0 al portfolio</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titolo</Label>
              <Input
                id="title"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Titolo del progetto"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Cliente</Label>
              <Input
                id="client"
                value={newItem.client}
                onChange={(e) => setNewItem({ ...newItem, client: e.target.value })}
                placeholder="Nome del cliente"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Descrizione</Label>
              <Textarea
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Descrizione del progetto"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <select
                id="category"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              >
                {categories
                  .filter((c) => c.value !== "all")
                  .map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tag (separati da virgola)</Label>
              <Input
                id="tags"
                value={newItem.tags}
                onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
                placeholder="es. React, Next.js, Tailwind CSS"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="liveUrl">URL Anteprima</Label>
              <Input
                id="liveUrl"
                value={newItem.liveUrl}
                onChange={(e) => setNewItem({ ...newItem, liveUrl: e.target.value })}
                placeholder="https://esempio.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codeUrl">URL Codice</Label>
              <Input
                id="codeUrl"
                value={newItem.codeUrl}
                onChange={(e) => setNewItem({ ...newItem, codeUrl: e.target.value })}
                placeholder="https://github.com/esempio"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="v0Prompt">Prompt v0</Label>
              <Textarea
                id="v0Prompt"
                value={newItem.v0Prompt}
                onChange={(e) => setNewItem({ ...newItem, v0Prompt: e.target.value })}
                placeholder="Il prompt utilizzato con v0 per creare questo progetto"
                rows={3}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Note</Label>
              <Textarea
                id="notes"
                value={newItem.notes}
                onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                placeholder="Note aggiuntive sul progetto"
                rows={2}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="preview">Immagine Anteprima</Label>
              <Input id="preview" type="file" accept="image/*" onChange={handleFileUpload} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddItemDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleAddItem}>Salva</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog per visualizzare i dettagli di un elemento */}
      <Dialog open={isViewItemDialogOpen} onOpenChange={setIsViewItemDialogOpen}>
        <DialogContent className="max-w-4xl">
          {itemToView && (
            <>
              <DialogHeader>
                <DialogTitle>{itemToView.title}</DialogTitle>
                <DialogDescription>
                  {itemToView.client} - {itemToView.date}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
                    <img
                      src={itemToView.previewUrl || "/placeholder.svg"}
                      alt={itemToView.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="capitalize">
                      {itemToView.category}
                    </Badge>
                    {itemToView.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => window.open(itemToView.liveUrl, "_blank")}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Anteprima
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => window.open(itemToView.codeUrl, "_blank")}>
                      <Code className="mr-2 h-4 w-4" />
                      Codice
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Descrizione</h3>
                    <p className="text-sm text-muted-foreground">{itemToView.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Prompt v0</h3>
                    <div className="relative">
                      <div className="bg-muted p-3 rounded-md text-sm font-mono">{itemToView.v0Prompt}</div>
                      <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={handleCopyPrompt}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Note</h3>
                    <p className="text-sm text-muted-foreground">{itemToView.notes}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Informazioni</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Cliente: {itemToView.client}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Data: {itemToView.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>ID: {itemToView.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewItemDialogOpen(false)}>
                  Chiudi
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

