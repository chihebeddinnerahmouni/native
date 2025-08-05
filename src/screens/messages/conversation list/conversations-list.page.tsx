// import React from "react";
// import { View } from "react-native";
// import { TextLabel } from "../../components/ui/texts/Texts.component";
// import { MainLayout } from "../../layout/main-layout.layout";
// import { useChatList } from "../../api-query/hooks";

// export const ConversationsList = () => {
//   const { chatList, isLoading: isChatListLoading } = useChatList();

//   return (
//     <MainLayout>
//       <View>
//         <TextLabel>Conversations List Page</TextLabel>
//       </View>
//     </MainLayout>
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
import { MainLayout } from "../../../layout/main-layout.layout";
import { PageTitle } from "../../../components/ui/texts/Texts.component";
import { FieldText } from "../../../components/ui/inputs/field-text/field-text.component";
import { SearchIcon } from "../../../icons";
import colors from "../../../constants/colors";

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
    <MainLayout>
      <View style={[styles.container]}>
        <View style={styles.header}>
          <PageTitle>Messages</PageTitle>
          <TouchableOpacity onPress={() => setIsSearchFocused((prev) => !prev)}>
            <SearchIcon />
          </TouchableOpacity>
        </View>
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
              filteredRecentMessages.map((el, index) => (
                <RecentMessageComponent
                  key={el.tenant._id}
                  el={el}
                  selectedTenantId={selectedTenantId}
                  onSelectConversation={handleSelectConversation}
                  highlighted={index % 2 !== 0}
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
  highlighted,
}: {
  el: IRecentMessage;
  selectedTenantId?: string;
  onSelectConversation: (tenantId: string) => void;
  highlighted: boolean;
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
        isActive && styles.activeMessageItem,
        highlighted && styles.highlightedMessageItem,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.profileSection}>
        <View
          style={[
            styles.profileIconContainer,
            el.tenant.isOnline && styles.onlineIndicator,
          ]}
        >
          <ProfileIcon
            firstName={el.tenant.firstName ?? ""}
            lastName={el.tenant.lastName ?? ""}
            entity={EntityType.TENANT}
          />
          {el.tenant.isOnline && <View style={styles.onlineDot} />}
        </View>

        <View style={styles.profileContent}>
          <Text style={styles.tenantName} numberOfLines={1}>
            {el.tenant.firstName ?? "unknown"} {el.tenant.lastName ?? ""}
          </Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {el.lastMessage || "click to open conversation"}
          </Text>
        </View>
      </View>

      <View style={styles.statusSection}>
        <Text style={styles.timestamp}>
          {el.lastMessageTimestamp ? getTimeSince(el.lastMessageTimestamp) : ""}
        </Text>

        <View style={styles.unreadContainer}>
          {hasUnreadMessages ? (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{el.unreadMessagesCount}</Text>
            </View>
          ) : (
            <Text style={styles.noUnreadText}>-</Text>
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
  header: {
    marginBottom: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: { marginBottom: 12 },
  // searchInput: {
  //   height: 40,
  //   borderWidth: 1,
  //   borderColor: "#ddd",
  //   borderRadius: 8,
  //   paddingHorizontal: 12,
  //   fontSize: 16,
  //   backgroundColor: "#f8f9fa",
  // },
  messagesList: {
    flex: 1,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginVertical: 1,
    borderRadius: 8,
  },
  activeMessageItem: {
    backgroundColor: "#e3f2fd",
    borderRightWidth: 3,
    borderRightColor: "#007bff",
  },
  highlightedMessageItem: {
    backgroundColor: "#f5f5f5",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 12,
  },
  profileIconContainer: {
    position: "relative",
    marginRight: 12,
  },
  onlineIndicator: {},
  onlineDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4caf50",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileContent: {
    flex: 1,
  },
  tenantName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  statusSection: {
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: 60,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  unreadContainer: {
    minHeight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadBadge: {
    backgroundColor: "#e3f2fd",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  unreadText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#007bff",
  },
  noUnreadText: {
    fontSize: 12,
    color: "#ccc",
  },
  noItems: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsText: {
    fontSize: 16,
    color: "#666",
  },
});
