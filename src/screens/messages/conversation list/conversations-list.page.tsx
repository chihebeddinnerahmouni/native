import React, { useMemo, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { PageTitle } from "../../../components/ui/texts/Texts.component";
import { FieldText } from "../../../components/ui/inputs/field-text/field-text.component";
import { SearchIcon } from "../../../icons";
import colors from "../../../constants/colors";
import { MainLayout } from "../../../layout";
import { RecentMessageComponent } from "../../../components/messages/conversation item/conversation-item.component";
// import { socketManager } from "../../../utils";
import { ConversationListStyle } from "./conversations-list.style";
import { useChatList } from "../../../api-query/hooks";

export const ConversationsList = () => {
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { chatList: recentMessages, isLoading } = useChatList();

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
                <RecentMessageComponent key={el.tenant._id} el={el} />
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
