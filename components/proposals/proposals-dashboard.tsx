"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, Search, Filter, Download, Send, Copy, Printer } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProposalsDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const proposals = [
    {
      id: 1,
      title: "Sviluppo E-commerce",
      client: "Fashion Store",
      collaborator: "Nicode Solutions",
      date: "2023-12-15",
      status: "inviata",
      amount: "€4,500.00",
    },
    {
      id: 2,
      title: "App Mobile Ristorante",
      client: "Trattoria Bella Italia",
      collaborator: "Nicode Solutions",
      date: "2023-12-10",
      status: "bozza",
      amount: "€3,200.00",
    },
    {
      id: 3,
      title: "Sito Web Aziendale",
      client: "Studio Legale Rossi",
      collaborator: "WebDev Pro",
      date: "2023-12-05",
      status: "accettata",
      amount: "€2,800.00",
    },
    {
      id: 4,
      title: "Sistema Gestionale",
      client: "Farmacia Centrale",
      collaborator: "Nicode Solutions",
      date: "2023-11-28",
      status: "in revisione",
      amount: "€5,600.00",
    },
    {
      id: 5,
      title: "Ottimizzazione SEO",
      client: "Hotel Belvedere",
      collaborator: "SEO Master",
      date: "2023-11-20",
      status: "accettata",
      amount: "€1,200.00",
    },
  ]

  const filteredProposals = proposals.filter(
    (proposal) =>
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.collaborator.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "bozza":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "inviata":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "accettata":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "rifiutata":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      case "in revisione":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Proposte</h2>
        <div className="flex items-center space-x-2">
          <Link href="/code-manager">
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Genera da Codice
            </Button>
          </Link>
          <Link href="/proposte/nuova">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuova Proposta
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="all">Tutte</TabsTrigger>
            <TabsTrigger value="draft">Bozze</TabsTrigger>
            <TabsTrigger value="sent">Inviate</TabsTrigger>
            <TabsTrigger value="accepted">Accettate</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cerca proposte..."
                className="w-[200px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtra per" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i collaboratori</SelectItem>
                <SelectItem value="nicode">Nicode Solutions</SelectItem>
                <SelectItem value="webdev">WebDev Pro</SelectItem>
                <SelectItem value="seo">SEO Master</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProposals.map((proposal) => (
              <Card key={proposal.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{proposal.title}</CardTitle>
                      <CardDescription className="mt-1">Cliente: {proposal.client}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(proposal.status)}>
                      {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Collaboratore:</span>
                      <span>{proposal.collaborator}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Data:</span>
                      <span>{new Date(proposal.date).toLocaleDateString("it-IT")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Importo:</span>
                      <span className="font-medium">{proposal.amount}</span>
                    </div>

                    <div className="pt-4 flex justify-between gap-2">
                      <Link href={`/proposte/${proposal.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          Visualizza
                        </Button>
                      </Link>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" title="Stampa">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Copia">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Invia">
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Scarica PDF">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProposals
              .filter((proposal) => proposal.status === "bozza")
              .map((proposal) => (
                <Card key={proposal.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{proposal.title}</CardTitle>
                        <CardDescription className="mt-1">Cliente: {proposal.client}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(proposal.status)}>
                        {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Collaboratore:</span>
                        <span>{proposal.collaborator}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Data:</span>
                        <span>{new Date(proposal.date).toLocaleDateString("it-IT")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Importo:</span>
                        <span className="font-medium">{proposal.amount}</span>
                      </div>

                      <div className="pt-4 flex justify-between gap-2">
                        <Link href={`/proposte/${proposal.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            Visualizza
                          </Button>
                        </Link>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" title="Stampa">
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Copia">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Invia">
                            <Send className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Scarica PDF">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProposals
              .filter((proposal) => proposal.status === "inviata")
              .map((proposal) => (
                <Card key={proposal.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{proposal.title}</CardTitle>
                        <CardDescription className="mt-1">Cliente: {proposal.client}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(proposal.status)}>
                        {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Collaboratore:</span>
                        <span>{proposal.collaborator}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Data:</span>
                        <span>{new Date(proposal.date).toLocaleDateString("it-IT")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Importo:</span>
                        <span className="font-medium">{proposal.amount}</span>
                      </div>

                      <div className="pt-4 flex justify-between gap-2">
                        <Link href={`/proposte/${proposal.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            Visualizza
                          </Button>
                        </Link>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" title="Stampa">
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Copia">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Invia">
                            <Send className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Scarica PDF">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProposals
              .filter((proposal) => proposal.status === "accettata")
              .map((proposal) => (
                <Card key={proposal.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{proposal.title}</CardTitle>
                        <CardDescription className="mt-1">Cliente: {proposal.client}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(proposal.status)}>
                        {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Collaboratore:</span>
                        <span>{proposal.collaborator}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Data:</span>
                        <span>{new Date(proposal.date).toLocaleDateString("it-IT")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Importo:</span>
                        <span className="font-medium">{proposal.amount}</span>
                      </div>

                      <div className="pt-4 flex justify-between gap-2">
                        <Link href={`/proposte/${proposal.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            Visualizza
                          </Button>
                        </Link>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" title="Stampa">
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Copia">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Invia">
                            <Send className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Scarica PDF">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

