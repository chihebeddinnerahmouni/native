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
    // backgroundColor: colors.bgColor,
    // borderRadius: 8,
    // borderWidth: 1,
    // borderColor: colors.borderColor,
    // padding: 8,
    // position: "relative",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 1,
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
  // statusBadge: {
  //   position: "absolute",
  //   top: 12,
  //   right: 12,
  //   zIndex: 1,
  // },
  // optionsButton: {
  //   position: "absolute",
  //   top: 12,
  //   left: 12,
  //   zIndex: 1,
  //   backgroundColor: colors.bgColor,
  //   borderRadius: 20,
  //   width: 32,
  //   height: 32,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 2,
  //   elevation: 2,
  // },
  // ownerImage: {
  //   width: "100%",
  //   height: 170,
  //   borderRadius: 8,
  //   marginBottom: 8,
  // },
  // ownerContent: {
  //   gap: 8,
  // },
  // ownerTitle: {
  //   fontSize: 16,
  //   fontWeight: "500",
  //   color: colors.textColor,
  // },
});
