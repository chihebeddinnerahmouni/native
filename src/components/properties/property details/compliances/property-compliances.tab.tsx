import React, { useMemo, useState } from "react";
import { CardComponent } from "../../../ui/cards/card.component";
import { Compliance } from "../../../../backend/casaikos-api";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { ActionHeader } from "../../../ui/action-header.component";
import colors from "../../../../constants/colors";
import { complianceTypes } from "../../../../utils/validators/compliance.validator";
import { ComplianceCard } from "./compliance.component";
import { TextBody } from "../../../ui/texts/Texts.component";
import { getTyp } from "../../../../utils";

type IProps = {
  compliances: Compliance[];
  propertyId: string;
};

export const CompliancesComponent = ({ compliances, propertyId }: IProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(complianceTypes);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(true);

  const toggleComplianceType = (type: string) => {
    if (isAllSelected) {
      setIsAllSelected(false);
      setSelectedTypes([type]);
    } else {
      setSelectedTypes((prev) => {
        if (prev.includes(type)) {
          return prev.filter((t) => t !== type);
        } else {
          return [...prev, type];
        }
      });
    }
  };

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedTypes([]);
      setIsAllSelected(false);
    } else {
      setSelectedTypes(complianceTypes);
      setIsAllSelected(true);
    }
  };

  const filteredTypes = useMemo(() => {
    return isAllSelected
      ? complianceTypes
      : complianceTypes.filter((type) => selectedTypes.includes(type));
  }, [isAllSelected, selectedTypes]);

  return (
    <>
      <CardComponent>
        <ActionHeader
          title="Compliances"
          styles={compliancesStyle.actionsHeader}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={compliancesStyle.horizontalScroll}
          contentContainerStyle={compliancesStyle.scrollContent}
        >
          <TouchableOpacity
            onPress={toggleAll}
            style={[
              compliancesStyle.typeChip,
              isAllSelected && compliancesStyle.typeChipSelected,
            ]}
          >
            <TextBody
              style={[
                compliancesStyle.typeChipText,
                isAllSelected && compliancesStyle.typeChipTextSelected,
              ]}
            >
              All
            </TextBody>
          </TouchableOpacity>

          {complianceTypes.map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => toggleComplianceType(type)}
              style={[
                compliancesStyle.typeChip,
                selectedTypes.includes(type) &&
                  !isAllSelected &&
                  compliancesStyle.typeChipSelected,
              ]}
            >
              <TextBody
                style={[
                  compliancesStyle.typeChipText,
                  selectedTypes.includes(type) &&
                    !isAllSelected &&
                    compliancesStyle.typeChipTextSelected,
                ]}
              >
                {getTyp(type).label}
              </TextBody>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={compliancesStyle.listContainer}>
          {filteredTypes.length > 0 || isAllSelected ? (
            filteredTypes.map((item) => {
              const compliance = compliances.find((c) => c.type === item);
              return (
                <ComplianceCard
                  key={item}
                  compliance={compliance ?? ({ type: item } as Compliance)}
                  propertyId={propertyId}
                />
              );
            })
          ) : (
            <View style={compliancesStyle.emptyState}>
              <TextBody style={compliancesStyle.emptyStateText}>
                No compliance types selected. Use the filters above to select
                types to display.
              </TextBody>
            </View>
          )}
        </View>
      </CardComponent>
    </>
  );
};

const compliancesStyle = StyleSheet.create({
  actionsHeader: {
    paddingBottom: 12,
    borderColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  listContainer: {
    marginTop: 12,
    gap: 12,
  },
  horizontalScroll: {
    flexGrow: 0,
    marginTop: 12,
  },
  scrollContent: {
    paddingRight: 16,
    gap: 8,
  },
  typeChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.bgColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  typeChipSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: "transparent",
  },
  typeChipText: {
    fontSize: 12,
    color: colors.textColor,
    fontWeight: "400",
  },
  typeChipTextSelected: {
    color: colors.primaryColor,
  },
  emptyState: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.emptyBgColor,
    borderRadius: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textColor2,
    textAlign: "center",
    lineHeight: 20,
  },
});
