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
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { recentMessagesMock } from "../../../mock/resent-messages.mock";
import { PageTitle } from "../../../components/ui/texts/Texts.component";
import { FieldText } from "../../../components/ui/inputs/field-text/field-text.component";
import { SearchIcon } from "../../../icons";
import colors from "../../../constants/colors";
import { MainLayout } from "../../../layout";
import { RecentMessageComponent } from "../../../components/messages/conversation item/conversation-item.component";
import { IRecentMessage } from "../../../utils";
import { ConversationListStyle } from "./conversations-list.style";

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
      <View style={[ConversationListStyle.container]}>
        {isSearchFocused && (
          <FieldText
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="Search messages..."
            startIcon={<SearchIcon />}
            style={ConversationListStyle.searchInput}
          />
        )}

        {isLoading ? (
          <View style={ConversationListStyle.noItems}>
            <ActivityIndicator size="large" color={colors.primaryColor} />
          </View>
        ) : (
          <ScrollView
            style={ConversationListStyle.messagesList}
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
              <View style={ConversationListStyle.noItems}>
                <Text style={ConversationListStyle.noItemsText}>
                  No results
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </MainLayout>
  );
};
