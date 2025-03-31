"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  FileText,
  Shield,
  Database,
  Save,
  Upload,
  Download,
  RefreshCw,
} from "lucide-react"

export default function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState("company")
  const { toast } = useToast()

  // Dati di esempio per le impostazioni aziendali
  const [companySettings, setCompanySettings] = useState({
    name: "Belotti Macchine Agricole",
    address: "VIA SALETTI 3/F",
    city: "25040 - PLEMO DI ESINE (BS)",
    email: "c39@me.com",
    phone: "3462332866",
    website: "www.belottimacchineagricole.it",
    vatNumber: "IT01234567890",
    fiscalCode: "BLTMCC80A01E333X",
    logo: "/placeholder.svg?height=100&width=200",
  })

  // Dati di esempio per le impostazioni utente
  const [userSettings, setUserSettings] = useState({
    name: "Marco Belotti",
    email: "marco@belottimacchineagricole.it",
    role: "Amministratore",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  // Dati di esempio per le impostazioni di notifica
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    quoteCreated: true,
    quoteAccepted: true,
    quoteRejected: true,
    serviceCreated: true,
    serviceCompleted: true,
    lowStock: true,
    dailySummary: false,
    weeklySummary: true,
  })

  // Dati di esempio per le impostazioni dei template
  const [templateSettings, setTemplateSettings] = useState({
    defaultQuoteTemplate: "template1",
    defaultServiceTemplate: "template1",
    includeVat: true,
    includeDiscount: true,
    includeLogo: true,
    includeSignature: true,
    footerText:
      "Grazie per aver scelto Belotti Macchine Agricole. Per qualsiasi informazione non esitate a contattarci.",
  })

  // Dati di esempio per le impostazioni di backup
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    lastBackup: "15/04/2023 08:30",
    backupLocation: "Cloud (Google Drive)",
  })

  const handleCompanySettingChange = (field: string, value: string) => {
    setCompanySettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleUserSettingChange = (field: string, value: string) => {
    setUserSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationSettingChange = (field: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleTemplateSettingChange = (field: string, value: any) => {
    setTemplateSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleBackupSettingChange = (field: string, value: any) => {
    setBackupSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setCompanySettings((prev) => ({
            ...prev,
            logo: event.target.result as string,
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setUserSettings((prev) => ({
            ...prev,
            avatar: event.target.result as string,
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveSettings = () => {
    // In un'applicazione reale, qui si salverebbero le impostazioni nel database
    toast({
      title: "Impostazioni salvate",
      description: "Le tue impostazioni sono state salvate con successo",
    })
  }

  const handleCreateBackup = () => {
    // In un'applicazione reale, qui si creerebbe un backup
    toast({
      title: "Backup creato",
      description: "Il backup è stato creato con successo",
    })

    // Aggiorna la data dell'ultimo backup
    const now = new Date()
    const formattedDate = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`

    setBackupSettings((prev) => ({
      ...prev,
      lastBackup: formattedDate,
    }))
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Impostazioni</h1>
          <p className="text-muted-foreground">Gestisci le impostazioni del sistema</p>
        </div>
        <Button onClick={handleSaveSettings} className="mt-4 md:mt-0">
          <Save className="mr-2 h-4 w-4" />
          Salva Impostazioni
        </Button>
      </div>

      <Tabs defaultValue="company" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="company">Azienda</TabsTrigger>
          <TabsTrigger value="users">Utenti</TabsTrigger>
          <TabsTrigger value="notifications">Notifiche</TabsTrigger>
          <TabsTrigger value="templates">Template</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Aziendali</CardTitle>
              <CardDescription>Gestisci le informazioni della tua azienda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nome Azienda</Label>
                    <div className="flex items-center">
                      <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="companyName"
                        value={companySettings.name}
                        onChange={(e) => handleCompanySettingChange("name", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyAddress">Indirizzo</Label>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="companyAddress"
                        value={companySettings.address}
                        onChange={(e) => handleCompanySettingChange("address", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyCity">Città</Label>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="companyCity"
                        value={companySettings.city}
                        onChange={(e) => handleCompanySettingChange("city", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Email</Label>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="companyEmail"
                        type="email"
                        value={companySettings.email}
                        onChange={(e) => handleCompanySettingChange("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyPhone">Telefono</Label>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="companyPhone"
                        value={companySettings.phone}
                        onChange={(e) => handleCompanySettingChange("phone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Sito Web</Label>
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="companyWebsite"
                        value={companySettings.website}
                        onChange={(e) => handleCompanySettingChange("website", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyVat">Partita IVA</Label>
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="companyVat"
                        value={companySettings.vatNumber}
                        onChange={(e) => handleCompanySettingChange("vatNumber", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyFiscalCode">Codice Fiscale</Label>
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="companyFiscalCode"
                        value={companySettings.fiscalCode}
                        onChange={(e) => handleCompanySettingChange("fiscalCode", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyLogo">Logo Aziendale</Label>
                    <div className="flex items-center gap-4">
                      <img
                        src={companySettings.logo || "/placeholder.svg"}
                        alt="Logo aziendale"
                        className="w-24 h-24 object-contain border rounded-md"
                      />
                      <div className="flex-1">
                        <Input id="companyLogo" type="file" accept="image/*" onChange={handleLogoUpload} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Salva Informazioni Aziendali
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestione Utenti</CardTitle>
              <CardDescription>Gestisci il tuo profilo e gli utenti del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-4">Il Tuo Profilo</h3>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={userSettings.avatar} alt="Avatar" />
                      <AvatarFallback>{userSettings.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Input id="userAvatar" type="file" accept="image/*" onChange={handleAvatarUpload} />
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div className="space-y-2">
                      <Label htmlFor="userName">Nome Completo</Label>
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="userName"
                          value={userSettings.name}
                          onChange={(e) => handleUserSettingChange("name", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="userEmail">Email</Label>
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="userEmail"
                          type="email"
                          value={userSettings.email}
                          onChange={(e) => handleUserSettingChange("email", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="userRole">Ruolo</Label>
                      <div className="flex items-center">
                        <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Select
                          value={userSettings.role}
                          onValueChange={(value) => handleUserSettingChange("role", value)}
                        >
                          <SelectTrigger id="userRole">
                            <SelectValue placeholder="Seleziona ruolo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Amministratore">Amministratore</SelectItem>
                            <SelectItem value="Gestore">Gestore</SelectItem>
                            <SelectItem value="Tecnico">Tecnico</SelectItem>
                            <SelectItem value="Venditore">Venditore</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="userPassword">Cambia Password</Label>
                      <div className="flex items-center">
                        <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input id="userPassword" type="password" placeholder="Nuova password" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Altri Utenti</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>LR</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Luca Rossi</p>
                        <p className="text-sm text-muted-foreground">luca@belottimacchineagricole.it</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Tecnico</Badge>
                      <Button variant="outline" size="sm">
                        Modifica
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>PV</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Paolo Verdi</p>
                        <p className="text-sm text-muted-foreground">paolo@belottimacchineagricole.it</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Venditore</Badge>
                      <Button variant="outline" size="sm">
                        Modifica
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>MB</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Marco Bianchi</p>
                        <p className="text-sm text-muted-foreground">marco.bianchi@belottimacchineagricole.it</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Tecnico</Badge>
                      <Button variant="outline" size="sm">
                        Modifica
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    Aggiungi Nuovo Utente
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Salva Impostazioni Utenti
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni Notifiche</CardTitle>
              <CardDescription>Gestisci le preferenze di notifica</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Notifiche Email</Label>
                    <p className="text-sm text-muted-foreground">Ricevi notifiche via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(value) => handleNotificationSettingChange("emailNotifications", value)}
                  />
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">Preventivi</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="quoteCreated">Nuovo Preventivo</Label>
                      <Switch
                        id="quoteCreated"
                        checked={notificationSettings.quoteCreated}
                        onCheckedChange={(value) => handleNotificationSettingChange("quoteCreated", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="quoteAccepted">Preventivo Accettato</Label>
                      <Switch
                        id="quoteAccepted"
                        checked={notificationSettings.quoteAccepted}
                        onCheckedChange={(value) => handleNotificationSettingChange("quoteAccepted", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="quoteRejected">Preventivo Rifiutato</Label>
                      <Switch
                        id="quoteRejected"
                        checked={notificationSettings.quoteRejected}
                        onCheckedChange={(value) => handleNotificationSettingChange("quoteRejected", value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">Assistenza</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="serviceCreated">Nuova Assistenza</Label>
                      <Switch
                        id="serviceCreated"
                        checked={notificationSettings.serviceCreated}
                        onCheckedChange={(value) => handleNotificationSettingChange("serviceCreated", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="serviceCompleted">Assistenza Completata</Label>
                      <Switch
                        id="serviceCompleted"
                        checked={notificationSettings.serviceCompleted}
                        onCheckedChange={(value) => handleNotificationSettingChange("serviceCompleted", value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">Prodotti</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="lowStock">Scorta Bassa</Label>
                      <Switch
                        id="lowStock"
                        checked={notificationSettings.lowStock}
                        onCheckedChange={(value) => handleNotificationSettingChange("lowStock", value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">Riepiloghi</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="dailySummary">Riepilogo Giornaliero</Label>
                      <Switch
                        id="dailySummary"
                        checked={notificationSettings.dailySummary}
                        onCheckedChange={(value) => handleNotificationSettingChange("dailySummary", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="weeklySummary">Riepilogo Settimanale</Label>
                      <Switch
                        id="weeklySummary"
                        checked={notificationSettings.weeklySummary}
                        onCheckedChange={(value) => handleNotificationSettingChange("weeklySummary", value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Salva Impostazioni Notifiche
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni Template</CardTitle>
              <CardDescription>Personalizza i template per preventivi e assistenze</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultQuoteTemplate">Template Preventivi Predefinito</Label>
                  <Select
                    value={templateSettings.defaultQuoteTemplate}
                    onValueChange={(value) => handleTemplateSettingChange("defaultQuoteTemplate", value)}
                  >
                    <SelectTrigger id="defaultQuoteTemplate">
                      <SelectValue placeholder="Seleziona template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="template1">Template Belotti Macchine Agricole</SelectItem>
                      <SelectItem value="template2">Template Avant Tecno Italia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultServiceTemplate">Template Assistenze Predefinito</Label>
                  <Select
                    value={templateSettings.defaultServiceTemplate}
                    onValueChange={(value) => handleTemplateSettingChange("defaultServiceTemplate", value)}
                  >
                    <SelectTrigger id="defaultServiceTemplate">
                      <SelectValue placeholder="Seleziona template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="template1">Template Standard</SelectItem>
                      <SelectItem value="template2">Template Dettagliato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">Opzioni Template</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeVat">Includi IVA</Label>
                      <Switch
                        id="includeVat"
                        checked={templateSettings.includeVat}
                        onCheckedChange={(value) => handleTemplateSettingChange("includeVat", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeDiscount">Includi Sconti</Label>
                      <Switch
                        id="includeDiscount"
                        checked={templateSettings.includeDiscount}
                        onCheckedChange={(value) => handleTemplateSettingChange("includeDiscount", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeLogo">Includi Logo</Label>
                      <Switch
                        id="includeLogo"
                        checked={templateSettings.includeLogo}
                        onCheckedChange={(value) => handleTemplateSettingChange("includeLogo", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeSignature">Includi Firma</Label>
                      <Switch
                        id="includeSignature"
                        checked={templateSettings.includeSignature}
                        onCheckedChange={(value) => handleTemplateSettingChange("includeSignature", value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="footerText">Testo Piè di Pagina</Label>
                  <Textarea
                    id="footerText"
                    rows={3}
                    value={templateSettings.footerText}
                    onChange={(e) => handleTemplateSettingChange("footerText", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Salva Impostazioni Template
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Backup e Ripristino</CardTitle>
              <CardDescription>Gestisci i backup dei dati del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoBackup">Backup Automatico</Label>
                    <p className="text-sm text-muted-foreground">Crea backup automatici dei dati</p>
                  </div>
                  <Switch
                    id="autoBackup"
                    checked={backupSettings.autoBackup}
                    onCheckedChange={(value) => handleBackupSettingChange("autoBackup", value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Frequenza Backup</Label>
                  <Select
                    value={backupSettings.backupFrequency}
                    onValueChange={(value) => handleBackupSettingChange("backupFrequency", value)}
                  >
                    <SelectTrigger id="backupFrequency">
                      <SelectValue placeholder="Seleziona frequenza" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Giornaliera</SelectItem>
                      <SelectItem value="weekly">Settimanale</SelectItem>
                      <SelectItem value="monthly">Mensile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backupLocation">Posizione Backup</Label>
                  <Select
                    value={backupSettings.backupLocation}
                    onValueChange={(value) => handleBackupSettingChange("backupLocation", value)}
                  >
                    <SelectTrigger id="backupLocation">
                      <SelectValue placeholder="Seleziona posizione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Local">Locale</SelectItem>
                      <SelectItem value="Cloud (Google Drive)">Cloud (Google Drive)</SelectItem>
                      <SelectItem value="Cloud (Dropbox)">Cloud (Dropbox)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">Backup Manuale</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Ultimo Backup</p>
                        <p className="text-sm text-muted-foreground">{backupSettings.lastBackup}</p>
                      </div>
                      <Button onClick={handleCreateBackup}>
                        <Database className="mr-2 h-4 w-4" />
                        Crea Backup
                      </Button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <Button variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Scarica Backup
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Upload className="mr-2 h-4 w-4" />
                        Carica Backup
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Ripristina Backup
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Salva Impostazioni Backup
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

