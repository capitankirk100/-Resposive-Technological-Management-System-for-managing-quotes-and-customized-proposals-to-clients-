"use client"

import { useState } from "react"
import Link from "next/link"
import { PlusCircle, Search, MoreHorizontal, Pencil, Trash2, Package, Tag, BarChart3, ShoppingCart } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dati di esempio
const products = [
  {
    id: "P-001",
    name: "Husqvarna Automower 450X",
    category: "robot-tagliaerba",
    categoryName: "Robot Tagliaerba",
    brand: "Husqvarna",
    model: "Automower 450X",
    price: 3999.0,
    stock: 5,
    status: "available",
    description: "Robot tagliaerba automatico per aree fino a 5000 m²",
    features: [
      "Area di lavoro fino a 5000 m²",
      "Pendenza massima 45%",
      "Navigazione GPS",
      "Controllo tramite app",
      "Sensori ad ultrasuoni",
    ],
    specifications: {
      dimensions: "72 x 56 x 31 cm",
      weight: "13.9 kg",
      batteryType: "Li-ion",
      batteryCapacity: "10.4 Ah",
      chargingTime: "60 min",
      cuttingWidth: "24 cm",
      cuttingHeight: "20-60 mm",
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "P-002",
    name: "John Deere 6120M",
    category: "trattori",
    categoryName: "Trattori",
    brand: "John Deere",
    model: "6120M",
    price: 89500.0,
    stock: 2,
    status: "available",
    description: "Trattore agricolo versatile e potente",
    features: [
      "Motore PowerTech da 120 CV",
      "Trasmissione PowerQuad Plus",
      "Cabina ComfortView",
      "Sistema idraulico a centro chiuso",
      "Sollevatore posteriore da 5600 kg",
    ],
    specifications: {
      dimensions: "4.49 x 2.28 x 2.88 m",
      weight: "5700 kg",
      engineType: "PowerTech 4 cilindri",
      displacement: "4.5 L",
      fuelTank: "195 L",
      hydraulicFlow: "80 L/min",
      maxSpeed: "40 km/h",
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "P-003",
    name: "New Holland CX8.90",
    category: "mietitrebbie",
    categoryName: "Mietitrebbie",
    brand: "New Holland",
    model: "CX8.90",
    price: 325000.0,
    stock: 1,
    status: "available",
    description: "Mietitrebbia ad alta capacità per grandi aziende agricole",
    features: [
      "Motore Cursor 9 da 490 CV",
      "Sistema di trebbiatura a 4 battitori",
      "Tecnologia Opti-Fan",
      "Cabina Harvest Suite Ultra",
      "Sistema di livellamento automatico",
    ],
    specifications: {
      dimensions: "9.97 x 3.5 x 4 m",
      weight: "17300 kg",
      engineType: "Cursor 9",
      grainTankCapacity: "12500 L",
      fuelTank: "750 L",
      cuttingWidth: "9.15 m",
      unloadingRate: "125 L/s",
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "P-004",
    name: "Stihl MS 261 C-M",
    category: "motoseghe",
    categoryName: "Motoseghe",
    brand: "Stihl",
    model: "MS 261 C-M",
    price: 899.0,
    stock: 8,
    status: "available",
    description: "Motosega professionale leggera e potente",
    features: [
      "Motore 2-MIX a basse emissioni",
      "Sistema M-Tronic",
      "Tensionamento laterale della catena",
      "Sistema antivibrante",
      "Freno catena QuickStop",
    ],
    specifications: {
      dimensions: "37 x 20 x 27 cm",
      weight: "4.9 kg",
      engineType: "2-tempi",
      displacement: "50.2 cc",
      potenza: "3.0 kW",
      lunghezzaBarra: "40 cm",
      capacitàSerbatoio: "0.5 L",
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "P-005",
    name: "Fendt 724 Vario",
    category: "trattori",
    categoryName: "Trattori",
    brand: "Fendt",
    model: "724 Vario",
    price: 198000.0,
    stock: 1,
    status: "available",
    description: "Trattore di alta gamma con tecnologia avanzata",
    features: [
      "Motore da 240 CV",
      "Trasmissione Vario",
      "Cabina VisioPlus",
      "Sistema VarioGuide",
      'Terminale Vario 10.4"',
    ],
    specifications: {
      dimensions: "5.24 x 2.55 x 3.28 m",
      weight: "7735 kg",
      engineType: "6 cilindri",
      displacement: "6.06 L",
      fuelTank: "400 L",
      hydraulicFlow: "152 L/min",
      maxSpeed: "50 km/h",
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "P-006",
    name: "Husqvarna Automower 430X",
    category: "robot-tagliaerba",
    categoryName: "Robot Tagliaerba",
    brand: "Husqvarna",
    model: "Automower 430X",
    price: 2999.0,
    stock: 3,
    status: "available",
    description: "Robot tagliaerba per aree fino a 3200 m²",
    features: [
      "Area di lavoro fino a 3200 m²",
      "Pendenza massima 45%",
      "Navigazione GPS",
      "Controllo tramite app",
      "Sensori di sollevamento e inclinazione",
    ],
    specifications: {
      dimensions: "69 x 55 x 31 cm",
      weight: "13.2 kg",
      batteryType: "Li-ion",
      batteryCapacity: "5.2 Ah",
      chargingTime: "50 min",
      cuttingWidth: "24 cm",
      cuttingHeight: "20-60 mm",
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "P-007",
    name: "Netafim Irrigation System",
    category: "irrigazione",
    categoryName: "Sistemi di Irrigazione",
    brand: "Netafim",
    model: "Precision Drip",
    price: 5500.0,
    stock: 4,
    status: "available",
    description: "Sistema di irrigazione a goccia di precisione",
    features: [
      "Controllo digitale",
      "Sensori di umidità del suolo",
      "Programmazione avanzata",
      "Risparmio idrico fino al 60%",
      "Monitoraggio remoto",
    ],
    specifications: {
      coverage: "Fino a 10 ettari",
      flowRate: "1-8 L/h",
      pressureRange: "1-4 bar",
      filterSystem: "Automatico",
      controlUnit: "Digitale con touchscreen",
      connectivity: "Wi-Fi, 4G",
      powerSupply: "220V o solare",
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "P-008",
    name: "Husqvarna Automower 315X",
    category: "robot-tagliaerba",
    categoryName: "Robot Tagliaerba",
    brand: "Husqvarna",
    model: "Automower 315X",
    price: 2499.0,
    stock: 6,
    status: "available",
    description: "Robot tagliaerba per aree fino a 1600 m²",
    features: [
      "Area di lavoro fino a 1600 m²",
      "Pendenza massima 40%",
      "Navigazione GPS",
      "Controllo tramite app",
      "Fari LED",
    ],
    specifications: {
      dimensions: "63 x 51 x 25 cm",
      weight: "10.0 kg",
      batteryType: "Li-ion",
      batteryCapacity: "2.1 Ah",
      chargingTime: "60 min",
      cuttingWidth: "22 cm",
      cuttingHeight: "20-60 mm",
    },
    image: "/placeholder.svg?height=200&width=300",
  },
]

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

const getStatusBadge = (status: string) => {
  switch (status) {
    case "available":
      return <Badge className="bg-green-500">Disponibile</Badge>
    case "low-stock":
      return <Badge className="bg-yellow-500">Scorta bassa</Badge>
    case "out-of-stock":
      return <Badge className="bg-red-500">Esaurito</Badge>
    default:
      return <Badge className="bg-gray-500">Sconosciuto</Badge>
  }
}

export default function ProductsDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [brandFilter, setBrandFilter] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("grid")

  // Filtra i prodotti in base alla ricerca e ai filtri
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesBrand = brandFilter === "all" || product.brand === brandFilter

    return matchesSearch && matchesCategory && matchesBrand
  })

  // Trova il prodotto selezionato per i dettagli
  const productDetail = selectedProduct ? products.find((p) => p.id === selectedProduct) : null

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prodotti</h1>
          <p className="text-muted-foreground">Gestisci il catalogo prodotti di Belotti Macchine Agricole</p>
        </div>
        <Button asChild className="mt-4 md:mt-0">
          <Link href="/prodotti/nuovo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuovo Prodotto
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Prodotti</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredProducts.length}</div>
            <p className="text-xs text-muted-foreground">Prodotti nel catalogo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valore Inventario</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €
              {filteredProducts
                .reduce((sum, product) => sum + product.price * product.stock, 0)
                .toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Valore totale dei prodotti in magazzino</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorie</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">Categorie di prodotti</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca prodotti..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filtra per categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le categorie</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={brandFilter} onValueChange={setBrandFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filtra per marca" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le marche</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="ml-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">Griglia</TabsTrigger>
              <TabsTrigger value="table">Tabella</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <TabsContent value="grid" className={activeTab === "grid" ? "block" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>
                      {product.brand} - {product.model}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{product.categoryName}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold">
                    €{product.price.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Disponibilità: {product.stock}</span>
                    {getStatusBadge(product.status)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedProduct(product.id)
                    setIsProductDetailOpen(true)
                  }}
                >
                  Dettagli
                </Button>
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
                      <Pencil className="mr-2 h-4 w-4" />
                      Modifica
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Aggiorna Stock
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

      <TabsContent value="table" className={activeTab === "table" ? "block" : "hidden"}>
        <Card>
          <CardHeader>
            <CardTitle>Elenco Prodotti</CardTitle>
            <CardDescription>{filteredProducts.length} prodotti trovati</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">ID</th>
                    <th className="text-left py-3 px-2">Nome</th>
                    <th className="text-left py-3 px-2">Marca</th>
                    <th className="text-left py-3 px-2">Categoria</th>
                    <th className="text-right py-3 px-2">Prezzo</th>
                    <th className="text-center py-3 px-2">Stock</th>
                    <th className="text-center py-3 px-2">Stato</th>
                    <th className="text-right py-3 px-2">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="py-3 px-2">{product.id}</td>
                      <td className="py-3 px-2">{product.name}</td>
                      <td className="py-3 px-2">{product.brand}</td>
                      <td className="py-3 px-2">{product.categoryName}</td>
                      <td className="py-3 px-2 text-right">
                        €{product.price.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-2 text-center">{product.stock}</td>
                      <td className="py-3 px-2 text-center">{getStatusBadge(product.status)}</td>
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
                                setSelectedProduct(product.id)
                                setIsProductDetailOpen(true)
                              }}
                            >
                              <Package className="mr-2 h-4 w-4" />
                              Dettagli
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" />
                              Modifica
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Aggiorna Stock
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

      {/* Dialog per i dettagli del prodotto */}
      <Dialog open={isProductDetailOpen} onOpenChange={setIsProductDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Dettagli Prodotto</DialogTitle>
            <DialogDescription>Informazioni dettagliate sul prodotto selezionato</DialogDescription>
          </DialogHeader>

          {productDetail && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={productDetail.image || "/placeholder.svg"}
                  alt={productDetail.name}
                  className="w-full h-auto rounded-md"
                />
                <div className="mt-4">
                  <h3 className="font-semibold text-lg">Caratteristiche</h3>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {productDetail.features.map((feature, index) => (
                      <li key={index} className="text-sm">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{productDetail.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{productDetail.categoryName}</Badge>
                    <Badge variant="outline">{productDetail.brand}</Badge>
                  </div>
                  <p className="text-3xl font-bold mt-2">
                    €
                    {productDetail.price.toLocaleString("it-IT", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span>Disponibilità: {productDetail.stock} unità</span>
                    {getStatusBadge(productDetail.status)}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Descrizione</h3>
                  <p className="text-sm mt-2">{productDetail.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Specifiche Tecniche</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {Object.entries(productDetail.specifications).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="font-medium">{key}: </span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Informazioni Prodotto</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>
                      <span className="font-medium">ID Prodotto: </span>
                      <span>{productDetail.id}</span>
                    </div>
                    <div>
                      <span className="font-medium">Modello: </span>
                      <span>{productDetail.model}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProductDetailOpen(false)}>
              Chiudi
            </Button>
            <Button>Modifica</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

