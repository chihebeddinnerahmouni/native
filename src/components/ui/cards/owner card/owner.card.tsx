/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Owner } from "../../../../backend/casaikos-api";
import {
  DotsIcon,
  EmailIcon,
  LocationIcon,
  PhoneIcon,
} from "../../../../icons";
import { Badge } from "../../badge.component";
import { TextBody } from "../../texts/Texts.component";
import colors from "../../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { ETabs, EScreens, ERoute } from "../../../../utils";
import { CardComponent } from "../card.component";
import { InfoComp } from "../../info.component";
import { useActionSheet } from "../../../../hooks";
import { OwnerForm } from "../../../forms";
import { useModal } from "../../../../contexts";

interface IProps {
  owner: Owner;
}

export const OwnerCard = ({ owner }: IProps) => {
  const navigator = useNavigation();
  const { showActionSheet } = useActionSheet();
  const { openModal, closeModal } = useModal();

  const navigationHandle = () => {
    (navigator as any).navigate(ETabs.MAIN, {
      screen: EScreens.OWNERS,
      params: {
        screen: ERoute.OWNERS_DETAILS,
        params: { ownerId: owner._id },
      },
    });
  };

  const handleOptionsPress = () => {
    showActionSheet({
      title: "Property Options",
      message: `What would you like to do with ${owner.firstName} ${owner.lastName}?`,
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
              title: "Update Owner",
              component: (
                <OwnerForm selectedOwner={owner} closeModal={closeModal} />
              ),
            });
          },
        },
        {
          text: "Delete",
          style: "destructive",
          // onPress: () => onDelete?.(property),
          onPress: () => {},
        },
      ],
    });
  };

  return (
    <CardComponent>
      <TouchableOpacity
        style={ownerCardStyles.ownerCard}
        onPress={navigationHandle}
      >
        <View style={ownerCardStyles.ownerNameContainer}>
          <TextBody style={ownerCardStyles.ownerNameText} numberOfLines={1}>
            {owner.firstName} {owner.lastName}
          </TextBody>
          <View style={ownerCardStyles.optionsContainer}>
            <Badge
              type={owner.isProfileComplete ? "success" : "danger"}
              text={owner.isProfileComplete ? "Complete" : "Incomplete"}
            />
            <TouchableOpacity
              style={ownerCardStyles.optionsButton}
              onPress={handleOptionsPress}
            >
              <DotsIcon color={colors.textColor} />
            </TouchableOpacity>
          </View>
        </View>

        <InfoComp
          Icon={<LocationIcon color={colors.textColor} />}
          value={owner.address?.country + ", " + owner.address?.city}
        />
        <InfoComp
          Icon={<EmailIcon color={colors.textColor} />}
          value={owner.email}
        />
        <InfoComp
          Icon={<PhoneIcon color={colors.textColor} />}
          value={owner.phoneNumber}
        />
      </TouchableOpacity>
    </CardComponent>
  );
};

export const ownerCardStyles = StyleSheet.create({
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
