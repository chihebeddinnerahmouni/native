import React from "react";
import { View, TouchableOpacity } from "react-native";
import {
  ProfileIcon,
  EntityType,
} from "../../../components/ui/Profile-icon.component";
import { useNavigation } from "@react-navigation/native";
import { ERoute, EScreens, getTimeSince } from "../../../utils";
import { getIconColorFromId } from "../../../utils";
import { TextBody } from "../../../components/ui/texts/Texts.component";
import { ConversationItemStyle } from "./conversation-item.style";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChatListItemDto } from "../../../backend/casaikos-api";

type RootStackParamList = {
  [EScreens.MESSAGES]: {
    screen: string;
    params: {
      tenantId: string;
    };
  };
};

export const RecentMessageComponent = ({
  el,
  // selectedTenantId,
}: {
  el: ChatListItemDto;
  // selectedTenantId?: string;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSelectConversation = (tenantId: string) => {
    // Navigate to MainTabs, then to Messages, then to the specific page
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigation as any).navigate("MainTabs", {
      screen: EScreens.MESSAGES,
      params: {
        screen: ERoute.MESSAGES_PAGE,
        params: { tenantId: tenantId },
      },
    });
  };

  // const isActive = el.tenant._id === selectedTenantId;
  const isActive = false;
  const hasUnreadMessages = Number(el?.unreadMessagesCount) > 0;

  return (
    <TouchableOpacity
      style={[
        ConversationItemStyle.messageItem,
        isActive
          ? ConversationItemStyle.activeMessageItem
          : ConversationItemStyle.notActiveMessageItem,
      ]}
      onPress={() => handleSelectConversation(el.tenant._id)}
      activeOpacity={0.7}
    >
      <View style={ConversationItemStyle.profileSection}>
        <ProfileIcon
          firstName={el.tenant.firstName ?? ""}
          lastName={el.tenant.lastName ?? ""}
          entity={EntityType.TENANT}
          isOnline={true}
          color={getIconColorFromId(el.tenant._id)}
        />
        <View style={ConversationItemStyle.profileContent}>
          <TextBody style={ConversationItemStyle.tenantName} numberOfLines={1}>
            {el.tenant.firstName ?? "unknown"} {el.tenant.lastName ?? ""}
          </TextBody>
          <TextBody style={ConversationItemStyle.lastMessage} numberOfLines={1}>
            {el.lastMessage || "click to open conversation"}
          </TextBody>
        </View>
      </View>

      <View style={ConversationItemStyle.statusSection}>
        <TextBody style={ConversationItemStyle.timestamp}>
          {el.lastMessageTimestamp ? getTimeSince(el.lastMessageTimestamp) : ""}
        </TextBody>

        <View style={ConversationItemStyle.unreadContainer}>
          {hasUnreadMessages ? (
            <View style={ConversationItemStyle.unreadBadge}>
              <TextBody style={ConversationItemStyle.unreadText}>
                {el.unreadMessagesCount}
              </TextBody>
            </View>
          ) : (
            <TextBody style={ConversationItemStyle.noUnreadText}>-</TextBody>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
