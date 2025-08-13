/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { CalendarIcon, EditIcon, SandGlassIcon } from "../../../../icons";
import { Compliance } from "../../../../backend/casaikos-api";
import {
  formatDate,
  getComplianceStatus,
  getRemainingDays,
  getTyp,
} from "../../../../utils";
import { complianceTypes } from "../../../../utils/validators/compliance.validator";

type ComplianceGridProps = {
  compliances: Compliance[];
  //   complianceTypes: string[];
  //   editCompliance: (compliance: Compliance, type: string) => void;
  //   formatDate: (date: string) => string;
  //   getRemainingDays: (date: string) => number;
  //   getTyp: (type: string) => { label: string; icon: string };
  //   getComplianceStatus: (status?: string) => {
  //     label: string;
  //     className: string;
  //     emoji: string;
  //     badgeType: string;
  //   };
  style?: ViewStyle;
};

export const ComplianceGrid = ({
  compliances,
  //   complianceTypes,
  //   editCompliance,
  //   formatDate,
  //   getRemainingDays,
  //   getTyp,
  //   getComplianceStatus,
  style,
}: ComplianceGridProps) => {
  const renderComplianceCard = ({ item: type }: { item: string }) => {
    const compliance = compliances.find((c) => c.type === type);
    const complianceData = compliance || ({ type } as Compliance);

    const editCompliance = (compliance: Compliance, type: string) => {
      // Implement your edit compliance logic here
      console.log("Edit compliance:", compliance, "Type:", type);
    };

    return (
      <ComplianceCard
        compliance={complianceData}
        editCompliance={editCompliance}
        formatDate={formatDate}
        getRemainingDays={getRemainingDays}
        getTyp={getTyp}
        getComplianceStatus={getComplianceStatus}
      />
    );
  };

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={complianceTypes}
        renderItem={renderComplianceCard}
        keyExtractor={(item) => item}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const ComplianceCard = ({
  compliance,
  editCompliance,
  formatDate,
  getRemainingDays,
  getTyp,
  getComplianceStatus,
}: {
  compliance: Compliance;
  editCompliance: (compliance: Compliance, type: string) => void;
  formatDate: (date: string) => string;
  getRemainingDays: (date: string) => number;
  getTyp: (type: string) => { label: string; icon: string };
  getComplianceStatus: (status?: string) => {
    label: string;
    className: string;
    emoji: string;
    badgeType: string;
  };
}) => {
  const isEmpty = !compliance.endDate;
  const statusInfo = getComplianceStatus(compliance.status);
  const typeInfo = getTyp(compliance.type);

  return (
    <View style={[styles.card, isEmpty && styles.cardEmpty]}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.complianceType}>
          <Image
            source={{ uri: typeInfo.icon }}
            style={styles.typeIcon}
            resizeMode="cover"
          />
          <Text style={styles.typeLabel}>{typeInfo.label}</Text>
        </View>
        <View style={styles.complianceStatus}>
          <Text style={styles.statusEmoji}>{statusInfo.emoji}</Text>
          <Text
            style={[styles.statusLabel, (styles as any)[statusInfo.className]]}
          >
            {statusInfo.label}
          </Text>
        </View>
      </View>

      {/* Details */}
      <View style={styles.detailsContainer}>
        <InfoItem
          icon={<CalendarIcon size={16} color="#666" />}
          title="Valid Until"
          data={isEmpty ? "-" : formatDate(compliance.endDate!)}
        />
        <InfoItem
          icon={<SandGlassIcon size={16} color="#666" />}
          title="Remaining"
          data={isEmpty ? "-" : `${getRemainingDays(compliance.endDate!)} days`}
        />
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.editTitle}>Edit Compliance</Text>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => editCompliance(compliance, typeInfo.label)}
          activeOpacity={0.7}
        >
          <EditIcon size={16} color="#666" />
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
    <View style={styles.infoItem}>
      <View style={styles.infoTitle}>
        {icon && <View style={styles.infoIcon}>{icon}</View>}
        <Text style={styles.infoTitleText}>{title}</Text>
      </View>
      <Text style={styles.infoData}>{data ?? "-"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    padding: 8,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff", // var(--bg-color)
    borderWidth: 1,
    borderColor: "#e1e5e9", // var(--border-color)
    borderRadius: 8,
    padding: 12,
    gap: 12,
    marginHorizontal: 4,
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
    backgroundColor: "#f8f9fa", // var(--empty-bg-color)
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
    color: "#000", // var(--text-color)
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
  // Status color classes
  unknown: {
    color: "#666", // var(--text-color-2)
  },
  passed: {
    color: "#007AFF", // var(--primary-color)
  },
  warning: {
    color: "#ffcb00",
  },
  expired: {
    color: "#ff4d4f",
  },
  "issues-found": {
    color: "#666", // var(--text-color-2)
  },
  detailsContainer: {
    backgroundColor: "#f5f5f5", // var(--empty-bg-color-2)
    borderWidth: 1,
    borderColor: "#e1e5e9", // var(--border-color)
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
    color: "#666",
  },
  infoData: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5", // var(--empty-bg-color-2)
    borderWidth: 1,
    borderColor: "#e1e5e9", // var(--border-color)
    borderRadius: 8,
    padding: 8,
  },
  editTitle: {
    fontSize: 14,
    color: "#000", // var(--text-color)
  },
  actionIcon: {
    padding: 4,
  },
});
