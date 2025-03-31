"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  AlertCircle,
  Code,
  FileText,
  Send,
  Download,
  Copy,
  FileCode,
  Clock,
  Cpu,
  Upload,
  File,
  X,
  FolderOpen,
  Trash2,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeAnalysisResult from "./code-analysis-result"
import ProposalGenerator from "./proposal-generator"

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

// Funzione per analizzare il codice
const analyzeCode = (code: string, fileType: string): CodeAnalysis => {
  // Inizializza l'analisi con valori predefiniti
  const analysis: CodeAnalysis = {
    language: "unknown",
    frameworks: [],
    libraries: [],
    complexity: 0,
    linesOfCode: 0,
    functions: 0,
    components: 0,
    issues: {
      errors: 0,
      warnings: 0,
      suggestions: 0,
    },
    estimatedHours: {
      min: 0,
      max: 0,
    },
    quality: 0,
    detectedPatterns: [],
    type: "static",
  }

  // Conta le linee di codice (escludendo le linee vuote)
  analysis.linesOfCode = code.split("\n").filter((line) => line.trim().length > 0).length

  // Determina il linguaggio in base al contenuto e al tipo di file
  if (
    fileType === "javascript" ||
    fileType === "typescript" ||
    fileType === "jsx" ||
    fileType === "tsx" ||
    code.includes("function") ||
    code.includes("=>") ||
    code.includes("const ") ||
    code.includes("let ") ||
    code.includes("var ") ||
    code.includes("import ") ||
    code.includes("export ")
  ) {
    // Verifica se è JavaScript o TypeScript
    if (
      code.includes(":") &&
      (code.includes("interface ") ||
        code.includes("type ") ||
        /:\s*(string|number|boolean|any|void|null|undefined)/.test(code))
    ) {
      analysis.language = "typescript"
    } else {
      analysis.language = "javascript"
    }

    // Verifica se è React
    if (
      code.includes("React") ||
      code.includes("react") ||
      code.includes("jsx") ||
      code.includes("tsx") ||
      code.includes("<div") ||
      code.includes("useState") ||
      code.includes("useEffect") ||
      code.includes("component") ||
      code.includes("Component") ||
      /<[A-Z][A-Za-z]*/.test(code)
    ) {
      analysis.frameworks.push("React")
      analysis.type = "frontend"

      // Conta i componenti React
      const componentMatches = code.match(/function\s+([A-Z][A-Za-z]*)|const\s+([A-Z][A-Za-z]*)\s*=/g) || []
      analysis.components = componentMatches.length

      // Verifica se è Next.js
      if (
        code.includes("next") ||
        code.includes("Next") ||
        code.includes("getServerSideProps") ||
        code.includes("getStaticProps") ||
        code.includes("useRouter") ||
        code.includes("next/link") ||
        code.includes("next/image") ||
        code.includes("next/head") ||
        code.includes("pages/") ||
        code.includes("app/") ||
        code.includes("layout.") ||
        code.includes("page.")
      ) {
        analysis.frameworks.push("Next.js")
        analysis.type = "fullstack"
      }
    }

    // Verifica se è Node.js/Express
    if (
      code.includes("require(") ||
      code.includes("module.exports") ||
      code.includes("express") ||
      code.includes("http.createServer") ||
      code.includes("fs.") ||
      code.includes("process.env") ||
      code.includes("app.get(") ||
      code.includes("app.post(") ||
      code.includes("app.use(") ||
      code.includes("router.")
    ) {
      if (!analysis.frameworks.includes("Node.js")) {
        analysis.frameworks.push("Node.js")
      }
      if (code.includes("express")) {
        analysis.libraries.push("Express")
      }
      analysis.type = analysis.type === "frontend" ? "fullstack" : "backend"
    }

    // Verifica altre librerie comuni
    if (code.includes("axios") || code.includes("fetch(")) analysis.libraries.push("HTTP Client")
    if (code.includes("redux") || code.includes("createStore")) analysis.libraries.push("Redux")
    if (code.includes("tailwind") || code.includes("className=")) analysis.libraries.push("Tailwind CSS")
    if (code.includes("styled-components") || code.includes("styled.")) analysis.libraries.push("styled-components")
    if (code.includes("mongoose") || code.includes("Schema")) analysis.libraries.push("Mongoose")
    if (code.includes("sequelize")) analysis.libraries.push("Sequelize")
    if (code.includes("prisma")) analysis.libraries.push("Prisma")

    // Conta le funzioni
    const functionMatches = code.match(/function\s+\w+\s*$$|const\s+\w+\s*=\s*(\([^)]*$$|[^=]*)\s*=>/g) || []
    analysis.functions = functionMatches.length

    // Rileva pattern
    if (code.includes("useState") || code.includes("useReducer")) {
      analysis.detectedPatterns.push("State Management")
    }
    if (code.includes("useEffect") || code.includes("componentDidMount")) {
      analysis.detectedPatterns.push("Lifecycle Management")
    }
    if (code.includes("useContext") || code.includes("createContext")) {
      analysis.detectedPatterns.push("Context API")
    }
    if (code.includes("useMemo") || code.includes("useCallback")) {
      analysis.detectedPatterns.push("Memoization")
    }
    if (code.includes("try") && code.includes("catch")) {
      analysis.detectedPatterns.push("Error Handling")
    }
    if (code.includes("async") && code.includes("await")) {
      analysis.detectedPatterns.push("Async/Await")
    }
    if (code.includes("map(") || code.includes("filter(") || code.includes("reduce(")) {
      analysis.detectedPatterns.push("Functional Programming")
    }
  } else if (
    code.includes("<html") ||
    code.includes("<!DOCTYPE") ||
    code.includes("<div") ||
    code.includes("<body") ||
    code.includes("<head") ||
    code.includes("<script") ||
    code.includes("<style") ||
    code.includes("<a ") ||
    code.includes("<p>") ||
    code.includes("<h1") ||
    code.includes("<span") ||
    code.includes("<img")
  ) {
    analysis.language = "html"
    analysis.type = "frontend"

    // Verifica se contiene CSS inline
    if (code.includes("<style") || code.includes("style=")) {
      analysis.libraries.push("CSS")
    }

    // Verifica se contiene JavaScript inline
    if (code.includes("<script") || code.includes("onclick=") || code.includes("addEventListener")) {
      analysis.libraries.push("JavaScript")
    }

    // Verifica framework CSS comuni
    if (code.includes("bootstrap") || code.includes('class="btn') || code.includes('class="container')) {
      analysis.libraries.push("Bootstrap")
    }
    if (code.includes("tailwind") || code.includes('class="text-') || code.includes('class="bg-')) {
      analysis.libraries.push("Tailwind CSS")
    }
  } else if (
    code.includes("{") &&
    code.includes("}") &&
    (code.includes("color:") ||
      code.includes("margin:") ||
      code.includes("padding:") ||
      code.includes("font-") ||
      code.includes("background:") ||
      code.includes("display:") ||
      code.includes("@media") ||
      code.includes("#") ||
      code.includes(".") ||
      code.includes(":hover"))
  ) {
    analysis.language = "css"
    analysis.type = "frontend"

    // Verifica preprocessori CSS
    if (code.includes("@mixin") || code.includes("@include") || code.includes("$")) {
      analysis.libraries.push("Sass")
    }
    if (code.includes("@apply") || code.includes("theme(")) {
      analysis.libraries.push("Tailwind CSS")
    }
  } else if (
    code.includes("<?php") ||
    code.includes("namespace") ||
    (code.includes("function ") && code.includes("$"))
  ) {
    analysis.language = "php"
    analysis.type = "backend"

    // Verifica framework PHP
    if (code.includes("Laravel") || code.includes("Illuminate\\")) {
      analysis.frameworks.push("Laravel")
    }
    if (code.includes("WordPress") || code.includes("wp_")) {
      analysis.frameworks.push("WordPress")
    }
  } else if (
    code.includes("import ") &&
    code.includes("from ") &&
    (code.includes("python") ||
      code.includes("def ") ||
      code.includes("class ") ||
      code.includes(":") ||
      code.includes('if __name__ == "__main__"'))
  ) {
    analysis.language = "python"
    analysis.type = "backend"

    // Verifica framework Python
    if (code.includes("django") || code.includes("models.Model")) {
      analysis.frameworks.push("Django")
    }
    if (code.includes("flask") || code.includes("Flask(")) {
      analysis.frameworks.push("Flask")
    }
    if (code.includes("fastapi") || code.includes("FastAPI(")) {
      analysis.frameworks.push("FastAPI")
    }
  } else if (
    code.includes("public class") ||
    code.includes("private ") ||
    code.includes("protected ") ||
    code.includes("void ") ||
    code.includes("String[] args") ||
    code.includes("System.out.println")
  ) {
    analysis.language = "java"
    analysis.type = "backend"

    // Verifica framework Java
    if (code.includes("springframework") || code.includes("@Controller") || code.includes("@Service")) {
      analysis.frameworks.push("Spring")
    }
  } else if (
    code.includes("using System;") ||
    code.includes("namespace ") ||
    code.includes("public class") ||
    code.includes("private ") ||
    code.includes("protected ") ||
    code.includes("void ") ||
    code.includes("Console.WriteLine")
  ) {
    analysis.language = "csharp"
    analysis.type = "backend"

    // Verifica framework C#
    if (code.includes("Microsoft.AspNetCore") || code.includes("IActionResult")) {
      analysis.frameworks.push("ASP.NET Core")
    }
  }

  // Calcola la complessità in base a vari fattori
  let complexityScore = 0

  // Complessità basata sulle linee di codice
  if (analysis.linesOfCode < 50) complexityScore += 5
  else if (analysis.linesOfCode < 200) complexityScore += 15
  else if (analysis.linesOfCode < 500) complexityScore += 25
  else if (analysis.linesOfCode < 1000) complexityScore += 40
  else complexityScore += 60

  // Complessità basata sul numero di funzioni
  complexityScore += Math.min(analysis.functions * 2, 30)

  // Complessità basata sui pattern rilevati
  complexityScore += analysis.detectedPatterns.length * 3

  // Complessità basata sui framework e librerie
  complexityScore += (analysis.frameworks.length + analysis.libraries.length) * 2

  // Normalizza la complessità su una scala da 0 a 100
  analysis.complexity = Math.min(Math.max(complexityScore, 0), 100)

  // Stima delle ore basata sulla complessità
  if (analysis.complexity < 20) {
    analysis.estimatedHours = { min: 2, max: 8 }
  } else if (analysis.complexity < 40) {
    analysis.estimatedHours = { min: 8, max: 24 }
  } else if (analysis.complexity < 60) {
    analysis.estimatedHours = { min: 24, max: 60 }
  } else if (analysis.complexity < 80) {
    analysis.estimatedHours = { min: 60, max: 120 }
  } else {
    analysis.estimatedHours = { min: 120, max: 240 }
  }

  // Calcola la qualità del codice (inverso della complessità, ma con altri fattori)
  let qualityScore = 100

  // Penalità per codice troppo complesso
  qualityScore -= analysis.complexity * 0.3

  // Penalità per mancanza di pattern riconosciuti in codice complesso
  if (analysis.complexity > 40 && analysis.detectedPatterns.length < 2) {
    qualityScore -= 15
  }

  // Penalità per troppe funzioni in poco codice (potrebbe indicare funzioni troppo piccole)
  if (analysis.linesOfCode < 200 && analysis.functions > 20) {
    qualityScore -= 10
  }

  // Bonus per uso di pattern avanzati
  if (
    analysis.detectedPatterns.includes("Memoization") ||
    analysis.detectedPatterns.includes("Error Handling") ||
    analysis.detectedPatterns.includes("Async/Await")
  ) {
    qualityScore += 10
  }

  // Normalizza la qualità su una scala da 0 a 100
  analysis.quality = Math.min(Math.max(Math.round(qualityScore), 0), 100)

  // Simula alcuni problemi nel codice
  analysis.issues.errors = Math.floor(analysis.linesOfCode / 200)
  analysis.issues.warnings = Math.floor(analysis.linesOfCode / 100)
  analysis.issues.suggestions = Math.floor(analysis.linesOfCode / 50)

  return analysis
}

export default function CodeManagerDashboard() {
  const [code, setCode] = useState("")
  const [codeLanguage, setCodeLanguage] = useState("typescript")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isAnalyzed, setIsAnalyzed] = useState(false)
  const [activeTab, setActiveTab] = useState("analysis")
  const [selectedAudience, setSelectedAudience] = useState("developer")
  const [generatedOverview, setGeneratedOverview] = useState("")
  const [attachedFiles, setAttachedFiles] = useState<
    Array<{
      id: string
      name: string
      type: string
      size: number
      content?: string
      selected?: boolean
    }>
  >([])
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
  const [codeAnalysis, setCodeAnalysis] = useState<CodeAnalysis | null>(null)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const runCodeAnalysis = () => {
    if (!code.trim() && attachedFiles.length === 0) {
      toast({
        title: "Nessun codice da analizzare",
        description: "Inserisci del codice o allega dei file prima di procedere",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simula un'analisi progressiva
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    // Esegui l'analisi effettiva del codice
    setTimeout(() => {
      clearInterval(interval)
      setAnalysisProgress(100)

      const analysis = analyzeCode(code, codeLanguage)
      setCodeAnalysis(analysis)

      setIsAnalyzing(false)
      setIsAnalyzed(true)

      // Genera una panoramica in base al pubblico selezionato
      generateOverview(selectedAudience, analysis)
    }, 2000)
  }

  const generateOverview = (audience: string, analysis: CodeAnalysis) => {
    let overview = ""

    const languageText = analysis.language.charAt(0).toUpperCase() + analysis.language.slice(1)
    const frameworksText = analysis.frameworks.length > 0 ? analysis.frameworks.join(", ") : "Nessun framework rilevato"
    const librariesText = analysis.libraries.length > 0 ? analysis.libraries.join(", ") : "Nessuna libreria rilevata"
    const typeText =
      analysis.type === "frontend"
        ? "Frontend"
        : analysis.type === "backend"
          ? "Backend"
          : analysis.type === "fullstack"
            ? "Full Stack"
            : "Statico"

    switch (audience) {
      case "developer":
        overview = `# Analisi Tecnica per Sviluppatori

## Panoramica del Codice
Il codice analizzato è un'applicazione ${typeText} sviluppata principalmente in ${languageText}${analysis.frameworks.length > 0 ? ` utilizzando ${frameworksText}` : ""}.

## Struttura del Progetto
- Linguaggio principale: ${languageText}
- Framework: ${frameworksText}
- Librerie: ${librariesText}
- Tipo di applicazione: ${typeText}
- Linee di codice: ${analysis.linesOfCode}
- Funzioni: ${analysis.functions}
${analysis.components > 0 ? `- Componenti: ${analysis.components}` : ""}

## Pattern Rilevati
${analysis.detectedPatterns.length > 0 ? analysis.detectedPatterns.map((pattern) => `- ${pattern}`).join("\n") : "- Nessun pattern specifico rilevato"}

## Complessità e Punti Critici
- Complessità ciclomatica: ${analysis.complexity > 70 ? "Alta" : analysis.complexity > 40 ? "Media" : "Bassa"} (score ${analysis.complexity}/100)
- Problemi rilevati: ${analysis.issues.errors} errori, ${analysis.issues.warnings} avvisi
- Potenziali miglioramenti: ${analysis.quality < 50 ? "Refactoring necessario, semplificazione della logica" : analysis.quality < 70 ? "Ottimizzazione del codice, miglioramento della struttura" : "Miglioramenti minori, codice di buona qualità"}

## Stima dell'Effort di Sviluppo
- Tempo stimato: ${analysis.estimatedHours.min}-${analysis.estimatedHours.max} ore di sviluppo
- Competenze richieste: ${languageText} ${analysis.complexity > 60 ? "avanzato" : "intermedio"}${analysis.frameworks.length > 0 ? `, ${frameworksText}` : ""}
- Risorse consigliate: ${analysis.complexity > 70 ? "3-4 sviluppatori" : analysis.complexity > 40 ? "2 sviluppatori" : "1 sviluppatore"}`
        break

      case "client":
        overview = `# Proposta Commerciale

## Soluzione Digitale Personalizzata
Abbiamo analizzato il codice fornito e proponiamo una soluzione ${typeText} completa basata su ${languageText}${analysis.frameworks.length > 0 ? ` con ${frameworksText}` : ""}.

## Vantaggi Principali
- Interfaccia ${analysis.type === "frontend" || analysis.type === "fullstack" ? "intuitiva e moderna per tutti i dispositivi" : "backend robusta e scalabile"}
- ${analysis.type === "frontend" || analysis.type === "fullstack" ? "Design responsive ottimizzato per mobile e desktop" : "API RESTful per integrazione con sistemi esterni"}
- ${analysis.detectedPatterns.includes("Error Handling") ? "Gestione avanzata degli errori per massima affidabilità" : "Sistema di logging e monitoraggio per tracciare le performance"}
- ${analysis.type === "frontend" || analysis.type === "fullstack" ? "Esperienza utente fluida e reattiva" : "Elaborazione dati efficiente e sicura"}

## Tecnologie all'Avanguardia
La soluzione utilizza le più moderne tecnologie web per garantire prestazioni, sicurezza e scalabilità:
- ${languageText} per un${analysis.type === "frontend" || analysis.type === "fullstack" ? "'interfaccia reattiva e veloce" : "a gestione dati efficiente"}
- ${analysis.frameworks.length > 0 ? `${frameworksText} per massimizzare produttività e manutenibilità` : "Architettura modulare per facilitare future estensioni"}
- ${analysis.libraries.length > 0 ? `Librerie specializzate: ${librariesText}` : "Componenti personalizzati per esigenze specifiche"}
- ${analysis.type === "fullstack" ? "Architettura full-stack per un'esperienza integrata" : analysis.type === "frontend" ? "Focus sull'esperienza utente e sull'interfaccia" : "Backend robusto e scalabile"}

## Investimento e Tempistiche
- Investimento totale: €${Math.round(((analysis.estimatedHours.min + analysis.estimatedHours.max) / 2) * 85)} + IVA
- Tempistiche di realizzazione: ${analysis.estimatedHours.max > 100 ? "10-12 settimane" : analysis.estimatedHours.max > 40 ? "6-8 settimane" : "3-4 settimane"}
- Inclusi: Sviluppo, test, deployment e formazione iniziale
- Supporto post-lancio: 3 mesi inclusi`
        break

      case "internal":
        overview = `# Analisi Gestionale Interna

## Panoramica Progetto
Progetto ${typeText} basato su ${languageText}${analysis.frameworks.length > 0 ? ` con ${frameworksText}` : ""}.

## Metriche Chiave
- Complessità: ${analysis.complexity > 70 ? "Alta" : analysis.complexity > 40 ? "Media" : "Bassa"} (${analysis.complexity}/100)
- Effort stimato: ${analysis.estimatedHours.min}-${analysis.estimatedHours.max} ore
- Costo orario medio: €85/h
- Costo totale stimato: €${analysis.estimatedHours.min * 85} - €${analysis.estimatedHours.max * 85}

## Analisi Tecnica
- Stack: ${languageText}${analysis.frameworks.length > 0 ? `, ${frameworksText}` : ""}${analysis.libraries.length > 0 ? `, ${librariesText}` : ""}
- Pattern principali: ${analysis.detectedPatterns.length > 0 ? analysis.detectedPatterns.join(", ") : "Nessun pattern specifico rilevato"}
- Punti di forza: ${analysis.quality > 70 ? "Codice ben strutturato, buona modularità" : analysis.quality > 50 ? "Struttura adeguata, alcune ottimizzazioni possibili" : "Necessario refactoring, complessità elevata"}
- Aree migliorabili: ${analysis.quality < 50 ? "Refactoring completo consigliato" : analysis.quality < 70 ? "Ottimizzazione e semplificazione" : "Miglioramenti minori"}

## Margini e Redditività
- Prezzo proposto al cliente: €${Math.round(((analysis.estimatedHours.min + analysis.estimatedHours.max) / 2) * 85)}
- Costo stimato: €${analysis.estimatedHours.max * 60} (worst case)
- Margine lordo: €${Math.round(((analysis.estimatedHours.min + analysis.estimatedHours.max) / 2) * 85) - analysis.estimatedHours.max * 60}
- ROI stimato: ${Math.round(((Math.round(((analysis.estimatedHours.min + analysis.estimatedHours.max) / 2) * 85) - analysis.estimatedHours.max * 60) / (analysis.estimatedHours.max * 60)) * 100)}%

## Risorse Necessarie
- ${analysis.complexity > 70 ? "2 senior developer, 1 junior developer" : analysis.complexity > 40 ? "1 senior developer, 1 junior developer" : "1 developer"}
- Project manager (${analysis.complexity > 70 ? "15-20h" : analysis.complexity > 40 ? "10-15h" : "5-10h"})

## Timeline
- Kickoff: immediato
- Sviluppo: ${analysis.estimatedHours.max > 100 ? "8-10 settimane" : analysis.estimatedHours.max > 40 ? "4-6 settimane" : "2-3 settimane"}
- Testing: ${analysis.estimatedHours.max > 100 ? "2 settimane" : analysis.estimatedHours.max > 40 ? "1 settimana" : "3-5 giorni"}
- Deployment: ${analysis.estimatedHours.max > 100 ? "1 settimana" : "2-3 giorni"}`
        break

      default:
        overview = "Seleziona un tipo di pubblico per generare una panoramica."
    }

    setGeneratedOverview(overview)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newFiles = Array.from(files).map((file) => {
      const id = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      // Leggi il contenuto del file se è un file di testo
      const reader = new FileReader()
      let content = ""

      if (
        file.type.includes("text") ||
        file.name.endsWith(".js") ||
        file.name.endsWith(".jsx") ||
        file.name.endsWith(".ts") ||
        file.name.endsWith(".tsx") ||
        file.name.endsWith(".html") ||
        file.name.endsWith(".css") ||
        file.name.endsWith(".json") ||
        file.name.endsWith(".php") ||
        file.name.endsWith(".py") ||
        file.name.endsWith(".java") ||
        file.name.endsWith(".cs")
      ) {
        reader.onload = (e) => {
          if (e.target?.result) {
            content = e.target.result as string

            // Aggiorna il contenuto del file nell'array
            setAttachedFiles((prev) => prev.map((f) => (f.id === id ? { ...f, content } : f)))

            // Se è il primo file caricato, mostra il suo contenuto nell'editor
            if (attachedFiles.length === 0) {
              setCode(content)
              setSelectedFileId(id)

              // Imposta automaticamente il linguaggio in base all'estensione
              if (file.name.endsWith(".js") || file.name.endsWith(".jsx")) {
                setCodeLanguage("javascript")
              } else if (file.name.endsWith(".ts") || file.name.endsWith(".tsx")) {
                setCodeLanguage("typescript")
              } else if (file.name.endsWith(".html")) {
                setCodeLanguage("html")
              } else if (file.name.endsWith(".css")) {
                setCodeLanguage("css")
              } else if (file.name.endsWith(".php")) {
                setCodeLanguage("php")
              } else if (file.name.endsWith(".py")) {
                setCodeLanguage("python")
              } else if (file.name.endsWith(".java")) {
                setCodeLanguage("java")
              } else if (file.name.endsWith(".cs")) {
                setCodeLanguage("csharp")
              }
            }
          }
        }
        reader.readAsText(file)
      }

      return {
        id,
        name: file.name,
        type: file.type || getFileTypeFromExtension(file.name),
        size: file.size,
        content: content,
      }
    })

    setAttachedFiles((prev) => [...prev, ...newFiles])

    // Reset input value to allow uploading the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    toast({
      title: `${newFiles.length} file allegati`,
      description: "I file sono stati caricati con successo",
    })
  }

  const getFileTypeFromExtension = (filename: string): string => {
    const ext = filename.split(".").pop()?.toLowerCase() || ""

    const typeMap: { [key: string]: string } = {
      js: "application/javascript",
      jsx: "application/javascript",
      ts: "application/typescript",
      tsx: "application/typescript",
      html: "text/html",
      css: "text/css",
      json: "application/json",
      txt: "text/plain",
      md: "text/markdown",
      php: "application/php",
      py: "application/python",
      java: "application/java",
      cs: "application/csharp",
    }

    return typeMap[ext] || "application/octet-stream"
  }

  const getFileIcon = (fileType: string) => {
    if (
      fileType.includes("javascript") ||
      fileType.includes("typescript") ||
      fileType.includes("jsx") ||
      fileType.includes("tsx")
    ) {
      return <FileCode className="h-4 w-4 text-yellow-500" />
    } else if (fileType.includes("html")) {
      return <FileCode className="h-4 w-4 text-orange-500" />
    } else if (fileType.includes("css")) {
      return <FileCode className="h-4 w-4 text-blue-500" />
    } else if (fileType.includes("json")) {
      return <FileCode className="h-4 w-4 text-green-500" />
    } else if (fileType.includes("markdown")) {
      return <FileText className="h-4 w-4 text-purple-500" />
    } else if (fileType.includes("php")) {
      return <FileCode className="h-4 w-4 text-indigo-500" />
    } else if (fileType.includes("python")) {
      return <FileCode className="h-4 w-4 text-blue-700" />
    } else if (fileType.includes("java") || fileType.includes("csharp")) {
      return <FileCode className="h-4 w-4 text-red-700" />
    } else if (fileType.includes("text")) {
      return <FileText className="h-4 w-4 text-gray-500" />
    } else {
      return <File className="h-4 w-4 text-gray-500" />
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const handleFileSelect = (id: string) => {
    const file = attachedFiles.find((f) => f.id === id)
    if (file && file.content) {
      setCode(file.content)
      setSelectedFileId(id)

      // Imposta automaticamente il linguaggio in base all'estensione
      if (file.name.endsWith(".js") || file.name.endsWith(".jsx")) {
        setCodeLanguage("javascript")
      } else if (file.name.endsWith(".ts") || file.name.endsWith(".tsx")) {
        setCodeLanguage("typescript")
      } else if (file.name.endsWith(".html")) {
        setCodeLanguage("html")
      } else if (file.name.endsWith(".css")) {
        setCodeLanguage("css")
      } else if (file.name.endsWith(".php")) {
        setCodeLanguage("php")
      } else if (file.name.endsWith(".py")) {
        setCodeLanguage("python")
      } else if (file.name.endsWith(".java")) {
        setCodeLanguage("java")
      } else if (file.name.endsWith(".cs")) {
        setCodeLanguage("csharp")
      }
    }
  }

  const handleFileDelete = (id: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id))

    if (selectedFileId === id) {
      setSelectedFileId(null)
      setCode("")

      // Se ci sono altri file, seleziona il primo
      if (attachedFiles.length > 1) {
        const nextFile = attachedFiles.find((f) => f.id !== id)
        if (nextFile && nextFile.content) {
          setCode(nextFile.content)
          setSelectedFileId(nextFile.id)
        }
      }
    }
  }

  const handleDeleteAllFiles = () => {
    setAttachedFiles([])
    setSelectedFileId(null)
    setCode("")
  }

  // Resetta l'analisi quando cambia il codice
  useEffect(() => {
    if (isAnalyzed) {
      setIsAnalyzed(false)
      setCodeAnalysis(null)
    }
  }, [code, codeLanguage])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Code Manager</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              setCode("")
              setIsAnalyzed(false)
              setGeneratedOverview("")
              setAttachedFiles([])
              setSelectedFileId(null)
              setCodeAnalysis(null)
            }}
          >
            Nuovo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Inserisci Codice</CardTitle>
            <CardDescription>Incolla il codice o allega file da analizzare</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* File attachments */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>File Allegati</Label>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Allega File
                  </Button>
                  {attachedFiles.length > 0 && (
                    <Button variant="outline" size="sm" onClick={handleDeleteAllFiles}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Elimina Tutti
                    </Button>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  multiple
                  accept=".js,.jsx,.ts,.tsx,.html,.css,.json,.txt,.md,.php,.py,.java,.cs"
                  onChange={handleFileUpload}
                />
              </div>

              {attachedFiles.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <div className="max-h-32 overflow-y-auto">
                    {attachedFiles.map((file) => (
                      <div
                        key={file.id}
                        className={`flex items-center justify-between p-2 hover:bg-muted cursor-pointer ${
                          selectedFileId === file.id ? "bg-muted" : ""
                        }`}
                        onClick={() => handleFileSelect(file.id)}
                      >
                        <div className="flex items-center space-x-2">
                          {getFileIcon(file.type)}
                          <span className="text-sm font-medium">{file.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {formatFileSize(file.size)}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleFileDelete(file.id)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <FolderOpen className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    Trascina qui i file o clicca su "Allega File"
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supporta .js, .jsx, .ts, .tsx, .html, .css, .json, .txt, .md, .php, .py, .java, .cs
                  </p>
                </div>
              )}
            </div>

            <Separator />

            {/* Code editor */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="code-editor">Editor Codice</Label>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="language" className="text-sm">
                    Linguaggio:
                  </Label>
                  <Select value={codeLanguage} onValueChange={setCodeLanguage}>
                    <SelectTrigger id="language" className="w-[150px] h-8">
                      <SelectValue placeholder="Seleziona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="css">CSS</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="php">PHP</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="csharp">C#</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Textarea
                id="code-editor"
                placeholder="Incolla qui il tuo codice..."
                className="min-h-[300px] font-mono text-sm"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="syntax-highlight" defaultChecked />
              <Label htmlFor="syntax-highlight">Syntax Highlighting</Label>
            </div>
            <Button onClick={runCodeAnalysis} disabled={isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Analisi in corso... {analysisProgress}%
                </>
              ) : (
                <>
                  <Cpu className="mr-2 h-4 w-4" />
                  Analizza Codice
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {isAnalyzing ? (
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Analisi in corso</CardTitle>
              <CardDescription>Stiamo analizzando il tuo codice...</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
              <Cpu className="h-16 w-16 text-primary animate-pulse" />
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analisi del codice</span>
                  <span>{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} className="w-full" />
              </div>
              <div className="text-center text-sm text-muted-foreground">
                <p>Stiamo analizzando la struttura, i pattern e la complessità del codice</p>
                <p>Questo processo richiede solo pochi secondi</p>
              </div>
            </CardContent>
          </Card>
        ) : isAnalyzed && codeAnalysis ? (
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Panoramica Testuale</CardTitle>
              <CardDescription>Genera una descrizione del codice per diversi destinatari</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Label htmlFor="audience">Destinatario:</Label>
                <Select
                  value={selectedAudience}
                  onValueChange={(value) => {
                    setSelectedAudience(value)
                    if (codeAnalysis) {
                      generateOverview(value, codeAnalysis)
                    }
                  }}
                >
                  <SelectTrigger id="audience" className="w-[180px]">
                    <SelectValue placeholder="Seleziona destinatario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Sviluppatore</SelectItem>
                    <SelectItem value="client">Cliente</SelectItem>
                    <SelectItem value="internal">Uso Interno</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border p-4 min-h-[240px] overflow-auto">
                <div className="prose prose-sm max-w-none">
                  {generatedOverview.split("\n").map((line, index) => {
                    if (line.startsWith("# ")) {
                      return (
                        <h1 key={index} className="text-xl font-bold mt-2 mb-4">
                          {line.substring(2)}
                        </h1>
                      )
                    } else if (line.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-lg font-semibold mt-4 mb-2">
                          {line.substring(3)}
                        </h2>
                      )
                    } else if (line.startsWith("- ")) {
                      return (
                        <li key={index} className="ml-4">
                          {line.substring(2)}
                        </li>
                      )
                    } else if (line === "") {
                      return <br key={index} />
                    } else {
                      return (
                        <p key={index} className="my-2">
                          {line}
                        </p>
                      )
                    }
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center space-x-2">
                <Switch id="format" />
                <Label htmlFor="format">Formattazione avanzata</Label>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  title="Copia"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedOverview)
                    toast({
                      title: "Copiato",
                      description: "Panoramica copiata negli appunti",
                    })
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  title="Scarica"
                  onClick={() => {
                    const blob = new Blob([generatedOverview], { type: "text/markdown" })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement("a")
                    a.href = url
                    a.download = `panoramica-${selectedAudience}-${new Date().toISOString().split("T")[0]}.md`
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    URL.revokeObjectURL(url)
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Invia">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Panoramica Testuale</CardTitle>
              <CardDescription>Genera una descrizione del codice per diversi destinatari</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
              <Code className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground">
                Incolla il codice o allega dei file e clicca su "Analizza Codice" per generare una panoramica testuale
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {isAnalyzed && codeAnalysis && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analysis">Analisi Dettagliata</TabsTrigger>
            <TabsTrigger value="proposal">Genera Proposta</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-4">
            <CodeAnalysisResult codeAnalysis={codeAnalysis} />
          </TabsContent>

          <TabsContent value="proposal" className="space-y-4">
            <ProposalGenerator codeAnalysis={codeAnalysis} />
          </TabsContent>
        </Tabs>
      )}

      {!isAnalyzed && (code.trim() || attachedFiles.length > 0) && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Codice non analizzato</AlertTitle>
          <AlertDescription>
            Clicca su "Analizza Codice" per procedere con l'analisi e la generazione della proposta.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

