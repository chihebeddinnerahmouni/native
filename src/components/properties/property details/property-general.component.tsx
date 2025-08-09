import React from "react";
import {
  TextBody,
  TextTitle,
} from "../../../components/ui/texts/Texts.component";
import { CardComponent } from "../../../components/ui/cards/card.component";
import { PropertyLocation } from "../../../components/properties/property-location.component";
import { PropertyIndicators } from "../../../components/properties/property-indicators.component";
import { IconLabelValue } from "../../../components/ui/icon-label-value.component";
import {
  BuildingIcon,
  EmailIcon,
  PropertyIcon,
  StatusIcon,
  UserIcon,
} from "../../../icons";
import { Badge } from "../../../components/ui/badge.component";
import { Property } from "../../../backend/casaikos-api";
import { View } from "react-native";
import { propertyDetailsStyle } from "../../../screens/properties/property details/property-details.style";

type IProps = {
  property: Property;
};

export const PropertyGeneralComponent = ({ property }: IProps) => {
  return (
    <>
      <CardComponent>
        <View style={propertyDetailsStyle.section}>
          <TextTitle numberOfLines={1}>{property.title}</TextTitle>
          <PropertyLocation address={property.address} />
          <PropertyIndicators property={property} />
          <TextBody>
            {property.description || "No description available."}
          </TextBody>
        </View>
      </CardComponent>

      <CardComponent>
        <View style={propertyDetailsStyle.section}>
          <TextTitle
            numberOfLines={1}
            style={propertyDetailsStyle.borderBottom}
          >
            Property Details
          </TextTitle>
          <IconLabelValue
            icon={<PropertyIcon />}
            label="Name"
            value={property.title || "-"}
          />
          <IconLabelValue
            icon={<EmailIcon />}
            label="Owner Email"
            value={property.owner?.email || "-"}
          />
          <IconLabelValue
            icon={<UserIcon />}
            label="Owner"
            value={
              property.owner?.firstName + " " + property.owner?.lastName || "-"
            }
          />
          <IconLabelValue
            icon={<BuildingIcon />}
            label="Property Type"
            value={property.propertyType || "-"}
          />
          <IconLabelValue
            icon={<StatusIcon />}
            label="Status"
            value={<Badge type="success" text="Available*" />}
          />
        </View>
      </CardComponent>
    </>
  );
};
