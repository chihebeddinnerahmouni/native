import React from "react";
import { MainLayout } from "../../../layout";
import { TextTitle } from "../../../components/ui/texts/Texts.component";
import { CardComponent } from "../../../components/ui/cards/card.component";
import { IconLabelValue } from "../../../components/ui/icon-label-value.component";
import { EmailIcon, PhoneIcon, UserIcon } from "../../../icons";

export const DetailsPage = () => {
  return (
    <MainLayout>
      <CardComponent>
        <TextTitle>Customer Details</TextTitle>
        <IconLabelValue icon={<UserIcon />} label="Name" value="John Doe*" />
        <IconLabelValue
          icon={<EmailIcon />}
          label="Email"
          value="john.doe@example.com*"
        />
        <IconLabelValue
          icon={<PhoneIcon />}
          label="Phone"
          value="+1234567890*"
        />
      </CardComponent>
    </MainLayout>
  );
};
