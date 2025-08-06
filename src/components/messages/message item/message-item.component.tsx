/* eslint-disable @typescript-eslint/no-explicit-any */
import { TouchableOpacity, View } from "react-native";
import {
  EChatAgentType,
  Tenant,
  WhatsappChat,
} from "../../../backend/casaikos-api";
import { TextBody } from "../../ui/texts/Texts.component";
import { getIconColorFromId } from "../../../utils";
import { EntityType, ProfileIcon } from "../../ui/Profile-icon.component";
import { DownloadIcon } from "../../../icons";
import { messageItemStyles } from "./message-item.style";

export const MessageItem = ({
  message,
  selectedTenant,
  onDownloadFile,
}: {
  message: WhatsappChat;
  selectedTenant: Tenant;
  onDownloadFile: (file: any) => void;
}) => {
  if (message.type && !message.message) {
    return (
      <View style={messageItemStyles.leadItem}>
        <TextBody style={messageItemStyles.leadItemText}>
          {message.type === EChatAgentType.AiTookLead
            ? "AI"
            : message.agent?.firstName}{" "}
          took the lead
        </TextBody>
      </View>
    );
  }

  return (
    <View
      style={[
        messageItemStyles.messageItemContainer,
        message.isReply
          ? messageItemStyles.replyMessage
          : messageItemStyles.sentMessage,
      ]}
    >
      {message.message && (
        <View
          style={[
            messageItemStyles.messageItem,
            message.isReply
              ? messageItemStyles.replyMessage
              : messageItemStyles.sentMessage,
          ]}
        >
          <View
            style={[
              messageItemStyles.messageContentContainer,
              message.isReply
                ? messageItemStyles.replyMessage
                : messageItemStyles.sentMessage,
              message.isReply
                ? messageItemStyles.messageContentContainerReply
                : messageItemStyles.messageContentContainerSent,
            ]}
          >
            <View style={messageItemStyles.messageContent}>
              <View
                style={[
                  messageItemStyles.messageContentText,
                  message.isReply
                    ? messageItemStyles.messageContentIsReply
                    : messageItemStyles.messageContentIsSent,
                ]}
              >
                <TextBody
                  style={
                    message.isReply
                      ? messageItemStyles.messageTextReply
                      : messageItemStyles.messageTextSent
                  }
                >
                  {message.message}
                </TextBody>
              </View>
              <TextBody
                style={[
                  messageItemStyles.messageTime,
                  message.isReply
                    ? messageItemStyles.messageTimeReply
                    : messageItemStyles.messageTimeSent,
                ]}
              >
                {new Date().getFullYear()}
              </TextBody>
            </View>

            {/* Profile Icon */}
            <View>
              {!message.isReply ? (
                message.agent ? (
                  <ProfileIcon
                    firstName={message.agent.firstName ?? ""}
                    lastName={message.agent.lastName ?? ""}
                    entity={EntityType.AGENT}
                    size={30}
                    color={getIconColorFromId(message.agent._id)}
                  />
                ) : (
                  <View style={messageItemStyles.aiIcon}>
                    <TextBody style={messageItemStyles.aiText}>AI</TextBody>
                  </View>
                )
              ) : (
                <ProfileIcon
                  firstName={selectedTenant.firstName ?? ""}
                  lastName={selectedTenant.lastName ?? ""}
                  entity={EntityType.TENANT}
                  size={30}
                  color={getIconColorFromId(selectedTenant._id)}
                />
              )}
            </View>
          </View>
        </View>
      )}

      {/* File Message */}
      {message.hostedFile && (
        <TouchableOpacity
          style={[
            messageItemStyles.fileMessage,
            message.isReply
              ? messageItemStyles.replyMessage
              : messageItemStyles.sentMessage,
          ]}
          onPress={() => onDownloadFile(message.hostedFile)}
        >
          <DownloadIcon size={20} color="#007bff" />
          <TextBody style={messageItemStyles.fileName}>
            {message.hostedFile.fileName}
          </TextBody>
        </TouchableOpacity>
      )}
    </View>
  );
};
