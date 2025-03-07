"use client"

import { memo, useCallback, useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { isToday } from "date-fns"
import { Box, Icon, Surface, Text } from "@/components/ui"
import AlegriaSVG from "@/assets/icons/alegria.svg"
import AlegriaUnselectedSVG from "@/assets/icons/alegria-unselected.svg"
import MedoSVG from "@/assets/icons/medo.svg"
import MedoUnselectedSVG from "@/assets/icons/medo-unselected.svg"
import CalmaSVG from "@/assets/icons/calma.svg"
import CalmaUnselectedSVG from "@/assets/icons/calma-unselected.svg"
import AnsiedadeSVG from "@/assets/icons/ansiedade.svg"
import AnsiedadeUnselectedSVG from "@/assets/icons/ansiedade-unselected.svg"
import RaivaSVG from "@/assets/icons/raiva.svg"
import RaivaUnselectedSVG from "@/assets/icons/raiva-unselected.svg"
import TristezaSVG from "@/assets/icons/tristeza.svg"
import TristezaUnselectedSVG from "@/assets/icons/tristeza-unselected.svg"

// Constants
const MOOD_KEY = "@lastMoodSelection"

// Types
type MoodType = {
  name: string
  selected: JSX.Element
  unselected: JSX.Element
}

type MoodRecord = Record<string, MoodType>

type Props = {
  goToRelatorio: () => void
  onMoodSelect?: (mood: string) => void
}

// Move this outside the component to prevent recreation on each render
const moodIcons: MoodRecord = {
  Alegria: { name: "Alegria", selected: <AlegriaSVG />, unselected: <AlegriaUnselectedSVG /> },
  Medo: { name: "Medo", selected: <MedoSVG />, unselected: <MedoUnselectedSVG /> },
  Calma: { name: "Calma", selected: <CalmaSVG />, unselected: <CalmaUnselectedSVG /> },
  Ansiedade: {
    name: "Ansiedade",
    selected: <AnsiedadeSVG />,
    unselected: <AnsiedadeUnselectedSVG />,
  },
  Raiva: { name: "Raiva", selected: <RaivaSVG />, unselected: <RaivaUnselectedSVG /> },
  Tristeza: {
    name: "Tristeza",
    selected: <TristezaSVG />,
    unselected: <TristezaUnselectedSVG />,
  },
}

const moodIconsArray = Object.entries(moodIcons)

export const DailyMoodCard = memo(({ goToRelatorio, onMoodSelect }: Props) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [isMoodSelected, setIsMoodSelected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load saved mood on component mount
  useEffect(() => {
    const checkMoodSelection = async () => {
      try {
        setIsLoading(true)
        const storedDataMood = await AsyncStorage.getItem(MOOD_KEY)

        if (storedDataMood) {
          const savedDate = new Date(storedDataMood.split("|")[0])
          const savedMood = storedDataMood.split("|")[1]

          if (isToday(savedDate)) {
            setIsMoodSelected(true)
            setSelectedMood(savedMood)
          }
        }
      } catch (error) {
        console.error("Erro ao verificar seleção de emoção:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkMoodSelection()

    // No cleanup needed for AsyncStorage operations
  }, [])

  const handleSelectMood = useCallback(
    async (mood: string) => {
      if (isMoodSelected || isLoading) return

      try {
        const currentDate = new Date()
        // Store both date and mood value
        const valueToStore = `${currentDate.toISOString()}|${mood}`
        await AsyncStorage.setItem(MOOD_KEY, valueToStore)

        setSelectedMood(mood)
        setIsMoodSelected(true)

        // Call optional callback if provided
        onMoodSelect?.(mood)
      } catch (error) {
        console.error("Erro ao salvar seleção:", error)
        // Could add user-facing error handling here
      }
    },
    [isMoodSelected, isLoading, onMoodSelect],
  )

  // Render mood icon based on selection state
  const renderMoodIcon = useCallback(
    (key: string, mood: MoodType) => {
      const isSelected = selectedMood === key
      const shouldShowSelected = selectedMood === null || isSelected
      return shouldShowSelected ? mood.selected : mood.unselected
    },
    [selectedMood],
  )

  if (isLoading) {
    return (
      <Surface p="sm">
        <Text>Carregando...</Text>
      </Surface>
    )
  }

  return (
    <Surface p="sm">
      <Box flexDirection="row" justifyContent="space-between" alignItems="flex-start">
        <Text fontFamily="Inter_600SemiBold" lineHeight={17.5}>
          Qual emoção você está {"\n"}sentindo hoje?
        </Text>
        <Surface
          flexDirection="row"
          alignItems="center"
          preset="box"
          onPress={goToRelatorio}
          accessible={true}
          accessibilityLabel="Ver relatório de emoções"
          accessibilityRole="button"
        >
          <Text fontFamily="Inter_600SemiBold" color="accent" fontSize={"sm"}>
            Ver relatório
          </Text>
          <Icon name="chevronRight" width={20} height={20} color="accent" />
        </Surface>
      </Box>

      <Box my="md" flexDirection="row" justifyContent="space-around">
        {moodIconsArray.map(([key, mood]) => (
          <TouchableOpacity
            key={key}
            onPress={() => handleSelectMood(key)}
            disabled={isMoodSelected}
            accessible={true}
            accessibilityLabel={`Selecionar emoção ${mood.name}`}
            accessibilityRole="button"
            accessibilityState={{ selected: selectedMood === key }}
          >
            <DailyMoodCardItem
              nameMood={mood.name}
              IconMood={renderMoodIcon(key, mood)}
              isSelected={selectedMood === key}
            />
          </TouchableOpacity>
        ))}
      </Box>

      <Box flexDirection="row" alignItems="center">
        <Icon name="info" width={16} height={16} color="medium_default" />
        <Text fontFamily="Inter_400Regular" fontSize={10} ml="2xs">
          Nenhum dado pessoal será coletado nesta pesquisa.
        </Text>
      </Box>
    </Surface>
  )
})

// Assuming this component exists in your codebase
type DailyMoodCardItemProps = {
  nameMood: string
  IconMood: JSX.Element
  isSelected?: boolean
}

const DailyMoodCardItem = ({ nameMood, IconMood, isSelected }: DailyMoodCardItemProps) => (
  <Box alignItems="center">
    {IconMood}
    <Text fontFamily="Inter_500Medium" fontSize={12} mt="2xs" style={isSelected ? { fontWeight: "bold" } : undefined}>
      {nameMood}
    </Text>
  </Box>
)

