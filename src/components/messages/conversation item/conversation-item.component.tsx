import React from "react";
import { View, TouchableOpacity } from "react-native";
import {
  ProfileIcon,
  EntityType,
} from "../../../components/ui/Profile-icon.component";
// import { useNavigation } from '@react-navigation/native';
import { getTimeSince } from "../../../utils";
import { getIconColorFromId, IRecentMessage } from "../../../utils";
import { TextBody } from "../../../components/ui/texts/Texts.component";
import { ConversationItemStyle } from "./conversation-item.style";

export const RecentMessageComponent = ({
  el,
  selectedTenantId,
  onSelectConversation,
}: {
  el: IRecentMessage;
  selectedTenantId?: string;
  onSelectConversation: (tenantId: string) => void;
}) => {
  const onPress = () => {
    onSelectConversation(el.tenant._id);
  };

  const isActive = el.tenant._id === selectedTenantId;
  const hasUnreadMessages = Number(el?.unreadMessagesCount) > 0;

  return (
    <TouchableOpacity
      style={[
        ConversationItemStyle.messageItem,
        isActive
          ? ConversationItemStyle.activeMessageItem
          : ConversationItemStyle.notActiveMessageItem,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={ConversationItemStyle.profileSection}>
        <ProfileIcon
          firstName={el.tenant.firstName ?? ""}
          lastName={el.tenant.lastName ?? ""}
          entity={EntityType.TENANT}
          isOnline={el.tenant.isOnline}
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
