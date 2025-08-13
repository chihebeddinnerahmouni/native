/* eslint-disable react-native/no-unused-styles */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { CalendarIcon, EditIcon, SandGlassIcon } from "../../../../icons";
import { Compliance } from "../../../../backend/casaikos-api";
import {
  formatDate,
  getComplianceStatus,
  getRemainingDays,
  getTyp,
} from "../../../../utils";
import colors from "../../../../constants/colors";
import { TextBody } from "../../../ui/texts/Texts.component";
import { useModal } from "../../../../contexts";
import { ComplianceForm } from "../../../forms/property/compliance-form.component";

export const ComplianceCard = ({
  compliance,
  propertyId,
}: {
  compliance: Compliance;
  propertyId: string;
}) => {
  const isEmpty = !compliance.endDate;
  const statusInfo = getComplianceStatus(compliance.status);
  const typeInfo = getTyp(compliance.type);
  const { openModal, closeModal } = useModal();

  const editCompliance = (compliance: Compliance, type: string) => {
    openModal({
      title: "Edit" + " " + type,
      component: (
        <ComplianceForm
          selectedCompliance={compliance}
          onSuccess={() => {
            closeModal();
          }}
          propertyId={propertyId}
        />
      ),
    });
  };

  return (
    <View
      style={[
        complianceCardStyles.card,
        isEmpty && complianceCardStyles.cardEmpty,
      ]}
    >
      <View style={complianceCardStyles.cardHeader}>
        <View style={complianceCardStyles.complianceType}>
          <Image
            source={typeInfo.icon}
            style={complianceCardStyles.typeIcon}
            resizeMode="cover"
          />
          <TextBody style={complianceCardStyles.typeLabel}>
            {typeInfo.label}
          </TextBody>
        </View>
        <View style={complianceCardStyles.complianceStatus}>
          <TextBody style={complianceCardStyles.statusEmoji}>
            {statusInfo.emoji}
          </TextBody>
          <TextBody
            style={[
              complianceCardStyles.statusLabel,
              (complianceCardStyles as any)[statusInfo.className],
            ]}
          >
            {statusInfo.label}
          </TextBody>
        </View>
      </View>

      <View style={complianceCardStyles.detailsContainer}>
        <InfoItem
          icon={<CalendarIcon size={16} color={colors.textColor2} />}
          title="Valid Until"
          data={isEmpty ? "-" : formatDate(compliance.endDate!)}
        />
        <InfoItem
          icon={<SandGlassIcon size={16} color={colors.textColor2} />}
          title="Remaining"
          data={isEmpty ? "-" : `${getRemainingDays(compliance.endDate!)} days`}
        />
      </View>

      <View style={complianceCardStyles.actionsContainer}>
        <TextBody style={complianceCardStyles.editTitle}>
          Edit Compliance
        </TextBody>
        <TouchableOpacity
          style={complianceCardStyles.actionIcon}
          onPress={() => editCompliance(compliance, typeInfo.label)}
          activeOpacity={0.7}
        >
          <EditIcon size={16} color={colors.textColor2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InfoItem = ({
  icon,
  title,
  data,
}: {
  icon?: React.ReactNode;
  title: string;
  data: string | number;
}) => {
  return (
    <View style={complianceCardStyles.infoItem}>
      <View style={complianceCardStyles.infoTitle}>
        {icon && <View style={complianceCardStyles.infoIcon}>{icon}</View>}
        <TextBody style={complianceCardStyles.infoTitleText}>{title}</TextBody>
      </View>
      <TextBody style={complianceCardStyles.infoData}>{data ?? "-"}</TextBody>
    </View>
  );
};

const complianceCardStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.bgColor,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    padding: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  cardEmpty: {
    backgroundColor: colors.emptyBgColor,
    shadowOpacity: 0,
    elevation: 0,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  complianceType: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  typeIcon: {
    width: 20,
    height: 20,
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textColor,
    flexShrink: 1,
  },
  complianceStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusEmoji: {
    fontSize: 14,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  unknown: {
    color: colors.textColor2,
  },
  passed: {
    color: colors.primaryColor,
  },
  warning: {
    color: colors.warningColor,
  },
  expired: {
    color: colors.errorColor,
  },
  "issues-found": {
    color: colors.textColor2,
  },
  detailsContainer: {
    backgroundColor: colors.emptyBgColor2,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    padding: 8,
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoIcon: {
    // Icon container styling if needed
  },
  infoTitleText: {
    fontSize: 13,
    color: colors.textColor2,
  },
  infoData: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textColor,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.emptyBgColor2,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    padding: 8,
  },
  editTitle: {
    fontSize: 14,
    color: colors.textColor,
  },
  actionIcon: {
    padding: 4,
  },
});
