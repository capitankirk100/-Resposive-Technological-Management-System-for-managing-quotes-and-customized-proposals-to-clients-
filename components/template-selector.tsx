"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface TemplateSelectorProps {
  selectedTemplate: "template1" | "template2"
  onSelectTemplate: (template: "template1" | "template2") => void
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="font-medium">Seleziona Template</h3>
          <RadioGroup
            value={selectedTemplate}
            onValueChange={(value) => onSelectTemplate(value as "template1" | "template2")}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="template1" id="template1" />
              <Label htmlFor="template1">Template Belotti Macchine Agricole</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="template2" id="template2" />
              <Label htmlFor="template2">Template Avant Tecno Italia</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}

