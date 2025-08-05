// import React from "react";
// import { View } from "react-native";
// import { TextLabel } from "../../components/ui/texts/Texts.component";
// import { AuthLayout } from "../../layout/main-layout.layout";
// import { useChatList } from "../../api-query/hooks";

// export const ConversationsList = () => {
//   const { chatList, isLoading: isChatListLoading } = useChatList();

//   return (
//     <AuthLayout>
//       <View>
//         <TextLabel>Conversations List Page</TextLabel>
//       </View>
//     </AuthLayout>
//   );
// };

// src/screens/MessagesScreen.tsx
// import {
//   MessagesList,
//   EActiveSection,
// } from "../components/messages/MessagesList";
// import { IRecentMessage } from "../utils/messages.utils";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  ProfileIcon,
  EntityType,
} from "../../../components/ui/Profile-icon.component";
// import { useNavigation } from '@react-navigation/native';
import { getTimeSince } from "../../../utils";
import { getIconColorFromId, IRecentMessage } from "../../../utils";
import { recentMessagesMock } from "../../../mock/resent-messages.mock";
import {
  PageTitle,
  TextBody,
} from "../../../components/ui/texts/Texts.component";
import { FieldText } from "../../../components/ui/inputs/field-text/field-text.component";
import { SearchIcon } from "../../../icons";
import colors from "../../../constants/colors";
import { MainLayout } from "../../../layout";

export const MessagesScreen = () => {
  const [search, setSearch] = useState("");
  const [selectedTenantId, setSelectedTenantId] = useState<string>();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentMessages, setRecentMessages] =
    useState<IRecentMessage[]>(recentMessagesMock);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectConversation = (tenantId: string) => {
    setSelectedTenantId(tenantId);
    // Navigate to conversation screen or update state as needed
  };

  const filteredRecentMessages = useMemo(
    () =>
      recentMessages.filter((el) =>
        (el.tenant.firstName + " " + el.tenant.lastName)
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search, recentMessages]
  );

  return (
    <MainLayout
      isBackButtonVisible={false}
      HeaderLeft={<PageTitle>Messages</PageTitle>}
      HeaderRight={
        <TouchableOpacity onPress={() => setIsSearchFocused((prev) => !prev)}>
          <SearchIcon />
        </TouchableOpacity>
      }
    >
      <View style={[styles.container]}>
        {isSearchFocused && (
          <FieldText
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="Search messages..."
            startIcon={<SearchIcon />}
            style={styles.searchInput}
          />
        )}

        {isLoading ? (
          <View style={styles.noItems}>
            <ActivityIndicator size="large" color={colors.primaryColor} />
          </View>
        ) : (
          <ScrollView
            style={styles.messagesList}
            showsVerticalScrollIndicator={false}
          >
            {filteredRecentMessages.length ? (
              filteredRecentMessages.map((el) => (
                <RecentMessageComponent
                  key={el.tenant._id}
                  el={el}
                  selectedTenantId={selectedTenantId}
                  onSelectConversation={handleSelectConversation}
                />
              ))
            ) : (
              <View style={styles.noItems}>
                <Text style={styles.noItemsText}>No results</Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </MainLayout>
  );
};

const RecentMessageComponent = ({
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
        styles.messageItem,
        isActive ? styles.activeMessageItem : styles.notActiveMessageItem,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.profileSection}>
        <ProfileIcon
          firstName={el.tenant.firstName ?? ""}
          lastName={el.tenant.lastName ?? ""}
          entity={EntityType.TENANT}
          isOnline={el.tenant.isOnline}
          color={getIconColorFromId(el.tenant._id)}
        />
        <View style={styles.profileContent}>
          <TextBody style={styles.tenantName} numberOfLines={1}>
            {el.tenant.firstName ?? "unknown"} {el.tenant.lastName ?? ""}
          </TextBody>
          <TextBody style={styles.lastMessage} numberOfLines={1}>
            {el.lastMessage || "click to open conversation"}
          </TextBody>
        </View>
      </View>

      <View style={styles.statusSection}>
        <TextBody style={styles.timestamp}>
          {el.lastMessageTimestamp ? getTimeSince(el.lastMessageTimestamp) : ""}
        </TextBody>

        <View style={styles.unreadContainer}>
          {hasUnreadMessages ? (
            <View style={styles.unreadBadge}>
              <TextBody style={styles.unreadText}>
                {el.unreadMessagesCount}
              </TextBody>
            </View>
          ) : (
            <TextBody style={styles.noUnreadText}>-</TextBody>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: { marginBottom: 12 },
  messagesList: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  activeMessageItem: {
    backgroundColor: colors.primaryLight,
    borderRightWidth: 3,
    borderRightColor: colors.primaryColor,
  },
  notActiveMessageItem: {
    backgroundColor: colors.bgColor,
    borderRightWidth: 3,
    borderRightColor: "transparent",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 12,
  },
  profileContent: {
    flex: 1,
  },
  tenantName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textColor,
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textColor2,
  },
  statusSection: {
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: 60,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textColor2,
    marginBottom: 4,
  },
  unreadContainer: {
    minHeight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadBadge: {
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  unreadText: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.primaryColor,
  },
  noUnreadText: {
    fontSize: 12,
    color: colors.textColor2,
  },
  noItems: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsText: {
    fontSize: 16,
    color: colors.textColor2,
  },
});
