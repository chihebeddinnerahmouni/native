import React from "react";
import { ScrollView, TouchableOpacity, ViewStyle } from "react-native";
import { TextBody } from "./texts/Texts.component";
import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

type IProps = {
  tabs: { title: string }[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  style?: ViewStyle;
};
export const TabsComponent = ({
  tabs,
  selectedTab,
  setSelectedTab,
  style,
}: IProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[tabStyles.tabsScrollContainer, style]}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.title}
          onPress={() => setSelectedTab(tab.title)}
        >
          <TextBody
            style={[
              tabStyles.tabText,
              selectedTab === tab.title && tabStyles.selectedTabText,
            ]}
          >
            {tab.title}
          </TextBody>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export const tabStyles = StyleSheet.create({
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
