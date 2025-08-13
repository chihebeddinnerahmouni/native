import React, { useState } from "react";
import {
  FormActions,
  FormContainer,
} from "../../../components/ui/form/form-items.component";
import { FieldText } from "../../../components/ui/inputs/field-text/field-text.component";
import { SearchIcon } from "../../../icons";
import { useModal } from "../../../contexts";
import { IOwnerFilter } from "./owners-list.page";
import { Select } from "../../../components/ui/inputs/select.component";
import { mockCities } from "../../../constants/data";

interface OwnersFilterProps {
  initialFilters?: IOwnerFilter;
  onApplyFilters: (filters: IOwnerFilter) => void;
}

export const OwnersFilter: React.FC<OwnersFilterProps> = ({
  initialFilters = {},
  onApplyFilters,
}) => {
  const [name, setName] = useState(initialFilters.name || "");
  const [cities, setCities] = useState<string | number>(
    initialFilters.cities || ""
  );
  const { closeModal } = useModal();

  const handleApply = () => {
    onApplyFilters({
      name: name.trim() || undefined,
      cities: cities ? String(cities) : undefined,
    });
    closeModal();
  };

  const handleClear = () => {
    setName("");
    setCities("");
    onApplyFilters({
      name: undefined,
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
      />
      <Select
        options={mockCities}
        value={cities}
        onChange={setCities}
        placeholder="Select cities..."
      />

      <FormActions
        onPress={handleApply}
        isLoading={false}
        onCancelPress={handleClear}
      />
    </FormContainer>
  );
};
