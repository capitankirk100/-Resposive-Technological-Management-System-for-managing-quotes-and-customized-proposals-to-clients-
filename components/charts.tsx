"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

// Registra tutti i componenti di Chart.js
Chart.register(...registerables)

// Dati di esempio per i grafici quando non vengono forniti dati
const defaultBarData = [
  { month: "Gen", value: 12000 },
  { month: "Feb", value: 19000 },
  { month: "Mar", value: 15000 },
  { month: "Apr", value: 22000 },
  { month: "Mag", value: 18000 },
  { month: "Giu", value: 25000 },
]

const defaultPieData = [
  { name: "Sviluppo Web", value: 40 },
  { name: "App Mobile", value: 25 },
  { name: "E-commerce", value: 20 },
  { name: "Consulenza", value: 15 },
]

const defaultLineData = [
  { date: "Lun", value: 10 },
  { date: "Mar", value: 15 },
  { date: "Mer", value: 8 },
  { date: "Gio", value: 12 },
  { date: "Ven", value: 20 },
  { date: "Sab", value: 5 },
  { date: "Dom", value: 2 },
]

interface BarChartProps {
  data?: any[]
  xField?: string
  yFields?: string[]
  yFieldNames?: string[]
  colors?: string[]
  yAxisLabel?: string
  horizontal?: boolean
}

export function BarChart({
  data = defaultBarData,
  xField = "month",
  yFields = ["value"],
  yFieldNames = ["Valore"],
  colors = ["#3b82f6"],
  yAxisLabel = "Valore",
  horizontal = false,
}: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Distruggi il grafico esistente se presente
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: horizontal ? "bar" : "line",
      data: {
        labels: data.map((item) => item[xField]),
        datasets: yFields.map((yField, index) => ({
          label: yFieldNames[index],
          data: data.map((item) => item[yField]),
          backgroundColor: colors[index],
          borderColor: colors[index],
          borderWidth: 2,
          tension: 0.4,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: !horizontal,
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            stacked: !horizontal,
            title: {
              display: true,
              text: yAxisLabel,
            },
            grid: {
              color: "#e5e7eb",
            },
          },
        },
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || ""
                if (label) {
                  label += ": "
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y
                }
                return label
              },
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, xField, yFields, yFieldNames, colors, yAxisLabel, horizontal])

  return <canvas ref={chartRef} />
}

interface LineChartProps {
  data?: any[]
  xField?: string
  yField?: string
  color?: string
  yAxisLabel?: string
}

export function LineChart({
  data = defaultLineData,
  xField = "date",
  yField = "value",
  color = "#3b82f6",
  yAxisLabel = "Attività",
}: LineChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Distruggi il grafico esistente se presente
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((item) => item[xField]),
        datasets: [
          {
            label: "Attività",
            data: data.map((item) => item[yField]),
            borderColor: color,
            backgroundColor: color + "10",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || ""
                if (label) {
                  label += ": "
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y
                }
                return label
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "#e5e7eb",
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, xField, yField, color, yAxisLabel])

  return <canvas ref={chartRef} />
}

interface PieChartProps {
  data?: { name: string; value: number; color?: string }[]
  nameField?: string
  valueField?: string
  colors?: string[]
}

export function PieChart({
  data = defaultPieData,
  nameField = "name",
  valueField = "value",
  colors = ["#3b82f6", "#22c55e", "#eab308", "#ef4444", "#8b5cf6"],
}: PieChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Distruggi il grafico esistente se presente
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map((item) => item[nameField]),
        datasets: [
          {
            data: data.map((item) => item[valueField]),
            backgroundColor: colors,
            borderColor: "#ffffff",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
                const percentage = Math.round(((value as number) / total) * 100)
                return `${label}: ${value} (${percentage}%)`
              },
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, nameField, valueField, colors])

  return <canvas ref={chartRef} />
}

