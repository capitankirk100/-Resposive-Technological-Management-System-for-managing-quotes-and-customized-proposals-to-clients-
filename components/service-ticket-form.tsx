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
import { Camera, Send, Download } from "lucide-react"

export type ServiceTicketData = {
  ticketNumber: string
  ticketDate: string
  clientName: string
  clientAddress: string
  clientCity: string
  clientEmail: string
  clientPhone: string
  machineType: string
  machineModel: string
  serialNumber: string
  issueDescription: string
  technician: string
  priority: string
  status: string
  partsReplaced: {
    id: string
    code: string
    description: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  laborHours: number
  laborRate: number
  notes: string
  photos: string[]
}

const initialTicketData: ServiceTicketData = {
  ticketNumber: new Date().getTime().toString().slice(-6),
  ticketDate: new Date().toLocaleDateString("it-IT"),
  clientName: "",
  clientAddress: "",
  clientCity: "",
  clientEmail: "",
  clientPhone: "",
  machineType: "",
  machineModel: "",
  serialNumber: "",
  issueDescription: "",
  technician: "",
  priority: "medium",
  status: "pending",
  partsReplaced: [],
  laborHours: 0,
  laborRate: 35,
  notes: "",
  photos: [],
}

// Dati di esempio per i clienti
const clients = [
  {
    id: "C-2023-001",
    name: "Azienda Agricola Rossi",
    address: "Via Roma 123",
    city: "Milano",
    email: "mario.rossi@agricolarossi.it",
    phone: "+39 345 1234567",
  },
  {
    id: "C-2023-002",
    name: "Fattoria Bianchi",
    address: "Via Verdi 45",
    city: "Torino",
    email: "luigi.bianchi@fattoriabianchi.it",
    phone: "+39 348 7654321",
  },
  {
    id: "C-2023-003",
    name: "Cooperativa Agricola Valle Verde",
    address: "Via Montagna 78",
    city: "Bergamo",
    email: "anna.verdi@valleverde.it",
    phone: "+39 342 9876543",
  },
]

// Dati di esempio per i tecnici
const technicians = [
  { id: "T-001", name: "Marco Bianchi" },
  { id: "T-002", name: "Luca Rossi" },
  { id: "T-003", name: "Paolo Verdi" },
]

// Dati di esempio per i tipi di macchine
const machineTypes = [
  { id: "MT-001", name: "Robot Tagliaerba" },
  { id: "MT-002", name: "Trattore" },
  { id: "MT-003", name: "Mietitrebbia" },
  { id: "MT-004", name: "Sistema di Irrigazione" },
  { id: "MT-005", name: "Motosega" },
]

export default function ServiceTicketForm() {
  const [ticketData, setTicketData] = useState<ServiceTicketData>(initialTicketData)
  const [activeTab, setActiveTab] = useState("client")
  const { toast } = useToast()

  const handleDataChange = (field: string, value: any) => {
    setTicketData((prev) => ({ ...prev, [field]: value }))
  }

  const handleClientSelect = (clientId: string) => {
    const selectedClient = clients.find((client) => client.id === clientId)
    if (selectedClient) {
      setTicketData((prev) => ({
        ...prev,
        clientName: selectedClient.name,
        clientAddress: selectedClient.address,
        clientCity: selectedClient.city,
        clientEmail: selectedClient.email,
        clientPhone: selectedClient.phone,
      }))
    }
  }

  const handleAddPart = () => {
    const newPart = {
      id: Date.now().toString(),
      code: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    }
    setTicketData((prev) => ({
      ...prev,
      partsReplaced: [...prev.partsReplaced, newPart],
    }))
  }

  const handlePartChange = (id: string, field: string, value: any) => {
    setTicketData((prev) => ({
      ...prev,
      partsReplaced: prev.partsReplaced.map((part) => {
        if (part.id === id) {
          const updatedPart = { ...part, [field]: value }

          // Ricalcola il totale se cambia la quantità o il prezzo unitario
          if (field === "quantity" || field === "unitPrice") {
            updatedPart.total = updatedPart.quantity * updatedPart.unitPrice
          }

          return updatedPart
        }
        return part
      }),
    }))
  }

  const handleRemovePart = (id: string) => {
    setTicketData((prev) => ({
      ...prev,
      partsReplaced: prev.partsReplaced.filter((part) => part.id !== id),
    }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file))
      setTicketData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos],
      }))
    }
  }

  const handleRemovePhoto = (index: number) => {
    setTicketData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = () => {
    // In un'applicazione reale, qui si salverebbe il ticket nel database
    console.log("Ticket salvato:", ticketData)
    toast({
      title: "Scheda di assistenza salvata",
      description: `Ticket #${ticketData.ticketNumber} creato con successo`,
    })
  }

  const calculateTotals = () => {
    const partsCost = ticketData.partsReplaced.reduce((sum, part) => sum + part.total, 0)
    const laborCost = ticketData.laborHours * ticketData.laborRate
    const totalCost = partsCost + laborCost
    const vat = totalCost * 0.22 // 22% IVA
    const totalWithVat = totalCost + vat

    return {
      partsCost,
      laborCost,
      totalCost,
      vat,
      totalWithVat,
    }
  }

  const totals = calculateTotals()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Tabs defaultValue="client" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="client">Cliente</TabsTrigger>
            <TabsTrigger value="machine">Macchina</TabsTrigger>
            <TabsTrigger value="service">Intervento</TabsTrigger>
            <TabsTrigger value="photos">Foto</TabsTrigger>
          </TabsList>

          <TabsContent value="client">
            <Card>
              <CardHeader>
                <CardTitle>Informazioni Cliente</CardTitle>
                <CardDescription>Seleziona un cliente esistente o inserisci i dati manualmente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientSelect">Cliente Esistente</Label>
                  <Select onValueChange={handleClientSelect}>
                    <SelectTrigger id="clientSelect">
                      <SelectValue placeholder="Seleziona un cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientName">Nome Cliente</Label>
                  <Input
                    id="clientName"
                    value={ticketData.clientName}
                    onChange={(e) => handleDataChange("clientName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientAddress">Indirizzo</Label>
                  <Input
                    id="clientAddress"
                    value={ticketData.clientAddress}
                    onChange={(e) => handleDataChange("clientAddress", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientCity">Città</Label>
                  <Input
                    id="clientCity"
                    value={ticketData.clientCity}
                    onChange={(e) => handleDataChange("clientCity", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Email</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={ticketData.clientEmail}
                    onChange={(e) => handleDataChange("clientEmail", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientPhone">Telefono</Label>
                  <Input
                    id="clientPhone"
                    value={ticketData.clientPhone}
                    onChange={(e) => handleDataChange("clientPhone", e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setActiveTab("machine")}>Avanti</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="machine">
            <Card>
              <CardHeader>
                <CardTitle>Informazioni Macchina</CardTitle>
                <CardDescription>Inserisci i dettagli della macchina da riparare</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="machineType">Tipo di Macchina</Label>
                  <Select
                    value={ticketData.machineType}
                    onValueChange={(value) => handleDataChange("machineType", value)}
                  >
                    <SelectTrigger id="machineType">
                      <SelectValue placeholder="Seleziona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {machineTypes.map((type) => (
                        <SelectItem key={type.id} value={type.name}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="machineModel">Modello</Label>
                  <Input
                    id="machineModel"
                    value={ticketData.machineModel}
                    onChange={(e) => handleDataChange("machineModel", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Numero di Serie</Label>
                  <Input
                    id="serialNumber"
                    value={ticketData.serialNumber}
                    onChange={(e) => handleDataChange("serialNumber", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issueDescription">Descrizione del Problema</Label>
                  <Textarea
                    id="issueDescription"
                    rows={4}
                    value={ticketData.issueDescription}
                    onChange={(e) => handleDataChange("issueDescription", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priorità</Label>
                  <Select value={ticketData.priority} onValueChange={(value) => handleDataChange("priority", value)}>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Seleziona priorità" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Bassa</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("client")}>
                  Indietro
                </Button>
                <Button onClick={() => setActiveTab("service")}>Avanti</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="service">
            <Card>
              <CardHeader>
                <CardTitle>Dettagli Intervento</CardTitle>
                <CardDescription>Inserisci i dettagli dell'intervento di assistenza</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="technician">Tecnico</Label>
                  <Select
                    value={ticketData.technician}
                    onValueChange={(value) => handleDataChange("technician", value)}
                  >
                    <SelectTrigger id="technician">
                      <SelectValue placeholder="Seleziona tecnico" />
                    </SelectTrigger>
                    <SelectContent>
                      {technicians.map((tech) => (
                        <SelectItem key={tech.id} value={tech.name}>
                          {tech.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Stato</Label>
                  <Select value={ticketData.status} onValueChange={(value) => handleDataChange("status", value)}>
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

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Parti Sostituite</Label>
                    <Button variant="outline" size="sm" onClick={handleAddPart}>
                      Aggiungi Parte
                    </Button>
                  </div>

                  {ticketData.partsReplaced.length > 0 ? (
                    <div className="space-y-4">
                      {ticketData.partsReplaced.map((part, index) => (
                        <div key={part.id} className="grid grid-cols-12 gap-2 items-end">
                          <div className="col-span-2">
                            <Label htmlFor={`code-${part.id}`}>Codice</Label>
                            <Input
                              id={`code-${part.id}`}
                              value={part.code}
                              onChange={(e) => handlePartChange(part.id, "code", e.target.value)}
                            />
                          </div>

                          <div className="col-span-4">
                            <Label htmlFor={`description-${part.id}`}>Descrizione</Label>
                            <Input
                              id={`description-${part.id}`}
                              value={part.description}
                              onChange={(e) => handlePartChange(part.id, "description", e.target.value)}
                            />
                          </div>

                          <div className="col-span-1">
                            <Label htmlFor={`quantity-${part.id}`}>Qtà</Label>
                            <Input
                              id={`quantity-${part.id}`}
                              type="number"
                              min="1"
                              value={part.quantity}
                              onChange={(e) => handlePartChange(part.id, "quantity", Number(e.target.value))}
                            />
                          </div>

                          <div className="col-span-2">
                            <Label htmlFor={`unitPrice-${part.id}`}>Prezzo €</Label>
                            <Input
                              id={`unitPrice-${part.id}`}
                              type="number"
                              step="0.01"
                              min="0"
                              value={part.unitPrice}
                              onChange={(e) => handlePartChange(part.id, "unitPrice", Number(e.target.value))}
                            />
                          </div>

                          <div className="col-span-2">
                            <Label htmlFor={`total-${part.id}`}>Totale €</Label>
                            <Input id={`total-${part.id}`} readOnly value={part.total.toFixed(2)} />
                          </div>

                          <div className="col-span-1">
                            <Button variant="destructive" size="icon" onClick={() => handleRemovePart(part.id)}>
                              <span className="sr-only">Rimuovi</span>✕
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-4 border border-dashed rounded-md">
                      <p className="text-muted-foreground">Nessuna parte aggiunta</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="laborHours">Ore di Lavoro</Label>
                    <Input
                      id="laborHours"
                      type="number"
                      min="0"
                      step="0.5"
                      value={ticketData.laborHours}
                      onChange={(e) => handleDataChange("laborHours", Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="laborRate">Tariffa Oraria (€)</Label>
                    <Input
                      id="laborRate"
                      type="number"
                      min="0"
                      step="0.01"
                      value={ticketData.laborRate}
                      onChange={(e) => handleDataChange("laborRate", Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Note</Label>
                  <Textarea
                    id="notes"
                    rows={4}
                    value={ticketData.notes}
                    onChange={(e) => handleDataChange("notes", e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("machine")}>
                  Indietro
                </Button>
                <Button onClick={() => setActiveTab("photos")}>Avanti</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle>Foto</CardTitle>
                <CardDescription>Aggiungi foto della macchina e dell'intervento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="photo-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Clicca per caricare</span> o trascina qui le foto
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG o JPEG (MAX. 10MB)</p>
                    </div>
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                </div>

                {ticketData.photos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {ticketData.photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={photo || "/placeholder.svg"}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-40 object-cover rounded-md"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 w-6 h-6"
                          onClick={() => handleRemovePhoto(index)}
                        >
                          <span className="sr-only">Rimuovi</span>✕
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 border border-dashed rounded-md">
                    <p className="text-muted-foreground">Nessuna foto aggiunta</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("service")}>
                  Indietro
                </Button>
                <Button onClick={handleSubmit}>Salva Scheda</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Riepilogo Scheda di Assistenza</CardTitle>
            <CardDescription>Anteprima della scheda di assistenza</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">Belotti Macchine Agricole</h3>
                <p className="text-sm">VIA SALETTI 3/F</p>
                <p className="text-sm">25040 - PLEMO DI ESINE (BS)</p>
                <p className="text-sm">Email: c39@me.com - Tel: 3462332866</p>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-lg">SCHEDA DI ASSISTENZA</h3>
                <p className="text-sm">N° {ticketData.ticketNumber}</p>
                <p className="text-sm">Data: {ticketData.ticketDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div>
                <h4 className="font-bold">Cliente</h4>
                <p>{ticketData.clientName || "Non specificato"}</p>
                <p>{ticketData.clientAddress || ""}</p>
                <p>{ticketData.clientCity || ""}</p>
                <p>Tel: {ticketData.clientPhone || "Non specificato"}</p>
                <p>Email: {ticketData.clientEmail || "Non specificato"}</p>
              </div>
              <div>
                <h4 className="font-bold">Macchina</h4>
                <p>Tipo: {ticketData.machineType || "Non specificato"}</p>
                <p>Modello: {ticketData.machineModel || "Non specificato"}</p>
                <p>Seriale: {ticketData.serialNumber || "Non specificato"}</p>
                <p>
                  Priorità:{" "}
                  {ticketData.priority === "high"
                    ? "Alta"
                    : ticketData.priority === "medium"
                      ? "Media"
                      : ticketData.priority === "low"
                        ? "Bassa"
                        : "Non specificata"}
                </p>
                <p>
                  Stato:{" "}
                  {ticketData.status === "completed"
                    ? "Completato"
                    : ticketData.status === "in-progress"
                      ? "In corso"
                      : ticketData.status === "pending"
                        ? "In attesa"
                        : "Non specificato"}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-bold">Descrizione del Problema</h4>
              <p>{ticketData.issueDescription || "Nessuna descrizione fornita"}</p>
            </div>

            {ticketData.partsReplaced.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-bold">Parti Sostituite</h4>
                <table className="w-full mt-2">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Codice</th>
                      <th className="text-left py-2">Descrizione</th>
                      <th className="text-center py-2">Qtà</th>
                      <th className="text-right py-2">Prezzo €</th>
                      <th className="text-right py-2">Totale €</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketData.partsReplaced.map((part) => (
                      <tr key={part.id} className="border-b">
                        <td className="py-2">{part.code}</td>
                        <td className="py-2">{part.description}</td>
                        <td className="py-2 text-center">{part.quantity}</td>
                        <td className="py-2 text-right">{part.unitPrice.toFixed(2)}</td>
                        <td className="py-2 text-right">{part.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-bold">Manodopera</h4>
              <div className="flex justify-between mt-2">
                <span>Ore di lavoro:</span>
                <span>{ticketData.laborHours}</span>
              </div>
              <div className="flex justify-between">
                <span>Tariffa oraria:</span>
                <span>€{ticketData.laborRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Totale manodopera:</span>
                <span>€{totals.laborCost.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-bold">Riepilogo Costi</h4>
              <div className="flex justify-between mt-2">
                <span>Totale parti:</span>
                <span>€{totals.partsCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Totale manodopera:</span>
                <span>€{totals.laborCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Imponibile:</span>
                <span>€{totals.totalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>IVA (22%):</span>
                <span>€{totals.vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Totale:</span>
                <span>€{totals.totalWithVat.toFixed(2)}</span>
              </div>
            </div>

            {ticketData.notes && (
              <div className="border-t pt-4">
                <h4 className="font-bold">Note</h4>
                <p>{ticketData.notes}</p>
              </div>
            )}

            {ticketData.photos.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-bold">Foto</h4>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {ticketData.photos.slice(0, 4).map((photo, index) => (
                    <img
                      key={index}
                      src={photo || "/placeholder.svg"}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                  ))}
                  {ticketData.photos.length > 4 && (
                    <div className="flex items-center justify-center bg-gray-100 rounded-md">
                      <span>+{ticketData.photos.length - 4} altre foto</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Scarica PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <Send className="h-4 w-4" />
              Invia al Cliente
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

