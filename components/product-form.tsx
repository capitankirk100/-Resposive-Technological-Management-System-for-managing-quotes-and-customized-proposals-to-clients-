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
import { PlusCircle, Trash2, Save } from "lucide-react"

// Categorie di prodotti
const categories = [
  { id: "robot-tagliaerba", name: "Robot Tagliaerba" },
  { id: "trattori", name: "Trattori" },
  { id: "mietitrebbie", name: "Mietitrebbie" },
  { id: "motoseghe", name: "Motoseghe" },
  { id: "irrigazione", name: "Sistemi di Irrigazione" },
]

// Marche di prodotti
const brands = ["Husqvarna", "John Deere", "New Holland", "Stihl", "Fendt", "Netafim"]

export type ProductData = {
  id: string
  name: string
  category: string
  categoryName: string
  brand: string
  model: string
  price: number
  stock: number
  status: string
  description: string
  features: string[]
  specifications: Record<string, string>
  image: string
}

const initialProductData: ProductData = {
  id: `P-${new Date().getTime().toString().slice(-6)}`,
  name: "",
  category: "",
  categoryName: "",
  brand: "",
  model: "",
  price: 0,
  stock: 0,
  status: "available",
  description: "",
  features: [""],
  specifications: {
    dimensions: "",
    weight: "",
  },
  image: "/placeholder.svg?height=200&width=300",
}

export default function ProductForm() {
  const [productData, setProductData] = useState<ProductData>(initialProductData)
  const [activeTab, setActiveTab] = useState("basic")
  const { toast } = useToast()

  const handleDataChange = (field: string, value: any) => {
    setProductData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCategoryChange = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    if (category) {
      setProductData((prev) => ({
        ...prev,
        category: categoryId,
        categoryName: category.name,
      }))
    }
  }

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...productData.features]
    updatedFeatures[index] = value
    setProductData((prev) => ({
      ...prev,
      features: updatedFeatures,
    }))
  }

  const handleAddFeature = () => {
    setProductData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...productData.features]
    updatedFeatures.splice(index, 1)
    setProductData((prev) => ({
      ...prev,
      features: updatedFeatures,
    }))
  }

  const handleSpecificationChange = (key: string, value: string) => {
    setProductData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value,
      },
    }))
  }

  const handleAddSpecification = () => {
    const newKey = `spec_${Object.keys(productData.specifications).length + 1}`
    setProductData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [newKey]: "",
      },
    }))
  }

  const handleRemoveSpecification = (key: string) => {
    const updatedSpecs = { ...productData.specifications }
    delete updatedSpecs[key]
    setProductData((prev) => ({
      ...prev,
      specifications: updatedSpecs,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProductData((prev) => ({
            ...prev,
            image: event.target.result as string,
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    // In un'applicazione reale, qui si salverebbe il prodotto nel database
    console.log("Prodotto salvato:", productData)
    toast({
      title: "Prodotto salvato",
      description: `Prodotto ${productData.name} aggiunto con successo`,
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Informazioni Base</TabsTrigger>
            <TabsTrigger value="details">Dettagli</TabsTrigger>
            <TabsTrigger value="specs">Specifiche</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Informazioni Base</CardTitle>
                <CardDescription>Inserisci le informazioni principali del prodotto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="productId">ID Prodotto</Label>
                  <Input id="productId" value={productData.id} readOnly />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nome Prodotto</Label>
                  <Input
                    id="name"
                    value={productData.name}
                    onChange={(e) => handleDataChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={productData.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Seleziona categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Select value={productData.brand} onValueChange={(value) => handleDataChange("brand", value)}>
                    <SelectTrigger id="brand">
                      <SelectValue placeholder="Seleziona marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Modello</Label>
                  <Input
                    id="model"
                    value={productData.model}
                    onChange={(e) => handleDataChange("model", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Prezzo (€)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={productData.price}
                      onChange={(e) => handleDataChange("price", Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Disponibilità</Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      value={productData.stock}
                      onChange={(e) => handleDataChange("stock", Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Stato</Label>
                  <Select value={productData.status} onValueChange={(value) => handleDataChange("status", value)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Seleziona stato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Disponibile</SelectItem>
                      <SelectItem value="low-stock">Scorta bassa</SelectItem>
                      <SelectItem value="out-of-stock">Esaurito</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrizione</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={productData.description}
                    onChange={(e) => handleDataChange("description", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Immagine Prodotto</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 border rounded-md overflow-hidden">
                      <img
                        src={productData.image || "/placeholder.svg"}
                        alt="Anteprima prodotto"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setActiveTab("details")}>Avanti</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Caratteristiche</CardTitle>
                <CardDescription>Aggiungi le caratteristiche principali del prodotto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Caratteristiche</Label>
                    <Button variant="outline" size="sm" onClick={handleAddFeature}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Aggiungi
                    </Button>
                  </div>

                  {productData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder={`Caratteristica ${index + 1}`}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFeature(index)}
                        disabled={productData.features.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("basic")}>
                  Indietro
                </Button>
                <Button onClick={() => setActiveTab("specs")}>Avanti</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="specs">
            <Card>
              <CardHeader>
                <CardTitle>Specifiche Tecniche</CardTitle>
                <CardDescription>Aggiungi le specifiche tecniche del prodotto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Specifiche</Label>
                    <Button variant="outline" size="sm" onClick={handleAddSpecification}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Aggiungi
                    </Button>
                  </div>

                  {Object.entries(productData.specifications).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-3 gap-2">
                      <Input value={key} disabled placeholder="Nome specifica" />
                      <div className="col-span-2 flex items-center gap-2">
                        <Input
                          value={value}
                          onChange={(e) => handleSpecificationChange(key, e.target.value)}
                          placeholder="Valore"
                        />
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveSpecification(key)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("details")}>
                  Indietro
                </Button>
                <Button onClick={handleSubmit}>
                  <Save className="h-4 w-4 mr-2" />
                  Salva Prodotto
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Anteprima Prodotto</CardTitle>
            <CardDescription>Anteprima delle informazioni del prodotto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-4">
              <img
                src={productData.image || "/placeholder.svg"}
                alt="Anteprima prodotto"
                className="max-h-64 object-contain"
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{productData.name || "Nome Prodotto"}</h2>
              <div className="flex flex-wrap gap-2">
                {productData.categoryName && (
                  <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">{productData.categoryName}</span>
                )}
                {productData.brand && (
                  <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">{productData.brand}</span>
                )}
                {productData.model && (
                  <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">{productData.model}</span>
                )}
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-2xl font-bold">
                  €{productData.price.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-sm">Disponibilità: {productData.stock} unità</span>
              </div>

              <p className="text-sm mt-4">{productData.description || "Descrizione del prodotto..."}</p>
            </div>

            {productData.features.some((f) => f) && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg">Caratteristiche</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {productData.features
                    .filter((f) => f)
                    .map((feature, index) => (
                      <li key={index} className="text-sm">
                        {feature}
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {Object.values(productData.specifications).some((v) => v) && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg">Specifiche Tecniche</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {Object.entries(productData.specifications)
                    .filter(([_, value]) => value)
                    .map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="font-medium">{key}: </span>
                        <span>{value}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

