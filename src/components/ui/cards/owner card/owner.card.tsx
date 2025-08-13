/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Owner } from "../../../../backend/casaikos-api";
import { EmailIcon, LocationIcon, PhoneIcon } from "../../../../icons";
import { Badge } from "../../badge.component";
import { TextBody } from "../../texts/Texts.component";
import colors from "../../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { ETabs, EScreens, ERoute } from "../../../../utils";
import { CardComponent } from "../card.component";
import { InfoComp } from "../../info.component";

interface IProps {
  owner: Owner;
}

export const OwnerCard = ({ owner }: IProps) => {
  const navigator = useNavigation();

  const navigationHandle = () => {
    (navigator as any).navigate(ETabs.MAIN, {
      screen: EScreens.OWNERS,
      params: {
        screen: ERoute.OWNERS_DETAILS,
        params: { ownerId: owner._id },
      },
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
          <Badge
            type={owner.isProfileComplete ? "success" : "danger"}
            text="Available"
          />
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
});
