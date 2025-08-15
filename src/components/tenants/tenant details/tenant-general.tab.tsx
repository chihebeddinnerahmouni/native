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
import { Tenant } from "../../../backend/casaikos-api";
import { View } from "react-native";
import { ownerDetailsStyle } from "../../../screens/owners/owner details/owner-details.style";
import { borderBottomStyle } from "../../../styles";

type IProps = {
  tenant: Tenant;
};

export const TenantGeneralTab = ({ tenant }: IProps) => {
  return (
    <>
      <CardComponent>
        <View style={ownerDetailsStyle.section}>
          <TextTitle numberOfLines={1} style={borderBottomStyle}>
            Owner information
          </TextTitle>
          <IconLabelValue
            icon={<FlagIcon />}
            label="Nationality"
            value={tenant.passport?.nationality}
          />
          <IconLabelValue
            icon={<UserIcon />}
            label="Line Manager"
            value={tenant.agent?.firstName + " " + tenant.agent?.lastName}
          />
        </View>
      </CardComponent>
      <CardComponent>
        <View style={ownerDetailsStyle.section}>
          <TextTitle numberOfLines={1} style={borderBottomStyle}>
            Address
          </TextTitle>
          <IconLabelValue
            icon={<LocationIcon />}
            label="Address"
            value={tenant.address?.district}
          />
          <IconLabelValue
            icon={<MapIcon />}
            label="City"
            value={tenant.address?.city}
          />
          <IconLabelValue
            icon={<MediaIcon />}
            label="Country"
            value={tenant.address?.country}
          />
          <IconLabelValue
            icon={<PostIcon />}
            label="Post Code"
            value={tenant.address?.zip}
          />
        </View>
      </CardComponent>
    </>
  );
};
