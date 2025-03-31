"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QuoteForm from "./quote-form"
import QuotePreview from "./quote-preview"
import TemplateSelector from "./template-selector"
import { Button } from "@/components/ui/button"
import { Download, Mail, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

export type QuoteItem = {
  id: string
  code: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export type QuoteData = {
  quoteNumber: string
  quoteDate: string
  clientName: string
  clientAddress: string
  clientCity: string
  clientEmail: string
  clientPhone: string
  clientVAT: string
  clientFiscalCode: string
  items: QuoteItem[]
  standardDiscount: number
  extraDiscount: number
  campaignName: string
  objectiveDiscount: number
  paymentMethod: string
  deliveryDate: string
  notes: string
  companyLogo: string
}

const initialQuoteData: QuoteData = {
  quoteNumber: new Date().getTime().toString().slice(-6),
  quoteDate: new Date().toLocaleDateString("it-IT"),
  clientName: "",
  clientAddress: "",
  clientCity: "",
  clientEmail: "",
  clientPhone: "",
  clientVAT: "",
  clientFiscalCode: "",
  items: [
    {
      id: "1",
      code: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    },
  ],
  standardDiscount: 0,
  extraDiscount: 0,
  campaignName: "",
  objectiveDiscount: 0,
  paymentMethod: "",
  deliveryDate: "",
  notes: "",
  companyLogo: "/placeholder.svg?height=100&width=200",
}

export default function QuoteGenerator() {
  const [quoteData, setQuoteData] = useState<QuoteData>(initialQuoteData)
  const [selectedTemplate, setSelectedTemplate] = useState<"template1" | "template2">("template1")
  const { toast } = useToast()

  const handleDataChange = (newData: Partial<QuoteData>) => {
    setQuoteData((prev) => ({ ...prev, ...newData }))
  }

  const calculateTotals = () => {
    const subtotal = quoteData.items.reduce((sum, item) => sum + item.total, 0)
    const standardDiscountAmount = (subtotal * quoteData.standardDiscount) / 100
    const extraDiscountAmount = (subtotal * quoteData.extraDiscount) / 100
    const objectiveDiscountAmount = quoteData.objectiveDiscount
    const netTotal = subtotal - standardDiscountAmount - extraDiscountAmount - objectiveDiscountAmount
    const vat = netTotal * 0.22 // 22% IVA
    const totalWithVat = netTotal + vat

    return {
      subtotal,
      standardDiscountAmount,
      extraDiscountAmount,
      objectiveDiscountAmount,
      netTotal,
      vat,
      totalWithVat,
    }
  }

  const handleExportPDF = async () => {
    const element = document.getElementById("quote-preview")
    if (!element) return

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save(`Preventivo_${quoteData.quoteNumber}.pdf`)

      toast({
        title: "PDF generato con successo",
        description: "Il preventivo è stato scaricato come PDF",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la generazione del PDF",
        variant: "destructive",
      })
    }
  }

  const handleSendEmail = () => {
    if (!quoteData.clientEmail) {
      toast({
        title: "Email mancante",
        description: "Inserisci l'email del cliente per inviare il preventivo",
        variant: "destructive",
      })
      return
    }

    // In a real application, you would implement email sending here
    toast({
      title: "Email inviata",
      description: `Preventivo inviato a ${quoteData.clientEmail}`,
    })
  }

  const handleSendWhatsApp = () => {
    if (!quoteData.clientPhone) {
      toast({
        title: "Numero di telefono mancante",
        description: "Inserisci il numero di telefono del cliente per inviare il preventivo via WhatsApp",
        variant: "destructive",
      })
      return
    }

    // In a real application, you would implement WhatsApp integration here
    // This is a simple example that would open WhatsApp with a message
    const text = `Preventivo N. ${quoteData.quoteNumber} da Belotti Macchine Agricole`
    const whatsappUrl = `https://wa.me/${quoteData.clientPhone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, "_blank")

    toast({
      title: "WhatsApp aperto",
      description: "Preventivo pronto per essere inviato via WhatsApp",
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />

        <Tabs defaultValue="client" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="client">Cliente</TabsTrigger>
            <TabsTrigger value="items">Articoli</TabsTrigger>
            <TabsTrigger value="options">Opzioni</TabsTrigger>
          </TabsList>

          <TabsContent value="client">
            <QuoteForm quoteData={quoteData} onDataChange={handleDataChange} section="client" />
          </TabsContent>

          <TabsContent value="items">
            <QuoteForm quoteData={quoteData} onDataChange={handleDataChange} section="items" />
          </TabsContent>

          <TabsContent value="options">
            <QuoteForm quoteData={quoteData} onDataChange={handleDataChange} section="options" />
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-lg p-4 overflow-auto max-h-[800px]" id="quote-preview">
          <QuotePreview quoteData={quoteData} totals={calculateTotals()} templateType={selectedTemplate} />
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={handleExportPDF} className="flex items-center gap-2">
            <Download size={18} />
            Scarica PDF
          </Button>
          <Button onClick={handleSendEmail} className="flex items-center gap-2">
            <Mail size={18} />
            Invia Email
          </Button>
          <Button onClick={handleSendWhatsApp} className="flex items-center gap-2">
            <Send size={18} />
            Invia WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}

