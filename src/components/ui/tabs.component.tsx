import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { TextBody } from "./texts/Texts.component";
import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

type IProps = {
  tabs: { title: string }[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};
export const TabsComponent = ({
  tabs,
  selectedTab,
  setSelectedTab,
}: IProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={propertyDetailsStyle.tabsScrollContainer}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.title}
          onPress={() => setSelectedTab(tab.title)}
        >
          <TextBody
            style={[
              propertyDetailsStyle.tabText,
              selectedTab === tab.title && propertyDetailsStyle.selectedTabText,
            ]}
          >
            {tab.title}
          </TextBody>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export const propertyDetailsStyle = StyleSheet.create({
  tabsScrollContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 12,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.textColor2,
  },
  selectedTabText: {
    color: colors.primaryColor,
  },
});
