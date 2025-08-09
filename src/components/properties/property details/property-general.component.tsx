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
  AirbnbIcon,
  BuildingIcon,
  CalendarIcon,
  CopyIcon,
  EmailIcon,
  GroupOfUsersIcon,
  HashtagIcon,
  ListIcon,
  LocationIcon,
  MapIcon,
  MediaIcon,
  MoonIcon,
  PostIcon,
  PropertyIcon,
  StatusIcon,
  UserIcon,
} from "../../../icons";
import { Badge } from "../../../components/ui/badge.component";
import { Property } from "../../../backend/casaikos-api";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { propertyDetailsStyle } from "../../../screens/properties/property details/property-details.style";
import colors from "../../../constants/colors";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../../ui/alerts/alerts.component";

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
      <CardComponent>
        <View style={propertyDetailsStyle.section}>
          <TextTitle
            numberOfLines={1}
            style={propertyDetailsStyle.borderBottom}
          >
            Address
          </TextTitle>
          <IconLabelValue
            icon={<LocationIcon />}
            label="Address"
            value={property.address?.district || "-"}
          />
          <IconLabelValue
            icon={<MapIcon />}
            label="City"
            value={property.address?.city || "-"}
          />
          <IconLabelValue
            icon={<MediaIcon />}
            label="Country"
            value={property.address?.country || "-"}
          />
          <IconLabelValue
            icon={<PostIcon />}
            label="Post Code"
            value={property.address?.zip || "-"}
          />
        </View>
      </CardComponent>
      <CardComponent>
        <View style={propertyDetailsStyle.section}>
          <TextTitle
            numberOfLines={1}
            style={propertyDetailsStyle.borderBottom}
          >
            Property information
          </TextTitle>
          <IconLabelValue
            icon={<HashtagIcon />}
            label="Property ID"
            value={property._id || "-"}
          />
          <IconLabelValue
            icon={<ListIcon />}
            label="Apartment No"
            value={property.apartmentNumber || "-"}
          />
          <IconLabelValue
            icon={<BuildingIcon />}
            label="Building Name"
            value={property.buildingName || "-"}
          />
          <IconLabelValue
            icon={<MoonIcon />}
            label="Maximum Stays"
            value={property.maxNights || "-"}
          />
          <IconLabelValue
            icon={<PropertyIcon />}
            label="Floor"
            value={property.floor || "-"}
          />
          <IconLabelValue
            icon={<CalendarIcon />}
            label="Year Built"
            value={property.yearBuilt || "-"}
          />
          <IconLabelValue
            icon={<GroupOfUsersIcon />}
            label="Maximum Capacity"
            value="2*"
          />
        </View>
      </CardComponent>
      <CardComponent>
        <View style={propertyDetailsStyle.section}>
          <TextTitle
            numberOfLines={1}
            style={propertyDetailsStyle.borderBottom}
          >
            external links
          </TextTitle>
          <ExternalLink
            icon={<AirbnbIcon />}
            label="Airbnb"
            // value={property.airbnbId || "-"}
            value="http://192.168.20.122:5000/*"
          />
        </View>
      </CardComponent>
    </>
  );
};

const ExternalLink = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  const copyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(value);
      showSuccessAlert("Copied!", "Link copied to clipboard");
    } catch (error) {
      console.error("Clipboard error:", error);
      showErrorAlert(
        "Error",
        "Failed to copy link. Please try restarting the app."
      );
    }
  };

  return (
    <View style={externalLinksStyle.container}>
      <View style={externalLinksStyle.topSection}>
        {icon}
        <TextBody numberOfLines={1}>{label}</TextBody>
      </View>
      <View style={externalLinksStyle.bottomSection}>
        <TextBody numberOfLines={1}>{value}</TextBody>
        <TouchableOpacity onPress={copyToClipboard}>
          <CopyIcon color={colors.primaryColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const externalLinksStyle = StyleSheet.create({
  container: {
    padding: 12,
    borderBlockColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 12,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  bottomSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
