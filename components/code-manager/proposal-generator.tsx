"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import {
  Printer,
  Download,
  Send,
  Copy,
  FileText,
  Plus,
  Trash2,
  Calendar,
  Image,
  Upload,
  X,
  Eye,
  FileImage,
  Film,
  ExternalLink,
  Play,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { it } from "date-fns/locale"

// Definizione dei tipi per l'analisi del codice
interface CodeAnalysis {
  language: string
  frameworks: string[]
  libraries: string[]
  complexity: number
  linesOfCode: number
  functions: number
  components: number
  issues: {
    errors: number
    warnings: number
    suggestions: number
  }
  estimatedHours: {
    min: number
    max: number
  }
  quality: number
  detectedPatterns: string[]
  type: string // "frontend", "backend", "fullstack", "static"
}

interface ProposalGeneratorProps {
  codeAnalysis: CodeAnalysis
}

export default function ProposalGenerator({ codeAnalysis }: ProposalGeneratorProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [items, setItems] = useState<
    Array<{
      id: number
      description: string
      hours: number
      rate: number
    }>
  >([])
  const [mediaFiles, setMediaFiles] = useState<
    Array<{
      id: string
      name: string
      type: string
      size: number
      url: string
      description: string
    }>
  >([
    {
      id: "media-1",
      name: "dashboard-preview.png",
      type: "image/png",
      size: 1240000,
      url: "/placeholder.svg?height=720&width=1280",
      description: "Anteprima della dashboard principale",
    },
    {
      id: "media-2",
      name: "user-flow.gif",
      type: "image/gif",
      size: 2450000,
      url: "/placeholder.svg?height=480&width=640",
      description: "Dimostrazione del flusso utente",
    },
  ])
  const [activeMediaId, setActiveMediaId] = useState<string | null>("media-1")
  const [proposalTitle, setProposalTitle] = useState("")
  const [proposalDescription, setProposalDescription] = useState("")
  const [proposalNotes, setProposalNotes] = useState("")
  const [clientName, setClientName] = useState("client1")
  const [collaboratorName, setCollaboratorName] = useState("collab1")
  const [validityDays, setValidityDays] = useState(30)
  const mediaInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Inizializza gli elementi della proposta in base all'analisi del codice
  useState(() => {
    // Genera un titolo in base al tipo di applicazione e linguaggio
    const typeText =
      codeAnalysis.type === "frontend"
        ? "Frontend"
        : codeAnalysis.type === "backend"
          ? "Backend"
          : codeAnalysis.type === "fullstack"
            ? "Full Stack"
            : "Statico"

    const languageText = codeAnalysis.language.charAt(0).toUpperCase() + codeAnalysis.language.slice(1)

    let title = `Sviluppo Applicazione ${typeText} in ${languageText}`
    if (codeAnalysis.frameworks.length > 0) {
      title += ` con ${codeAnalysis.frameworks[0]}`
    }

    setProposalTitle(title)

    // Genera una descrizione in base all'analisi
    let description = `Proposta per lo sviluppo di un'applicazione ${typeText.toLowerCase()} basata su ${languageText}`

    if (codeAnalysis.frameworks.length > 0) {
      description += ` utilizzando ${codeAnalysis.frameworks.join(", ")}`
    }

    description += `. Il progetto include ${
      codeAnalysis.type === "frontend" || codeAnalysis.type === "fullstack"
        ? "interfaccia utente responsive, componenti interattivi"
        : "API robuste, gestione dati efficiente"
    }`

    if (codeAnalysis.detectedPatterns.includes("State Management")) {
      description += ", gestione avanzata dello stato"
    }

    if (codeAnalysis.detectedPatterns.includes("Error Handling")) {
      description += ", sistema di gestione errori"
    }

    description += "."

    setProposalDescription(description)

    // Genera note in base all'analisi
    let notes = "La proposta include 3 mesi di supporto post-lancio e formazione iniziale per il team del cliente."

    if (codeAnalysis.quality < 50) {
      notes += " Si consiglia un refactoring completo del codice per migliorarne la qualità e la manutenibilità."
    } else if (codeAnalysis.issues.errors > 0 || codeAnalysis.issues.warnings > 0) {
      notes += " Si consiglia una revisione del codice per risolvere i problemi rilevati."
    }

    setProposalNotes(notes)

    // Genera gli elementi della proposta in base all'analisi
    const newItems = []

    // Analisi e progettazione
    newItems.push({
      id: 1,
      description: "Analisi e progettazione",
      hours: Math.round(codeAnalysis.estimatedHours.min * 0.2),
      rate: 85,
    })

    // Sviluppo frontend/backend
    if (codeAnalysis.type === "frontend" || codeAnalysis.type === "fullstack") {
      newItems.push({
        id: 2,
        description: "Sviluppo frontend",
        hours:
          codeAnalysis.type === "fullstack"
            ? Math.round(codeAnalysis.estimatedHours.min * 0.4)
            : Math.round(codeAnalysis.estimatedHours.min * 0.6),
        rate: 85,
      })
    }

    if (codeAnalysis.type === "backend" || codeAnalysis.type === "fullstack") {
      newItems.push({
        id: 3,
        description: "Sviluppo backend",
        hours:
          codeAnalysis.type === "fullstack"
            ? Math.round(codeAnalysis.estimatedHours.min * 0.4)
            : Math.round(codeAnalysis.estimatedHours.min * 0.6),
        rate: 85,
      })
    }

    // Testing
    newItems.push({
      id: 4,
      description: "Testing e ottimizzazione",
      hours: Math.round(codeAnalysis.estimatedHours.min * 0.15),
      rate: 85,
    })

    // Deployment
    newItems.push({
      id: 5,
      description: "Deployment e documentazione",
      hours: Math.round(codeAnalysis.estimatedHours.min * 0.05),
      rate: 85,
    })

    setItems(newItems)
  }, [codeAnalysis])

  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1
    setItems([...items, { id: newId, description: "", hours: 0, rate: 85 }])
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateItem = (id: number, field: string, value: string | number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.hours * item.rate, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    return subtotal + subtotal * 0.22 // IVA 22%
  }

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newFiles = Array.from(files).map((file) => {
      const id = `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      // In un'app reale, qui caricheremmo il file su un server e otterremmo un URL
      // Per questa demo, usiamo un placeholder
      let placeholderUrl = "/placeholder.svg?height=480&width=640"

      if (file.type.startsWith("image/")) {
        placeholderUrl = "/placeholder.svg?height=720&width=1280"
      } else if (file.type.startsWith("video/")) {
        placeholderUrl = "/placeholder.svg?height=480&width=640"
      }

      return {
        id,
        name: file.name,
        type: file.type,
        size: file.size,
        url: placeholderUrl,
        description: "",
      }
    })

    setMediaFiles((prev) => [...prev, ...newFiles])

    // Seleziona il primo nuovo file caricato
    if (newFiles.length > 0) {
      setActiveMediaId(newFiles[0].id)
    }

    // Reset input value to allow uploading the same file again
    if (mediaInputRef.current) {
      mediaInputRef.current.value = ""
    }

    toast({
      title: `${newFiles.length} file allegati`,
      description: "I file sono stati caricati con successo",
    })
  }

  const handleMediaDelete = (id: string) => {
    setMediaFiles((prev) => prev.filter((f) => f.id !== id))

    if (activeMediaId === id) {
      setActiveMediaId(mediaFiles.length > 1 ? mediaFiles[0].id : null)
    }
  }

  const updateMediaDescription = (id: string, description: string) => {
    setMediaFiles((prev) => prev.map((f) => (f.id === id ? { ...f, description } : f)))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const getMediaIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <FileImage className="h-4 w-4 text-blue-500" />
    } else if (fileType.startsWith("video/")) {
      return <Film className="h-4 w-4 text-red-500" />
    } else {
      return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getActiveMedia = () => {
    return mediaFiles.find((f) => f.id === activeMediaId)
  }

  const getClientDisplayName = () => {
    switch (clientName) {
      case "client1":
        return "Fashion Store"
      case "client2":
        return "Trattoria Bella Italia"
      case "client3":
        return "Studio Legale Rossi"
      default:
        return "Cliente"
    }
  }

  const getCollaboratorDisplayName = () => {
    switch (collaboratorName) {
      case "collab1":
        return "Nicode Solutions"
      case "collab2":
        return "WebDev Pro"
      case "collab3":
        return "SEO Master"
      default:
        return "Collaboratore"
    }
  }

  const handleSaveProposal = () => {
    toast({
      title: "Proposta salvata",
      description: "La proposta è stata salvata con successo",
      variant: "success",
    })
  }

  const handleSendProposal = () => {
    toast({
      title: "Proposta inviata",
      description: "La proposta è stata inviata con successo",
      variant: "success",
    })
  }

  const handleDownloadPdf = () => {
    toast({
      title: "Download PDF",
      description: "Il PDF della proposta è stato generato e scaricato",
      variant: "success",
    })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Genera Proposta</CardTitle>
          <CardDescription>Crea una proposta professionale basata sull'analisi del codice</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Dettagli</TabsTrigger>
              <TabsTrigger value="items">Servizi</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="preview">Anteprima</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titolo Proposta</Label>
                    <Input
                      id="title"
                      placeholder="Titolo della proposta"
                      value={proposalTitle}
                      onChange={(e) => setProposalTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente</Label>
                    <Select value={clientName} onValueChange={setClientName}>
                      <SelectTrigger id="client">
                        <SelectValue placeholder="Seleziona cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client1">Fashion Store</SelectItem>
                        <SelectItem value="client2">Trattoria Bella Italia</SelectItem>
                        <SelectItem value="client3">Studio Legale Rossi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="collaborator">Collaboratore</Label>
                    <Select value={collaboratorName} onValueChange={setCollaboratorName}>
                      <SelectTrigger id="collaborator">
                        <SelectValue placeholder="Seleziona collaboratore" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="collab1">Nicode Solutions</SelectItem>
                        <SelectItem value="collab2">WebDev Pro</SelectItem>
                        <SelectItem value="collab3">SEO Master</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data Proposta</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP", { locale: it }) : "Seleziona data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="validity">Validità (giorni)</Label>
                    <Input
                      id="validity"
                      type="number"
                      value={validityDays}
                      onChange={(e) => setValidityDays(Number.parseInt(e.target.value) || 30)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template">Template</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger id="template">
                        <SelectValue placeholder="Seleziona template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                  id="description"
                  placeholder="Descrizione della proposta..."
                  className="min-h-[100px]"
                  value={proposalDescription}
                  onChange={(e) => setProposalDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Note Aggiuntive</Label>
                <Textarea
                  id="notes"
                  placeholder="Note aggiuntive..."
                  className="min-h-[100px]"
                  value={proposalNotes}
                  onChange={(e) => setProposalNotes(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="items" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Descrizione</TableHead>
                      <TableHead className="w-[100px]">Ore</TableHead>
                      <TableHead className="w-[100px]">Tariffa (€/h)</TableHead>
                      <TableHead className="w-[100px]">Totale (€)</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Input
                            value={item.description}
                            onChange={(e) => updateItem(item.id, "description", e.target.value)}
                            placeholder="Descrizione servizio"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.hours}
                            onChange={(e) => updateItem(item.id, "hours", Number.parseInt(e.target.value) || 0)}
                            min={0}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.rate}
                            onChange={(e) => updateItem(item.id, "rate", Number.parseInt(e.target.value) || 0)}
                            min={0}
                          />
                        </TableCell>
                        <TableCell className="font-medium">€{(item.hours * item.rate).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button variant="outline" onClick={addItem}>
                <Plus className="mr-2 h-4 w-4" />
                Aggiungi Servizio
              </Button>

              <div className="rounded-md border p-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotale:</span>
                  <span className="font-medium">€{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA (22%):</span>
                  <span>€{(calculateSubtotal() * 0.22).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Totale:</span>
                  <span>€{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-1">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>File Multimediali</Label>
                      <Button variant="outline" size="sm" onClick={() => mediaInputRef.current?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Carica
                      </Button>
                      <input
                        type="file"
                        ref={mediaInputRef}
                        className="hidden"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleMediaUpload}
                      />
                    </div>

                    <div className="border rounded-md overflow-hidden">
                      <div className="max-h-[400px] overflow-y-auto">
                        {mediaFiles.map((file) => (
                          <div
                            key={file.id}
                            className={`flex items-center justify-between p-2 hover:bg-muted cursor-pointer ${
                              activeMediaId === file.id ? "bg-muted" : ""
                            }`}
                            onClick={() => setActiveMediaId(file.id)}
                          >
                            <div className="flex items-center space-x-2">
                              {getMediaIcon(file.type)}
                              <div>
                                <span className="text-sm font-medium block truncate max-w-[150px]">{file.name}</span>
                                <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleMediaDelete(file.id)
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  {activeMediaId ? (
                    <div className="space-y-4">
                      <div className="border rounded-md p-2 bg-muted/50">
                        <div className="aspect-video relative overflow-hidden rounded-md bg-muted flex items-center justify-center">
                          {getActiveMedia()?.type.startsWith("image/") ? (
                            <img
                              src={getActiveMedia()?.url || "/placeholder.svg"}
                              alt={getActiveMedia()?.name || "Anteprima"}
                              className="object-contain max-h-full max-w-full"
                            />
                          ) : getActiveMedia()?.type.startsWith("video/") ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <img
                                src={getActiveMedia()?.url || "/placeholder.svg"}
                                alt={getActiveMedia()?.name || "Anteprima video"}
                                className="object-contain max-h-full max-w-full opacity-70"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-black/50">
                                  <Play className="h-6 w-6 text-white" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <FileText className="h-16 w-16 text-muted-foreground" />
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="media-description">Descrizione</Label>
                        <Textarea
                          id="media-description"
                          placeholder="Descrizione del file multimediale..."
                          value={getActiveMedia()?.description || ""}
                          onChange={(e) => updateMediaDescription(activeMediaId, e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="flex justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="include-in-proposal" defaultChecked />
                          <Label htmlFor="include-in-proposal">Includi nella proposta</Label>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Anteprima
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Apri
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center h-full">
                      <Image className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground text-center mb-2">Nessun file multimediale selezionato</p>
                      <p className="text-xs text-muted-foreground text-center mb-4">
                        Seleziona un file dalla lista o carica nuovi file
                      </p>
                      <Button variant="outline" onClick={() => mediaInputRef.current?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Carica File
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <div className="rounded-md border p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{proposalTitle}</h2>
                    <p className="text-muted-foreground">Proposta per {getClientDisplayName()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">ViaTecnologia</p>
                    <p className="text-sm text-muted-foreground">info@viatecnologia.com</p>
                    <p className="text-sm text-muted-foreground">+39 123 456 7890</p>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">Collaboratore:</p>
                    <p>{getCollaboratorDisplayName()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Data:</p>
                    <p>{selectedDate ? format(selectedDate, "dd/MM/yyyy") : "N/A"}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Validità:</p>
                    <p>{validityDays} giorni</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Proposta #:</p>
                    <p>
                      PRO-{format(new Date(), "yyyyMMdd")}-
                      {Math.floor(Math.random() * 1000)
                        .toString()
                        .padStart(3, "0")}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Descrizione</h3>
                  <p>{proposalDescription}</p>
                </div>

                {mediaFiles.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Anteprima</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {mediaFiles.slice(0, 2).map((file) => (
                        <div key={file.id} className="border rounded-md overflow-hidden">
                          <div className="aspect-video bg-muted flex items-center justify-center">
                            {file.type.startsWith("image/") ? (
                              <img
                                src={file.url || "/placeholder.svg"}
                                alt={file.name}
                                className="object-contain max-h-full max-w-full"
                              />
                            ) : file.type.startsWith("video/") ? (
                              <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                  src={file.url || "/placeholder.svg"}
                                  alt={file.name}
                                  className="object-contain max-h-full max-w-full opacity-70"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-black/50">
                                    <Play className="h-6 w-6 text-white" />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <FileText className="h-16 w-16 text-muted-foreground" />
                            )}
                          </div>
                          <div className="p-2">
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{file.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-2">Servizi</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descrizione</TableHead>
                        <TableHead className="text-right">Ore</TableHead>
                        <TableHead className="text-right">Tariffa (€/h)</TableHead>
                        <TableHead className="text-right">Totale (€)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right">{item.hours}</TableCell>
                          <TableCell className="text-right">{item.rate}</TableCell>
                          <TableCell className="text-right font-medium">
                            {(item.hours * item.rate).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="rounded-md border p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotale:</span>
                    <span className="font-medium">€{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA (22%):</span>
                    <span>€{(calculateSubtotal() * 0.22).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Totale:</span>
                    <span>€{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Note Aggiuntive</h3>
                  <p>{proposalNotes}</p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground text-center">
                    Grazie per la fiducia accordataci. Per accettare questa proposta, si prega di firmare e restituire.
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => window.print()}>
                    <Printer className="mr-2 h-4 w-4" />
                    Stampa
                  </Button>
                  <Button variant="outline" onClick={handleDownloadPdf}>
                    <Download className="mr-2 h-4 w-4" />
                    Scarica PDF
                  </Button>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(document.querySelector(".rounded-md.border.p-6")?.textContent || "")
                      toast({
                        title: "Copiato",
                        description: "Il contenuto della proposta è stato copiato negli appunti",
                      })
                    }}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copia
                  </Button>
                  <Button onClick={handleSendProposal}>
                    <Send className="mr-2 h-4 w-4" />
                    Invia
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="auto-save" />
            <Label htmlFor="auto-save">Salvataggio automatico</Label>
          </div>
          <Button onClick={handleSaveProposal}>
            <FileText className="mr-2 h-4 w-4" />
            Salva Proposta
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

