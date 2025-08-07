/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Button } from "../../../components/ui/buttons/button.component";
import { useAuth } from "../../../contexts";
import {
  ERoute,
  EScreens,
  getIconColorFromId,
  socketManager,
} from "../../../utils";
import {
  EChatAgentType,
  EWebsocketType,
  SocketMessageEvent,
} from "../../../backend/casaikos-api";

// Icons - you'll need to create these or use react-native-vector-icons
import {
  AttachFileIcon,
  TakeLeadIcon,
  SendIcon,
  ReleaseLeadIcon,
  AlertIcon,
} from "../../../icons";
import {
  EntityType,
  ProfileIcon,
} from "../../../components/ui/Profile-icon.component";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  useMessages,
  useMessagesMutation,
  useSingleTenant,
} from "../../../api-query/hooks";
import { RNFile, sendWhatsappRequest } from "../../../utils/files.utils";
import { MainLayout } from "../../../layout";
import {
  TextBody,
  TextButton,
} from "../../../components/ui/texts/Texts.component";
import colors from "../../../constants/colors";
import { FieldText } from "../../../components/ui/inputs/field-text/field-text.component";
import { MessageItem } from "../../../components/messages/message item/message-item.component";
import { MessagesStyles } from "./messages.style";
import { EQueryKeys, queryClient } from "../../../api-query/queryClient";
import { showErrorAlert } from "../../../components/ui/alerts/alerts.component";
import { LoadingScreen } from "../../../components/ui/LoadingScreen";

export type TLeadConversation = {
  type: EChatAgentType;
  id?: string;
  isMe?: boolean;
  leadAgent?: any;
};

type MessagesStackParamList = {
  [ERoute.MESSAGES_PAGE]: {
    tenantId: string;
  };
  [EScreens.MESSAGES]: { screen: ERoute.MESSAGES_PAGE };
};

type MessagesRouteProp = RouteProp<
  MessagesStackParamList,
  typeof ERoute.MESSAGES_PAGE
>;

export const Messages = () => {
  const { user } = useAuth();
  const route = useRoute<MessagesRouteProp>();
  const selectedTenantId = route.params?.tenantId;
  const scrollViewRef = useRef<ScrollView>(null);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<RNFile | null>(null);
  const socket = socketManager.getSocket();
  const navigator = useNavigation();

  const { tenant: selectedTenant } = useSingleTenant({
    tenantId: selectedTenantId || "",
  });
  const { markAsRead, markChatAsRead } = useMessagesMutation();
  const { updateLeadConversation, isUpdatingLead } = useMessagesMutation();

  const {
    messagesResult,
    isSuccess: isMessagesSuccess,
    refetch: refetchMessages,
    isLoading,
  } = useMessages({
    tenantId: selectedTenantId || "",
  });

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    if (isMessagesSuccess && messagesResult?.length) {
      markAsRead({ tenantId: selectedTenantId || "" });
    }
  }, [messagesResult, isMessagesSuccess, selectedTenantId, markAsRead]);

  const leadConversation: TLeadConversation = useMemo(() => {
    const lastLead = messagesResult
      .filter((message) => !!message.type && message.isReply === false)
      ?.pop();
    if (!lastLead || lastLead.type === EChatAgentType.AiTookLead) {
      return {
        type: EChatAgentType.AiTookLead,
      };
    }
    return {
      id: lastLead._id,
      type: EChatAgentType.AgentTookLead,
      isMe: lastLead.agent?._id === user?._id,
      leadAgent: lastLead.agent,
    };
  }, [messagesResult, user?._id]);

  const submitMessage = async () => {
    if (leadConversation.type === EChatAgentType.AiTookLead) return;

    if (attachment) {
      const maxFileSize = 10;
      if (attachment.size && attachment.size > maxFileSize * 1024 * 1024) {
        Alert.alert("Error", `File size is bigger than ${maxFileSize} MB!`);
        return;
      }
    }

    if (!attachment && !message) return;

    try {
      await sendWhatsappRequest(selectedTenant?._id ?? "", message, attachment);
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.CHAT_LIST],
      });

      setAttachment(null);
      setMessage("");
    } catch (error) {
      showErrorAlert("Error", "Failed to send message. Please try again.");
    }
  };

  const handleAttachFile = () => {
    //     const result = await DocumentPicker.getDocumentAsync({
    //       type: '*/*',
    //       copyToCacheDirectory: true,
    //     });
    //
    //     if (!result.cancelled) {
    //       const file: RNFile = {
    //         uri: result.uri,
    //         name: result.name,
    //         type: result.mimeType || 'application/octet-stream',
    //         size: result.size,
    //       };
    //       setAttachment(file);
    //     }
    Alert.alert(
      "File Attachment",
      "To implement file attachment, install expo-document-picker:\n\nnpx expo install expo-document-picker"
    );
  };

  const handleDownloadFile = (file: any) => {
    Alert.alert("Download", `Downloading ${file.fileName}`);
  };

  useEffect(() => {
    if (messagesResult.length) {
      scrollToBottom();
    }
  }, [messagesResult]);

  useEffect(() => {
    const messageHandler = (messageData: SocketMessageEvent) => {
      const { tenant } = messageData;
      if (selectedTenantId !== tenant._id) return;

      refetchMessages();
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.CHAT_LIST],
      });
      markChatAsRead({
        tenantId: selectedTenantId || "",
      });
    };

    if (socket && selectedTenantId) {
      socketManager.on(EWebsocketType.Message, messageHandler);
    }

    return () => {
      if (socket) {
        socketManager.off(EWebsocketType.Message, messageHandler);
      }
    };
  }, [selectedTenantId, refetchMessages, markChatAsRead, socket]);

  useEffect(() => {
    if (selectedTenantId && socket) {
      socket.emit("select", selectedTenantId);
    }
  }, [selectedTenantId, socket]);

  if (!selectedTenantId) return <Text>No tenant selected</Text>;
  if (isLoading || !selectedTenant) return <LoadingScreen />;

  return (
    // <SafeAreaView style={MessagesStyles.container}>
    //   <KeyboardAvoidingView
    //     style={MessagesStyles.container}
    //     behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   >
    <MainLayout
      HeaderLeft={
        <View style={MessagesStyles.profileSection}>
          <ProfileIcon
            firstName={selectedTenant.firstName ?? ""}
            lastName={selectedTenant.lastName ?? ""}
            entity={EntityType.TENANT}
            size={40}
            color={getIconColorFromId(selectedTenant._id)}
          />

          <View style={MessagesStyles.profileNameContainer}>
            <TextBody style={MessagesStyles.profileName}>
              {selectedTenant.firstName} {selectedTenant.lastName}
            </TextBody>
            <TextBody
              style={[MessagesStyles.profileStatus, MessagesStyles.connected]}
            >
              connected
            </TextBody>
          </View>
        </View>
      }
      HeaderRight={
        <TouchableOpacity
          onPress={() => {
            navigator.navigate(ERoute.MESSAGES_DETAILS as never);
          }}
        >
          <AlertIcon size={24} color={colors.textColor} />
        </TouchableOpacity>
      }
      hasPadding={false}
    >
      <View style={MessagesStyles.leadContainer}>
        <View style={MessagesStyles.leadDetails}>
          <View style={MessagesStyles.leadInfos}>
            <TextBody style={MessagesStyles.leadName}>
              {leadConversation.isMe
                ? "You have "
                : leadConversation.type === EChatAgentType.AgentTookLead
                  ? `${leadConversation.leadAgent?.firstName} ${leadConversation.leadAgent?.lastName} has `
                  : "AI has "}
              the lead
            </TextBody>
            <TextBody style={MessagesStyles.leadDescription}>
              {!leadConversation.isMe
                ? "You can take the lead in the conversation."
                : "You can release the lead in the conversation."}
            </TextBody>
          </View>
        </View>

        <Button
          variant={leadConversation.isMe ? "outlined" : "contained"}
          disabled={isUpdatingLead}
          style={MessagesStyles.leadButton}
          onPress={() => {
            updateLeadConversation({
              leadConversation,
              selectedTenantId: selectedTenant?._id ?? "",
              userId: user?._id ?? "",
            });
          }}
        >
          {leadConversation.isMe ? (
            <>
              <ReleaseLeadIcon size={16} />
              <TextButton style={MessagesStyles.buttonText}>
                Release the lead
              </TextButton>
            </>
          ) : (
            <>
              <TakeLeadIcon size={16} />
              <Text style={MessagesStyles.buttonText}>Take the lead</Text>
            </>
          )}
        </Button>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={MessagesStyles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {messagesResult.length ? (
          messagesResult.map((el) => (
            <MessageItem
              key={el._id}
              message={el}
              selectedTenant={selectedTenant}
              onDownloadFile={handleDownloadFile}
            />
          ))
        ) : (
          <View style={MessagesStyles.noMessages}>
            <Text style={MessagesStyles.noMessagesText}>No messages yet</Text>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={MessagesStyles.inputArea}>
        <TouchableOpacity
          onPress={handleAttachFile}
          style={MessagesStyles.attachButton}
        >
          <AttachFileIcon size={24} color={colors.textColor2} />
        </TouchableOpacity>
        <FieldText
          placeholder="Write message here ..."
          value={message}
          onChangeText={(text) => setMessage(text)}
          disabled={!leadConversation.isMe}
          flex={true}
        />

        <TouchableOpacity
          onPress={submitMessage}
          style={[
            MessagesStyles.sendButton,
            !leadConversation.isMe && MessagesStyles.disabledButton,
          ]}
          disabled={!leadConversation.isMe}
        >
          <SendIcon
            size={20}
            color={leadConversation.isMe ? "#007bff" : "#ccc"}
          />
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};
