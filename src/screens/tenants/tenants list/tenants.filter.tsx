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
import { TenantFilterDto } from "../../../backend/casaikos-api";

interface IProps {
  initialFilters?: TenantFilterDto;
  onApplyFilters: (filters: TenantFilterDto) => void;
}

export const TenantsFilter: React.FC<IProps> = ({
  initialFilters = {},
  onApplyFilters,
}) => {
  const [name, setName] = useState(initialFilters.name || "");
  const [cities, setCities] = useState<string[]>(initialFilters.cities || []);
  const { closeModal } = useModal();

  const handleApply = () => {
    onApplyFilters({
      name: name.trim() || undefined,
      cities: cities.length > 0 ? cities : undefined,
    });
    closeModal();
  };

  const handleClear = () => {
    setName("");
    setCities([]);
    onApplyFilters({
      name: undefined,
      cities: undefined,
    });
    closeModal();
  };

  return (
    <FormContainer>
      <FieldText
        type="search"
        placeholder="Search owners by name..."
        value={name}
        onChangeText={setName}
        startIcon={<SearchIcon />}
        label="Owner Name"
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
