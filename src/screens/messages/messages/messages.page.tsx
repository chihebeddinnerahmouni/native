/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { View } from "react-native";
// import { TextLabel } from "../../../components/ui/texts/Texts.component";
// import { AuthLayout } from "../../../layout/auth.layout";

// export const Messages = () => {
//   return (
//     <AuthLayout>
//       <View>
//         <TextLabel>Messages Page</TextLabel>
//       </View>
//     </AuthLayout>
//   );
// };
// src/screens/MessageContentScreen.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { Button } from "../../../components/ui/buttons/button.component";
import { useAuth } from "../../../contexts";
import { ERoute, getIconColorFromId } from "../../../utils";
import {
  Tenant,
  EChatAgentType,
  WhatsappChat,
} from "../../../backend/casaikos-api";

// Icons - you'll need to create these or use react-native-vector-icons
import {
  AttachFileIcon,
  DownloadIcon,
  TakeLeadIcon,
  SendIcon,
  ReleaseLeadIcon,
  AlertIcon,
  LeftArrowIcon,
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
      <SafeAreaView style={styles.container}>
        <View style={styles.noConversation}>
          <Text style={styles.noConversationTitle}>
            No conversation selected
          </Text>
          <Text style={styles.noConversationSubtitle}>
            Please select an item on the left to view.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={() => {}} style={styles.backButton}>
              <LeftArrowIcon size={24} />
            </TouchableOpacity>

            <ProfileIcon
              firstName={selectedTenant.firstName ?? ""}
              lastName={selectedTenant.lastName ?? ""}
              entity={EntityType.TENANT}
              size={40}
            />

            <View style={styles.profileContent}>
              <Text style={styles.profileName}>
                {selectedTenant.firstName} {selectedTenant.lastName}
              </Text>
              <Text style={[styles.profileStatus, styles.connected]}>
                connected
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
            <AlertIcon size={24} color="#007bff" />
          </TouchableOpacity>
        </View>

        {/* Lead Container */}
        <View style={styles.leadContainer}>
          <View style={styles.leadDetails}>
            <View style={styles.leadInfos}>
              <Text style={styles.leadName}>
                {leadConversation.isMe
                  ? "You have "
                  : leadConversation.type === EChatAgentType.AgentTookLead
                    ? `${leadConversation.leadAgent?.firstName} ${leadConversation.leadAgent?.lastName} has `
                    : "AI has "}
                the lead
              </Text>
              <Text style={styles.leadDescription}>
                {!leadConversation.isMe
                  ? "You can take the lead in the conversation."
                  : "You can release the lead in the conversation."}
              </Text>
            </View>
          </View>

          <Button
            variant={leadConversation.isMe ? "outlined" : "contained"}
            disabled={isUpdatingLead}
            onPress={updateLeadConversation}
            style={styles.leadButton}
          >
            {leadConversation.isMe ? (
              <>
                <ReleaseLeadIcon size={16} />
                <Text style={styles.buttonText}>Release the lead</Text>
              </>
            ) : (
              <>
                <TakeLeadIcon size={16} />
                <Text style={styles.buttonText}>Take the lead</Text>
              </>
            )}
          </Button>
        </View>

        {/* Messages Content */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
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
                <View style={styles.noMessages}>
                  <Text style={styles.noMessagesText}>No messages yet</Text>
                </View>
              )}
            </>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputArea}>
          <TouchableOpacity
            onPress={handleAttachFile}
            style={styles.attachButton}
          >
            <AttachFileIcon size={24} color="#666" />
          </TouchableOpacity>

          <TextInput
            style={[
              styles.textInput,
              !leadConversation.isMe && styles.disabledInput,
            ]}
            placeholder="Write message here ..."
            value={message}
            onChangeText={setMessage}
            multiline
            editable={leadConversation.isMe}
            placeholderTextColor="#999"
          />

          <TouchableOpacity
            onPress={submitMessage}
            style={[
              styles.sendButton,
              !leadConversation.isMe && styles.disabledButton,
            ]}
            disabled={!leadConversation.isMe}
          >
            <SendIcon
              size={20}
              color={leadConversation.isMe ? "#007bff" : "#ccc"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Message Item Component
const MessageItem = ({
  message,
  selectedTenant,
  onDownloadFile,
}: {
  message: WhatsappChat;
  selectedTenant: Tenant;
  onDownloadFile: (file: any) => void;
}) => {
  if (message.type && !message.message) {
    // Lead item
    return (
      <View style={styles.leadItem}>
        <Text style={styles.leadItemText}>
          {message.type === EChatAgentType.AiTookLead
            ? "AI"
            : message.agent?.firstName}{" "}
          took the lead
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.messageItemContainer}>
      {/* Text Message */}
      {message.message && (
        <View
          style={[
            styles.messageItem,
            message.isReply ? styles.replyMessage : styles.sentMessage,
          ]}
        >
          <View style={styles.messageContent}>
            <Text style={styles.messageText}>{message.message}</Text>
            <Text style={styles.messageTime}>{new Date().getFullYear()}</Text>
          </View>

          {/* Profile Icon */}
          <View style={styles.messageProfile}>
            {!message.isReply ? (
              message.agent ? (
                <ProfileIcon
                  firstName={message.agent.firstName ?? ""}
                  lastName={message.agent.lastName ?? ""}
                  entity={EntityType.AGENT}
                  size={30}
                />
              ) : (
                <View style={styles.aiIcon}>
                  <Text style={styles.aiText}>AI</Text>
                </View>
              )
            ) : (
              <ProfileIcon
                firstName={selectedTenant.firstName ?? ""}
                lastName={selectedTenant.lastName ?? ""}
                entity={EntityType.TENANT}
                size={30}
              />
            )}
          </View>
        </View>
      )}

      {/* File Message */}
      {message.hostedFile && (
        <TouchableOpacity
          style={[
            styles.fileMessage,
            message.isReply ? styles.replyMessage : styles.sentMessage,
          ]}
          onPress={() => onDownloadFile(message.hostedFile)}
        >
          <DownloadIcon size={20} color="#007bff" />
          <Text style={styles.fileName}>{message.hostedFile.fileName}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  profileContent: {
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  profileStatus: {
    fontSize: 12,
    fontWeight: "500",
  },
  connected: {
    color: "#34c759",
  },
  actionButton: {
    padding: 8,
  },
  leadContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  leadDetails: {
    flex: 1,
  },
  leadInfos: {
    flex: 1,
  },
  leadName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  leadDescription: {
    fontSize: 12,
    color: "#666",
  },
  leadButton: {
    marginLeft: 12,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 14,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMessages: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMessagesText: {
    fontSize: 16,
    color: "#666",
  },
  messageItemContainer: {
    marginBottom: 16,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  sentMessage: {
    justifyContent: "flex-start",
  },
  replyMessage: {
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
  },
  messageContent: {
    backgroundColor: "#f1f1f1",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxWidth: "70%",
  },
  messageText: {
    fontSize: 14,
    color: "#333",
  },
  messageTime: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
  },
  messageProfile: {
    marginHorizontal: 4,
  },
  aiIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  aiText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  fileMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxWidth: "70%",
  },
  fileName: {
    marginLeft: 8,
    fontSize: 14,
    color: "#007bff",
  },
  leadItem: {
    alignItems: "center",
    paddingVertical: 8,
    marginVertical: 4,
  },
  leadItemText: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: "#f8f9fa",
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
    color: "#999",
  },
  sendButton: {
    padding: 8,
    marginLeft: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  noConversation: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  noConversationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  noConversationSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
