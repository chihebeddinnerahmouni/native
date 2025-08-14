import React, { useState } from "react";
import {
  FormActions,
  FormContainer,
} from "../../../components/ui/form/form-items.component";
import { FieldText } from "../../../components/ui/inputs/field-text/field-text.component";
import { SearchIcon } from "../../../icons";
import { useModal } from "../../../contexts";
import { MultiSelect } from "../../../components/ui/inputs/multi-select.component";
import { mockCities } from "../../../constants/data";
import { PropertyFilterDto } from "../../../backend/casaikos-api";

interface IProps {
  initialFilters?: PropertyFilterDto;
  onApplyFilters: (filters: PropertyFilterDto) => void;
}

export const PropertiesFilter: React.FC<IProps> = ({
  initialFilters = {},
  onApplyFilters,
}) => {
  const [title, setTitle] = useState(initialFilters.title || "");
  const [cities, setCities] = useState<string[]>(initialFilters.cities || []);
  const { closeModal } = useModal();

  const handleApply = () => {
    onApplyFilters({
      title: title.trim() || undefined,
      cities: cities.length > 0 ? cities : undefined,
    });
    closeModal();
  };

  const handleClear = () => {
    setTitle("");
    setCities([]);
    onApplyFilters({
      title: undefined,
      cities: undefined,
    });
    closeModal();
  };

  return (
    <FormContainer>
      <FieldText
        type="search"
        placeholder="Search properties by title..."
        value={title}
        onChangeText={setTitle}
        startIcon={<SearchIcon />}
        label="Property Title"
      />
      <MultiSelect
        label="Cities"
        placeholder="Select cities..."
        options={mockCities}
        value={cities}
        onChange={(values) => setCities(values as string[])}
        searchable={true}
        maxSelectedDisplay={2}
      />

      <FormActions
        cancelText="Clear Filters"
        onPress={handleApply}
        isLoading={false}
        onCancelPress={handleClear}
      />
    </FormContainer>
  );
};
