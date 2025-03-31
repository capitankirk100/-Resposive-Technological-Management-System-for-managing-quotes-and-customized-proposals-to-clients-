import type { QuoteData } from "./quote-generator"
import Image from "next/image"

interface QuotePreviewProps {
  quoteData: QuoteData
  totals: {
    subtotal: number
    standardDiscountAmount: number
    extraDiscountAmount: number
    objectiveDiscountAmount: number
    netTotal: number
    vat: number
    totalWithVat: number
  }
  templateType: "template1" | "template2"
}

export default function QuotePreview({ quoteData, totals, templateType }: QuotePreviewProps) {
  if (templateType === "template1") {
    return (
      <div className="font-sans text-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <Image
              src={quoteData.companyLogo || "/placeholder.svg"}
              alt="Logo aziendale"
              width={200}
              height={100}
              className="mb-2"
            />
            <h1 className="text-xl font-bold">BELOTTI MACCHINE AGRICOLE</h1>
            <p>VIA SALETTI 3/F</p>
            <p>25040 - PLEMO DI ESINE (BS)</p>
            <p>Email: c39@me.com - Tel: 3462332866</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">PROPOSTA ORDINE</h2>
            <p>Data: {quoteData.quoteDate}</p>
            <p>N° {quoteData.quoteNumber}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold border-b-2 border-gray-300 pb-1 mb-2">CLIENTE</h3>
          <p className="font-bold">{quoteData.clientName}</p>
          <p>{quoteData.clientAddress}</p>
          <p>{quoteData.clientCity}</p>
          <p>
            Email: {quoteData.clientEmail} - Tel: {quoteData.clientPhone}
          </p>
          <p>
            P.IVA: {quoteData.clientVAT} - C.F.: {quoteData.clientFiscalCode}
          </p>
        </div>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Quantità</th>
              <th className="border border-gray-300 p-2 text-left">Codice</th>
              <th className="border border-gray-300 p-2 text-left">Descrizione</th>
              <th className="border border-gray-300 p-2 text-right">Prezzo unitario</th>
              <th className="border border-gray-300 p-2 text-right">Totale</th>
            </tr>
          </thead>
          <tbody>
            {quoteData.items.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2">{item.quantity}</td>
                <td className="border border-gray-300 p-2">{item.code}</td>
                <td className="border border-gray-300 p-2">{item.description}</td>
                <td className="border border-gray-300 p-2 text-right">{item.unitPrice.toFixed(2)}€</td>
                <td className="border border-gray-300 p-2 text-right">{item.total.toFixed(2)}€</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mb-6">
          <div className="w-1/2">
            <h3 className="font-bold border-b-2 border-gray-300 pb-1 mb-2">DETTAGLI</h3>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-1">Data Richiesta:</td>
                  <td className="py-1">{quoteData.deliveryDate}</td>
                </tr>
                <tr>
                  <td className="py-1">Pagamento:</td>
                  <td className="py-1">{quoteData.paymentMethod}</td>
                </tr>
                <tr>
                  <td className="py-1">Sconto Standard:</td>
                  <td className="py-1">{quoteData.standardDiscount}%</td>
                </tr>
                <tr>
                  <td className="py-1">Sconto extra:</td>
                  <td className="py-1">
                    {quoteData.extraDiscount}% {quoteData.campaignName}
                  </td>
                </tr>
                <tr>
                  <td className="py-1">Sconto Obiettivo:</td>
                  <td className="py-1">{quoteData.objectiveDiscount.toFixed(2)}€</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-1/2 pl-4">
            <h3 className="font-bold border-b-2 border-gray-300 pb-1 mb-2">RIEPILOGO</h3>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-1">Prezzo totale di listino:</td>
                  <td className="py-1 text-right">{totals.subtotal.toFixed(2)}€</td>
                </tr>
                <tr>
                  <td className="py-1">Sconto Standard {quoteData.standardDiscount}%:</td>
                  <td className="py-1 text-right">-{totals.standardDiscountAmount.toFixed(2)}€</td>
                </tr>
                <tr>
                  <td className="py-1">Sconto extra {quoteData.extraDiscount}%:</td>
                  <td className="py-1 text-right">-{totals.extraDiscountAmount.toFixed(2)}€</td>
                </tr>
                <tr>
                  <td className="py-1">Sconto Obiettivo:</td>
                  <td className="py-1 text-right">-{totals.objectiveDiscountAmount.toFixed(2)}€</td>
                </tr>
                <tr className="font-bold">
                  <td className="py-1">Prezzo Netto:</td>
                  <td className="py-1 text-right">{totals.netTotal.toFixed(2)}€</td>
                </tr>
                <tr>
                  <td className="py-1">IVA 22%:</td>
                  <td className="py-1 text-right">{totals.vat.toFixed(2)}€</td>
                </tr>
                <tr className="font-bold text-lg">
                  <td className="py-1">Totale ivato:</td>
                  <td className="py-1 text-right">{totals.totalWithVat.toFixed(2)}€</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold border-b-2 border-gray-300 pb-1 mb-2">NOTE</h3>
          <p className="whitespace-pre-line">{quoteData.notes}</p>
        </div>

        <div className="flex justify-between mt-10">
          <div className="w-1/3 border-t-2 border-gray-300 pt-1 text-center">
            <p>Firma Concessionario</p>
          </div>
          <div className="w-1/3 border-t-2 border-gray-300 pt-1 text-center">
            <p>Timbro</p>
          </div>
        </div>
      </div>
    )
  } else {
    // Template 2 (Avant Tecno Italia style)
    return (
      <div className="font-sans text-sm">
        <div className="flex justify-between items-start mb-6 border-b-2 border-gray-300 pb-4">
          <div>
            <Image
              src={quoteData.companyLogo || "/placeholder.svg"}
              alt="Logo aziendale"
              width={200}
              height={100}
              className="mb-2"
            />
            <h1 height={100} className="mb-2" />
            <h1 className="text-xl font-bold">BELOTTI MACCHINE AGRICOLE</h1>
            <p>Via Copernico 13/A - 39100 BOLZANO</p>
            <p>P. Iva IT01752500213 - Cod. fisc. 01752500213</p>
            <p>Tel. 0471 20 26 51 - E-Mail: info@minipale.it</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">PREVENTIVO / ANGEBOT</h2>
            <p>
              N° {quoteData.quoteNumber} del/vom {quoteData.quoteDate}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between">
            <div className="w-1/2">
              <h3 className="font-bold mb-2">Cliente / Kunde</h3>
              <p className="font-bold">{quoteData.clientName}</p>
              <p>{quoteData.clientAddress}</p>
              <p>{quoteData.clientCity}</p>
            </div>
            <div className="w-1/2">
              <h3 className="font-bold mb-2">Destinazione / Bestimmungsort</h3>
              <p>{quoteData.clientAddress}</p>
              <p>{quoteData.clientCity}</p>
              <p>
                P.IVA: {quoteData.clientVAT} - C.F.: {quoteData.clientFiscalCode}
              </p>
            </div>
          </div>
        </div>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">
                Codice
                <br />
                Kodex
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Descrizione
                <br />
                Beschreibung
              </th>
              <th className="border border-gray-300 p-2 text-center">
                UM
                <br />
                ME
              </th>
              <th className="border border-gray-300 p-2 text-center">
                Qt
                <br />
                Menge
              </th>
              <th className="border border-gray-300 p-2 text-right">
                Prezzo €<br />
                Preis €
              </th>
              <th className="border border-gray-300 p-2 text-center">
                %<br />%
              </th>
              <th className="border border-gray-300 p-2 text-right">
                Importo €<br />
                Betrag €
              </th>
            </tr>
          </thead>
          <tbody>
            {quoteData.items.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2">{item.code}</td>
                <td className="border border-gray-300 p-2">{item.description}</td>
                <td className="border border-gray-300 p-2 text-center">NR</td>
                <td className="border border-gray-300 p-2 text-center">{item.quantity}</td>
                <td className="border border-gray-300 p-2 text-right">{item.unitPrice.toFixed(2)}</td>
                <td className="border border-gray-300 p-2 text-center">22</td>
                <td className="border border-gray-300 p-2 text-right">{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-6">
          <table className="w-1/2 border-collapse">
            <tbody>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">
                  Cod.
                  <br />
                  Kod.
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Aliquota IVA
                  <br />% MWSt.
                </th>
                <th className="border border-gray-300 p-2 text-right">
                  Imponibile €<br />
                  Steuergrundlage €
                </th>
                <th className="border border-gray-300 p-2 text-right">
                  Importo IVA €<br />
                  MWSt. Betrag €
                </th>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">IVA 22%</td>
                <td className="border border-gray-300 p-2">22</td>
                <td className="border border-gray-300 p-2 text-right">{totals.netTotal.toFixed(2)}</td>
                <td className="border border-gray-300 p-2 text-right">{totals.vat.toFixed(2)}</td>
              </tr>
              <tr className="font-bold">
                <td className="border border-gray-300 p-2 text-right" colSpan={2}>
                  TOTALI/SUMMEN
                </td>
                <td className="border border-gray-300 p-2 text-right">{totals.netTotal.toFixed(2)}</td>
                <td className="border border-gray-300 p-2 text-right">{totals.vat.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-right mb-6">
          <p className="text-xl font-bold">€ {totals.totalWithVat.toFixed(2)}</p>
        </div>

        <div className="mb-6">
          <p className="whitespace-pre-line">{quoteData.notes}</p>
          <p className="mt-4">Validità offerta 30 gg - Gültigkeit des Angebots 30 Tage</p>
        </div>
      </div>
    )
  }
}

