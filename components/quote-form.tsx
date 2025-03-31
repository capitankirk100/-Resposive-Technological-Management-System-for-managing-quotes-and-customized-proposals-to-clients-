"use client"

import type React from "react"
import type { QuoteData, QuoteItem } from "./quote-generator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface QuoteFormProps {
  quoteData: QuoteData
  onDataChange: (data: Partial<QuoteData>) => void
  section: "client" | "items" | "options"
}

export default function QuoteForm({ quoteData, onDataChange, section }: QuoteFormProps) {
  const handleItemChange = (id: string, field: keyof QuoteItem, value: string | number) => {
    const updatedItems = quoteData.items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }

        // Recalculate total if quantity or unitPrice changes
        if (field === "quantity" || field === "unitPrice") {
          const quantity = field === "quantity" ? Number(value) : item.quantity
          const unitPrice = field === "unitPrice" ? Number(value) : item.unitPrice
          updatedItem.total = quantity * unitPrice
        }

        return updatedItem
      }
      return item
    })

    onDataChange({ items: updatedItems })
  }

  const addItem = () => {
    const newItem: QuoteItem = {
      id: uuidv4(),
      code: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    }

    onDataChange({ items: [...quoteData.items, newItem] })
  }

  const removeItem = (id: string) => {
    if (quoteData.items.length <= 1) return
    onDataChange({ items: quoteData.items.filter((item) => item.id !== id) })
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          onDataChange({ companyLogo: event.target.result as string })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  if (section === "client") {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quoteNumber">Numero Preventivo</Label>
              <Input
                id="quoteNumber"
                value={quoteData.quoteNumber}
                onChange={(e) => onDataChange({ quoteNumber: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quoteDate">Data Preventivo</Label>
              <Input
                id="quoteDate"
                type="date"
                value={quoteData.quoteDate}
                onChange={(e) => onDataChange({ quoteDate: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="clientName">Nome Cliente</Label>
              <Input
                id="clientName"
                value={quoteData.clientName}
                onChange={(e) => onDataChange({ clientName: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="clientAddress">Indirizzo</Label>
              <Input
                id="clientAddress"
                value={quoteData.clientAddress}
                onChange={(e) => onDataChange({ clientAddress: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="clientCity">Città</Label>
              <Input
                id="clientCity"
                value={quoteData.clientCity}
                onChange={(e) => onDataChange({ clientCity: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientEmail">Email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={quoteData.clientEmail}
                onChange={(e) => onDataChange({ clientEmail: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientPhone">Telefono</Label>
              <Input
                id="clientPhone"
                value={quoteData.clientPhone}
                onChange={(e) => onDataChange({ clientPhone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientVAT">Partita IVA</Label>
              <Input
                id="clientVAT"
                value={quoteData.clientVAT}
                onChange={(e) => onDataChange({ clientVAT: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientFiscalCode">Codice Fiscale</Label>
              <Input
                id="clientFiscalCode"
                value={quoteData.clientFiscalCode}
                onChange={(e) => onDataChange({ clientFiscalCode: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="logo">Logo Aziendale</Label>
              <Input id="logo" type="file" accept="image/*" onChange={handleLogoChange} />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (section === "items") {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {quoteData.items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-end border-b pb-4">
                <div className="col-span-2">
                  <Label htmlFor={`code-${item.id}`}>Codice</Label>
                  <Input
                    id={`code-${item.id}`}
                    value={item.code}
                    onChange={(e) => handleItemChange(item.id, "code", e.target.value)}
                  />
                </div>

                <div className="col-span-4">
                  <Label htmlFor={`description-${item.id}`}>Descrizione</Label>
                  <Input
                    id={`description-${item.id}`}
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                  />
                </div>

                <div className="col-span-1">
                  <Label htmlFor={`quantity-${item.id}`}>Qtà</Label>
                  <Input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, "quantity", Number(e.target.value))}
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor={`unitPrice-${item.id}`}>Prezzo €</Label>
                  <Input
                    id={`unitPrice-${item.id}`}
                    type="number"
                    step="0.01"
                    min="0"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(item.id, "unitPrice", Number(e.target.value))}
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor={`total-${item.id}`}>Totale €</Label>
                  <Input id={`total-${item.id}`} readOnly value={item.total.toFixed(2)} />
                </div>

                <div className="col-span-1">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    disabled={quoteData.items.length <= 1}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}

            <Button onClick={addItem} className="w-full" variant="outline">
              <Plus size={16} className="mr-2" /> Aggiungi Articolo
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (section === "options") {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="standardDiscount">Sconto Standard (%)</Label>
              <Input
                id="standardDiscount"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={quoteData.standardDiscount}
                onChange={(e) => onDataChange({ standardDiscount: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="extraDiscount">Sconto Extra (%)</Label>
              <Input
                id="extraDiscount"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={quoteData.extraDiscount}
                onChange={(e) => onDataChange({ extraDiscount: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaignName">Nome Campagna</Label>
              <Input
                id="campaignName"
                value={quoteData.campaignName}
                onChange={(e) => onDataChange({ campaignName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="objectiveDiscount">Sconto Obiettivo (€)</Label>
              <Input
                id="objectiveDiscount"
                type="number"
                min="0"
                step="0.01"
                value={quoteData.objectiveDiscount}
                onChange={(e) => onDataChange({ objectiveDiscount: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Metodo di Pagamento</Label>
              <Input
                id="paymentMethod"
                value={quoteData.paymentMethod}
                onChange={(e) => onDataChange({ paymentMethod: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryDate">Data Consegna</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={quoteData.deliveryDate}
                onChange={(e) => onDataChange({ deliveryDate: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Note</Label>
              <Textarea
                id="notes"
                rows={4}
                value={quoteData.notes}
                onChange={(e) => onDataChange({ notes: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}

