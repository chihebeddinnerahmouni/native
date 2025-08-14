/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Tenant } from "../../../backend/casaikos-api";
import { DotsIcon, EmailIcon, LocationIcon, PhoneIcon } from "../../../icons";
import { Badge } from "../badge.component";
import { TextBody } from "../texts/Texts.component";
import colors from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { ETabs, EScreens, ERoute } from "../../../utils";
import { CardComponent } from "./card.component";
import { InfoComp } from "../info.component";
import { useActionSheet, useConfirm } from "../../../hooks";
import { useModal } from "../../../contexts";
import { useTenantMutation } from "../../../api-query/hooks";
import { TenantsForm } from "../../forms";

interface IProps {
  tenant: Tenant;
}

export const TenantCard = ({ tenant }: IProps) => {
  const navigator = useNavigation();
  const { showActionSheet } = useActionSheet();
  const { openModal, closeModal } = useModal();
  const { showConfirmation } = useConfirm();
  const { deleteTenant } = useTenantMutation();

  const navigationHandle = () => {
    (navigator as any).navigate(ETabs.MAIN, {
      screen: EScreens.TENANTS,
      params: {
        screen: ERoute.TENANTS_DETAILS,
        params: { tenantId: tenant._id },
      },
    });
  };

  const handleOptionsPress = () => {
    showActionSheet({
      title: "Property Options",
      message: `What would you like to do with ${tenant.firstName} ${tenant.lastName}?`,
      options: [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {},
        },
        {
          text: "Edit",
          style: "default",
          onPress: () => {
            openModal({
              title: "Update Tenant",
              component: (
                <TenantsForm selectedOwner={tenant} closeModal={closeModal} />
              ),
            });
          },
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            showConfirmation({
              title: "Delete Tenant",
              message: `Are you sure you want to delete ${tenant.firstName} ${tenant.lastName}?`,
              onConfirm: () => deleteTenant(tenant),
            });
          },
        },
      ],
    });
  };

  return (
    <CardComponent>
      <TouchableOpacity style={style.ownerCard} onPress={navigationHandle}>
        <View style={style.ownerNameContainer}>
          <TextBody style={style.ownerNameText} numberOfLines={1}>
            {tenant.firstName} {tenant.lastName}
          </TextBody>
          <View style={style.optionsContainer}>
            <Badge
              type={tenant.isProfileComplete ? "success" : "danger"}
              text={tenant.isProfileComplete ? "Complete" : "Incomplete"}
            />
            <TouchableOpacity
              style={style.optionsButton}
              onPress={handleOptionsPress}
            >
              <DotsIcon color={colors.textColor} />
            </TouchableOpacity>
          </View>
        </View>

        <InfoComp
          Icon={<LocationIcon color={colors.textColor} />}
          value={
            (tenant.address?.country ?? "-") +
            ", " +
            (tenant.address?.city ?? "-")
          }
        />
        <InfoComp
          Icon={<EmailIcon color={colors.textColor} />}
          value={tenant.email}
        />
        <InfoComp
          Icon={<PhoneIcon color={colors.textColor} />}
          value={tenant.phoneNumber}
        />
      </TouchableOpacity>
    </CardComponent>
  );
};

const style = StyleSheet.create({
  ownerCard: {
    gap: 12,
  },
  ownerNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
  ownerNameText: {
    maxWidth: "75%",
    fontSize: 16,
    fontWeight: "500",
    color: colors.textColor,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionsButton: {
    padding: 8,
  },
});
