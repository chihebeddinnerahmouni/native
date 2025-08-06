/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native";
import { Button } from "../../../components/ui/buttons/button.component";
import { useAuth } from "../../../contexts";
import { ERoute, getIconColorFromId } from "../../../utils";
import { EChatAgentType } from "../../../backend/casaikos-api";

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
import { RouteProp, useRoute } from "@react-navigation/native";
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
  const [isUpdatingLead, setIsUpdatingLead] = useState(false);
  const [isLeadShown, setIsLeadShown] = useState(false);

  const { tenant: selectedTenant } = useSingleTenant({
    tenantId: selectedTenantId || "",
  });
  const { markAsRead, markChatAsRead } = useMessagesMutation();

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

  const submitMessage = () => {
    if (leadConversation.type === EChatAgentType.AiTookLead) return;

    if (attachment) {
      const maxFileSize = 10;
      if (attachment.size && attachment.size > maxFileSize * 1024 * 1024) {
        Alert.alert("Error", `File size is bigger than ${maxFileSize} MB!`);
        return;
      }
    }

    if (!attachment && !message) {
      return;
    }
    sendWhatsappRequest(selectedTenant?._id ?? "", message, attachment);
    setAttachment(null);
    setMessage("");
  };

  const updateLeadConversation = async () => {
    setIsUpdatingLead(true);
    try {
      // Call your lead update API here
      // await updateLeadConversationAPI({
      //   leadConversation,
      //   selectedTenantId: selectedTenant?._id ?? '',
      //   userId: user?._id ?? '',
      // });
    } catch (error) {
      console.error("Failed to update lead:", error);
    } finally {
      setIsUpdatingLead(false);
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
      // setTimeout(() => back
      scrollToBottom();
      // }, 100);
    }
  }, [messagesResult]);

  if (!selectedTenant) {
    return (
      <SafeAreaView style={MessagesStyles.container}>
        <View style={MessagesStyles.noConversation}>
          <Text style={MessagesStyles.noConversationTitle}>
            No conversation selected
          </Text>
          <Text style={MessagesStyles.noConversationSubtitle}>
            Please select an item on the left to view.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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
            <Text
              style={[MessagesStyles.profileStatus, MessagesStyles.connected]}
            >
              connected
            </Text>
          </View>
        </View>
      }
      HeaderRight={
        <TouchableOpacity
          onPress={() => {
            setIsLeadShown((prev) => !prev);
          }}
        >
          <AlertIcon size={24} color={colors.textColor} />
        </TouchableOpacity>
      }
      hasPadding={false}
    >
      {isLeadShown && (
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
            onPress={updateLeadConversation}
            style={MessagesStyles.leadButton}
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
      )}

      <ScrollView
        ref={scrollViewRef}
        style={MessagesStyles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={MessagesStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#007bff" />
          </View>
        ) : (
          <>
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
                <Text style={MessagesStyles.noMessagesText}>
                  No messages yet
                </Text>
              </View>
            )}
          </>
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
