import React from "react";
import { Target } from "../../../../backend/casaikos-api";
import { StyleSheet, View } from "react-native";
import colors from "../../../../constants/colors";
import { TouchableOpacity, ViewStyle } from "react-native";
import { EditIcon, DeleteIcon, WalletIcon } from "../../../../icons";
import { formatCurrency } from "../../../../utils";
import { TextBody } from "../../../ui/texts/Texts.component";
import { useModal } from "../../../../contexts";
import { TargetsForm } from "../../../forms/property/targets.form";
import { useConfirmationAlert } from "../../../../hooks/useConfirmationAlert";
import { useTargetsMutation } from "../../../../api-query/hooks";
import ConfirmationModal from "../../../ui/modal/ConfirmationModal";

type TargetCardProps = {
  target: Target;
  propertyId: string;
  style?: ViewStyle;
};

export const TargetCard = ({ target, style, propertyId }: TargetCardProps) => {
  const { openModal, closeModal } = useModal();
  const { deleteTarget } = useTargetsMutation();
  const { showConfirmationAlert, modalState, hideModal } =
    useConfirmationAlert();
  const monthLabel = new Date(
    target.yearNumber,
    target.monthNumber - 1
  ).toLocaleString("default", {
    month: "long",
  });

  const onClickUpdate = (target: Target) => {
    openModal({
      title: "Update Target",
      component: (
        <TargetsForm
          propertyId={propertyId}
          onDismiss={() => {
            closeModal();
          }}
          selectedTarget={target}
        />
      ),
    });
  };

  const onClickDeleteConfirm = (target: Target) => {
    showConfirmationAlert({
      title: "Delete Target",
      message: "Are you sure you want to delete this target?",
      onConfirm: async () => {
        await deleteTarget(target._id);
      },
    });
  };

  return (
    <View style={[styles.targetItem, style]}>
      <View style={styles.targetItemHeader}>
        <TextBody style={styles.monthYearText}>
          {monthLabel} {target.yearNumber}
        </TextBody>
        <View style={styles.actionItems}>
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={() => onClickUpdate(target)}
            activeOpacity={0.7}
          >
            <EditIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={() => onClickDeleteConfirm(target)}
            activeOpacity={0.7}
          >
            <DeleteIcon />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.targetItemPrice}>
        <WalletIcon color={colors.primaryColor} />
        <TextBody style={styles.priceText}>
          {formatCurrency(target.value)}
        </TextBody>
      </View>

      <View style={styles.targetItemDiscountsContainer}>
        <TouchableOpacity style={styles.targetItemDiscount} activeOpacity={0.8}>
          <TextBody style={styles.discountTitle}>Weekly discount</TextBody>
          <View style={[styles.discountValue, styles.weeklyDiscount]}>
            <TextBody style={styles.weeklyDiscountText}>
              {target.weeklyDiscount ? `${target.weeklyDiscount}%` : "-"}
            </TextBody>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.targetItemDiscount} activeOpacity={0.8}>
          <TextBody style={styles.discountTitle}>Monthly discount</TextBody>
          <View style={[styles.discountValue, styles.monthlyDiscount]}>
            <TextBody style={styles.monthlyDiscountText}>
              {target.monthlyDiscount ? `${target.monthlyDiscount}%` : "-"}
            </TextBody>
          </View>
        </TouchableOpacity>
      </View>
      {modalState.visible && modalState.config && (
        <ConfirmationModal
          visible={modalState.visible}
          title={modalState.config.title}
          message={modalState.config.message}
          confirmText={modalState.config.confirmText}
          cancelText={modalState.config.cancelText}
          onConfirm={modalState.config.onConfirm}
          onCancel={() => {
            modalState.config?.onCancel?.();
            hideModal();
          }}
          loadingText={modalState.config.loadingText}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  targetItem: {
    backgroundColor: colors.bgColor,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    padding: 8,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 0.5,
  },
  targetItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  monthYearText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textColor,
  },
  actionItems: {
    flexDirection: "row",
    gap: 8,
  },
  actionIcon: {
    padding: 4,
  },
  targetItemPrice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  priceText: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.primaryColor,
  },
  targetItemDiscountsContainer: {
    flexDirection: "column",
    gap: 8,
    marginTop: 30,
  },
  targetItemDiscount: {
    backgroundColor: colors.emptyBgColor,
    padding: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    flex: 1,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  discountTitle: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.textColor,
  },
  discountValue: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  weeklyDiscount: {
    backgroundColor: "rgba(250, 43, 55, 0.1)",
  },
  weeklyDiscountText: {
    color: colors.errorColor,
    fontSize: 12,
    fontWeight: "500",
  },
  monthlyDiscount: {
    backgroundColor: "rgba(61, 148, 86, 0.1)",
  },
  monthlyDiscountText: {
    color: colors.successColor,
    fontSize: 12,
    fontWeight: "500",
  },
});
