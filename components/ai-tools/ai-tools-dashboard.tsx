"use client"

import { useState } from "react"
import {
  Cpu,
  Sparkles,
  FileText,
  Code,
  Wand2,
  Lightbulb,
  MessageSquare,
  Zap,
  ArrowRight,
  Search,
  Copy,
  Bookmark,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Strumenti AI disponibili
const aiTools = [
  {
    id: "tool-1",
    name: "Analizzatore di Codice",
    description: "Analizza il codice e fornisce suggerimenti di miglioramento",
    icon: <Code className="h-6 w-6" />,
    category: "development",
    path: "/code-manager",
  },
  {
    id: "tool-2",
    name: "Generatore di Proposte",
    description: "Crea proposte commerciali basate sui requisiti del progetto",
    icon: <FileText className="h-6 w-6" />,
    category: "business",
    path: "/proposte",
  },
  {
    id: "tool-3",
    name: "Creatore UI",
    description: "Genera interfacce utente basate su descrizioni testuali",
    icon: <Wand2 className="h-6 w-6" />,
    category: "design",
    path: "/ai-tools/ui-creator",
  },
  {
    id: "tool-4",
    name: "Brainstorming Idee",
    description: "Genera idee creative per nuovi progetti e soluzioni",
    icon: <Lightbulb className="h-6 w-6" />,
    category: "ideation",
    path: "/ai-tools/brainstorming",
  },
  {
    id: "tool-5",
    name: "Assistente Chatbot",
    description: "Assistente AI per rispondere a domande tecniche",
    icon: <MessageSquare className="h-6 w-6" />,
    category: "support",
    path: "/ai-tools/chatbot",
  },
  {
    id: "tool-6",
    name: "Ottimizzatore Codice",
    description: "Ottimizza il codice per migliorare performance e leggibilità",
    icon: <Zap className="h-6 w-6" />,
    category: "development",
    path: "/ai-tools/code-optimizer",
  },
]

export default function AIToolsDashboard() {
  const [activeTab, setActiveTab] = useState("tools")
  const [searchTerm, setSearchTerm] = useState("")
  const [promptText, setPromptText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedResult, setGeneratedResult] = useState("")
  const { toast } = useToast()

  // Filtra gli strumenti in base alla ricerca
  const filteredTools = aiTools.filter((tool) => {
    return (
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleGenerate = () => {
    if (!promptText.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci un prompt prima di generare",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulazione di generazione (in un'app reale, qui ci sarebbe una chiamata API)
    setTimeout(() => {
      setIsGenerating(false)
      setGeneratedResult(
        "Ecco il risultato generato in base al tuo prompt. Questo è un esempio di output che potrebbe essere generato da un modello AI come GPT-4. In un'implementazione reale, questo testo sarebbe generato dinamicamente in base al prompt fornito e potrebbe includere codice, testo formattato o altre informazioni rilevanti per la richiesta dell'utente.",
      )
      toast({
        title: "Generazione completata",
        description: "Il risultato è stato generato con successo",
      })
    }, 2000)
  }

  const handleCopyResult = () => {
    if (generatedResult) {
      navigator.clipboard.writeText(generatedResult)
      toast({
        title: "Copiato",
        description: "Il risultato è stato copiato negli appunti",
      })
    }
  }

  const handleSavePrompt = () => {
    if (promptText.trim()) {
      toast({
        title: "Prompt salvato",
        description: "Il prompt è stato salvato nella libreria",
      })
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Strumenti AI</h1>
          <p className="text-muted-foreground">
            Utilizza strumenti basati su intelligenza artificiale per migliorare il tuo workflow
          </p>
        </div>
      </div>

      <Tabs defaultValue="tools" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="tools">Strumenti</TabsTrigger>
          <TabsTrigger value="playground">AI Playground</TabsTrigger>
          <TabsTrigger value="saved">Prompt Salvati</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-4">
          <div className="relative w-full mb-6">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca strumenti AI..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-md bg-primary/10 text-primary">{tool.icon}</div>
                    <div>
                      <CardTitle>{tool.name}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="capitalize">
                    {tool.category}
                  </Badge>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <a href={tool.path}>
                      Apri Strumento
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="playground" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Playground</CardTitle>
              <CardDescription>Sperimenta con l'intelligenza artificiale inserendo un prompt</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Inserisci il tuo prompt qui..."
                  className="min-h-32"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleSavePrompt} disabled={!promptText.trim()}>
                    <Bookmark className="mr-2 h-4 w-4" />
                    Salva Prompt
                  </Button>
                  <Button onClick={handleGenerate} disabled={isGenerating || !promptText.trim()}>
                    {isGenerating ? (
                      <>
                        <Cpu className="mr-2 h-4 w-4 animate-spin" />
                        Generazione in corso...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Genera
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {generatedResult && (
                <div className="space-y-2">
                  <Separator />
                  <h3 className="text-lg font-medium">Risultato</h3>
                  <div className="relative">
                    <div className="bg-muted p-4 rounded-md text-sm">{generatedResult}</div>
                    <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={handleCopyResult}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prompt Salvati</CardTitle>
              <CardDescription>I tuoi prompt salvati per uso futuro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">Generazione Dashboard Analytics</h3>
                    <Badge variant="outline">development</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Crea una dashboard per l'analisi delle vendite con grafici interattivi per visualizzare le
                    performance mensili, le vendite per categoria e le previsioni future.
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-3 w-3" />
                      Copia
                    </Button>
                    <Button size="sm">
                      <Sparkles className="mr-2 h-3 w-3" />
                      Usa
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">Proposta Commerciale E-commerce</h3>
                    <Badge variant="outline">business</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Genera una proposta commerciale dettagliata per un e-commerce di abbigliamento, includendo costi di
                    sviluppo, timeline e funzionalità principali.
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-3 w-3" />
                      Copia
                    </Button>
                    <Button size="sm">
                      <Sparkles className="mr-2 h-3 w-3" />
                      Usa
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">UI Landing Page Prodotto</h3>
                    <Badge variant="outline">design</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Crea una landing page moderna per il lancio di un prodotto tech, con sezioni per caratteristiche,
                    prezzi, testimonianze e form di contatto.
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-3 w-3" />
                      Copia
                    </Button>
                    <Button size="sm">
                      <Sparkles className="mr-2 h-3 w-3" />
                      Usa
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

