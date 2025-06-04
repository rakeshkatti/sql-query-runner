import React, {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from 'react'
import { type Dataset, datasets } from '@/data/sampleData'

interface DatasetContextType {
    selectedDataset: string
    setSelectedDataset: (datasetName: string) => void
    currentDataset: Dataset | undefined
    allDatasets: Dataset[]
}

const DatasetContext = createContext<DatasetContextType | undefined>(undefined)

interface DatasetProviderProps {
    children: ReactNode
}

export const DatasetProvider: React.FC<DatasetProviderProps> = ({
    children,
}) => {
    const [selectedDataset, setSelectedDataset] = useState('employees')

    const currentDataset = datasets.find(d => d.name === selectedDataset)

    return (
        <DatasetContext.Provider
            value={{
                selectedDataset,
                setSelectedDataset,
                currentDataset,
                allDatasets: datasets,
            }}
        >
            {children}
        </DatasetContext.Provider>
    )
}

export const useDataset = () => {
    const context = useContext(DatasetContext)
    if (context === undefined) {
        throw new Error('useDataset must be used within a DatasetProvider')
    }
    return context
}
