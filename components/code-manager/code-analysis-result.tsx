"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Clock,
  Code,
  AlertTriangle,
  CheckCircle,
  BarChart4,
  Layers,
  GitBranch,
  Database,
  Lightbulb,
  Workflow,
} from "lucide-react"

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

interface CodeAnalysisResultProps {
  codeAnalysis: CodeAnalysis
}

export default function CodeAnalysisResult({ codeAnalysis }: CodeAnalysisResultProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Funzione per ottenere il colore in base alla complessità
  const getComplexityColor = (value: number) => {
    if (value < 30) return "bg-green-500"
    if (value < 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Funzione per ottenere il colore in base alla qualità
  const getQualityColor = (value: number) => {
    if (value > 70) return "bg-green-500"
    if (value > 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Funzione per ottenere il testo del tipo di applicazione
  const getTypeText = (type: string) => {
    switch (type) {
      case "frontend":
        return "Frontend"
      case "backend":
        return "Backend"
      case "fullstack":
        return "Full Stack"
      default:
        return "Statico"
    }
  }

  // Funzione per ottenere il testo della complessità
  const getComplexityText = (value: number) => {
    if (value < 30) return "Bassa"
    if (value < 60) return "Media"
    return "Alta"
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Complessità</CardTitle>
            <BarChart4 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{codeAnalysis.complexity}/100</div>
            <Progress
              value={codeAnalysis.complexity}
              className={`mt-2 ${getComplexityColor(codeAnalysis.complexity)}`}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Complessità {getComplexityText(codeAnalysis.complexity)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Stimato</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {codeAnalysis.estimatedHours.min}-{codeAnalysis.estimatedHours.max}h
            </div>
            <Progress
              value={(codeAnalysis.estimatedHours.min + codeAnalysis.estimatedHours.max) / 4}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">Effort di sviluppo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualità</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{codeAnalysis.quality}/100</div>
            <Progress value={codeAnalysis.quality} className={`mt-2 ${getQualityColor(codeAnalysis.quality)}`} />
            <p className="text-xs text-muted-foreground mt-2">
              {codeAnalysis.quality > 70
                ? "Buona qualità"
                : codeAnalysis.quality > 40
                  ? "Qualità media"
                  : "Qualità bassa"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Problemi</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{codeAnalysis.issues.errors + codeAnalysis.issues.warnings}</div>
            <div className="mt-2 flex gap-1">
              {codeAnalysis.issues.errors > 0 && (
                <Badge variant="outline" className="bg-red-500/10 text-red-500">
                  {codeAnalysis.issues.errors} Errori
                </Badge>
              )}
              {codeAnalysis.issues.warnings > 0 && (
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                  {codeAnalysis.issues.warnings} Warnings
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Problemi rilevati</p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Analisi Dettagliata</CardTitle>
          <CardDescription>Risultati dell'analisi del codice con metriche avanzate</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Panoramica</TabsTrigger>
              <TabsTrigger value="structure">Struttura</TabsTrigger>
              <TabsTrigger value="patterns">Pattern</TabsTrigger>
              <TabsTrigger value="issues">Problemi</TabsTrigger>
              <TabsTrigger value="effort">Effort</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tecnologie Rilevate</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{codeAnalysis.language.charAt(0).toUpperCase() + codeAnalysis.language.slice(1)}</Badge>
                    {codeAnalysis.frameworks.map((framework, index) => (
                      <Badge key={index}>{framework}</Badge>
                    ))}
                    {codeAnalysis.libraries.map((library, index) => (
                      <Badge key={index} variant="outline">
                        {library}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold mt-4 mb-2">Metriche Principali</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Linee di codice:</span>
                      <span>{codeAnalysis.linesOfCode.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Funzioni:</span>
                      <span>{codeAnalysis.functions}</span>
                    </li>
                    {codeAnalysis.components > 0 && (
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Componenti:</span>
                        <span>{codeAnalysis.components}</span>
                      </li>
                    )}
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Complessità:</span>
                      <span>{getComplexityText(codeAnalysis.complexity)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Tipo di applicazione:</span>
                      <span>{getTypeText(codeAnalysis.type)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Linguaggio principale:</span>
                      <span>{codeAnalysis.language.charAt(0).toUpperCase() + codeAnalysis.language.slice(1)}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Punti di Forza</h3>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Architettura modulare ben strutturata</span>
                    </li>
                    {codeAnalysis.quality > 60 && (
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>Utilizzo coerente di {codeAnalysis.language}</span>
                      </li>
                    )}
                    {codeAnalysis.detectedPatterns.includes("Error Handling") && (
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>Gestione degli errori robusta</span>
                      </li>
                    )}
                    {codeAnalysis.detectedPatterns.includes("Async/Await") && (
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>Gestione asincrona efficiente</span>
                      </li>
                    )}
                    {codeAnalysis.detectedPatterns.includes("Functional Programming") && (
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>Approccio funzionale alla programmazione</span>
                      </li>
                    )}
                  </ul>

                  <h3 className="text-lg font-semibold mt-4 mb-2">Aree di Miglioramento</h3>
                  <ul className="space-y-1">
                    {codeAnalysis.complexity > 60 && (
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                        <span>Complessità elevata, refactoring consigliato</span>
                      </li>
                    )}
                    {!codeAnalysis.detectedPatterns.includes("Error Handling") && (
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                        <span>Gestione degli errori insufficiente</span>
                      </li>
                    )}
                    {codeAnalysis.issues.errors > 0 && (
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                        <span>Errori critici da risolvere: {codeAnalysis.issues.errors}</span>
                      </li>
                    )}
                    {codeAnalysis.issues.warnings > 0 && (
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                        <span>Warning da verificare: {codeAnalysis.issues.warnings}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Analisi Funzionale</h3>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Funzioni Principali</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="p-2 border rounded-md">
                          <div className="flex items-start">
                            <Code className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <div>
                              <p className="font-medium">Funzioni rilevate: {codeAnalysis.functions}</p>
                              <p className="text-sm text-muted-foreground">
                                {codeAnalysis.functions > 10
                                  ? "Codice con molte funzioni, possibile candidato per refactoring"
                                  : "Numero di funzioni nella media"}
                              </p>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline">
                                  Complessità: {getComplexityText(codeAnalysis.complexity)}
                                </Badge>
                                <Badge variant="outline">
                                  Linee per funzione:{" "}
                                  {codeAnalysis.functions > 0
                                    ? Math.round(codeAnalysis.linesOfCode / codeAnalysis.functions)
                                    : 0}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        {codeAnalysis.detectedPatterns.includes("Async/Await") && (
                          <div className="p-2 border rounded-md">
                            <div className="flex items-start">
                              <Code className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                              <div>
                                <p className="font-medium">Funzioni asincrone</p>
                                <p className="text-sm text-muted-foreground">
                                  Utilizzo di async/await per operazioni asincrone
                                </p>
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                                    Best Practice
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {codeAnalysis.detectedPatterns.includes("Error Handling") && (
                          <div className="p-2 border rounded-md">
                            <div className="flex items-start">
                              <Code className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                              <div>
                                <p className="font-medium">Gestione errori</p>
                                <p className="text-sm text-muted-foreground">
                                  Implementazione di try/catch per la gestione degli errori
                                </p>
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                                    Best Practice
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {codeAnalysis.components > 0 && (
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Componenti</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="p-2 border rounded-md">
                            <div className="flex items-start">
                              <Layers className="h-4 w-4 text-purple-500 mr-2 mt-0.5" />
                              <div>
                                <p className="font-medium">Componenti rilevati: {codeAnalysis.components}</p>
                                <p className="text-sm text-muted-foreground">
                                  {codeAnalysis.frameworks.includes("React")
                                    ? "Applicazione React con componenti funzionali"
                                    : "Componenti UI personalizzati"}
                                </p>
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="outline">
                                    Media linee:{" "}
                                    {codeAnalysis.components > 0
                                      ? Math.round(codeAnalysis.linesOfCode / codeAnalysis.components)
                                      : 0}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>

                          {codeAnalysis.detectedPatterns.includes("State Management") && (
                            <div className="p-2 border rounded-md">
                              <div className="flex items-start">
                                <Layers className="h-4 w-4 text-purple-500 mr-2 mt-0.5" />
                                <div>
                                  <p className="font-medium">Gestione dello stato</p>
                                  <p className="text-sm text-muted-foreground">
                                    Utilizzo di hook per la gestione dello stato (useState, useReducer)
                                  </p>
                                  <div className="flex gap-2 mt-1">
                                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                                      Best Practice
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {codeAnalysis.detectedPatterns.includes("Lifecycle Management") && (
                            <div className="p-2 border rounded-md">
                              <div className="flex items-start">
                                <Layers className="h-4 w-4 text-purple-500 mr-2 mt-0.5" />
                                <div>
                                  <p className="font-medium">Gestione del ciclo di vita</p>
                                  <p className="text-sm text-muted-foreground">
                                    Utilizzo di useEffect per effetti collaterali
                                  </p>
                                  <div className="flex gap-2 mt-1">
                                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                                      Best Practice
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Pattern Rilevati</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {codeAnalysis.detectedPatterns.length > 0 ? (
                          codeAnalysis.detectedPatterns.map((pattern, index) => (
                            <div key={index} className="p-2 border rounded-md">
                              <div className="flex items-start">
                                <GitBranch className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                                <div>
                                  <p className="font-medium">{pattern}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {pattern === "State Management" && "Gestione dello stato dell'applicazione"}
                                    {pattern === "Lifecycle Management" && "Gestione del ciclo di vita dei componenti"}
                                    {pattern === "Context API" && "Condivisione dello stato tra componenti"}
                                    {pattern === "Memoization" && "Ottimizzazione delle performance"}
                                    {pattern === "Error Handling" && "Gestione robusta degli errori"}
                                    {pattern === "Async/Await" && "Gestione asincrona moderna"}
                                    {pattern === "Functional Programming" && "Approccio funzionale alla programmazione"}
                                  </p>
                                  <div className="flex gap-2 mt-1">
                                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                                      Best Practice
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 border rounded-md text-center text-muted-foreground">
                            Nessun pattern specifico rilevato nel codice
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="structure" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Struttura del Codice</h3>
                  <div className="rounded-md bg-muted p-4 font-mono text-sm">
                    <pre className="whitespace-pre-wrap">
                      {`Linguaggio: ${codeAnalysis.language}
Tipo: ${getTypeText(codeAnalysis.type)}
Linee di codice: ${codeAnalysis.linesOfCode}
Funzioni: ${codeAnalysis.functions}
${codeAnalysis.components > 0 ? `Componenti: ${codeAnalysis.components}` : ""}
Framework: ${codeAnalysis.frameworks.length > 0 ? codeAnalysis.frameworks.join(", ") : "Nessuno"}
Librerie: ${codeAnalysis.libraries.length > 0 ? codeAnalysis.libraries.join(", ") : "Nessuna"}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Metriche di Qualità</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Qualità complessiva:</span>
                      <span>{codeAnalysis.quality}/100</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Complessità:</span>
                      <span>{codeAnalysis.complexity}/100</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Errori:</span>
                      <span>{codeAnalysis.issues.errors}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Warning:</span>
                      <span>{codeAnalysis.issues.warnings}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Suggerimenti:</span>
                      <span>{codeAnalysis.issues.suggestions}</span>
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold mt-4 mb-2">Metriche di Codice</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Linee per funzione:</span>
                      <span>
                        {codeAnalysis.functions > 0 ? Math.round(codeAnalysis.linesOfCode / codeAnalysis.functions) : 0}
                      </span>
                    </li>
                    {codeAnalysis.components > 0 && (
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Linee per componente:</span>
                        <span>{Math.round(codeAnalysis.linesOfCode / codeAnalysis.components)}</span>
                      </li>
                    )}
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Pattern rilevati:</span>
                      <span>{codeAnalysis.detectedPatterns.length}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Analisi Tecnologica</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Database className="h-4 w-4 mr-2" />
                      Linguaggio e Framework
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span>Linguaggio principale:</span>
                        <span>{codeAnalysis.language.charAt(0).toUpperCase() + codeAnalysis.language.slice(1)}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Framework:</span>
                        <span>
                          {codeAnalysis.frameworks.length > 0 ? codeAnalysis.frameworks.join(", ") : "Nessuno"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Librerie:</span>
                        <span>{codeAnalysis.libraries.length > 0 ? codeAnalysis.libraries.join(", ") : "Nessuna"}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Tipo applicazione:</span>
                        <span>{getTypeText(codeAnalysis.type)}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Layers className="h-4 w-4 mr-2" />
                      Struttura del Codice
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span>Linee di codice:</span>
                        <span>{codeAnalysis.linesOfCode}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Funzioni:</span>
                        <span>{codeAnalysis.functions}</span>
                      </li>
                      {codeAnalysis.components > 0 && (
                        <li className="flex justify-between">
                          <span>Componenti:</span>
                          <span>{codeAnalysis.components}</span>
                        </li>
                      )}
                      <li className="flex justify-between">
                        <span>Pattern rilevati:</span>
                        <span>{codeAnalysis.detectedPatterns.length}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Pattern Rilevati</h3>
                  <div className="space-y-2">
                    {codeAnalysis.detectedPatterns.length > 0 ? (
                      codeAnalysis.detectedPatterns.map((pattern, index) => (
                        <div key={index} className="p-3 border rounded-md">
                          <div className="flex items-start">
                            <Workflow className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                            <div>
                              <p className="font-medium">{pattern}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {pattern === "State Management" &&
                                  "Gestione dello stato dell'applicazione con hook o altre soluzioni"}
                                {pattern === "Lifecycle Management" &&
                                  "Gestione del ciclo di vita dei componenti con useEffect o metodi lifecycle"}
                                {pattern === "Context API" &&
                                  "Condivisione dello stato tra componenti senza prop drilling"}
                                {pattern === "Memoization" &&
                                  "Ottimizzazione delle performance con useMemo e useCallback"}
                                {pattern === "Error Handling" && "Gestione robusta degli errori con try/catch"}
                                {pattern === "Async/Await" && "Gestione asincrona moderna con async/await"}
                                {pattern === "Functional Programming" &&
                                  "Approccio funzionale con map, filter, reduce e altre funzioni di ordine superiore"}
                              </p>
                              <div className="mt-2">
                                <Badge className="bg-green-500">Implementazione Rilevata</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 border rounded-md text-center text-muted-foreground">
                        Nessun pattern specifico rilevato nel codice
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Pattern Consigliati</h3>
                  <div className="space-y-2">
                    {!codeAnalysis.detectedPatterns.includes("Error Handling") && (
                      <div className="p-3 border rounded-md bg-blue-50">
                        <div className="flex items-start">
                          <Lightbulb className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium">Implementare Error Handling</p>
                            <p className="text-sm mt-1">
                              Aggiungere gestione degli errori con try/catch per migliorare la robustezza del codice
                            </p>
                            <div className="mt-2 text-sm">
                              <p className="font-medium">Benefici:</p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Prevenzione di crash dell'applicazione</li>
                                <li>Migliore esperienza utente in caso di errori</li>
                                <li>Facilità di debug e manutenzione</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {!codeAnalysis.detectedPatterns.includes("Memoization") &&
                      codeAnalysis.frameworks.includes("React") && (
                        <div className="p-3 border rounded-md bg-blue-50">
                          <div className="flex items-start">
                            <Lightbulb className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                            <div>
                              <p className="font-medium">Adottare Memoization</p>
                              <p className="text-sm mt-1">
                                Utilizzare useMemo e useCallback per ottimizzare le performance di rendering
                              </p>
                              <div className="mt-2 text-sm">
                                <p className="font-medium">Benefici:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                  <li>Riduzione dei rendering non necessari</li>
                                  <li>Miglioramento delle performance</li>
                                  <li>Ottimizzazione per componenti complessi</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    {!codeAnalysis.detectedPatterns.includes("Context API") &&
                      codeAnalysis.frameworks.includes("React") && (
                        <div className="p-3 border rounded-md bg-blue-50">
                          <div className="flex items-start">
                            <Lightbulb className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                            <div>
                              <p className="font-medium">Utilizzare Context API</p>
                              <p className="text-sm mt-1">
                                Implementare Context API per la gestione dello stato globale
                              </p>
                              <div className="mt-2 text-sm">
                                <p className="font-medium">Benefici:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                  <li>Eliminazione del prop drilling</li>
                                  <li>Gestione centralizzata dello stato</li>
                                  <li>Migliore organizzazione del codice</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="issues" className="space-y-4">
              <div className="space-y-4">
                {codeAnalysis.issues.errors > 0 && (
                  <div className="rounded-md border p-4 bg-red-500/5">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Errori critici rilevati: {codeAnalysis.issues.errors}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Sono stati rilevati errori che potrebbero compromettere il funzionamento dell'applicazione.
                        </p>
                        <div className="mt-2 space-y-2">
                          <Badge variant="outline" className="bg-red-500/10 text-red-500">
                            Critico
                          </Badge>
                          <div className="text-sm mt-2">
                            <p className="font-medium">Soluzione consigliata:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Revisione completa del codice</li>
                              <li>Implementazione di test automatizzati</li>
                              <li>Aggiunta di gestione degli errori robusta</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {codeAnalysis.issues.warnings > 0 && (
                  <div className="rounded-md border p-4 bg-yellow-500/5">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Warning rilevati: {codeAnalysis.issues.warnings}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Sono stati rilevati warning che potrebbero indicare problemi potenziali.
                        </p>
                        <div className="mt-2 space-y-2">
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                            Medio
                          </Badge>
                          <div className="text-sm mt-2">
                            <p className="font-medium">Soluzione consigliata:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Revisione delle aree problematiche</li>
                              <li>Refactoring del codice dove necessario</li>
                              <li>Aggiornamento delle dipendenze obsolete</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {codeAnalysis.complexity > 70 && (
                  <div className="rounded-md border p-4 bg-yellow-500/5">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Complessità elevata</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Il codice ha una complessità elevata ({codeAnalysis.complexity}/100) che potrebbe rendere
                          difficile la manutenzione.
                        </p>
                        <div className="mt-2 space-y-2">
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                            Medio
                          </Badge>
                          <div className="text-sm mt-2">
                            <p className="font-medium">Soluzione consigliata:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Semplificazione delle funzioni complesse</li>
                              <li>Suddivisione in componenti più piccoli</li>
                              <li>Miglioramento della modularità</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {codeAnalysis.issues.errors === 0 &&
                  codeAnalysis.issues.warnings === 0 &&
                  codeAnalysis.complexity <= 70 && (
                    <div className="rounded-md border p-4 bg-green-500/5">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">Nessun problema critico rilevato</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Il codice sembra essere in buono stato senza problemi critici.
                          </p>
                          <div className="mt-2 space-y-2">
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              Ottimo
                            </Badge>
                            <div className="text-sm mt-2">
                              <p className="font-medium">Suggerimenti per migliorare ulteriormente:</p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Aggiungere test automatizzati</li>
                                <li>Documentare il codice</li>
                                <li>Ottimizzare le performance</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </TabsContent>

            <TabsContent value="effort" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Stima dell'Effort</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Frontend:</span>
                      <span>
                        {Math.round(codeAnalysis.estimatedHours.min * 0.6)}-
                        {Math.round(codeAnalysis.estimatedHours.max * 0.6)} ore
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Backend:</span>
                      <span>
                        {Math.round(codeAnalysis.estimatedHours.min * 0.3)}-
                        {Math.round(codeAnalysis.estimatedHours.max * 0.3)} ore
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Testing:</span>
                      <span>
                        {Math.round(codeAnalysis.estimatedHours.min * 0.1)}-
                        {Math.round(codeAnalysis.estimatedHours.max * 0.1)} ore
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Totale:</span>
                      <span className="font-semibold">
                        {codeAnalysis.estimatedHours.min}-{codeAnalysis.estimatedHours.max} ore
                      </span>
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold mt-4 mb-2">Competenze Richieste</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>
                      {codeAnalysis.language.charAt(0).toUpperCase() + codeAnalysis.language.slice(1)}{" "}
                      {codeAnalysis.complexity > 60 ? "Avanzato" : "Intermedio"}
                    </Badge>
                    {codeAnalysis.frameworks.map((framework, index) => (
                      <Badge key={index}>{framework}</Badge>
                    ))}
                    {codeAnalysis.libraries.map((library, index) => (
                      <Badge key={index} variant="outline">
                        {library}
                      </Badge>
                    ))}
                    {codeAnalysis.type === "frontend" && <Badge>UI/UX</Badge>}
                    {codeAnalysis.type === "backend" && <Badge>API Design</Badge>}
                    {codeAnalysis.type === "fullstack" && <Badge>Full Stack</Badge>}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Timeline Suggerita</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span>Setup e configurazione</span>
                          <span className="text-muted-foreground">
                            {codeAnalysis.estimatedHours.max > 100 ? "3-5 giorni" : "1-2 giorni"}
                          </span>
                        </div>
                        <Progress value={100} className="h-2 mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span>Sviluppo principale</span>
                          <span className="text-muted-foreground">
                            {codeAnalysis.estimatedHours.max > 100
                              ? "3-4 settimane"
                              : codeAnalysis.estimatedHours.max > 40
                                ? "1-2 settimane"
                                : "3-5 giorni"}
                          </span>
                        </div>
                        <Progress value={100} className="h-2 mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span>Testing e ottimizzazione</span>
                          <span className="text-muted-foreground">
                            {codeAnalysis.estimatedHours.max > 100
                              ? "1-2 settimane"
                              : codeAnalysis.estimatedHours.max > 40
                                ? "3-5 giorni"
                                : "1-2 giorni"}
                          </span>
                        </div>
                        <Progress value={100} className="h-2 mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span>Deployment e documentazione</span>
                          <span className="text-muted-foreground">
                            {codeAnalysis.estimatedHours.max > 100 ? "3-5 giorni" : "1-2 giorni"}
                          </span>
                        </div>
                        <Progress value={100} className="h-2 mt-1" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mt-4 mb-2">Risorse Consigliate</h3>
                  <div className="p-3 border rounded-md">
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Senior Developer:</span>
                        <span>{codeAnalysis.complexity > 60 ? "1" : "1 (part-time)"}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Developer:</span>
                        <span>{codeAnalysis.complexity > 60 ? "1-2" : "1"}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>QA Tester:</span>
                        <span>{codeAnalysis.complexity > 60 ? "1" : "1 (part-time)"}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Project Manager:</span>
                        <span>1 (part-time)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Analisi Costi-Benefici</h3>
                <div className="p-4 border rounded-md">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">Costi Stimati</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span>
                            Sviluppo ({codeAnalysis.estimatedHours.min}-{codeAnalysis.estimatedHours.max} ore @ €85/h):
                          </span>
                          <span>
                            €{codeAnalysis.estimatedHours.min * 85} - €{codeAnalysis.estimatedHours.max * 85}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Infrastruttura (annuale):</span>
                          <span>
                            €{Math.round(codeAnalysis.estimatedHours.max * 5)} - €
                            {Math.round(codeAnalysis.estimatedHours.max * 10)}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Manutenzione (annuale):</span>
                          <span>
                            €{Math.round(codeAnalysis.estimatedHours.max * 15)} - €
                            {Math.round(codeAnalysis.estimatedHours.max * 25)}
                          </span>
                        </li>
                        <li className="flex justify-between font-medium mt-2">
                          <span>Totale primo anno:</span>
                          <span>
                            €
                            {Math.round(
                              codeAnalysis.estimatedHours.min * 85 +
                                codeAnalysis.estimatedHours.max * 5 +
                                codeAnalysis.estimatedHours.max * 15,
                            )}{" "}
                            - €
                            {Math.round(
                              codeAnalysis.estimatedHours.max * 85 +
                                codeAnalysis.estimatedHours.max * 10 +
                                codeAnalysis.estimatedHours.max * 25,
                            )}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Benefici Attesi</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span>Risparmio tempo (ore/mese):</span>
                          <span>
                            {Math.round(codeAnalysis.estimatedHours.max / 5)}-
                            {Math.round(codeAnalysis.estimatedHours.max / 3)}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Valore risparmio (annuale):</span>
                          <span>
                            €{Math.round((codeAnalysis.estimatedHours.max / 5) * 12 * 50)} - €
                            {Math.round((codeAnalysis.estimatedHours.max / 3) * 12 * 50)}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Miglioramento efficienza:</span>
                          <span>20-35%</span>
                        </li>
                        <li className="flex justify-between font-medium mt-2">
                          <span>ROI stimato (primo anno):</span>
                          <span>
                            {Math.round(
                              (Math.round((codeAnalysis.estimatedHours.max / 4) * 12 * 50) /
                                Math.round(
                                  codeAnalysis.estimatedHours.max * 85 +
                                    codeAnalysis.estimatedHours.max * 7.5 +
                                    codeAnalysis.estimatedHours.max * 20,
                                )) *
                                100,
                            )}
                            %
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

