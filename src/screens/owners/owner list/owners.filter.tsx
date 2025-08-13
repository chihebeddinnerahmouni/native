import React, { useState } from "react";
import {
  FormActions,
  FormContainer,
} from "../../../components/ui/form/form-items.component";
import { FieldText } from "../../../components/ui/inputs/field-text/field-text.component";
import { SearchIcon } from "../../../icons";
import { useModal } from "../../../contexts";

interface OwnersFilterProps {
  initialFilters?: {
    name?: string;
  };
  onApplyFilters: (filters: { name?: string }) => void;
}

export const OwnersFilter: React.FC<OwnersFilterProps> = ({
  initialFilters = {},
  onApplyFilters,
}) => {
  const [name, setName] = useState(initialFilters.name || "");
  const { closeModal } = useModal();

  const handleApply = () => {
    onApplyFilters({
      name: name.trim() || undefined,
    });
    closeModal();
  };

  const handleClear = () => {
    setName("");
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

      <FormActions
        onPress={handleApply}
        isLoading={false}
        onCancelPress={handleClear}
      />
    </FormContainer>
  );
};
