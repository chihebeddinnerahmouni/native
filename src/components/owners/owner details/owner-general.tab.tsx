import React from "react";
import { TextTitle } from "../../ui/texts/Texts.component";
import { CardComponent } from "../../ui/cards/card.component";
import { IconLabelValue } from "../../ui/icon-label-value.component";
import {
  FlagIcon,
  LocationIcon,
  MapIcon,
  MediaIcon,
  PostIcon,
  UserIcon,
} from "../../../icons";
import { Owner } from "../../../backend/casaikos-api";
import { View } from "react-native";
import { ownerDetailsStyle } from "../../../screens/owners/owner details/owner-details.style";

type IProps = {
  owner: Owner;
};

export const OwnerGeneralTab = ({ owner }: IProps) => {
  return (
    <>
      <CardComponent>
        <View style={ownerDetailsStyle.section}>
          <TextTitle numberOfLines={1} style={ownerDetailsStyle.borderBottom}>
            Owner information
          </TextTitle>
          <IconLabelValue
            icon={<FlagIcon />}
            label="Nationality"
            value={owner.passport?.nationality}
          />
          <IconLabelValue
            icon={<UserIcon />}
            label="Line Manager"
            value={owner.agent?.firstName + " " + owner.agent?.lastName}
          />
        </View>
      </CardComponent>
      <CardComponent>
        <View style={ownerDetailsStyle.section}>
          <TextTitle numberOfLines={1} style={ownerDetailsStyle.borderBottom}>
            Address
          </TextTitle>
          <IconLabelValue
            icon={<LocationIcon />}
            label="Address"
            value={owner.address?.district}
          />
          <IconLabelValue
            icon={<MapIcon />}
            label="City"
            value={owner.address?.city}
          />
          <IconLabelValue
            icon={<MediaIcon />}
            label="Country"
            value={owner.address?.country}
          />
          <IconLabelValue
            icon={<PostIcon />}
            label="Post Code"
            value={owner.address?.zip}
          />
        </View>
      </CardComponent>
    </>
  );
};
