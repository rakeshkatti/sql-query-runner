import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useDataset } from '@/contexts/DatasetContext'

export const DatasetSelector: React.FC = () => {
    const { allDatasets, selectedDataset, setSelectedDataset } = useDataset()

    return (
        <Select value={selectedDataset} onValueChange={setSelectedDataset}>
            <SelectTrigger className="w-48">
                <SelectValue placeholder="Select dataset" />
            </SelectTrigger>
            <SelectContent>
                {allDatasets.map(dataset => (
                    <SelectItem key={dataset.name} value={dataset.name}>
                        {dataset.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
